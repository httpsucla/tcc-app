import React, { useState, useEffect } from 'react';
import { Text, View, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import Database from '../../services/database';
import { SelectList } from 'react-native-dropdown-select-list';
import { LinearGradient } from 'expo-linear-gradient';
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
    const [filtro, setFiltro] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    var data = [];

    useEffect(() => {
        Database.getMedicamentos((medicamentos) => {
            for (let i = 0; i < medicamentos.length; i++) {
                data = medicamentos.map(m => ({
                    key: m.id,
                    value: m.nome
                }));
            }
            setMedicamentos(data);
        });
    }, []);

    const showDatepicker1 = () => {
        setShowC1(true);
    };

    const showDatepicker2 = () => {
        setShowC2(true);
    };

    const ChangeIni = (event, selectedDate) => {
        var _date = new Date(selectedDate);
        var _dateStr = _date.toLocaleDateString();
        setShowC1(Platform.OS === 'ios');
        setDataStart(_date);
        setDataStartView(_dateStr);
    }
        
        
    const ChangeFim = (event, selectedDate) => {
        var _date = new Date(selectedDate);
        var _dateStr = _date.toLocaleDateString();
        setShowC2(Platform.OS === 'ios');
        setDataEnd(_date);
        setDataEndView(_dateStr);

    };

    verifica = () => {
        if (selected != "" && isEnabled != false) {
            navigation.replace('Historico', {
                medId: selected,
                DataIni: dataStartView,
                DataFim: dataEndView,
                DataDefault: isEnabled,
                filtro
            });

        } else if (selected != "" && dataStartView != "" && dataEndView != "") {
            if (dataStart < dataEnd){
                navigation.replace('Historico', {
                    medId: selected,
                    DataIni: dataStartView,
                    DataFim: dataEndView,
                    DataDefault: isEnabled,
                    filtro
                });
            } else {
                Alert.alert("Atenção", "Selecione uma data válida!");                
            }

        }else {
            Alert.alert("Atenção", "Preencha todos os campos!");
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                locations={[0.5, 0.9]}
                colors={['#A62A5C', '#6A2597']}
                style={styles.containerFiltro}
            >
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

                <View style={styles.SwitchStyle}>
                    <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                    />
                    <Text style={styles.SwitchText}>Últimos 30 dias</Text>
                </View>


                {isEnabled == false && (
                    <View>
                    <Text style={styles.textFiltro}>Data inicial</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.calendario, styles.fontFilter]} onPress={showDatepicker1}>
                            <Icon name="calendar" size={18} color={'black'} />
                            <Text>   </Text>
                            <Text>
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
                            <Text>   </Text>
                            <Text>
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
                </View>
                )}
                
                
                {isEnabled == true && (
                    <View pointerEvents="none" style={{opacity: 0.2}}> 
                
                    <Text style={styles.textFiltro}>Data inicial</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.calendario, styles.fontFilter]} onPress={showDatepicker1}>
                            <Icon name="calendar" size={18} color={'black'} />
                            <Text>   </Text>
                            <Text>
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
                            <Text>   </Text>
                            <Text>
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

                </View>
                )}

                    <TouchableOpacity style={styles.buttonFiltro}
                        onPress={verifica}>
                        <Text style={styles.buttonText}>Gerar relatório</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}