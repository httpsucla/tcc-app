import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './style';
import Database from '../../services/database2';

class VisualizarMedicamento extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            medicamento: props.route.params.medicamento
        }
    }

    render() {
        const { medicamento } = this.state;
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
export default VisualizarMedicamento;