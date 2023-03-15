import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import style from './style';
import Database from '../../services/database2';

export default class ListagemMedicamentos extends React.Component {
    constructor(props) {
        super(props);
        this.db = new Database;
        this.navigation = props.navigation;
        this.state = {
            medicamentos: [],
            carregando: true,
            navigatedAway: false
        }
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        this.setState({ medicamentos: [], carregando: true });
        this.db.executarSelect('SELECT * FROM tb_medicamentos', [])
            .then(res => this.setState({ medicamentos: res, carregando: false }));
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
                    this.db.executarSelect(`DELETE FROM tb_medicamentos WHERE id= ${item.id}`, [])
                    .then(({ result, message }) => {
                        alert(
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
                <TouchableOpacity style={{marginTop: 30}} onPress={() => this.refresh()}>
                    <Icon name="undo" size={20} color={'#292929f3'} />
                </TouchableOpacity>
                <Text style={styles.title}>Todos os medicamentos</Text>
                <TouchableOpacity style={styles.button} onPress={() => 
                    this.props.navigation.navigate("Cadastro")}>
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
                                    <View style={styles.campoicone}>
                                        <TouchableOpacity onPress={() => 
                                            this.props.navigation.navigate("Visualizacao", {medicamento: item})}>
                                            <Icon name="eye" size={15} color={'#292929f3'} />
                                        </TouchableOpacity>
                                    </View >
                                    <View style={styles.campoicone}>
                                        <TouchableOpacity  onPress={() => 
                                            this.props.navigation.navigate("Editar", {medicamento: item})}>
                                            <Icon name="edit" size={15} color={'#292929f3'} />
                                        </TouchableOpacity>
                                    </View >
                                    <View style={styles.campoicone}>
                                        <TouchableOpacity onPress={() => this.deletarMedicamento(item)}>
                                            <Icon name="trash" size={15} color={'#292929f3'} />
                                        </TouchableOpacity>
                                    </View >
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false} /> :
                        <Text style={style.emptyList}>Não há medicamentos cadastrados no momento!</Text>
                }
            </View>
        )
    }
}