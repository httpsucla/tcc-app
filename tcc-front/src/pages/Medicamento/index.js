import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';

export default function Medicamento({ navigation, route }) {



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos os medicamentos</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateUpdateMedicamento')}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

    );

}
