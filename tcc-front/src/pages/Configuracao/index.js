import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatabaseManager from '../../services/testDb';

export default function Configuracao({ navigation }) {

    const [state, setState] = useState(false);

    telaContato = (() => {
        navigation.navigate("Contatos");
    });

    resetarBanco = () => {
        Alert.alert(
            "Atenção",
            'Você tem certeza que deseja resetar o banco de dados?',
            [{
                text: "Não",
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    DatabaseManager.dropTables();
                    Alert.alert('Sucesso', 'Banco resetado com sucesso.');
                }
            }],
            { cancelable: false }
        );
    }
 
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.campo}>
                    <Text style={styles.text}>Conexão com a gaveta</Text>
                    {state
                        ?
                        <Text style={styles.textItalic}>conectado</Text>
                        :
                        <Text style={styles.textItalic}>desconectado</Text>
                    }
                </View>
                <View>
                    <TouchableOpacity style={styles.campo} onPress={telaContato}>
                        <Text style={styles.text}>Contatos</Text>
                        <Icon name="angle-right" size={18} color={'#414BB2'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.text}>Notificações</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.text}>Manual do usuário</Text>
                </View>
                <TouchableOpacity onPress={resetarBanco}>
                    <View style={styles.campo}>
                        <Text style={styles.text}>Resetar SQLite</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}