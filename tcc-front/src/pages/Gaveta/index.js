import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import Box from './components/Box';

export default function Gaveta({ navigation, route }) {

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 1</Text>
                    <Box />
                </View>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 2</Text>
                    <Box />
                </View>
            </View>
            <View style={styles.flex}>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 3</Text>
                    <Box />
                </View>
                <View style={styles.gaveta}>
                    <Text style={styles.title}>Gaveta 4</Text>
                    <Box />
                </View>
            </View>
        </View>
    );
}