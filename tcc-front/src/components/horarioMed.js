import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import DatabaseManager from '../services/testDb';
import moment from 'moment';

export default function HorarioMed({ item }) {

    const [medicamentos, setMedicamentos] = useState([]);
    const [gavetas, setGavetas] = useState([]);
    const [listaMed, setListaMed] = useState([]);

    useEffect(() => {
        DatabaseManager.getMedicamentos((medicamentos) => {
            setMedicamentos(medicamentos);
        });
        DatabaseManager.getGavetas((gavetas) => {
            setGavetas(gavetas);
        })

        const lastMed = [];
        let totalArray = 0;

        medicamentos.forEach((medicamento) => {
            const dateObj = new Date(medicamento.data_inicial) // transforma a data inicial em Date
            const timeObj = new Date(`1970-01-01T${medicamento.horario}000Z`); // transforma o horario inicial em date
            const now = new Date();
            const agora = moment(now);

            const mediaHoras = 24 / (parseInt(medicamento.qtde) / parseInt(medicamento.qtde_dias)); // calcula de quanto em quanto tempo deve-se engerir o medicamento
            let horarioProximo = moment(new Date(dateObj.setHours(timeObj.getHours(), timeObj.getMinutes(), timeObj.getSeconds())));

            for (let i = 0; i < medicamento.qtde; i++) {
                if (horarioProximo.isBefore(agora)) {
                    lastMed.push({ // cria objeto com o horario mais proximo de cada medicamento 
                        id: totalArray + i,
                        title: medicamento.nome,
                        dataAtual: moment.utc(horarioProximo),
                        horario: String(moment.utc(horarioProximo).format("DD/MM/YY HH:mm")),
                        abertura: ""
                    });
                    horarioProximo.add(mediaHoras, 'hours'); // calcula os futuros horarios que o usuario deverá tomar o medicamento
                }
            }
            totalArray = lastMed.length;


        });

        /*  const compararDatas = (a, b) => {
              return new Date(a.dataAtual) - new Date(b.dataAtual);
          };
  
          // ordenar o array de objetos pela data e hora
          lastMed.sort(compararDatas); */

        lastMed.sort((a, b) => { // ordena a lista por ordem crescente de data
            const dataA = new Date(a.dataAtual);
            const dataB = new Date(b.dataAtual);
            if (dataA < dataB) {
                return -1;
            } else if (dataA > dataB) {
                return 1;
            } else {
                return 0;
            }
        });
        
        setListaMed(lastMed);
        console.log(lastMed);

    }, []);

    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Medicamento</DataTable.Title>
                    <DataTable.Title>Horário previsto</DataTable.Title>
                    <DataTable.Title>Abertura gaveta</DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {
                        listaMed.map(item => {
                            return (
                                <DataTable.Row key={item.id}>
                                    <DataTable.Cell> {item.title}  </DataTable.Cell>
                                    <DataTable.Cell> {item.horario} </DataTable.Cell>
                                    <DataTable.Cell> {item.abertura} </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                </ScrollView>
            </DataTable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50
    }
});