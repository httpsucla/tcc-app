import React, { useState, useEffect } from 'react';
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
import Database from '../../services/database';
import styles from './style';
import moment from 'moment';

export default function CadastrarMedicamento({ navigation, route }) {

  const { hist } = route.params ? route.params.hist : {};
  const [medicamento, setMedicamento] = useState([]);
  const [nome, setNome] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [horario, setHorario] = useState('');
  const [qtde, setQtde] = useState('');
  const [qtdeDias, setQtdeDias] = useState('');
  const [ativo, setAtivo] = useState(false);
  let isDataValida = true;
  let isHoraValida = true;

  useEffect(() => { 
  //  console.log(hist) 
}, []);

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
        nome : medicamento.nome,
        horario: new Date(`2023-04-06T${horario}`).toLocaleTimeString(),
        data_inicial: moment(dataInicial, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        qtde : String(medicamento.qtde),
        qtde_dias: String(medicamento.qtde_dias),
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
            <TouchableOpacity style={styles.buttonTransp}
              onPress={() => {
                navigation.navigate("Historico Medicamento");
               // console.log(hist);
              }}>
              <Text style={styles.buttonTextTransp}>Selecionar medicamento do banco</Text>
            </TouchableOpacity>
           
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={medicamento.nome}
              onChangeText={nome => setMedicamento({ ...medicamento, nome })}
              returnKeyType='done'
              clearButtonMode="always"
            />
            <TextInput
              style={styles.input}
              value={dataInicial}
              placeholder='Data de início'
              maxLength={10}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
              onChangeText={(text) => {
                if (text.length === 2 || text.length === 5) {
                  setDataInicial(text + '/');
                } else {
                  setDataInicial(text);
                }
              }}
            />
            <TextInput
              style={styles.input}
              value={horario}
              placeholder='Horário de início'
              maxLength={5}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
              onChangeText={(text) => {
                if (text.length === 2) {
                  setHorario(text + ':');
                } else {
                  setHorario(text);
                }
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantidade por dia"
              value={String(medicamento.qtde)}
              onChangeText={qtde => setMedicamento({ ...medicamento, qtde })}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
            />
            <TextInput
              placeholder="Quantidade de dias"
              style={styles.input}
              value={String(medicamento.qtde_dias)}
              onChangeText={qtde_dias => setMedicamento({ ...medicamento, qtde_dias })}
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
