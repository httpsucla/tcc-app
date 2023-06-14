import React, { useState } from 'react'
import {  Alert, Modal, TouchableOpacity, Text, View, TouchableWithoutFeedback  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './style'
import { SelectList } from 'react-native-dropdown-select-list'
import Database from '../../../../services/database'
import moment from 'moment'
import GavetaService from '../../../../services/gavetaService'

export default function Box ({
  gavetasExistentes,
  navigation,
  medicamentoSelecionadoLista,
  todasGavetas
}) {
  const [gaveta, setGavetas] = useState([])
  const [todosMedicamentos, setMedicamentos] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [idMedicamentoSelecionado, setSelected] = useState('')
  const [nomeMed, setNomeMed] = useState('')

  const showMedicamentos = () => {
    if (gavetasExistentes) {
      setGavetas(gavetasExistentes)
    }

    Database.getMedicamentos(todosMedicamentos => {
      for (let i = 0; i < todosMedicamentos.length; i++) {
        if (todosMedicamentos[i].id == medicamentoSelecionadoLista) {
          this.nomeMed = todosMedicamentos[i].nome
        }

        this.dadosMedicamento = todosMedicamentos.map(m => ({
          key: m.id,
          value: m.nome,
          horario: moment(m.horario, 'HH:mm').format('HH:mm'),
          qtde: m.qtde,
          qtdeDias: m.qtde_dias,
          dosagem: m.dosagem,
          intervalo: m.intervalo
        }))

      }

      todasGavetas.forEach(g => {
          for (let i = 0; i < this.dadosMedicamento.length; i++) {
            if (this.dadosMedicamento[i].key === g.id_medicamento){
              this.dadosMedicamento = this.dadosMedicamento.filter(e => e.key !== g.id_medicamento)
            }
          }
      })
      console.log('AQQQQQQQQQQQQQQQQQQ')
      console.log(this.dadosMedicamento)

      setMedicamentos(this.dadosMedicamento)
    })
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  function salvar (idGavetaEscolhida) {
    const dadosGaveta = {
      id_medicamento: idMedicamentoSelecionado,
      datahora_abertura: '',
      is_ocupado: true,
      is_atrasado: '',
      id: idGavetaEscolhida
    }
    
    let teste = todosMedicamentos;
    let medicamentoSelecionado = teste.find(
      m => m.key === idMedicamentoSelecionado
    )

    console.log(medicamentoSelecionado);

    if (medicamentoSelecionado) {
      Database.updateGaveta(dadosGaveta, () => {
        setNomeMed(medicamentoSelecionado.value)
        GavetaService.inserirRemedioArduino(
          dadosGaveta.id,
          medicamentoSelecionado.horario,
          medicamentoSelecionado.intervalo,
          medicamentoSelecionado.qtde,
          medicamentoSelecionado.dosagem
        )
        Alert.alert('Sucesso', 'Medicamento inserido com sucesso.')
        console.log(medicamentoSelecionado)
      })
    } else {
      Alert.alert('Erro', 'Erro ao inserir medicamento.')
    }
  }

  function limparGaveta (idGavetaEscolhida) {
    if (idGavetaEscolhida !== null) {
      const dadosGaveta = {
        id_medicamento: '',
        datahora_abertura: '',
        is_ocupado: false,
        is_atrasado: '',
        id: idGavetaEscolhida
      }

      Database.updateGaveta(dadosGaveta, () => {
        GavetaService.retirarRemedioArduino(dadosGaveta.id)
        Alert.alert('Sucesso', 'Gaveta está livre agora.')
      })
    } else {
      Alert.alert('Erro', 'Erro ao limpar gaveta.')
    }
  }

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal fechada.')
          setModalVisible(!modalVisible)
        }}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <View style={styles.indicator} />
              <Text style={styles.modalTitle}>
                {' '}
                {nomeMed ? nomeMed : `Gaveta ${gaveta.id + 1}`}
              </Text>
              {this.dadosMedicamento ? (
                <SelectList
                  data={todosMedicamentos}
                  setSelected={setSelected}
                  keyExtractor={idGavetaEscolhida => idGavetaEscolhida.id}
                  labelExtractor={idGavetaEscolhida => idGavetaEscolhida.label}
                  notFoundText='Nenhum medicamento encontrado'
                  placeholder={
                    medicamentoSelecionadoLista
                      ? this.nomeMed
                      : 'Selecione o medicamento'
                  }
                  searchInputStyle={{ backgroundColor: '#f2f2f2' }}
                  listStyle={{ backgroundColor: '#fff' }}
                />
              ) : (
                <Text style={styles.dataVazio}>
                  Nenhum medicamento cadastrado
                </Text>
              )}

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  hideModal()
                  navigation.navigate('Cadastrar Medicamento')
                }}
              >
                <Text style={styles.textStyle}>Cadastrar novo medicamento</Text>
              </TouchableOpacity>
              {this.dadosMedicamento ? (
                <TouchableOpacity
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => {
                    hideModal()
                    salvar(gaveta.id)
                  }}
                >
                  {medicamentoSelecionadoLista ? (
                    <Text style={styles.textStyle}>Alterar</Text>
                  ) : (
                    <Text style={styles.textStyle}>Salvar</Text>
                  )}
                </TouchableOpacity>
              ) : null}

              {medicamentoSelecionadoLista ? (
                <TouchableOpacity
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => {
                    hideModal()
                    limparGaveta(gaveta.id)
                  }}
                >
                  <Text style={styles.textStyle}>Limpar gaveta</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
            showMedicamentos()
          }}
        >
          {gavetasExistentes.is_ocupado ? (
            <Icon name='archive' size={60} color={'#b2633a'} />
          ) : (
            <Icon name='plus-circle' size={60} color={'#4CAF50'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
