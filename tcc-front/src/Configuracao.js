import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Configuracao () {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>

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
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    }
});