import React, { Component, useState } from 'react';
import { Button, Text, View, FlatList, TouchableWithoutFeedbackBase } from 'react-native';
import Database from '../../services/database';
import styles from './style';

export default class ListagemMedicamentos extends React.Component{
    constructor(props){
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            medicamentos: [],
            carregando: true,
            navigatedAway : false
        }
        this.refresh();
    }

    refresh = () => { 
            this.setState({medicamentos: [], carregando: true})
            this.db.getAllMedicine().then(medicamentos => this.setState({ medicamentos: medicamentos, carregando: false}))
            console.log(this.state.medicamentos)
    }
      
    render(){
        return(
            <View>
                {
                   this.state.medicamentos.length > 0 ? 
                    <FlatList 
                        data={this.state.medicamentos}
                        keyExtractor={((item, index) => "Index do item" + index)}
                        // CRIAR COMPONENTE AQUI PRA RENDERITEM CHAMAR O COMPONENTE COM O STYLE E LISTA
                        renderItem={({item})=> (
                            <View style={{flex:1 , flexDirection:'row',justifyContent:'flex-start',marginBottom:10}}>
                                <View style={{paddingLeft:20,width:60}}>
                                <Text>{item.nome}</Text>
                                </View>
                                <View style={{paddingLeft:40,width:120}}>
                                <Text>{item.qtde}</Text>
                                </View>
                                <View style={{paddingLeft:50,width:150}}>
                                <Text>{item.horario}</Text>
                                </View>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} />: 
                    <Text>Não há medicamentos cadastrados no momento :(</Text>
                }
                <Button title="Update" onPress={() => this.refresh()}/>

            </View>
        )
    }
}
