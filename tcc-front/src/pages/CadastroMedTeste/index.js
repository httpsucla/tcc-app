import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import DatabaseManager from '../../services/testDb';

export default function CadastroMedTeste({ navigation }) {

    const [medicamentos, setMedicamentos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        console.log("Teste");
        DatabaseManager.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos)
        });
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000)

        DatabaseManager.getMedicamentos((medicamentos) => {
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
                    DatabaseManager.deleteMedicamento(item, []);
                    Alert.alert('Sucesso', 'Medicamento ' + item.nome + ' removido com sucesso.');
                }
            }],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos os medicamentos</Text>
            <TouchableOpacity style={styles.buttonLista} onPress={() =>
                navigation.navigate("Cadastro Medicamento")}>
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
                                            navigation.navigate("Visualizacao", {})}>
                                        <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.nome}</Text>
                                    </TouchableOpacity>
                                </View >
                                <View style={styles.campoicone}>
                                    <View style={styles.componentenumero}>
                                        <TouchableOpacity onPress={() =>
                                            navigation.navigate("Editar", {})}>
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

