import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, Input } from 'react-native';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import DatabaseManager from '../../services/testDb';

export default function EditarMedicamento({ navigation }) {

  useEffect(() => {
    console.log(item)
    if(item) {
      setMedicamento(item);
    }
    console.log(medicamento)
  }, []);

  const [medicamento, setMedicamento] = useState([]);
  const [nome, setNome] = useState(this.medicamento.nome);
  const [dataInicial, setDataInicial] = useState('teste');
  const [horario, setHorario] = useState('');
  const [qtde, setQtde] = useState('');
  const [qtdeDias, setQtdeDias] = useState('');
  const [ativo, setAtivo] = useState(false);

  const route = useRoute();
  const { item } = route.params;

  const [data, setData] = useState({
    name: '',
    horario: '',
    data_inicial: '',
    qtde: '',
    qtde_dias: '',
  });

  editar = () => {
    const data = {
      nome: nome,
      horario: horario,
      data_inicial: dataInicial,
      qtde: qtde,
      qtde_dias: qtdeDias,
      ativo,
      id: item.id
    };
    console.log(data);
    //DatabaseManager.EditarMedicamento(data, () => {
    //   console.log(`Medicamento atualizado com sucesso.`);
    //   setNome('');
    //   setDataInicial('');
    //   setHorario('');
    //   setQtde('');
    //   setQtdeDias('');
    //   setAtivo(false);
    // });
    Alert.alert('Sucesso', 'Medicamento atualizado com sucesso.');
    navigation.navigate("CadastroMedTeste");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={styles.title}> Atualizar Medicamento</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              returnKeyType='done'
              clearButtonMode="always"
            />
            <TextInput
              style={styles.input}
              value={String(item.data_inicial)}
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
              value={horario.toString()}
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
              placeholder="Quantidade"
              value={String(item.qtde)}
              onChangeText={setQtde}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
            />
            <TextInput
              placeholder="Quantidade de dias"
              style={styles.input}
              value={String(item.qtde_dias)}
              onChangeText={setQtdeDias}
              keyboardType='numeric'
              returnKeyType='done'
              clearButtonMode="always"
            />

            <TouchableOpacity style={styles.button} onPress={editar}>
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}