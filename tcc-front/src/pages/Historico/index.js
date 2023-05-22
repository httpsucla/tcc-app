import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Database from '../../services/database';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default function Historico({ navigation, route }) {

    const [filtro, setFiltro] = useState(false);
    const [historico, setHistorico] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [medId, setMedId] = useState('');
    const [dataStart, setDataStart] = useState(new Date());
    const [dataEnd, setDataEnd] = useState(new Date());
    const [medById, setMedById] = useState([]);
    const [listaMed, setListaMed] = useState([]);

    componentDidMount = () => {
        this.atualizaFiltros();
        this.refresh();
    }

    useEffect(() => {
        Database.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos);
        });
        atualizaFiltros();

        gerarRelatorio();
    }, []);

    atualizaFiltros = () => {
        if (route.params) {
            const { medId, DataIni, DataFim, filtro } = route.params;
            console.log(medId, DataIni, DataFim, filtro);
            setMedId(medId);
            setDataStart(DataIni);
            setDataEnd(DataFim);
            setFiltro(filtro);

        } else {
            console.log("Sem filtro");
        }
    }

    filtrarRelatorio = () => {
        console.log(filtro)
        if (filtro) {
            if (medId) {
                if (dataStart) {
                    if (dataEnd) {
                        console.log("medicamento inicio e fim existem");
                        Database.getMedicamentoDataFimHistorico(medId, dataStart, dataEnd, (historico) => {
                            setHistorico(historico);
                        });
                    } else {
                        console.log("medicamento e data inicio existe");
                        Database.getMedicamentoDataInicioHistorico(medId, dataStart, (historico) => {
                            setHistorico(historico);
                        });
                    }
                }
                else if (dataEnd) {
                    console.log("medicamento e data fim existe");
                    Database.getMedicamentoDataFimHistorico(medId, dataEnd, (historico) => {
                        setHistorico(historico);
                    });
                } else {
                    console.log("só medicamento")
                    Database.getMedicamentoHistorico(medId, () => {

                    });
                }
            }
            else if (dataStart) {
                if (dataEnd) {
                    console.log("data inicio e data fim existe");
                    Database.getInicioFimHistorico(dataStart, dataEnd, (historico) => {
                        setHistorico(historico);
                    });
                } else {
                    console.log("só data inicio existe");
                    Database.getDataInicioHistorico(dataStart, (historico) => {
                        setHistorico(historico);
                    });
                }
            } else {
                console.log("só data fim existe");
                Database.getDataFimHistorico(dataEnd, (historico) => {
                    setHistorico(historico);
                });
            }
        }
        gerarRelatorio();
    }

    removeFiltro = () => {
        navigation.dispatch(
            StackActions.popToTop()
        );
    }

    setIsEnabled = (previousState) => {
        this.setState({ isEnabled: previousState });
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    gerarRelatorio = () => {
        const lastMed = [];
        let totalArray = 0;

        medicamentos.forEach((medicamento) => {
            const dateObj = new Date(medicamento.data_inicial) // transforma a data inicial em Date
            const timeObj = new Date(`1970-01-01T${medicamento.horario}000Z`); // transforma o horario inicial em date
            const now = new Date();
            const agora = moment(now);

            const mediaHoras = 24 / (parseInt(medicamento.qtde) / parseInt(medicamento.qtde_dias)); // calcula de quanto em quanto tempo deve-se engerir o medicamento
            let horarioProximo = moment(new Date(dateObj.setHours(timeObj.getHours(), timeObj.getMinutes(), timeObj.getSeconds())));

            for (let i = 0; i < medicamento.qtde; i++) {
                if (horarioProximo.isBefore(agora)) {
                    lastMed.push({ // cria objeto com o horario mais proximo de cada medicamento 
                        id: totalArray + i,
                        title: medicamento.nome,
                        dataAtual: moment.utc(horarioProximo),
                        horario: String(moment.utc(horarioProximo).format("DD/MM/YY HH:mm")),
                        abertura: ""
                    });
                    horarioProximo.add(mediaHoras, 'hours'); // calcula os futuros horarios que o usuario deverá tomar o medicamento
                }
            }
            totalArray = lastMed.length;
        });

        lastMed.sort((a, b) => { // ordena a lista por ordem crescente de data
            const dataA = new Date(a.dataAtual);
            const dataB = new Date(b.dataAtual);
            if (dataA < dataB) {
                return -1;
            } else if (dataA > dataB) {
                return 1;
            } else {
                return 0;
            }
        });
        setListaMed(lastMed);
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
                        <Text style={styles.textRemove}>Remover filtro</Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={filtrarRelatorio}>
                <Text style={styles.buttonText}>Gerar relatório</Text>
            </TouchableOpacity>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Medicamento</DataTable.Title>
                        <DataTable.Title>Horário previsto</DataTable.Title>
                        <DataTable.Title>Abertura gaveta</DataTable.Title>
                    </DataTable.Header>
                    <ScrollView style={{ marginBottom: 200}}>
                        {
                            listaMed.map(item => {
                                return (
                                    <DataTable.Row key={item.id}>
                                        <DataTable.Cell> {item.title}  </DataTable.Cell>
                                        <DataTable.Cell> {item.horario} </DataTable.Cell>
                                        <DataTable.Cell> {item.abertura} </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                    </ScrollView>
                </DataTable>
          
        </LinearGradient>
    )
}
