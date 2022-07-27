import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function Gaveta( {navigation} ) {

    async function handleButtonPress(){   
        navigation.navigate("Cadastrar");
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.gaveta} onPress={handleButtonPress}>
                <Text>⚪</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Gaveta 1</Text>
        <StatusBar style="light" />
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
        borderTopColor : "#ecc5a6",
        borderTopWidth: 3,
        borderRightColor: "#ecc5a6",
        borderRightWidth:  3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#292929f3',
        fontSize: 16,
        marginTop: 5
    },
});