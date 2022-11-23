import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastrar({ navigation }) {

  const [nome, setNome] = useState('');
  const [hour, setHour] = useState('');
  const [qtde, setQtde] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState('');

  const [modeDate, setModeDate] = useState('date');
  const [showCalendar, setShowCalendar] = useState(false);

  const [ledLigado, setLedLigado] = useState(false);
  const [medicamento, setMedicamento] = useState('');

  function handleNomeChange(nome) { setNome(nome) };
  function handleHourChange(hour) { setHour(hour) };
  function handleQtdeChange(qtde) { setQtde(qtde) };
  function handleDateChange(date) { setDate(date) };
  function handleDaysChange(days) { setDays(days) };


  async function handleButtonPress() {
    const drug = { id: new Date().getTime(), nome, hour, qtde: parseInt(qtde), date, days: parseInt(days) };
    const DB = {
      gavetas : [
        drug
      ]
    }
    let savedMedicamento = [];
    const res = await AsyncStorage.getItem('medicamentos');

    if (res)
      savedMedicamento.push(drug);

    await AsyncStorage.setItem('medicamentos', JSON.stringify(savedMedicamento));
    navigation.navigate("Gaveta", drug);
  };

  useEffect(() => {
    requestToArduinoServer();
  }, []);

  const requestToArduinoServer = async () => {
    try {
      const response = await fetch('http://192.168.100.177')

      let json = await response.json();
      setMedicamento(json["medicamento"]);
    } catch (error) {
      console.error(error);
    }
  };

  const requestToTurnOnLight = async () => {
    setLedLigado(true);
    try {
      await fetch('http://192.168.100.177/turnOn')
    } catch (error) {
      console.error(error);
    }
  }

  const requestToTurnOffLight = async () => {
    setLedLigado(false);
    try {
      await fetch('http://192.168.100.177/turnOff')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar medicamento</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            clearButtonMode="always"
            onChangeText={handleNomeChange}
          />
          <TextInputMask
            style={styles.input}
            placeholder="Quantidade"
            keyboardType={'numeric'}
            clearButtonMode="always"
            type={'only-numbers'}
            value={qtde}
            onChangeText={handleQtdeChange}
          />
          <TextInputMask
            style={styles.input}
            placeholder="Horário"
            keyboardType={'numeric'}
            clearButtonMode="always"
            type={'datetime'}
            options={{
              format: 'HH:mm'
            }}
            value={hour}
            onChangeText={handleHourChange}
          />
         <TextInputMask
            style={styles.input}
            placeholder="Data de início"
            clearButtonMode="always"
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={date}
            onChangeText={handleDateChange}
          />
          <TextInputMask
            style={styles.input}
            placeholder="Quantidade de dias"
            keyboardType={'numeric'}
            clearButtonMode="always"
            type={'only-numbers'}
            value={days}
            onChangeText={handleDaysChange}
          />
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          {ledLigado
            ? <TouchableOpacity style={styles.buttonLed} onPress={() => requestToTurnOffLight()}>
              <Text style={{ color: "white" }}>Desligar Luz</Text>
            </TouchableOpacity>
            : <TouchableOpacity style={styles.buttonNight} onPress={() => requestToTurnOnLight()}>
              <Text style={{ color: "white" }}>Ligar Luz</Text>
            </TouchableOpacity>
          }
          <Text style={styles.title}>Medicamento: {medicamento}</Text>
        </View>
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  title: {
    color: '#292929f3',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 15,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calendario: {
    height: 50,
    color: '#4CAF50'
  },
  buttonLed: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffbf00",
    height: 80,
    borderRadius: 50,
    elevation: 5,
    marginTop: 40,
    width: 300,
    alignSelf: "center",
  },
  buttonNight: {
    backgroundColor: "#5885AF",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    alignItems: "center",
    height: 80,
    borderRadius: 50,
    elevation: 5,
    marginTop: 40,
    width: 300,
    alignSelf: "center",
  }
});