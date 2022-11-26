import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import Box from './components/Box';

export default function Gaveta({ navigation, route }) {

    const [items, setItems] = useState([
        { id: 1, drug: { nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3 } },
        { id: 2, drug: { nome: "Dorflex", hour: "17:00", qtde: 10, date: "08/08/2022", days: 3 } },
        { id: 3, drug: { nome: "Buscopan", hour: "08:30", qtde: 12, date: "08/08/2022", days: 4 } },
        { id: 4, drug: { nome: "Buscopan", hour: "08:30", qtde: 12, date: "08/08/2022", days: 4 } }
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 1</Text>
                    <Box name = "Gaveta 1" medicamento = {items[0]} />
                </View>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 2</Text>
                    <Box name = "Gaveta 2" medicamento = {items[1]} />
                </View>
            </View>
            <View style={styles.flex}>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 3</Text>
                    <Box name = "Gaveta 3" medicamento = {items[2]}/>
                </View>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 4</Text>
                    <Box name = "Gaveta 4" medicamento = {items[3]}/>
                </View>
            </View>
        </View>
    );
}