import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import Database from '../../services/database';

export default function Configuracao({ route, navigation }) {

    const [state, setState] = useState(false);
    const { item } = route.params ? route.params : {};
    const [contato, setContatos] = useState([]);

    useEffect(() => {
        Database.addGavetaTeste();
    }, []);

    telaContato = (() => {
        navigation.navigate("Contatos", item);
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
                    Database.dropTables();
                    Alert.alert('Sucesso', 'Banco resetado com sucesso.');
                }
            }],
            { cancelable: false }
        );
        console.log(contato);
    }

    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.9]}
            colors={['#A62A5C', '#6A2597']}
            style={styles.container}
        >
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
                <View style={styles.campoContato}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={telaContato}>
                        <Text style={styles.text}>Contatos</Text>
                        <Icon name="angle-right" size={18} color={'#414BB2'} />
                    </TouchableOpacity>
                    {
                        item ? <Text style={styles.campoNome}>{item.nome}</Text>
                            : null
                    }
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
        </LinearGradient>
    );
}