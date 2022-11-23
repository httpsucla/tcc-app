import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

export default function Box() {

    const [items, setItems] = useState([
        { id: 1, drug: { nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3 } },
        { id: 2, drug: { nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3 } },
        { id: 3, drug: { nome: "Buscopan", hour: "08:30", qtde: 12, date: "08/08/2022", days: 4 } },
        { id: 4, drug: { nome: "Buscopan", hour: "08:30", qtde: 12, date: "08/08/2022", days: 4 } }
    ]);
    
    async function handleButtonPress() {
        setModalVisible(!modalVisible);
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
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleButtonPress}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.box}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    {Object.keys(items[0].drug).length === 0 ?
                        <Icon name="plus-circle" size={60} color={'#4CAF50'} />
                        :
                        <Icon name="archive" size={60} color={'#b2633a'} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}