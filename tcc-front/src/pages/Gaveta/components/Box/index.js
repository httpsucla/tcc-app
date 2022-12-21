import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Box(props) {
    const navigation = useNavigation();
    const [selected, setSelected] = React.useState("");
    const [medicamento, setMedicamento] = React.useState({});


    const data = [{ keys: '1', value: 'Remedio 1' },
    { keys: '2', value: 'Remedio 2' },
    { keys: '3', value: 'Remedio 3' },
    { keys: '5', value: 'Remedio 5' },
    { keys: '6', value: 'Remedio 6' },
    { keys: '7', value: 'Remedio 7' },
    { keys: '8', value: 'Remedio 8' },
    { keys: '9', value: 'Remedio 9' },
    { keys: '10', value: 'Remedio 10' },
    { keys: '11', value: 'Remedio 11' },
    { keys: '12', value: 'Remedio 12' },
    { keys: '13', value: 'Remedio 13' },
    ];


    async function handleButtonPress() {
        setModalVisible(!modalVisible);
        navigation.navigate('CreateUpdateMedicamento');
    }
    async function salvar() {
        //enviar const selected para bd e processos de salvar na gaveta
        setModalVisible(!modalVisible);
        setMedicamento(props.medicamento.drug);
    }
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>  {props.name} </Text>
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={data}
                            save="value"
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleButtonPress}
                        >
                            <Text style={styles.textStyle}>Adicionar medicamento</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={salvar}
                        >
                            <Text style={styles.textStyle}>Salvar</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>
            <View style={styles.box}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    {Object.keys(medicamento).length === 0 ?

                        <Icon name="plus-circle" size={60} color={'#4CAF50'} />
                        :
                        <Icon name="archive" size={60} color={'#b2633a'} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}