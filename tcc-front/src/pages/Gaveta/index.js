import React, { useState, useEffect, useCallback } from 'react'
import {  Text, View, FlatList, RefreshControl, TouchableOpacity  } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './style'
import Box from './components/Box'
import Database from '../../services/database'

export default function Gavetas ({ navigation }) {
  const [gavetas, setGavetas] = useState([])
  const [refreshing, setRefresh] = useState(false)

  useEffect(() => {
    carregarGavetas()
  }, [])

  const carregarGavetas = useCallback(() => {
    setRefresh(true)
    Database.addGavetaTeste()
    Database.leftJoinGavetaMedicamento(gavetas => {
      setGavetas(gavetas)
      console.log(gavetas)
      setRefresh(false)
    })
  }, [])

  const refresh = useCallback(() => {
    carregarGavetas()
  }, [])

  const forceRefresh = () => {
    carregarGavetas()
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      locations={[0.5, 0.9]}
      colors={['#A62A5C', '#6A2597']}
      style={styles.container}
    >
      {gavetas.length > 0 ? (
        <FlatList
          style={styles.lista}
          data={gavetas}
          numColumns={2}
          keyExtractor={(item, index) => 'Index do item' + index}
          renderItem={({ item }) => (
            <View style={styles.gaveta}>
              <View style={styles.unidadeGaveta}>
                <Text style={styles.title}>
                  {item.id_medicamento === ''
                    ? `Gaveta ${item.id + 1}`
                    : item.nome}
                </Text>
                <Box
                  todasGavetas={gavetas}
                  gavetasExistentes={item}
                  navigation={navigation}
                  medicamentoSelecionadoLista={item.id_medicamento}
                />
              </View>
            </View>
          )}
          
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          
        />
        
      ) : null}
      <TouchableOpacity 
        style={styles.buttonLista}
        onPress={forceRefresh}>
        <Text style={styles.buttonText} >Sincronizar Dados</Text>
      </TouchableOpacity>

    </LinearGradient>
  )
}
