import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './style'
import Database from '../../services/database'
import { TextInputMask } from 'react-native-masked-text'

export default function EditarMedicamento ({ route, navigation }) {
  const { med } = route.params
  const [medicamento, setMedicamento] = useState(med)

  editar = () => {
    const data = {
      nome: medicamento.nome,
      horario: medicamento.horario,
      data_inicial: medicamento.data_inicial,
      qtde: String(medicamento.qtde),
      qtde_dias: String(medicamento.qtde_dias),
      intervalo: String(medicamento.intervalo),
      dosagem: String(medicamento.dosagem),
      ativo: true,
      id: medicamento.id
    }

    Database.updateMedicamento(data, () => {
      Alert.alert('Sucesso', 'Medicamento atualizado com sucesso.')
      navigation.navigate('Medicamentos', data)
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.9]}
            colors={['#A62A5C', '#6A2597']}
            style={styles.container}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Nome'
                value={medicamento.nome}
                onChangeText={nome => setMedicamento({ ...medicamento, nome })}
                returnKeyType='done'
                clearButtonMode='always'
              />
              <TextInputMask
                style={styles.input}
                value={medicamento.data_inicial}
                type={'datetime'}
                options={{
                  format: 'YYYY/MM/DD'
                }}
                placeholder='Data de início'
                maxLength={10}
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
                onChangeText={data_inicial =>
                  setMedicamento({ ...medicamento, data_inicial })
                }
              />
              <TextInputMask
                style={styles.input}
                value={medicamento.horario}
                placeholder='Horário de início'
                type={'datetime'}
                options={{
                  format: 'HH:mm'
                }}
                maxLength={5}
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
                onChangeText={horario =>
                  setMedicamento({ ...medicamento, horario })
                }
              />
              <TextInput
                style={styles.input}
                placeholder='Dosagem'
                value={String(medicamento.dosagem)}
                onChangeText={dosagem =>
                  setMedicamento({ ...medicamento, dosagem })
                }
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />

              <TextInput
                style={styles.input}
                placeholder='Intervalo'
                value={String(medicamento.intervalo)}
                onChangeText={intervalo =>
                  setMedicamento({ ...medicamento, intervalo })
                }
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />

              <TextInput
                style={styles.input}
                placeholder='Quantidade total'
                value={String(medicamento.qtde)}
                onChangeText={qtde => setMedicamento({ ...medicamento, qtde })}
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />
              <TextInput
                placeholder='Quantidade de dias'
                style={styles.input}
                value={String(medicamento.qtde_dias)}
                onChangeText={qtde_dias =>
                  setMedicamento({ ...medicamento, qtde_dias })
                }
                keyboardType='numeric'
                returnKeyType='done'
                clearButtonMode='always'
              />
              <TouchableOpacity style={styles.button} onPress={editar}>
                <Text style={styles.buttonText}>Atualizar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
