import React, { Component, useState, Alert } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Contato from '../../models/contato';
import Database from '../../services/database';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

class TelaContatos extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            cttNome: '',
            cttFone: '',
            contato: []
        }
        this.refresh();
    }

    refresh = () => {
        this.setState({ contato: [] })
        this.db.getContato().then(contato => this.setState({ contato: contato }))
        console.log(this.state.contato)
    }
    cadastrarCtt = (() => {
        let contato = new Contato({
            nome: this.state.cttNome,
            fone: this.state.cttFone,
        })
        console.log(contato)
        this.db.insertNewContato(contato).then(result => {
            console.log(result)
            if (result) {
                this.refresh();
                this.props.navigation.navigate("Configuracao")
                alert("Inseriu com sucesso!")
            } else alert("Erro")
        })
    }).bind(this)

    deletarContato = (item) => {
        this.db.deleteContato().then(({ result, message }) => {
            alert('O contato: ' + item.nome + ' foi removido!');
            this.refresh();
        }
        )
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}> Cadastrar Contato</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            clearButtonMode="always"
                            onChangeText={text => this.setState({ cttNome: text })}
                            maxLenght={30}
                        />
                        <TextInputMask
                            style={styles.input}
                            placeholder="Telefone"
                            type={'cel-phone'}
                            clearButtonMode="always"
                            value={this.state.cttFone}
                            onChangeText={text => this.setState({ cttFone: text })}
                            maxLenght={30}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.cadastrarCtt} >
                            <Text style={styles.buttonText}>Cadastrar contato</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.contato.length > 0 ?
                            <FlatList
                                style={styles.lista}
                                data={this.state.contato}
                                keyExtractor={((item, index) => "Index do item" + index)}
                                renderItem={({ item }) => (
                                    <View style={styles.campolista}>
                                        <View style={styles.campoconteudo}>
                                            <Text style={styles.campoconteudo}>Nome: {item.nome}</Text>
                                            <Text style={styles.campoconteudo}>Telefone: {item.fone}</Text>
                                        </View >
                                        <View style={styles.campoconteudo}>
                                            <TouchableOpacity onPress={() => this.deletarContato(item)}>
                                                <Icon name="trash" size={15} color={'#292929f3'} />
                                            </TouchableOpacity>
                                        </View >
                                    </View>
                                )}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false} /> :
                            <Text style={styles.emptyList}>Nenhum contato cadastrado!</Text>
                    }
                </View>

            </ScrollView>
        )
    }
}
export default TelaContatos;