import React, { Component } from 'react';
import { Text, View, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Input } from 'react-native-elements'
import Medicamento from '../../models/medicamento';
import styles from './style';
import Database from '../../services/database2';

class CadastroTela extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            medNome: '',
            medHora: '',
            medDataIni: '',
            medQtde: 0,
            medQtdeDias: 0,
            medAtivo: false
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}> Cadastrar Medicamento</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            onChangeText={text => this.setState({ medNome: text })}
                            maxLenght={30}
                            clearButtonMode="always"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Horário"
                            onChangeText={text => this.setState({ medHora: text })}
                            maxLenght={30}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data de Inicio"
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
                            onChangeText={text => this.setState({ medQtde: text })}
                            maxLenght={30}
                            keyboardType='numeric' />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantidade de dias"
                            onChangeText={text => this.setState({ medQtdeDias: text })}
                            maxLenght={30}
                            keyboardType='numeric' />
                        <TouchableOpacity style={styles.button} onPress={this.cadastrar} >
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
    cadastrar = () => {
        let medicamento = new Medicamento({
            nome: this.state.medNome,
            horario: this.state.medHora,
            data_inicial: this.state.medDataIni,
            qtde: this.state.medQtde,
            qtde_dias: this.state.medQtdeDias,
            ativo: this.state.medAtivo,
        })

        this.db.executar(`
            INSERT INTO tb_medicamentos
            (nome, horario, data_inicial, qtde, qtde_dias, ativo)
            VALUES ('${medicamento.nome}', '${medicamento.horario}', '${medicamento.data_inicial}', ${medicamento.qtde}, ${medicamento.qtde_dias}, ${medicamento.ativo});`
        ,[]).then(res => {
            alert("Inseriu com sucesso!");
            this.props.navigation.navigate("Medicamento");
        }).catch( error => {
            alert("Erro ao inserir o medicamento");
        });
    }
}
export default CadastroTela;