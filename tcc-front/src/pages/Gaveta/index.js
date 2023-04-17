import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import Box from './components/Box';
import DatabaseManager from '../../services/testDb';

export default function Gavetas({ navigation }) {

    const [gavetas, setGavetas] = useState([]);
    useEffect(() => {
        DatabaseManager.addGavetaTeste();
        DatabaseManager.getGavetas((gavetas) => {
            setGavetas(gavetas);
            console.log(gavetas);
        })     
    }, []);

    if (gavetas.length > 0) {
        return (
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 1</Text>
                        <Box gaveta={gavetas[0]} navigation={navigation} meds={gavetas[0].id_medicamento} />
                    </View>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 2</Text>
                        <Box gaveta={gavetas[1]} navigation={navigation} meds={gavetas[1].id_medicamento} />
                    </View>
                </View>
                <View style={styles.flex}>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 3</Text>
                        <Box gaveta={gavetas[2]} navigation={navigation} meds={gavetas[2].id_medicamento} />
                    </View>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 4</Text>
                        <Box gaveta={gavetas[3]} navigation={navigation} meds={gavetas[3].id_medicamento} />
                    </View>
                </View>
            </View>
        )
    }
}
