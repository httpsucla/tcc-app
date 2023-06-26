import React, { useState, useEffect } from 'react'
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
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInputMask } from 'react-native-masked-text'
import Database from '../../services/database'
import styles from './style'
import moment from 'moment'

export default function CadastrarMedicamento({ route, navigation }) {

  const { hist } = route.params ? route.params : [];
  const [medicamento, setMedicamento] = useState([])
  const [dataInicial, setDataInicial] = useState('')
  const [horario, setHorario] = useState('')
  const [ativo, setAtivo] = useState(false)

  let isDataValida = true
  let isHoraValida = true

  useEffect(() => {
    if (hist != undefined)
      setMedicamento(hist);
  }, [route]);

  function handleInsert() {
    if (!moment(dataInicial, 'DD/MM/YYYY', true).isValid()) {
      isDataValida = false
    }
    if (!moment(horario, 'HH:mm', true).isValid()) {
      isHoraValida = false
    }

    if (!isDataValida || !isHoraValida) {
      Alert.alert('Erro', 'Existem erros de preenchimento.')
      if (!isDataValida) {
        setDataInicial('')
      }
      if (!isHoraValida) {
        setHorario('')
      }
    } else {
      const item = {
        nome: medicamento.nome,
        horario: new Date(`2023-04-06T${horario}`).toLocaleTimeString(),
        data_inicial: moment(dataInicial, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        qtde: parseInt(medicamento.qtde),
        qtde_dias: parseInt(medicamento.qtde_dias),
        dosagem: parseInt(medicamento.dosagem),
        intervalo: parseInt(medicamento.intervalo),
        ativo
      }

      Database.addMedicamento(item, () => {
        console.log(`Medicamento inserido com sucesso.`)
        setAtivo(false)
      })

      Alert.alert('Sucesso', 'Medicamento inserido com sucesso.')
      navigation.navigate('Medicamentos', item)
      Database.getMedicamentos(medicamentos => {
        console.log(medicamentos)
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 1]}
            colors={['#ffffff', '#569099']}
            style={styles.container}
          >
            <TouchableOpacity style={styles.buttonLista} onPress={() => navigation.navigate('Historico Medicamento')}>
              <Text style={styles.buttonText}>Histórico</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Nome do Remédio'
                value={medicamento.nome}
                onChangeText={nome => setMedicamento({ ...medicamento, nome })}
                returnKeyType='done'
                clearButtonMode='always'
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
                clearButtonMode='always'
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
                clearButtonMode='always'
                onChangeText={setHorario}
              />
              <TextInput
                style={styles.input}
                placeholder='Dosagem (quantos por dias)'
                value={medicamento == '' ? medicamento.dosagem : String(medicamento.dosagem)}
                onChangeText={dosagem => setMedicamento({ ...medicamento, dosagem })}
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />
              <TextInput
                style={styles.input}
                placeholder='Intervalo (horas)'
                value={medicamento == '' ? medicamento.intervalo : String(medicamento.intervalo)}
                onChangeText={intervalo => setMedicamento({ ...medicamento, intervalo })}
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />
              <TextInput
                style={styles.input}
                placeholder='Quantidade total da caixa'
                value={medicamento == '' ? medicamento.qtde : String(medicamento.qtde)}
                onChangeText={qtde => setMedicamento({ ...medicamento, qtde })}
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />
              <TextInput
                placeholder='Quantidade de dias'
                style={styles.input}
                value={medicamento == '' ? medicamento.qtde_dias : String(medicamento.qtde_dias)}
                onChangeText={qtde_dias => setMedicamento({ ...medicamento, qtde_dias })}
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />

              <TouchableOpacity style={styles.button} onPress={handleInsert}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
