import React, { useState } from 'react';
import { View, Modal, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CalendarList, Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';
import Database from '../../../../services/database';

export default function CalendarioComponent() {

    const [selectedDayInfo, setSelectedDayInfo] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [medicamentos, setMedicamentos] = useState([]);


    const handleDayPress = (day) => {
        Database.getMedicamentos((medicamentos) => {
            const medicamentosFiltrados = [];
            for (let i = 0; i < medicamentos.length; i++) {
                const medicamento = medicamentos[i];
                const dataInicial = new Date(medicamento.data_inicial);
                dataInicial.setHours(0,0,0,0);
                const dataFinal = new Date(dataInicial.getTime() + medicamento.qtde * 86400000); // Multiplica por 86400000 para converter de dias para milissegundos
                const diaClicado = new Date(day.timestamp);
                if ((dataFinal >= diaClicado) && (dataInicial <= diaClicado)) {
                    medicamentosFiltrados.push({
                        id: medicamento.id,
                        title: medicamento.nome,
                        DataInicial: `Data de inicio: ${new Date(medicamento.data_inicial).toLocaleDateString('pt-br')}`,
                        Horario: `Horario: ${medicamento.horario}`,
                    });
                }
            }
            setSelectedDayInfo({
                date: day.dateString,
                events: medicamentosFiltrados,
            });
            showModal();
            setMedicamentos(medicamentosFiltrados);
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => showModal(item)}>
            <View>
                <Text style={styles.flatlistItemText}>{item.title}</Text>
                <Text style={styles.modalContent}>{item.DataInicial}</Text>
                <Text style={styles.modalContent}>{item.Horario}</Text>
            </View>
        </TouchableOpacity>
    );

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0.5, 0.9]}
                    colors={['#A62A5C', '#6A2597']}
                    style={styles.container}
                >
       
                <Calendar
                    locale={'pt-br'}
                    pastScrollRange={1}
                    hideExtraDays={true}
                    futureScrollRange={1}
                    onDayPress={handleDayPress}
                />

                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={hideModal}
                    transparent>
                    <TouchableWithoutFeedback onPress={hideModal}>
                        <View style={styles.container}>
                            <View style={styles.modalView}>
                                <View style={styles.indicator} />
                                <Text style={styles.modalTitle}> Medicamentos a serem tomados</Text>
                                <FlatList
                                    data={selectedDayInfo.events}
                                    renderItem={renderItem}
                                    contentContainerStyle={styles.flatlistContentContainer}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
          
        </LinearGradient>
    );
}