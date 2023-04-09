import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Switch, FlatList, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Database from '../../services/database2';

class Historico extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            isEnabled: false,
            carregando: true,
            filtroMed: '',
            filtroDtIni: '',
            filtroDtFim: '',
            filtro: false,
            historico: []
        }         
        
    };

    componentDidMount() {
        this.atualizaFiltros();
        this.refresh();
    }
    
    
    atualizaFiltros () {
        if (this.props.route.params) {
            const {medId, DataIni, DataFim} = this.props.route.params;
            this.setState({filtroMed: medId}, (state) => console.log(this.state.filtroMed))
            this.setState({filtroDtIni: DataIni}, (state) => console.log(this.state.filtroDtIni))
            this.setState({filtroDtFim: DataFim}, (state) => console.log(this.state.filtroDtFim))
            this.setState({filtro: true}, (state) => console.log(this.state.filtro));
        } else {
            console.log("Sem filtro");
        }
    }

    refresh () {
        if (this.state.filtro) {
            this.setState({ historico: [], carregando: true });
            this.db.executarSelect(`SELECT * FROM tb_historico WHERE id_medicamento = "${this.state.filtroMed}"`, [])
                .then(res => this.setState({ historico: res, carregando: false }));

        } else {
            this.setState({ historico: [], carregando: true });
            this.db.executarSelect('SELECT * FROM tb_historico', [])
                .then(res => this.setState({ historico: res, carregando: false }));
        }
    }


    removeFiltro() {
        this.props.navigation.dispatch(
            StackActions.popToTop()
          );
    }
    

    setIsEnabled = (previousState) => {
        this.setState({ isEnabled: previousState });
    }


    render() {

        const toggleSwitch = () => setIsEnabled(previousState => !previousState);

        return (
            <View style={styles.container} >   
                <View style={styles.filters}>
                    <View >
                        <TouchableOpacity style={styles.lupa} onPress={() => this.props.navigation.navigate("Filtro")}>
                            <Icon name="search" size={18} color={'black'} />
                            <Text style={styles.fontFilter}>  Filtrar</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.filtro &&  (
                        <TouchableOpacity style={styles.lupa} onPress={() => this.removeFiltro()}>
                            <Icon name="window-close" size={18} color={'black'} />
                            <Text style={styles.textRemove}>  Remover filtro</Text>
                        </TouchableOpacity>
                    )}


                </View>

                <TouchableOpacity style={styles.button}  onPress={() => this.refresh()}>
                   <Text style={styles.buttonText}>Gerar relatório</Text>
                </TouchableOpacity>

                {
                    this.state.historico.length > 0 ?            
                        <View style={styles.container}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Medicamento</DataTable.Title>
                                    <DataTable.Title>Horário previsto</DataTable.Title>
                                    <DataTable.Title numeric>Abertura gaveta</DataTable.Title>
                                </DataTable.Header>

                                <ScrollView>
                                {
                                this.state.historico.map( item  => {
                                    return(
                                    <DataTable.Row key={item.id}>
                                        <DataTable.Cell> {item.id_medicamento}  </DataTable.Cell>
                                        <DataTable.Cell> {item.dthora_prevista} </DataTable.Cell>
                                        <DataTable.Cell numeric> {item.dthora_abertura} </DataTable.Cell>
                                    </DataTable.Row>
                                    )})
                                }
                                </ScrollView> 
                            </DataTable>
                        </View>:
                        <Text style={styles.filters}>Não há historico disponível.</Text>
                } 

            </View>
            
        );
    }
}

export default Historico;

