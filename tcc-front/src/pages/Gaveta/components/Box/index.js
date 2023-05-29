import React, { useState } from 'react';
import { Alert, Modal, TouchableOpacity, Text, View, TouchableWithoutFeedback, Pressable, Linking } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import { SelectList } from 'react-native-dropdown-select-list';
import Database from '../../../../services/database';
import axios from 'axios';
import moment from 'moment';
import { IP_ARDUINO } from '../../../../services/ipArduino';

export default function Box({ gaveta, navigation, meds, todasGavetas }) {

    const [gavetas, setGavetas] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState("");
    const [nomeMed, setNomeMed] = useState("");

    const inserirRemedioArduino = async (nroGaveta, horario, qtdeRemedios, dosagem) => {
        console.log('entrou no request. Caso nao apareça nada, nao conseguiu conectar no IP')
        horario = horario.replace(/:/g, '%3A');
        let request = 'http://' + IP_ARDUINO + '/setDataGaveta' + nroGaveta + '?params=' + horario + '000120' + qtdeRemedios + dosagem;
        console.log(request);
        axios.get(request)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

   const retirarRemedioArduino = async (nroGaveta) => {
        console.log('entrou no request. Caso nao apareça nada, nao conseguiu conectar no IP')
        axios.get('http://' + IP_ARDUINO + '/?clean=' + nroGaveta + 1)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const showMedicamentos = () => {

        if (gaveta) {
            setGavetas(gaveta);
        }

        console.log('aopa')
        Database.getMedicamentos((medicamentos) => {


            for (let i = 0; i < medicamentos.length; i++) {

                if (medicamentos[i].id == meds) {
                    this.nomeMed = medicamentos[i].nome;
                    console.log(this.nomeMed)
                }             
                this.data = medicamentos.map(m => ({
                    key: m.id,
                    value: m.nome,
                    horario: moment(m.horario, 'HH:mm').format('HH:mm'),
                    qtde: m.qtde,
                    qtdeDias: m.qtde_dias
                }));
            }

            todasGavetas.forEach(g => {
                if (g.is_ocupado){
                    for (let i = 0; i< this.data.length; i++){
                        if (this.data[i].key === g.id_medicamento)
                        this.data.splice(i, this.data[i].key)
                    }
                }
            });
            setMedicamentos(this.data);
        });

    };

    const hideModal = () => {
        setModalVisible(false);
    };

    function salvar(item) {
        const teste = {
            id_medicamento: selected,
            datahora_abertura: '',
            is_ocupado: true,
            is_atrasado: '',
            id: item,
        };
        
        let medicamentoSelecionado = medicamentos.find(m => m.key === selected);

        let dosagem = medicamentoSelecionado.qtde/medicamentoSelecionado.qtdeDias;
        let dosagemFormatada = String(dosagem).padStart(2, '0').slice(0, 2);

        Database.updateGaveta(teste, () => {
            setNomeMed(medicamentoSelecionado.value);
            inserirRemedioArduino(teste.id, medicamentoSelecionado.horario, medicamentoSelecionado.qtde, dosagemFormatada);
            Alert.alert('Sucesso', 'Medicamento inserido com sucesso.');
        })

    };

    function limparGaveta(item) {
        const teste = {
            id_medicamento: '',
            datahora_abertura: '',
            is_ocupado: false,
            is_atrasado: '',
            id: item,
        };

        Database.updateGaveta(teste, () => {
            retirarRemedioArduino(teste.id);
            Alert.alert('Sucesso', 'Gaveta está livre agora.');
        })
    };

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal fechada.");
                    setModalVisible(!modalVisible);
                }} >
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View style={styles.container}>
                        <View style={styles.modalView}>
                            <View style={styles.indicator} />
                            <Text style={styles.modalTitle}> {nomeMed ? nomeMed : `Gaveta ${gavetas.id + 1}`}</Text>
                            {
                                this.data ?
                                    <SelectList
                                        data={medicamentos}
                                        setSelected={setSelected}
                                        keyExtractor={(item) => item.id}
                                        labelExtractor={(item) => item.label}
                                        notFoundText="Nenhum medicamento encontrado"
                                        placeholder={meds ? this.nomeMed : "Selecione o medicamento"}
                                        searchInputStyle={{ backgroundColor: '#f2f2f2' }}
                                        listStyle={{ backgroundColor: '#fff' }}
                                    />
                                    : <Text style={styles.dataVazio}>Nenhum medicamento cadastrado</Text>
                            }

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    hideModal();
                                    navigation.navigate('Cadastrar Medicamento');
                                }}
                            >
                                <Text style={styles.textStyle}>Cadastrar novo medicamento</Text>
                            </TouchableOpacity>
                            {
                                this.data ?
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonOpen]}
                                        onPress={() => {
                                            hideModal();
                                            salvar(gavetas.id)
                                        }}
                                    >
                                        {
                                            meds
                                                ? <Text style={styles.textStyle}>Alterar</Text>
                                                : <Text style={styles.textStyle}>Salvar</Text>
                                                
                                        }
                                    </TouchableOpacity>
                                    :
                                    null
                            }

                            {
                                meds
                                    ?
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonDelete]}
                                        onPress={() => {
                                            hideModal();
                                            limparGaveta(gavetas.id)
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Limpar gaveta</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.box}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true)
                    showMedicamentos();
                }}
                >
                    {gaveta.is_ocupado ?
                        <Icon name="archive" size={60} color={'#b2633a'} />
                        :
                        <Icon name="plus-circle" size={60} color={'#4CAF50'} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

