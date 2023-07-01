import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper'
import { StackActions } from '@react-navigation/native'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Database from '../../services/database'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import HistoricoService from '../../services/historicoService'

export default function Historico ({ navigation, route }) {
  const [filtro, setFiltro] = useState(false)
  const [dataDefault, setDataDefault] = useState(false)
  const [historico, setHistorico] = useState([])
  const [medicamentos, setMedicamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [medId, setMedId] = useState('')
  const [dataStart, setDataStart] = useState(new Date())
  const [dataEnd, setDataEnd] = useState(new Date())
  const [medById, setMedById] = useState([])
  const [listaMed, setListaMed] = useState([])
  const isInitialMount = useRef(true)
  const [isHistoricoDiff, setHistoricoDiff] = useState(false)

  useEffect(() => {

    atualizaFiltros()
    filtrarRelatorio();
  }, [medId, dataStart, dataEnd, filtro, dataDefault, isHistoricoDiff])

  atualizaFiltros = () => {
    if (route.params) {
      const { medId, DataIni, DataFim, filtro, DataDefault } = route.params
      console.log(medId, DataIni, DataFim, filtro, DataDefault)
      setMedId(medId)
      setDataStart(DataIni)
      setDataEnd(DataFim)
      setFiltro(filtro)
      setDataDefault(DataDefault)
      console.log(filtro)
    } else {
      console.log('Sem filtro')

      Database.getHistoricoRelatorio(historico => {
        console.log('setou historico')
        console.log(historico)
        setHistorico(historico)
      })
    }
  }

  atualizaHistorico = () => {
    HistoricoService.requestDataHora(arrayRequest => {
        console.log('abaixo, console apos chamada do request')
        console.log(arrayRequest)
        if (arrayRequest != null || arrayRequest != undefined) {
          console.log('entrou')
          arrayRequest.gethistorico.forEach(array => {
            if ((array != null || array != undefined) && array.idRemedio > 0) {
              console.log('entrou foreach')
              console.log(array)

              dt1 = moment(array.dataAbertura, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm');
              dt2 = moment(array.dataPrevista, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm');

              const hist = {
                id_gaveta: array.idGaveta,
                id_medicamento: array.idRemedio,
                dt_abertura: dt1,
                dt_prevista: dt2,
                situacao: true
              }
  
              if (
                (hist.id_medicamento != null ||
                  hist.id_medicamento != undefined) &&
                hist.id_medicamento > 0
              ) {
                Database.getMedicamentoById(hist.id_medicamento, medicamento => {
                  console.log('teste')
                  console.log(medicamento[0])

                })
  
                Database.addHistorico(hist, teste => {
                  console.log(teste)
                  console.log('addhistorico')
                  atualizaFiltros();

                })
  
                atualizaFiltros();
              }
            }
          })
        }
      })

  }
  filtrarRelatorio = () => {
    //  Database.dropTables();
    //id_gaveta, id_medicamento, dt_prevista, dt_abertura, situacao
    console.log(filtro)
    if (filtro) {
      if (dataDefault) {
        Database.getHistoricoByMed(medId, historico => {
          console.log('data default')
          setHistorico(historico)
        })
      } else if (dataStart && dataEnd) {
        var d1 = moment(dataStart + ' 00:00', 'DD/MM/YYYY HH:mm').format(
          'YYYY-MM-DD HH:mm'
        )
        var d2 = moment(dataEnd + ' 23:59', 'DD/MM/YYYY HH:mm').format(
          'YYYY-MM-DD HH:mm'
        )

        console.log(d1, d2)
        Database.getHistoricoByDate(medId, d1, d2, historico => {
          setHistorico(historico)
        })
      }
    }
  }

  removeFiltro = () => {
    navigation.dispatch(StackActions.popToTop())
  }

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 1]}
      colors={['#ffffff', '#569099']}
      style={styles.container}
    >
      <View style={styles.filters}>
        <View style={styles.filters}>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.fontFilter, { marginRight: 20 }]}
              onPress={() => {
                navigation.navigate('Filtro')
              }}
            >
              <Icon
                style={styles.textFilter}
                name='filter'
                size={18}
                color={'white'}
              />
              <Text style={styles.textFilter}>Filtrar</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.filterContainer}>
          {!filtro && (
            <TouchableOpacity
              style={[styles.fontFilter, { marginRight: 20 }]}
              onPress={atualizaHistorico}
            >
              <Icon
                style={styles.textFilter}
                name='compass'
                size={18}
                color={'white'}
              />
              <Text style={styles.textFilter}>Atualizar histórico</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
   

        {filtro && (
          <TouchableOpacity style={styles.fontFilter} onPress={removeFiltro}>
            <Icon
              style={styles.textFilter}
              name='window-close'
              size={18}
              color={'#292929f3'}
            />
            <Text style={styles.textRemove}>Remover filtro</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* <TouchableOpacity style={styles.button} onPress={filtrarRelatorio}>
                <Text style={styles.buttonText}>Gerar relatório</Text>
            </TouchableOpacity>   */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Medicamento</DataTable.Title>
          <DataTable.Title>Horário previsto</DataTable.Title>
          <DataTable.Title>Abertura gaveta</DataTable.Title>
        </DataTable.Header>
        <ScrollView style={{ marginBottom: 100 }}>
          {historico.map(item => {
            return (
              <DataTable.Row key={item.id}>
                <DataTable.Cell textStyle={{fontSize: 12}}>{item.nome}</DataTable.Cell>
                <DataTable.Cell textStyle={{fontSize: 12}}>
                  {moment(item.dt_prevista, 'HH:mm DD/MM/YYYY').format('DD/MM/YYYY HH:mm')}{' '}
                </DataTable.Cell>
                {item.dt_abertura != '' && (
                  <DataTable.Cell textStyle={{fontSize: 12}}>
                    {moment(item.dt_abertura, 'HH:mm DD/MM/YYYY').format('DD/MM/YYYY HH:mm')}{' '}
                  </DataTable.Cell>
                )}
                {item.dt_abertura == '' && (
                  <DataTable.Cell textStyle={{fontSize: 12}}> NA </DataTable.Cell>
                )}
              </DataTable.Row>
            )
          })}
          {historico == 0 && (
            <Text style={styles.textWarning}>
              Não houve registro no ultimo mês.
            </Text>
          )}
        </ScrollView>
      </DataTable>

    </LinearGradient>
    
  )
}
