import React, { Component } from 'react';
import { Text, View, ScrollView, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import Medicamento from '../../models/medicamento';
import styles from './style';
import Database from '../../services/database2';

class EditarMedicamento extends Component {

    constructor(props) {
        super(props);

        let medicamento, event;
        this.db = new Database();
        this.state = {
            medId: props.route.params.medicamento.id,
            medNome: props.route.params.medicamento.nome,
            medHora: props.route.params.medicamento.horario,
            medDataIni: props.route.params.medicamento.data_inicial,
            medQtde: props.route.params.medicamento.qtde,
            medQtdeDias: props.route.params.medicamento.qtde_dias,
            medAtivo: props.route.params.medicamento.ativo,
            medicamento: props.route.params.medicamento
        }
    }

    editar = () => {
        let medicamento = new Medicamento({
            id: this.state.medId,
            nome: this.state.medNome,
            horario: this.state.medHora,
            data_inicial: this.state.medDataIni,
            qtde: this.state.medQtde,
            qtde_dias: this.state.medQtdeDias,
            ativo: this.state.medAtivo,
        })
        this.db.executar(
            `UPDATE tb_medicamentos 
                SET nome='${medicamento.nome}',
                    horario='${medicamento.horario}',
                    data_inicial='${medicamento.data_inicial}',
                    qtde=${medicamento.qtde},
                    qtde_dias=${medicamento.qtde_dias},
                    ativo=${medicamento.ativo}
            WHERE id=${medicamento.id} ;`        
        , []).then(res => {
            this.props.navigation.navigate("Medicamento")
            Alert.alert(
                "Sucesso!",
                'O medicamento ' + medicamento.nome + ' foi alterado.',
            );
        }).catch( error => {
            alert("Erro")
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}> Editar Medicamento</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={this.state.medNome}
                            onChangeText={text => this.setState({ medNome: text })}
                            maxLenght={30}
                            clearButtonMode="always"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Horário"
                            value={this.state.medHora}
                            onChangeText={text => this.setState({ medHora: text })}
                            maxLenght={30}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data de Inicio"
                            value={this.state.medDataIni}
                            onChangeText={text => this.setState({ medDataIni: text })}
                            maxLenght={30}
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantidade"
                            value={JSON.stringify(this.state.medQtde)}
                            onChangeText={text => this.setState({ medQtde: text })}
                            maxLenght={30}
                            keyboardType='numeric' />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantidade de dias"
                            value={JSON.stringify(this.state.medQtdeDias)}
                            onChangeText={text => this.setState({ medQtdeDias: text })}
                            maxLenght={30}
                            keyboardType='numeric' />
                        <TouchableOpacity style={styles.button} onPress={this.editar} >
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default EditarMedicamento;

