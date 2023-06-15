import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './style'
import Database from '../../services/database'

export default function HistoMedicamento ({ navigation }) {
  const [medicamentos, setMedicamentos] = useState([])

  useEffect(() => {
    Database.getMedicamentos(medicamentos => {
      setMedicamentos(medicamentos)
    })
  }, [])

  selecionar = item => {
    navigation.navigate('Cadastrar Medicamento', { hist: item })
    console.log(item)
  }
  return (
    <LinearGradient
    start={{ x: 1, y: 1 }}
    end={{ x: 1, y: 0 }}
    locations={[0, 1]}
    colors={['#ffffff', '#569099']}
    style={styles.container}
    >
      <Text style={styles.title}> Histórico de medicamento</Text>
      <View>
        {medicamentos.length > 0 ? (
          <FlatList
            style={styles.lista}
            data={medicamentos}
            keyExtractor={(item, index) => 'Index do item' + index}
            // CRIAR COMPONENTE AQUI PRA RENDERITEM CHAMAR O COMPONENTE COM O STYLE E LISTA
            renderItem={({ item }) => (
              <View style={styles.campolista}>
                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    width: '100%'
                  }}
                >
                  <TouchableOpacity onPress={() => selecionar(item)}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyList}>Não há medicamento nessa lista!</Text>
        )}
      </View>
    </LinearGradient>
  )
}
