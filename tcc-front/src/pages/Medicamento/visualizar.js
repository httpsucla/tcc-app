import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default function VisualizarMedicamento() {

    const route = useRoute();
    const { item } = route.params;
    const dataFormat = moment(item.data_inicial).format('DD/MM/YYYY');
    const hourFormat = moment(item.horario, 'HH:mm:ss').format('HH:mm');
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}
        colors={['#ffffff', '#569099']}
        style={styles.container}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>Nome: {item.nome}
                    </Text>
                    <Text style={styles.input}>Data de inicio: {dataFormat}
                    </Text>
                    <Text style={styles.input}>Horário: {hourFormat}
                    </Text>
                    <Text style={styles.input}>Intervalo: tomar a cada {item.intervalo} horas
                    </Text>
                    <Text style={styles.input}>Dosagem: {item.dosagem} remédios por abertura
                    </Text>
                    <Text style={styles.input}>Quantidade: {item.qtde} comprimidos
                    </Text>
                    <Text style={styles.input}>Quantidade de dias: {item.qtde_dias}
                    </Text>
                </View>

            </LinearGradient>
        </ScrollView>
    )
}
