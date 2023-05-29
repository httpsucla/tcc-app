import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { IP_ARDUINO } from '../../services/ipArduino';

export default function TesteAngelo({ route }) {

    const testeRequest = async () => {
        console.log('entrou no request. Caso nao apareça nada, nao conseguiu conectar no IP')
        axios.get('https://' + IP_ARDUINO + '/setGaveta3?horario=02:00')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const onPressBotao = () => {
        Alert.alert('Apertou! Olhe o console.');
        testeRequest();
    };

    return (
        <View style={styles.container} >
            <Button title="Pressione o botão" onPress={onPressBotao} />
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
      alignItems: 'center',
      paddingTop: 100
    },
});

