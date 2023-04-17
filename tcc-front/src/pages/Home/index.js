import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './style';
import DatabaseManager from '../../services/testDb';
import { BarChart, LineChart } from 'react-native-chart-kit'


export default function Home() {

    const [medicamentos, setMedicamentos] = useState([]);
    const [gavetas, setGavetas] = useState([]);

    const g = [
      //  { nome: 'Gaveta ' + (gavetas[0].id+1), medicamento: medicamentos[0].nome_medicamento, qtde: medicamentos[0].qtde_medicamento },
        { nome: 'Gaveta 1', medicamento: 'Remedio teste 1', qtde: 18 },
        { nome: 'Gaveta 2', medicamento: 'Remedio teste 2', qtde: 3 },
        { nome: 'Gaveta 3', medicamento: 'Remedio teste 3', qtde: null },
        { nome: 'Gaveta 4', medicamento: 'Remedio teste 4', qtde: 4 },
    ]

    useEffect(() => {

        DatabaseManager.getGavetas((gavetas) => {
            setGavetas(gavetas);
        });
        
        console.log("seila");

        DatabaseManager.joinGavetaMedicamento((medicamentos) =>{
            setMedicamentos(medicamentos);
        });
        console.log("embaixo")
        console.log(medicamentos);
    }, []);

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

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.boxHour}>
                    <Text style={styles.boxHourText}>Próximo horário às 18:00</Text>
                </View>
                <View style={styles.boxesMedicamento}>
                    <View style={[styles.box, styles.boxData]}>
                        <View style={styles.boxContent}>
                            <Text style={styles.valorContent}>20</Text>
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
                            <Text style={styles.valorContent}>{g[0].medicamento}</Text>
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

