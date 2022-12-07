import React, { Component } from 'react';
import { Text, View, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Input } from 'react-native-elements'
import Medicamento from '../../models/medicamento';
import Database from '../../services/databaseMedicamento';
import styles from './style';

class VisualizarMedicamentoTela extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        //this.state = props.route.params.nome;
        this.state = {
            /*medNome: '',
            medHora: '',
            medDataIni: '',
            medQtde: 0,
            medQtdeDias: 0,
            medAtivo: false*/
            medicamento: props.route.params.medicamento
        }
    }

    render() {
        let medicamento = this.state.medicamento;
        console.log("nome: " + medicamento.nome);
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}> Visualizar Medicamento</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>Nome: {JSON.stringify(medicamento.nome)}
                        </Text>
                        <Text style={styles.input}>Horário: {JSON.stringify(medicamento.horario)}
                        </Text>
                        <Text style={styles.input}>Data de inicio: {JSON.stringify(medicamento.data_inicial)}
                        </Text>
                        <Text style={styles.input}>Quantidade: {JSON.stringify(medicamento.qtde)}
                        </Text>
                        <Text style={styles.input}>Quantidade de dias: {JSON.stringify(medicamento.qtde_dias)}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

}
export default VisualizarMedicamentoTela;