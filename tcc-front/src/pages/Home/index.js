import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import styles from './style';
import Database from '../../services/database';
import { BarChart, LineChart } from 'react-native-chart-kit'
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {

    useEffect(() => {
        Database.leftJoinGavetaMedicamento((gavetas) => {
            setGavetas(gavetas);
        });

        Database.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos);
        });

        Database.getHistorico((historico) => {
            console.log(historico);
            setHistorico(historico);
        });

        proxMed();
        lastMed();
        sequencia();
        errosComet();
        graficoSemana();
    }, []);

    const [medicamentos, setMedicamentos] = useState([]);
    const [historico, setHistorico] = useState([]);
    const [gavetas, setGavetas] = useState([]);
    const [listaMed, setListaMed] = useState([]);
    const [lastMedicamento, setLastMedicamento] = useState([]);
    const [erros, setErros] = useState(0);
    const [seqc, setSeqc] = useState(0);
    const [semana, setSemana] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const carregarDashboard = useCallback(() => {
        Database.leftJoinGavetaMedicamento((gavetas) => {
            setGavetas(gavetas);
        });

        Database.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos);
        });

        Database.getHistorico((historico) => {
            setHistorico(historico);
        });
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const fetchData = () => {
        carregarDashboard();
        proxMed();
        lastMed();
        sequencia();
        errosComet();
        graficoSemana();
        setRefreshing(false);
    }

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
    ];

    const data = {
        labels: [g[0].nome, g[1].nome, g[2].nome, g[3].nome],
        datasets: [
            {
                data: [g[0].qtde, g[1].qtde, g[2].qtde, g[3].qtde]
            }
        ]
    };

    const s = [
        semana[0] ? semana[0] : 0,
        semana[1] ? semana[1] : 0,
        semana[2] ? semana[2] : 0,
        semana[3] ? semana[3] : 0,
        semana[4] ? semana[4] : 0,
        semana[5] ? semana[5] : 0,
        semana[6] ? semana[6] : 0,
    ];

    const dias = {
        labels: ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"],
        datasets: [
            {
                data: [s[0], s[1], s[2], s[3], s[4], s[5], s[6]],
                strokeWidth: 2,
            }
        ]
    };

    const hist = [ // só trocar hist pela tabela de historico e fazer join para puxar nome
        { id_gaveta: 1, id_medicamento: 1, dt_prevista: '2023-06-01 10:00', dt_abertura: '2023-06-01 10:02', situacao: 1 },
        { id_gaveta: 1, id_medicamento: 1, dt_prevista: '2023-06-02 10:00', dt_abertura: '2023-06-02 10:45', situacao: 1 },
        { id_gaveta: 1, id_medicamento: 1, dt_prevista: '2023-06-03 10:00', dt_abertura: '', situacao: 0 },
        { id_gaveta: 2, id_medicamento: 2, dt_prevista: '2023-06-09 08:00', dt_abertura: '2023-06-09 08:05', situacao: 1 },
        { id_gaveta: 2, id_medicamento: 2, dt_prevista: '2023-06-09 16:00', dt_abertura: '2023-06-01 16:10', situacao: 1 },
        { id_gaveta: 3, id_medicamento: 3, dt_prevista: '2023-06-01 00:00', dt_abertura: '2023-06-01 00:02', situacao: 1 },
        { id_gaveta: 3, id_medicamento: 3, dt_prevista: '2023-06-02 00:00', dt_abertura: '2023-06-02 00:11', situacao: 1 },
        { id_gaveta: 3, id_medicamento: 3, dt_prevista: '2023-06-03 00:00', dt_abertura: '', situacao: 0 },
        { id_gaveta: 4, id_medicamento: 4, dt_prevista: '2023-06-01 14:00', dt_abertura: '2023-06-01 14:00', situacao: 1 },
        { id_gaveta: 4, id_medicamento: 4, dt_prevista: '2023-06-01 18:00', dt_abertura: '2023-06-01 18:10', situacao: 1 },
        { id_gaveta: 4, id_medicamento: 4, dt_prevista: '2023-06-01 22:00', dt_abertura: '2023-06-01 22:01', situacao: 1 },
        { id_gaveta: 1, id_medicamento: 14, dt_prevista: '2023-06-02 06:00', dt_abertura: '2023-06-01 06:00', situacao: 1 },
        { id_gaveta: 1, id_medicamento: 14, dt_prevista: '2023-06-07 18:00', dt_abertura: '2023-06-01 18:20', situacao: 1 },
        { id_gaveta: 1, id_medicamento: 14, dt_prevista: '2023-06-02 06:00', dt_abertura: '', situacao: 0 },
    ];

    const lastMed = () => { // SE DER ERRO TROCAR HISTORICO POR HIST
        console.log(historico)
        hist.sort((a, b) => {
            if (a.dt_abertura === '' && b.dt_abertura !== '') {
                return 1;
            } else if (a.dt_abertura !== '' && b.dt_abertura === '') {
                return -1;
            } else if (a.dt_abertura === '' && b.dt_abertura === '') {
                return 0;
            } else {
                return new Date(b.dt_abertura) - new Date(a.dt_abertura);
            }
        });
        setLastMedicamento(hist[0]);
    };

    const sequencia = () => {
        let count = 0;

        hist.sort((a, b) => new Date(b.dt_prevista) - new Date(a.dt_prevista));

        for (let i = 0; i < hist.length; i++) {
            const h = hist[i];
            const now = new Date();
            const dataPrev = new Date(h.dt_prevista);
            if (dataPrev < now) {
                if (h.dt_abertura === '') {
                    break;
                }
                count++;
            }
        }
        setSeqc(count);

    };

    const errosComet = () => {
        let error = 0;

        hist.forEach((h) => {
            const now = new Date();
            const dataPrev = new Date(h.dt_prevista);
            if (dataPrev < now) {
                if (h.situacao == 0) {
                    error++;
                };
            }

        });
        setErros(error);
    };

    const graficoSemana = () => {
        let dia = null;
        let dom = 0;
        let seg = 0;
        let ter = 0;
        let qua = 0;
        let qui = 0;
        let sex = 0;
        let sab = 0;

        const hoje = new Date();
        const inicioSemana = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - hoje.getDay() + 1);
        const fimSemana = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - hoje.getDay() + 7);

        hist.forEach(h => {
            dia = new Date(h.dt_prevista).getDay();
            dataPrev = new Date(h.dt_prevista);

            if (dataPrev >= inicioSemana && dataPrev <= fimSemana) {
                switch (dia) {
                    case 0:
                        dom++;
                        break;
                    case 1:
                        seg++;
                        break;
                    case 2:
                        ter++;
                        break;
                    case 3:
                        qua++;
                        break;
                    case 4:
                        qui++;
                        break;
                    case 5:
                        sex++
                        break;
                    case 6:
                        sab++
                        break;
                    default:
                        break;
                }
            }
        });
        const semanal = [dom, seg, ter, qua, qui, sex, sab];
        setSemana(semanal);
    };

    const proxMed = () => {

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
            console.log(apenasHorario)
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
            setListaMed(lastMed);

            if(lastMed[0].DataAtual == now) {
                medicamento.qtde--;
            }
        });
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 1]}
                colors={['#ffffff', '#569099']}
                style={styles.container}
            >
                <View style={styles.boxHour}>
                    <Text style={styles.boxHourText}>Próximo horário às {listaMed[0] ? listaMed[0].Horario : ''}</Text>
                </View>

                <View style={styles.boxesMedicamento}>
                    <View style={[styles.box, styles.boxData]}>
                        <View style={styles.boxContent}>
                            <Text style={styles.valorContent}>{seqc}</Text>
                            <Text style={styles.diasContent}> dias</Text>
                        </View>
                        <Text style={styles.descricao}>Sequência de dias</Text>
                    </View>
                    <View style={[styles.box, styles.boxData]}>
                        <View style={styles.boxContent}>
                            <Text style={styles.valorContent}>{erros}</Text>
                            {/* <Text style={styles.diasContent}> dias</Text> */}
                        </View>
                        <Text style={styles.descricao}>Erros cometidos</Text>
                    </View>
                </View>
                <View style={styles.boxesMedicamento}>
                    <View style={[styles.box, styles.boxNome]}>
                        <View style={styles.boxContent}>
                            <Text style={styles.valorContent}>{lastMedicamento.id_medicamento}</Text>
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
                                backgroundGradientFrom: 'rgb(255, 255, 255)',
                                backgroundGradientTo: 'rgb(255, 255, 255)',
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0,
                                decimalPlaces: 0,
                                color: (opacity = 0) => `rgba(86, 144, 153, ${opacity})`,
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
                            width={315}
                            height={200}
                            fromZero={true}
                            yAxisInterval={7}
                            chartConfig={{
                                backgroundColor: "transparent",
                                backgroundGradientFrom: 'rgb(255, 255, 255)',
                                backgroundGradientTo: 'rgb(255, 255, 255)',
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0,
                                decimalPlaces: 0,
                                color: (opacity = 0) => `rgba(86, 144, 153, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "1",
                                    stroke: "#569099"
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

