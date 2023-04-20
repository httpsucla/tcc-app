import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import DatabaseManager from '../../services/testDb';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Filtro({ navigation }) {

    const [medicamentos, setMedicamentos] = useState([]);
    const [dataStart, setDataStart] = useState(new Date());
    const [dataEnd, setDataEnd] = useState(new Date());
    const [selected, setSelected] = useState("");
    const [showC1, setShowC1] = useState(false);
    const [showC2, setShowC2] = useState(false);
    const [dataStartView, setDataStartView] = useState('');
    const [dataEndView, setDataEndView] = useState('');
    var data = [];

    useEffect(() => {
        DatabaseManager.getMedicamentos((medicamentos) => {
            for (let i = 0; i < medicamentos.length; i++) {
                data = medicamentos.map(m => ({
                    key: m.id,
                    value: m.nome
                }));
            }
            setMedicamentos(data)
        });
    }, []);

    const showDatepicker1 = () => {
        setShowC1(true);
    };

    const showDatepicker2 = () => {
        setShowC2(true);
    };

    const ChangeIni = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowC1(Platform.OS === 'ios');
        setDataStart(currentDate);
        setDataStartView(dataStart.toLocaleDateString());
    };

    const ChangeFim = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowC2(Platform.OS === 'ios')
        setDataEnd(currentDate);
        setDataEndView(dataEnd.toLocaleDateString());
    };

    verifica = () => {
        if (selected != '' || dataStartView != 'Selecione' || dataEndView != 'Selecione') {
            navigation.replace('Historico', {
                medId: selected,
                DataIni: dataStartView,
                DataFim: dataEndView
            });
        } else {
            Alert.alert("Atenção", "Preencha todos os campos!");
        }
        console.log(medicamentos)
    }

    return (
        <ScrollView>
            <View style={styles.containerFiltro}>
                <Text style={styles.titleFiltro}>Filtrar</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.textFiltro}>Medicamento</Text>
                    <SelectList
                        data={medicamentos}
                        style={styles.inputCampo}
                        placeholder={"Selecione o medicamento"}
                        notFoundText="Nenhum medicamento encontrado"
                        setSelected={setSelected}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.label}
                        save="key"
                    />
                    <Text style={styles.textFiltro}>Data início</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.calendario, styles.fontFilter]} onPress={showDatepicker1}>
                            <Icon name="calendar" size={18} color={'black'} />
                            <Text style={styles.textFilter}>
                                {dataStartView ? dataStartView : "Selecione"}
                            </Text>
                        </TouchableOpacity>
                        {
                            showC1 && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dataStart}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={ChangeIni}
                                    display="default"
                                />
                            )
                        }
                    </View>
                    <Text style={styles.textFiltro}>Data final</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.calendario, styles.fontFilter]} onPress={showDatepicker2}>
                            <Icon name="calendar" size={18} color={'black'} />
                            <Text style={styles.textFilter}>
                                {dataEndView ? dataEndView : "Selecione"}
                            </Text>
                        </TouchableOpacity>
                        {
                            showC2 && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dataEnd}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={ChangeFim}
                                />
                            )}
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={verifica}>
                        <Text style={styles.buttonText}>Gerar relatório</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}