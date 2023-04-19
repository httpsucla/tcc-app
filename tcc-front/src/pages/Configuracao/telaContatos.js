import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import DatabaseManager from '../../services/testDb';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

export default function Contatos({ navigation }) {

    const [contato, setContato] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        DatabaseManager.getContatos((contato) => {
            setContato(contato);
            console.log(contato)
        })
    }, []);
    
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000)

        DatabaseManager.getContatos((contato) => {
            setContato(contato)
        });
    }, []);

    cadastrarInutil = () => {
        const data = {
            nome: contato.nome,
            telefone: contato.telefone
        };
        
        DatabaseManager.addContato(data, () => {
            Alert.alert('Sucesso', 'Contato salvo com sucesso.');
            navigation.navigate("Configuracao", data);
        });
    };

    cadastrar = () => {
        const data = {
            nome: contato.nome,
            telefone: contato.telefone
        };
        console.log(data)
        DatabaseManager.addContatoTeste(data, () => {
            Alert.alert('Sucesso', 'Contato salvo com sucesso.');
            navigation.navigate("Configuracao");
        });
 
    };
    const deletarContato = () => {
        Alert.alert(
            "Atenção",
            'Você tem certeza que deseja excluir o contato: '  + '?',
            [{
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    DatabaseManager.deleteContato();
                    Alert.alert('Sucesso', 'Contato ' + ' removido com sucesso.');

                }
            }],
            { cancelable: false }
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}> Cadastrar Contato</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        clearButtonMode="always"
                        value={contato.nome}
                        onChangeText={nome => setContato({ ...contato, nome })}
                        maxLenght={30}
                    />
                    <TextInputMask
                        style={styles.input}
                        placeholder="Telefone"
                        type={'cel-phone'}
                        clearButtonMode="always"
                        value={contato.telefone}
                        onChangeText={telefone => setContato({ ...contato, telefone })}
                        maxLenght={30}
                    />
                    <TouchableOpacity style={styles.button} 
                    onPress={() => {
                       // cadastrar();
                        onRefresh();
                        cadastrar();
                    }}
                    >
                        <Text style={styles.buttonText}>Cadastrar contato</Text>
                    </TouchableOpacity>
                </View>
                    
                {
                    contato.lenght > 0 ?
                        <FlatList
                            style={styles.lista}
                            data={contato}
                            keyExtractor={((item, index) => "Index do item" + index)}
                            renderItem={({ item }) => (
                                <View style={styles.campolista}>
                                    <View style={styles.campoconteudo}>
                                        <Text style={styles.campoconteudo}>Nome: {item.nome}</Text>
                                        <Text style={styles.campoconteudo}>Telefone: {item.telefone}</Text>
                                    </View >
                                    <View style={styles.campoconteudo}>
                                        <TouchableOpacity onPress={() => deletarContato(item)}>
                                            <Icon name="trash" size={15} color={'#292929f3'} />
                                        </TouchableOpacity>
                                    </View >
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false} /> :
                        <Text style={styles.emptyList}>Nenhum contato cadastrado!</Text>
                }
            </View>

        </ScrollView>
    )
}
