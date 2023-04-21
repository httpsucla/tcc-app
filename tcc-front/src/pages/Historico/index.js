import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatabaseManager from '../../services/testDb';

export default function Historico({ navigation, route }) {
   
    const [filtro, setFiltro] = useState(false);
    const [historico, setHistorico] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [medId, setMedId] = useState('');
    const [dataStart, setDataStart] = useState(new Date());
    const [dataEnd, setDataEnd] = useState(new Date());
    const [medById, setMedById] = useState('');

    componentDidMount = () => {
        this.atualizaFiltros();
        this.refresh();
    }

    useEffect(() => {
        console.log("Teste");
        this.atualizaFiltros();
        this.refresh();
    }, []);

    atualizaFiltros = () => {
        if (route.params) {
            console.log("Com filtro");
            const { medId, DataIni, DataFim } = route.params;
            console.log(medId, DataIni, DataFim );
            setMedId(medId);
            setDataStart(DataIni);
            setDataEnd(DataFim);
            setFiltro(true);
        } else {
            console.log("Sem filtro");
        }
    }

    refresh = () => {
        if (filtro) {
            //  this.setState({ historico: [], carregando: true });
            //  this.db.executarSelect(`SELECT * FROM tb_historico WHERE id_medicamento = "${this.state.filtroMed}"`, [])
            //       .then(res => this.setState({ historico: res, carregando: false }));
           // DatabaseManager.getMedicamentoById(medId)
            //    setHistorico(medId);
            //    setLoading(false);
            DatabaseManager.getMedicamentoById((medId) => {
                setMedById(medId);
            })
               console.log("entrou no filtrado")
               console.log(medById);
                
        } else {
            DatabaseManager.getMedicamentos((medicamentos) => {
                setHistorico(medicamentos);
                setLoading(false);
            })
            console.log(historico)
            console.log("sem filtro")
        }
        
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

    return (
        <View style={styles.container} >
            <View style={styles.filters}>
                <View >
                    <TouchableOpacity style={styles.fontFilter} onPress={() => {
                        navigation.navigate('Filtro');
                    }}>

                        <Icon style={styles.textFilter} name="filter" size={18} color={'#292929f3'} />
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
            <TouchableOpacity style={styles.button} onPress={refresh}>
                <Text style={styles.buttonText}>Gerar relatório</Text>
            </TouchableOpacity>
            {
                historico.length > 0 ?
                    <View style={styles.container}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Medicamento</DataTable.Title>
                                <DataTable.Title>Horário previsto</DataTable.Title>
                                <DataTable.Title numeric>Abertura gaveta</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {
                                    historico.map(item => {
                                        return (
                                            <DataTable.Row key={item.id}>
                                                <DataTable.Cell> {item.nome}  </DataTable.Cell>
                                                <DataTable.Cell> {item.data_inicial} </DataTable.Cell>
                                                <DataTable.Cell numeric> {item.horario} </DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    })
                                }
                            </ScrollView>
                        </DataTable>
                    </View> :
                    <Text style={styles.emptyList}>Não há historico disponível.</Text>
            }
        </View>
    )
}
