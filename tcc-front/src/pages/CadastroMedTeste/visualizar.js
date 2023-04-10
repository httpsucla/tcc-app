import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './style';
import { useRoute } from '@react-navigation/native';

export default function VisualizarMedicamento() {
    
    const route = useRoute();
    const { item } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}> Visualizar Medicamento</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>Nome: {item.nome}
                    </Text>
                    <Text style={styles.input}>Horário: {item.horario}
                    </Text>
                    <Text style={styles.input}>Data de inicio: {new Date(item.data_inicial).toLocaleDateString('pt-br')}
                    </Text>
                    <Text style={styles.input}>Quantidade: {item.qtde} comprimidos
                    </Text>
                    <Text style={styles.input}>Quantidade de dias: {item.qtde_dias}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}
