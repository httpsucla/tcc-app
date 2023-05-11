import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Database from '../../services/database';
import styles from './style';
import moment from 'moment';

export default function CadastrarMedicamento({ navigation }) {

  const [nome, setNome] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [horario, setHorario] = useState('');
  const [qtde, setQtde] = useState('');
  const [qtdeDias, setQtdeDias] = useState('');
  const [ativo, setAtivo] = useState(false);

  let isDataValida = true;
  let isHoraValida = true;

  function handleInsert() {
    if (!moment(dataInicial, 'DD/MM/YYYY', true).isValid()) {
      //Alert.alert('Erro', 'Data está inválida.');
      isDataValida = false;
    }
    if (!moment(horario, 'HH:mm', true).isValid()) {
      isHoraValida = false;
    }

    if (!isDataValida || !isHoraValida) {
      Alert.alert('Erro', 'Existem erros de preenchimento.');
      if (!isDataValida) {
        setDataInicial('');
      }
      if (!isHoraValida) {
        setHorario('');
      }
    }
    else {
      const item = {
        nome,
        horario: new Date(`2023-04-06T${horario}`).toLocaleTimeString(),
        data_inicial: moment(dataInicial, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        qtde,
        qtde_dias: qtdeDias,
        ativo,
      };

      console.log(item);
      Database.teste();

      Database.addMedicamento(item, () => {
        console.log(`Medicamento inserido com sucesso.`);
        setNome('');
        setDataInicial('');
        setHorario('');
        setQtde('');
        setQtdeDias('');
        setAtivo(false);
      });

      Alert.alert('Sucesso', 'Medicamento inserido com sucesso.');
      navigation.navigate("Medicamentos", item);
      Database.getMedicamentos((medicamentos) => {
        console.log(medicamentos);
      });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={styles.title}> Cadastrar Medicamento</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              returnKeyType='done'
              clearButtonMode="always"
            />
            <TextInputMask
              style={styles.input}
              value={dataInicial}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
              placeholder='Data de início'
              maxLength={10}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
              onChangeText={setDataInicial}
            />
            <TextInputMask
              style={styles.input}
              value={horario}
              type={'datetime'}
              options={{
                format: 'HH:mm'
              }}
              placeholder='Horário de início'
              maxLength={5}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
              onChangeText={setHorario}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantidade total"
              value={qtde}
              onChangeText={setQtde}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
            />
            <TextInput
              placeholder="Quantidade de dias"
              style={styles.input}
              value={qtdeDias}
              onChangeText={setQtdeDias}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
            />

            <TouchableOpacity style={styles.button} onPress={handleInsert}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
