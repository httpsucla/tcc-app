import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, useEffect } from 'react-native';

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
            <TouchableOpacity style={styles.gaveta} onPress={handleButtonPress}>
                <Text>⚪</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Gaveta 1</Text>
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
    gaveta: {
        margin: 10,
        width: '30%',
        height: '7.55%',
        backgroundColor: '#b2633a',
        borderTopColor: "#ecc5a6",
        borderTopWidth: 3,
        borderRightColor: "#ecc5a6",
        borderRightWidth: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    }
});