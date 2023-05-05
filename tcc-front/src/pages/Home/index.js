import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import Database from '../../services/database';
import { BarChart, LineChart } from 'react-native-chart-kit'
import moment from 'moment';

export default function Home() {

    useEffect(() => {
        Database.joinGavetaMedicamento((gavetas) => {
            setGavetas(gavetas);
            console.log(gavetas)
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


        medicamentos.forEach((medicamento) => {
            const dateObj = new Date(medicamento.data_inicial) // transforma a data inicial em Date
            const timeObj = new Date(`1970-01-01T${medicamento.horario}000Z`); // transforma o horario inicial em date
            const now = new Date();
            const combinedDate = new Date(dateObj.setHours(timeObj.getHours(), timeObj.getMinutes(), timeObj.getSeconds())); // junta a data e o horario em um novo objeto

            const dataInicio = moment.utc(combinedDate); // data inicio do tratamento
            dataInicio.add(1, 'days');
            const agora = moment().format() // momento atual

            const diasDecorridos = agora.diff(dataInicio, 'days'); // quantos dias ja passaram desde o inicio do tratamento
            const diasFaltantes = medicamento.qtde_dias - diasDecorridos; // quantos dias faltam para terminar o tratamento
            const mediaHoras = 24 / (parseInt(medicamento.qtde) / parseInt(medicamento.qtde_dias)); // calcula de quanto em quanto tempo deve-se engerir o medicamento
            const auxHour = moment.utc(new Date(now.setUTCHours(0, 0, 0)));
            let horarioProximo = moment.utc(new Date(auxHour));
            console.log(horarioProximo)
            console.log(agora)
            if(horarioProximo.isBefore(agora)) {
                console.log("é")
            }
         //  while (horarioProximo.isBefore(agora)) {
         //       horarioProximo.add(mediaHoras, 'hours'); 
         //       console.log("// ---- /// ---- //")
         //       console.log(horarioProximo)
         //   } // enquanto o horario do dia for menor que o horario do dia atual, incrementa o horario
            
            if (horarioProximo.isAfter(agora) && diasFaltantes > 0) {
                lastMed.push({ // cria objeto com o horario mais proximo de cada medicamento
                    id: medicamento.id,
                    title: medicamento.nome,
                    DataAtual: moment(horarioProximo),
                    Horario: String(moment.utc(horarioProximo).format('HH:mm')),
                });
            }

            lastMed.sort((a, b) => { // ordena a lista por ordem crescente de data
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
            <View style={styles.container}>
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
                            <Text style={styles.valorContent}>{listaMed.title}</Text>
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
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "1",
                                    stroke: "#414BB2"
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
            </View>


        </ScrollView>
    );
}

