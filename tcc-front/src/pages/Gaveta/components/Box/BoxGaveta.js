import React, { Component } from 'react';
import { Alert, Modal, TouchableOpacity, Text, Pressable, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../style';
import style from './style';
import { SelectList } from 'react-native-dropdown-select-list';

export default class Box2 extends React.Component {
    constructor(props) {
        super(props);
        this.db = props.db;
        this.navigation = props.navigation;
        this.state = {
            gaveta: null,
            medicamentos: [],
            carregando: true,
            navigatedAway: false,
            modalVisible: false,
            selected: "",
        }
    };

    data = [
        { keys: '1', value: 'Remedio teste 1' },
        { keys: '2', value: 'Remedio teste 2' }
    ];

    componentDidMount() {
        if(this.props.gaveta)
            this.setState({gaveta: this.props.gaveta})
    }

    refresh = () => {
        if(this.props.gaveta){
            this.setState({gaveta: this.props.gaveta})
        //    console.log("gaveta selecionada: " + JSON.stringify(this.state.gaveta))
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    salvar = async () => {
        //ativa a gaveta e salva o id do medicamento
        this.setModalVisible(!this.state);
     
        this.db.executar(
            `UPDATE tb_gavetas 
             SET id_medicamento=${this.state.selected},
                 is_ocupado=1
             WHERE id=${this.state.gaveta.id} ;` 
        ,[]).then(res => {
            Alert.alert(
                "Sucesso!",
                'A Gaveta ' + this.state.gaveta.id + ' foi salva.',
            );
        });

        /*this.db.executarSelect(`SELECT * FROM tb_gavetas 
                                WHERE id = ${this.state.gaveta.id}`
        , []).then(res =>{
                this.setState({ gaveta: res })
                console.log("gaveta atualizada: " + JSON.stringify(res));
        });*/
    }

    listaDeMedicamento = () => {
        if (this.props.meds.length>0){
            this.data = this.props.meds.map(m => ({
                key: m.id, value: m.nome
            }));
        }
    };

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      //  Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}>
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalText}> Gaveta {this.props.gaveta.id}</Text>

                            <SelectList
                                setSelected={(val) => this.setState({ selected: val })}
                                defaultOption={this.data.find((e) => {
                                    return e.key === this.props.gaveta.id_medicamento}
                                )}
                                data={this.data}
                                save="key"
                            />

                            <Pressable
                                style={[style.button, style.buttonClose]}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                    this.navigation.navigate('Cadastro');
                                }}
                            >
                                <Text style={style.textStyle}>Cadastrar novo medicamento</Text>
                            </Pressable>

                            <Pressable
                                style={[style.button, style.buttonClose]}
                                onPress={this.salvar}
                            >
                                <Text style={style.textStyle}>Salvar</Text>
                            </Pressable>

                        </View>
                    </View>
                </Modal>

                <View style={styles.box}>
                    <TouchableOpacity onPress={() =>{
                        this.setModalVisible(!modalVisible);
                        this.refresh();
                        this.listaDeMedicamento();
                    }
                    }>
                        {!this.props.gaveta.is_ocupado ?
                            <Icon name="plus-circle" size={60} color={'#4CAF50'} />
                            :
                            <Icon name="archive" size={60} color={'#b2633a'} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
