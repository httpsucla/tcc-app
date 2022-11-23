import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Modal,Alert, StyleSheet,Pressable, Text, View, TouchableOpacity, ScrollView, FlatList, useEffect } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Gaveta({ navigation, route }) {

    const [gavetas, setItems] = useState([
        { id: 1, drug: { nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3} },
        { id: 2, drug: { nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3} },
        { id: 3, drug: { nome: "Buscopan", hour: "08:30", qtde: 12, date: "08/08/2022", days: 4} },
        { id: 4, drug: { nome: "Buscopan", hour: "08:30", qtde: 12, date: "08/08/2022", days: 4} }
    ]);
    async function save(){
        const drug = { nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3}
        const DB = {
            gavetas : [
            { id : 1, drug }
            ]
          }


    }
    async function getGavetas(){
        
    }

    async function handleButtonPress() {
        setModalVisible(!modalVisible);
        navigation.navigate("Cadastrar");
    }
    const [modalVisible, setModalVisible] = useState(false);
  
    return (
        
        <View style={styles.container}>
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

            <View style={styles.flex}>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 1</Text>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    { Object.keys(gavetas[0].drug).length === 0  ? 
                    <Icon name="plus-circle" size={60} color={'#4CAF50'} /> 
                      : 
                    <Icon name="archive" size={60} color={'#b2633a'} /> 
                    }   
                    </TouchableOpacity>
                </View>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 2</Text>
                    <TouchableOpacity onPress={handleButtonPress}>
                        <Icon name="plus-circle" size={60} color={'#4CAF50'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.flex}>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 3</Text>
                    <TouchableOpacity onPress={handleButtonPress}>
                        <Icon name="archive" size={60} color={'#b2633a'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 4</Text>
                    <TouchableOpacity onPress={handleButtonPress}>
                        <Icon name="archive" size={60} color={'#b2633a'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex: {
        flexDirection: 'row'  
    },
    gaveta: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});