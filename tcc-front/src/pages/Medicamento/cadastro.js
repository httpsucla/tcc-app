import React, { Component } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import Medicamento from '../../models/medicamento';
import Database from '../../services/database';
import styles from './style';
import {Input} from 'react-native-elements'

class CadastroTela extends Component{
    constructor(props){
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            medNome: '',
            medHora: '',
            medDataIni: '',
            medQtde: 0,
            medQtdeDias: 0,
            medAtivo: false
        }
    }

render(){
    return (
        <View> 
            <ScrollView>
                <Text> Cadastrar Medicamento</Text>
                <Input placeholder="Nome" onChangeText={text => this.setState({ medNome: text})} maxLenght={30}/>
                <Input placeholder="Horário" onChangeText={text => this.setState({ medHora: text})} maxLenght={30}/>
                <Input placeholder="Data de Inicio" onChangeText={text => this.setState({ medDataIni: text})} maxLenght={30} />
                <Input placeholder="Quantidade" onChangeText={text => this.setState({ medQtde: text})} maxLenght={30} keyboardType='numeric'/>
                <Input placeholder="Quantidade de dias" onChangeText={text => this.setState({ medQtdeDias: text})} maxLenght={30} keyboardType='numeric'/>
                <Button title='Cadastrar' onPress={this.cadastrar}/>
            </ScrollView>
        </View>
    )
}
cadastrar = (()=>{
    let medicamento = new Medicamento({
        nome:    this.state.medNome,
        horario:   this.state.medHora,
        data_inicial:   this.state.medDataIni,
        qtde: this.state.medQtde,
        qtde_dias:   this.state.medQtdeDias,
        ativo:    this.state.medAtivo,
    })
    console.log(medicamento)
    this.db.insertNewMedicine(medicamento).then(result => {
        console.log(result) 
        if(result){
            this.props.navigation.navigate("Medicamento")
            alert("Inseriu com sucesso!")
        }else alert("Erro")
    })
}).bind(this)

}
export default  CadastroTela;