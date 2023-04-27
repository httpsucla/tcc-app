import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Database from '../../services/database';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

export default function Contatos({ route, navigation }) {

    const { item } = route.params ? route.params : [];
    const [contato, setContato] = useState([])

    useEffect(() => {
        Database.getContatos((contato) => {
            setContato(contato);
        })
        console.log(contato)
    }, []);

    cadastrarInutil = () => {
        const data = {
            nome: contato.nome,
            telefone: contato.telefone
        };

        Database.addContato(data, () => {
            Alert.alert('Sucesso', 'Contato salvo com sucesso.');
            navigation.navigate("Configuracao");
        });

    };

    cadastrar = () => {
        const data = {
            nome: contato.nome,
            telefone: contato.telefone,
            id: 1
        };

        Database.updateContato(data, () => {
            Alert.alert('Sucesso', 'Contato salvo com sucesso.');
            navigation.navigate("Configuracao", { item: data });
        });

        console.log("cadastroo")
        console.log(data)

    };
    const deletarContato = () => {
        Alert.alert(
            "Atenção",
            'Você tem certeza que deseja excluir o contato: ' + '?',
            [{
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    Database.deleteContato();
                    Alert.alert('Sucesso', 'Contato ' + ' removido com sucesso.');
                    navigation.navigate("Configuracao");
                }
            }],
            { cancelable: false }
        );
    }

    return (
            <View style={styles.container}>
                <Text style={styles.title}> Cadastrar Contato</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={contato.nome ? contato.nome : ''}
                        onChangeText={nome => setContato({ ...contato, nome })}
                        returnKeyType='done'
                        clearButtonMode="always"
                    />
                    <TextInputMask
                        style={styles.input}
                        placeholder="Telefone"
                        type={'cel-phone'}
                        clearButtonMode="always"
                        value={contato.telefone? contato.telefone : ''}
                        onChangeText={telefone => setContato({ ...contato, telefone })}
                        maxLenght={30}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={cadastrar}
                    >
                        <Text style={styles.buttonText}>Cadastrar contato</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={deletarContato}>
                        <Text>DELETAAAAAAAAAAAAAR</Text>
                    </TouchableOpacity>
                </View>
                {
                    contato != undefined ?
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
    )
}
