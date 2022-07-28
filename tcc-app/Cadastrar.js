import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-datepicker';


export default function Cadastrar( {navigation} ) {
     
    const [hour, setHour] = useState('');
    const [qtde, setQtde] = useState('');
    const [date, setDate] = useState('');
    const [days, setDays] = useState('');
    
    async function handleButtonPress(){ 
        navigation.navigate("Gaveta");
    };
    
        return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Cadastrar medicamento</Text>
                <View style={styles.inputContainer}> 
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nome"
                        clearButtonMode="always" 
                    /> 
                    <TextInputMask 
                        style={styles.input} 
                        placeholder="Quantidade" 
                        keyboardType={'numeric'}
                        clearButtonMode="always"
                        type={'only-numbers'}
                        value={qtde}
                        onChangeText={ value => setQtde(value) }
                    /> 
                    <TextInputMask
                        style={styles.input}  
                        placeholder="Horário" 
                        keyboardType={'numbers-and-punctuation'}
                        clearButtonMode="always"
                        type={'datetime'}
                        options={{
                            format: 'HH:mm'
                        }}
                        value={hour}
                        onChangeText={ value => setHour(value) }
                    />
                    <DatePicker
                        style={styles.calendario}
                        date={date}
                        mode="date"
                        placeholder="Data de início"
                        format="DD/MM/YYYY"                     
                        clearButtonMode="always"
                        confirmBtnText="Confirmar"
                        minDate="01-01-2022"
                        maxDate="31-12-2050"
                        cancelBtnText="Cancelar" 
                        customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              right: -5,
                              top: 4,
                              marginLeft: 0,
                            },
                            dateInput: {
                              alignItems: "flex-start",
                              borderWidth: 0
                            },
                            placeholderText: {
                              fontSize: 16                   
                            },
                            dateText: {
                              fontSize: 16
                            },
                            datePickerCon: {
                                backgroundColor: "#292929f3"
                            }            
                          }}
                          onDateChange={(date) => {
                            setDate(date);
                          }}
                    />       
                    <TextInputMask
                        style={styles.input}  
                        placeholder="Quantidade de dias" 
                        keyboardType={'numeric'}
                        clearButtonMode="always"
                        type={'only-numbers'}
                        value={days}
                        onChangeText={ value => setDays(value) }
                    />
                    <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
                        <Text style={styles.buttonText}>Salvar</Text> 
                    </TouchableOpacity> 
                </View>
                <StatusBar style="light" />
            </View>
        </ScrollView>
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
      marginTop: 50,
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
      marginTop: 15,
      height: 60,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    calendario: {
        width: 230,
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
        color: '#000'
      },
  });