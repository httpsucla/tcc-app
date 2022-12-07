import React, { Component } from 'react';
import { Text, View, ScrollView, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Input } from 'react-native-elements'
import Medicamento from '../../models/medicamento';
import Database from '../../services/databaseMedicamento';
import styles from './style';

class EditarMedicamento extends Component {

    constructor(props) {
        super(props);

        let medicamento, event;
        this.db = new Database();
        /*if (this.props.navigation
            && this.props.navigation.state
            && this.props.navigation.state.params) {
                medicamento = this.props.navigation.state.params.medicamento;
                event = this.props.navigation.state.params.medicamento;
            }*/
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

    updateMedicamento = () => {
        if (!this.state.medicamento)
            return;

        this.db.editMedicineById(item).then(({ result, message }) => {
                Alert.alert(
                    "Sucesso",
                    'O medicamento: ' + item.nome + ' foi alterado!',
                
                );
        });
    }

    editar = (() => {
        console.log("editando");
        let medicamento = new Medicamento({
            id: this.state.medId,
            nome: this.state.medNome,
            horario: this.state.medHora,
            data_inicial: this.state.medDataIni,
            qtde: this.state.medQtde,
            qtde_dias: this.state.medQtdeDias,
            ativo: this.state.medAtivo,
        })
        console.log(medicamento)
        this.db.editMedicineById(medicamento).then(result => {
            console.log(result)
            if (result) {
                this.props.navigation.navigate("Medicamento")
                Alert.alert(
                    "Sucesso!",
                    'O medicamento ' + medicamento.nome + ' foi alterado.',
                
                );
            } else alert("Erro")
        })
    }).bind(this)

    render() {
        console.log("id: " + this.state.medId);
        //const { navigation } = this.props;
        //let teste = JSON.stringify(this.teste.nome)
        //console.log("item: " + teste);
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
                            value={this.state.medicamento.horario}
                            onChangeText={text => this.setState({ medHora: text })}
                            maxLenght={30}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data de Inicio"
                            value={this.state.medicamento.data_inicial}
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
                            value={JSON.stringify(this.state.medicamento.qtde)}
                            onChangeText={text => this.setState({ medQtde: text })}
                            maxLenght={30}
                            keyboardType='numeric' />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantidade de dias"
                            value={JSON.stringify(this.state.medicamento.qtde_dias)}
                            onChangeText={text => this.setState({ medQtdeDias: text })}
                            maxLenght={30}
                            keyboardType='numeric' />
                        <TouchableOpacity style={styles.button} onPress={this.editar} >
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

    
}
export default EditarMedicamento;

