import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, useEffect } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Gaveta({ navigation, route }) {

    const [items, setItems] = useState([
        { id: 1, nome: "Dramin", hour: "12:30", qtde: 12, date: "08/08/2022", days: 6 },
        { id: 2, nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3 },
        { id: 3, nome: "Buscopan", hour: "08:30", qtde: 12, date: "08/08/2022", days: 4 }
    ]);
    async function handleButtonPress() {
        navigation.navigate("Cadastrar");
    }

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 1</Text>
                    <TouchableOpacity onPress={handleButtonPress}>
                        <Icon name="archive" size={60} color={'#b2633a'} />
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
    }
});