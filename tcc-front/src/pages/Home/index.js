import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import Database from '../../services/database';
import { BarChart, LineChart } from 'react-native-chart-kit'
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
export default function Home() {

    useEffect(() => {
        Database.joinGavetaMedicamento((gavetas) => {
            setGavetas(gavetas);
            //  console.log(gavetas)
        });

        Database.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos);
        });
        ultimoMed();
    }, []);

    const [medicamentos, setMedicamentos] = useState([]);
    const [gavetas, setGavetas] = useState([]);
    const [listaMed, setListaMed] = useState([]);

    const g = [
        gavetas[0] ?
            { nome: 'Gaveta ' + (gavetas[0].id + 1), medicamento: gavetas[0].nome, qtde: gavetas[0].qtde }
            : { nome: 'Gaveta 1', medicamento: '', qtde: 0 },
        gavetas[1] ?
            { nome: 'Gaveta ' + (gavetas[1].id + 1), medicamento: gavetas[1].nome, qtde: gavetas[1].qtde }
            : { nome: 'Gaveta 2', medicamento: '', qtde: 0 },
        gavetas[2] ?
            { nome: 'Gaveta ' + (gavetas[2].id + 1), medicamento: gavetas[2].nome, qtde: gavetas[2].qtde }
            : { nome: 'Gaveta 3', medicamento: '', qtde: 0 },
        gavetas[3] ?
            { nome: 'Gaveta ' + (gavetas[3].id + 1), medicamento: gavetas[3].nome, qtde: gavetas[3].qtde }
            : { nome: 'Gaveta 4', medicamento: '', qtde: 0 },
    ]

    const data = {
        labels: [g[0].nome, g[1].nome, g[2].nome, g[3].nome],
        datasets: [
            {
                data: [g[0].qtde, g[1].qtde, g[2].qtde, g[3].qtde]
            }
        ]
    }

    const dias = {
        labels: ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"],
        datasets: [
            {
                data: [3, 4, 3, 5, 3, 3, 2],
                strokeWidth: 2,
            }
        ]
    }

    const ultimoMed = () => {

        const lastMed = [];
        let apenasHorario = [];

        medicamentos.forEach((medicamento) => {

            const dateObj = new Date(medicamento.data_inicial)
            const timeObj = new Date(`1970-01-01T${medicamento.horario}000Z`);
            const now = new Date();
            const hourAux = moment.utc(timeObj).format('HH');
            const minuteAux = moment.utc(timeObj).format('mm');
            const combinedDate = new Date(dateObj.setHours(timeObj.getHours(), timeObj.getMinutes(), timeObj.getSeconds()));
            const dataInicio = moment.utc(combinedDate);
            dataInicio.add(1, 'days');
            const agora = moment();
            const agora2 = agora.subtract(3, 'hours')
            const diasDecorridos = agora.diff(dataInicio, 'days');
            const diasFaltantes = medicamento.qtde_dias - diasDecorridos;
            const qtdeDia = parseInt(medicamento.qtde) / parseInt(medicamento.qtde_dias);
            const aCada = 24 / qtdeDia;

            let horarioProximo = moment.utc(new Date(now.setUTCHours(0, 0, 0)));

            let horario = moment(new Date(now.setUTCHours(Number(hourAux), Number(minuteAux), timeObj.getSeconds())));

            for (let i = 0; i < qtdeDia; i++) {
                apenasHorario.push(moment.utc(horario).format('HH:mm'))
                horario.add(aCada, 'hours');
            }

            apenasHorario.sort((a, b) => {
                const dataA = a;
                const dataB = b;
                if (dataA < dataB) {
                    return -1;
                } else if (dataA > dataB) {
                    return 1;
                } else {
                    return 0;
                }
            });

            const hour1 = apenasHorario[0];
            const hour2 = hour1[0] + hour1[1];
            const minute1 = apenasHorario[0];
            const minute2 = minute1[3] + minute1[4];

            horario = moment(new Date(now.setUTCHours(Number(hour2), Number(minute2), timeObj.getSeconds())));
            apenasHorario = [];

            for (let j = 0; j < qtdeDia; j++) {
                while (horario.isBefore(agora2)) {
                    horario.add(aCada, 'hours');
                }
            }

            const horarioFormat = moment.utc(horario).format('HH:mm');

            horarioProximo.add(horarioFormat, 'hours');
            if (horarioProximo.isSameOrBefore(agora2))
                horarioProximo.add(1, 'days');

            if (horarioProximo.isSameOrAfter(agora2) && diasFaltantes > 0) {
                lastMed.push({
                    id: medicamento.id,
                    title: medicamento.nome,
                    DataAtual: moment(horarioProximo),
                    Horario: String(moment.utc(horarioProximo).format('HH:mm')),
                });
            }

            lastMed.sort((a, b) => {
                const dataA = new Date(a.DataAtual);
                const dataB = new Date(b.DataAtual);
                if (dataA < dataB) {
                    return -1;
                } else if (dataA > dataB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            console.log(lastMed)
            setListaMed(lastMed);
        });
    }

    return (
        <ScrollView>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0.5, 0.9]}
                    colors={['#A62A5C', '#6A2597']}
                    style={styles.container}
                >
                    <TouchableOpacity style={styles.boxHour} onPress={ultimoMed}>
                        <View >
                            <Text style={styles.boxHourText}>Próximo horário às {listaMed[0] ? listaMed[0].Horario : ''}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.boxesMedicamento}>
                        <View style={[styles.box, styles.boxData]}>
                            <View style={styles.boxContent}>
                                <Text style={styles.valorContent}>22</Text>
                                <Text style={styles.diasContent}> dias</Text>
                            </View>
                            <Text style={styles.descricao}>Sequência de dias</Text>
                        </View>
                        <View style={[styles.box, styles.boxData]}>
                            <View style={styles.boxContent}>
                                <Text style={styles.valorContent}>0</Text>
                                <Text style={styles.diasContent}> dias</Text>
                            </View>
                            <Text style={styles.descricao}>Erros cometidos</Text>
                        </View>
                    </View>
                    <View style={styles.boxesMedicamento}>
                        <View style={[styles.box, styles.boxNome]}>
                            <View style={styles.boxContent}>
                                <Text style={styles.valorContent}>{listaMed.title} Fluoxitina 50mg</Text>
                            </View>
                            <Text style={styles.descricao}>Último medicamento tomado</Text>
                        </View>
                    </View>
                    <View style={styles.boxesMedicamento}>
                        <View style={[styles.box, styles.boxGrafico]}>
                            <BarChart
                                style={{
                                    marginVertical: 0,
                                    marginLeft: -10
                                }}
                                data={data}
                                width={315}
                                height={200}
                                chartConfig={{
                                    backgroundColor: 'transparent',
                                    backgroundGradientFrom: 'rgba(255, 255, 255)',
                                    backgroundGradientTo: 'rgba(255, 255, 255)',
                                    backgroundGradientToOpacity: 1,
                                    decimalPlaces: 0,
                                    color: (opacity = 0) => `rgba(65, 75, 178, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    barPercentage: 1,

                                }}
                                withHorizontalLabels={true}
                                fromZero={true}
                                withCustomBarColorFromData={false}
                                flatColor={true}
                                withInnerLines={true}
                                showBarTops={true}
                                showValuesOnTopOfBars={true}
                            />

                            <Text style={styles.descricao}>Quantidade remédios por gaveta</Text>
                        </View>
                    </View>
                    <View style={styles.boxesMedicamento}>
                        <View style={[styles.box, styles.boxGrafico]}>
                            <LineChart
                                data={dias}
                                transparent={true}
                                width={300} // from react-native
                                height={200}
                                fromZero={true}
                                yAxisInterval={7} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "transparent",
                                    backgroundGradientFrom: '#ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 0) => `rgba(65, 75, 178, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "1",
                                        stroke: "black"
                                    }
                                }}
                                style={{
                                    marginVertical: 0,
                                    borderRadius: 0,
                                    paddingRight: 24
                                }}
                            />

                            <Text style={styles.descricao}>Quantidade remédios por semana</Text>
                        </View>
                    </View>
                </LinearGradient>
        </ScrollView>
    );
}

