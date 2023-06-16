import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import Database from '../../services/database';
import { IP_ARDUINO } from '../../services/ipArduino';
import moment from 'moment'
import GavetaService from '../../services/gavetaService'


export default function Configuracao({ route, navigation }) {

    const [state, setState] = useState(false);
    const { item } = route.params ? route.params : {};
    const [contato, setContatos] = useState([]);
    const [contatoWhats, setContatoWhats] = useState([])

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

    const shareWhats = useCallback(() => {
        Database.getContatos((contato) => {
            if (contato !== null && contato !== undefined && contato.length> 0){
                console.log('pq entrou vey')
                console.log(contato)
                setContatoWhats(contato[0]);
                console.log(contato[0].telefone)
                let telefoneFormatado = contato[0].telefone.replace(/\D/g, "");
                console.log(telefoneFormatado)
                let resultado = "";
                Database.getMedicamentos(medicamentos => {
                    medicamentos.forEach(function(medicamento){
                    
                    let dataFormatada = moment(medicamento.data_inicial).format('DD/MM/YYYY');
                    resultado += 'Nome ' + medicamento.nome + '\n' + 'Intervalo: tomar a cada ' + medicamento.intervalo + ' horas' + '\n' +  'Dosagem: ' +  medicamento.dosagem  + ' remédios por abertura, ' + '\n' + 'Quantidade de dias: ' + medicamento.qtde_dias + '\n ' + 'Data de início: ' + dataFormatada + '\n ' 
                    + '------------------------------' + '\n';
                    });
                    GavetaService.shareToWhatsApp('+55' + telefoneFormatado, resultado);
            
                })
            }
            else{
                Alert.alert('Erro ao enviar relatório! Verifique o contato cadastrado.');
            }
        })
        
    
      }) 

    return (
        <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}
        colors={['#ffffff', '#569099']}
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
                <TouchableOpacity onPress={shareWhats}>
                    <View style={styles.campo}>
                        <Text style={styles.text} > Enviar relatório ao contato </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}