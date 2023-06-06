import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Database from '../../services/database';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import HistoricoService from '../../services/historicoService';

export default function Historico({ navigation, route }) {

    const [filtro, setFiltro] = useState(false);
    const [dataDefault, setDataDefault] = useState(false)
    const [historico, setHistorico] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [medId, setMedId] = useState('');
    const [dataStart, setDataStart] = useState(new Date());
    const [dataEnd, setDataEnd] = useState(new Date());
    const [medById, setMedById] = useState([]);
    const [listaMed, setListaMed] = useState([]);
    const isInitialMount = useRef(true);

    componentDidMount = () => {
        // Database.teste();
    }

    useEffect(() => {

        atualizaFiltros();
        filtrarRelatorio();
        
    }, [medId, dataStart, dataEnd, filtro, dataDefault]);

        
    atualizaFiltros = () => {
        if (route.params) {
            const { medId, DataIni, DataFim, filtro, DataDefault } = route.params;
            console.log(medId, DataIni, DataFim, filtro, DataDefault);
            setMedId(medId);
            setDataStart(DataIni);
            setDataEnd(DataFim);
            setFiltro(filtro);
            setDataDefault(DataDefault);
            console.log(filtro)

        } else {
            console.log("Sem filtro");

            Database.getHistoricoRelatorio((historico) => {
                setHistorico(historico);
            });
        }
    }


    filtrarRelatorio = () => {

        HistoricoService.requestDataHora(arrayRequest => {
            console.log(arrayRequest);
            if (arrayRequest != null || arrayRequest != undefined){
                const hist = {
                    id_gaveta: arrayRequest.idGaveta,
                    id_medicamento: 0,
                    dt_abertura: arrayRequest.dataAbertura,
                    dt_prevista: arrayRequest.dataPrevista,
                    situacao: true
                }

                Database.getMedicamentoByGaveta(hist.id_gaveta, medicamento => {
                    if (medicamento != null || medicamento != undefined)
                        hist.id_medicamento = medicamento[0].id; 
                })

                if (hist.id_medicamento != null || hist.id_medicamento != undefined){
                    Database.getMedicamentoById(hist.id_medicamento, medicamento =>{
                        console.log(medicamento)
                        hist.dt_prevista = new Date(medicamento.data_inicial)
                        hist.dt_prevista.setDate(hist.data_prevista.getDate() + medicamento.qtde_dias);
                    })
            
                    Database.addHistorico(hist); 
                }
            }
        });
        //id_gaveta, id_medicamento, dt_prevista, dt_abertura, situacao      
        console.log(filtro)
        if (filtro) {
            if (dataDefault) {
                Database.getHistoricoByMed(medId, (historico) => {
                    setHistorico(historico);
                });

            } 
            else if (dataStart && dataEnd) {
                var d1 = moment(dataStart + ' 00:00','DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
                var d2 = moment(dataEnd + ' 23:59','DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');

                console.log(d1, d2);
                Database.getHistoricoByDate(medId, d1, d2, (historico) => {
                    setHistorico(historico);
                });

            }
        }
    }
    

    removeFiltro = () => {
        navigation.dispatch(
            StackActions.popToTop()
        );
    }


    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.9]}
            colors={['#A62A5C', '#6A2597']}
            style={styles.container}
        >
            <View style={styles.filters}>
                <View >
                    <TouchableOpacity style={styles.fontFilter} onPress={() => {
                        navigation.navigate('Filtro');
                    }}>
                        <Icon style={styles.textFilter} name="filter" size={18} color={'white'} />
                        <Text style={styles.textFilter}>Filtrar</Text>
                    </TouchableOpacity>
                </View>

                {filtro && (
                    <TouchableOpacity style={styles.fontFilter} onPress={removeFiltro}>
                        <Icon style={styles.textFilter} name="window-close" size={18} color={'#292929f3'} />
                        <Text style={styles.textRemove} >Remover filtro</Text>
                    </TouchableOpacity>
                )}
            </View>

             {/* <TouchableOpacity style={styles.button} onPress={filtrarRelatorio}>
                <Text style={styles.buttonText}>Gerar relatório</Text>
            </TouchableOpacity>   */}
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Medicamento</DataTable.Title>
                        <DataTable.Title>Horário previsto</DataTable.Title>
                        <DataTable.Title>Abertura gaveta</DataTable.Title>
                    </DataTable.Header>
                    <ScrollView style={{ marginBottom: 100}}>
                        {
                            historico.map(item => {
                                return (
                                    <DataTable.Row key={item.id}>
                                        <DataTable.Cell> {item.nome}  </DataTable.Cell>
                                        <DataTable.Cell> {moment(item.dt_prevista,'YYYY-MM-DD HH:mm').format('DD/MM HH:mm')} </DataTable.Cell>
                                        {item.dt_abertura != '' && (
                                            <DataTable.Cell> {moment(item.dt_abertura,'YYYY-MM-DD HH:mm').format('DD/MM HH:mm')} </DataTable.Cell>
                                        )}
                                        {item.dt_abertura == '' && (
                                            <DataTable.Cell> NA </DataTable.Cell>
                                        )}
                                    </DataTable.Row>
                                )
                            })
                            
                        }
                        {historico == 0 && (
                            <Text style={styles.textWarning}>Não houve registro no ultimo mês.</Text>
                        )}
                    </ScrollView>
                </DataTable>
        </LinearGradient>
    )
}
