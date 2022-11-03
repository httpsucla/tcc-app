import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Medicamento () {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos os medicamentos</Text>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
      alignItems: 'center',
    },
    title: {
      color: '#292929f3',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch'
    },
    button: {
      marginTop: 25,
      height: 50,
      backgroundColor: '#414BB2',
      borderRadius: 2,
      paddingHorizontal: 125,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    calendario: {
      height: 50,
      color: '#4CAF50'
    },
  });