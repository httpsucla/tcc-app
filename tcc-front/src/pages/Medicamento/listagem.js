import React, { Component, useState } from 'react';
import { Button, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Database from '../../services/database';
import styles from './style';

export default class ListagemMedicamentos extends React.Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            medicamentos: [],
            carregando: true,
            navigatedAway: false
        }
        this.refresh();
    }

    refresh = () => {
        this.setState({ medicamentos: [], carregando: true })
        this.db.getAllMedicine().then(medicamentos => this.setState({ medicamentos: medicamentos, carregando: false }))
        console.log(this.state.medicamentos)
    }

    cadastrar = () => {
        console.log("redirecionando...");
        this.props.navigation.navigate("Cadastro")
    }

    deletarMedicamento = (item) => {
        Alert.alert(
            "Atenção",
            'Você tem certeza que deseja excluir o medicamento: ' + item.nome + ' ?',
            [{
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    this.db.deleteMedicineById(item.id).then(({ result, message }) => {
                    Alert.alert(
                        "Sucesso",
                        'O medicamento: ' + item.nome + ' foi removido!',
                    
                    );
                    this.refresh();
                });
                }
            }],
            { cancelable: false }
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={{marginTop: 20}} onPress={() => this.refresh()}>
                    <Icon name="undo" size={20} color={'#292929f3'} />
                </TouchableOpacity>
                <Text style={styles.title}>Todos os medicamentos</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                {
                    this.state.medicamentos.length > 0 ?
                        <FlatList
                            style={styles.lista}
                            data={this.state.medicamentos}
                            keyExtractor={((item, index) => "Index do item" + index)}
                            // CRIAR COMPONENTE AQUI PRA RENDERITEM CHAMAR O COMPONENTE COM O STYLE E LISTA
                            renderItem={({ item }) => (
                                <View style={styles.campolista}>
                                    <View style={styles.campoconteudo}>
                                        <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.nome}</Text>
                                    </View >
                                    <View style={styles.componentenumero}>
                                        <View style={styles.campoconteudo}>
                                            <Text style={{ fontSize: 15 }}>{item.qtde} unidades</Text>
                                        </View>
                                        <View style={styles.campoconteudo}>
                                            <Text style={{ fontSize: 15 }}>{item.horario}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.campoconteudo}>
                                        <TouchableOpacity onPress={() => this.deletarMedicamento(item)}>
                                            <Icon name="trash" size={15} color={'#292929f3'} />
                                        </TouchableOpacity>
                                    </View >
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false} /> :
                        <Text>Não há medicamentos cadastrados no momento :</Text>
                }
            </View>
        )
    }
}
