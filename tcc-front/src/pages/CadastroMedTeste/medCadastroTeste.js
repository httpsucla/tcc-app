import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import DatabaseManager from '../../services/testDb';
import moment from 'moment';

export default function TelaCadastroMedicamento() {
  const [nome, setNome] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [horario, setHorario] = useState('');
  const [qtde, setQtde] = useState('');
  const [qtdeDias, setQtdeDias] = useState('');
  const [ativo, setAtivo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  function handleInsert() {
    const item = {
      nome,
      horario: new Date(`2023-04-06T${horario}`).toLocaleTimeString(),
      data_inicial: moment(dataInicial, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      qtde,
      qtde_dias: qtdeDias,
      ativo,
    };

    console.log(item);
    DatabaseManager.teste();

    DatabaseManager.addMedicamento(item, () => {
      console.log(`Medicamento inserido com sucesso.`);
      setNome('');
      setDataInicial('');
      setHorario('');
      setQtde('');
      setQtdeDias('');
      setAtivo(false);
    });

    Alert.alert('Sucesso', 'Medicamento inserido com sucesso.');
    DatabaseManager.getMedicamentos((medicamentos) => {
        console.log(medicamentos);
      });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

<Text style={styles.label}>Data Inicial:</Text>
      <TextInput
        style={styles.input}
        value={dataInicial}
        placeholder='DD/MM/AAAA'
        maxLength={10}
        keyboardType='numeric'
        onChangeText={(text) => {
          if (text.length === 2 || text.length === 5) {
            setDataInicial(text + '/');
          } else {
            setDataInicial(text);
          }
        }}
      />


<Text style={styles.label}>Horário:</Text>
      <TextInput
        style={styles.input}
        value={horario}
        placeholder='HH:MM'
        maxLength={5}
        keyboardType='numeric'
        onChangeText={(text) => {
          if (text.length === 2) {
            setHorario(text + ':');
          } else {
            setHorario(text);
          }
        }}
      />


      <Text style={styles.label}>Qtde:</Text>
      <TextInput
        style={styles.input}
        value={qtde}
        onChangeText={setQtde}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Qtde dias:</Text>
      <TextInput
        style={styles.input}
        value={qtdeDias}
        onChangeText={setQtdeDias}
        keyboardType='numeric'
      />

      <TouchableOpacity style={styles.button} onPress={handleInsert}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    label: {
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 16,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#007aff',
      borderRadius: 5,
      paddingVertical: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },  checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
      button: {
        height: 48,
        backgroundColor: '#555',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });


