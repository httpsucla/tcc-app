import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import Database from '../../services/database';

export default function Medicamentos({ route, navigation }) {

    const [medicamentos, setMedicamentos] = useState([]);
    const [gavetas, setGavetas] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        Database.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos)
        });

        Database.getGavetas((gavetas) => {
            setGavetas(gavetas)
        });
    }, [route]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000)

        Database.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos)
        });
    }, []);

    const deletarMedicamento = (item) => {
        Alert.alert(
            "Atenção",
            'Você tem certeza que deseja excluir o medicamento: ' + item.nome + '?',
            [{
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    for (let i = 0; i < gavetas.length; i++) {
                        if (item.id == gavetas[i].id_medicamento) {
                            const gaveta = {
                                id_medicamento: '',
                                datahora_abertura: '',
                                is_ocupado: false,
                                is_atrasado: '',
                                id: gavetas[i].id,
                            };
                    
                            Database.updateGaveta(gaveta, () => {
                                console.log("foi");
                            })
                            Database.deleteMedicamento(item.id);
                            Alert.alert('Sucesso', 'Medicamento ' + item.nome + ' foi removido com sucesso. Gaveta ' + (gavetas[i].id+1) + ' está vazia agora!');
                            break;
                            
                        } else if(item.id != gavetas[i].id_medicamento && i == 3) {
                            Database.deleteMedicamento(item.id);
                            Alert.alert('Sucesso', 'Medicamento ' + item.nome + ' removido com sucesso.');
                            break;
                        }
                    }


                }
            }],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos os medicamentos</Text>
            <TouchableOpacity style={styles.buttonLista} onPress={() =>
                navigation.navigate("Cadastrar Medicamento")}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            {
                medicamentos.length > 0 ?
                    <FlatList
                        style={styles.lista}
                        data={medicamentos}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        keyExtractor={((item, index) => "Index do item" + index)}
                        // CRIAR COMPONENTE AQUI PRA RENDERITEM CHAMAR O COMPONENTE COM O STYLE E LISTA
                        renderItem={({ item }) => (
                            <View style={styles.campolista}>
                                <View style={styles.campoconteudo}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Visualizar Medicamento", { item: item })}>
                                        <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.nome}</Text>
                                    </TouchableOpacity>
                                </View >
                                <View style={styles.campoicone}>
                                    <View style={styles.componentenumero}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate("Editar Medicamento", { med: item })}>
                                            <Icon name="edit" size={18} color={'#292929f3'} />
                                        </TouchableOpacity>
                                    </View >
                                    <View style={styles.componentenumero}>
                                        <TouchableOpacity onPress={() => deletarMedicamento(item)}>
                                            <Icon name="trash" size={18} color={'#292929f3'} />
                                        </TouchableOpacity>
                                    </View >
                                </View>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    /> :
                    <Text style={styles.emptyList}>Não há medicamentos cadastrados no momento!</Text>
            }
        </View>
    )
}

