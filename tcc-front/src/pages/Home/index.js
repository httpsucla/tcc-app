import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './style';
import Database from '../../services/database';
import { BarChart, LineChart } from 'react-native-chart-kit'


class Home extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            medNome: 'Dramin',
            gaveta: [1, 2, 3, 4]
        }

    }

    render() {

        const fill = '#414BB2'
        const data = {
            labels: ["Gaveta 1", "Gaveta 2", "Gaveta 3", "Gaveta 4"],
            datasets: [
                {
                    data: [18, 3, 0, 10]
                }
            ]
        }
        const dias = {
            labels: ["Dom","Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"],
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
                                <Text style={styles.valorContent}>{this.state.medNome}</Text>
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
                                width={300}
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
                                width={300}
                                height={200}
                                fromZero={true}
                                chartConfig={{
                                    backgroundColor: 'transparent',
                                    backgroundGradientFrom: '#ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                style={{
                                    marginVertical: 0,
                                    marginLeft: -10
                                }}
                            />

                            <Text style={styles.descricao}>Quantidade remédios por semana</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default Home;

