import React, { Component } from 'react';
import { Text, View, ScrollView, Button, TextInput, TouchableOpacity, Title, DateInput } from 'react-native';
import styles from './style';
import Database from '../../services/database2';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';


class Filtro extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            medId: '',
            DataIni: new Date(),
            DataFim: new Date(),
            showC1: false,
            showC2: false,
            DataIniView: 'Selecione',
            DataFimView: 'Selecione'
        }
    }


    render() {

        const data = [
            {key:'1', value:'Dramin' },
            {key:'2', value:'Ritalina'},
            {key:'3', value:'Dipirona'},
        ]

        const showDatepicker1 = () => {
            this.setState({showC1: true});
        };

        const showDatepicker2 = () => {
            this.setState({showC2: true});
        };

        const ChangeIni = (event, selectedDate) => {
            const currentDate = selectedDate;
            this.setState({showC1: false});
            this.setState({DataIni: currentDate});
            this.setState({DataIniView: this.state.DataIni.toLocaleDateString()});
        };

        const ChangeFim = (event, selectedDate) => {
            const currentDate = selectedDate;
            this.setState({showC2: false});
            this.setState({DataFim: currentDate});
            this.setState({DataFimView: this.state.DataFim.toLocaleDateString()});
        };

        return (
            <ScrollView>
                <View style={styles.containerFiltro}>
                    <Text style={styles.titleFiltro}> Filtrar</Text>
                    <View style={styles.inputContainer}>

                        <Text style={styles.textFiltro}>Medicamento</Text>
                        <SelectList 
                            style={styles.inputCampo}
                            placeholder="Selecione"
                            setSelected={(val) => this.setState({medId: val})} 
                            data={data} 
                            save="value"
                        />

                        <Text style={styles.textFiltro}>Data início</Text>
                        <TouchableOpacity style={styles.calendario} onPress={showDatepicker1}>
                            <Icon name="calendar" size={18} color={'black'} />
                            <Text>   </Text>
                            <Text style={styles.fontFilter}>  
                                {this.state.DataIniView}
                            </Text>   
                        </TouchableOpacity>
                        
                        {this.state.showC1 && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.DataIni}
                            mode={'date'}
                            is24Hour={true}
                            onChange={ChangeIni}
                        />
                        )}


                        <Text style={styles.textFiltro}>Data final</Text>
                        <TouchableOpacity style={styles.calendario} onPress={showDatepicker2}>
                            <Icon name="calendar" size={18} color={'black'} />
                            <Text>   </Text>
                            <Text style={styles.fontFilter}>                    
                                {this.state.DataFimView}
                            </Text>
                        </TouchableOpacity>
                        
                        {this.state.showC2 && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.DataFim}
                            mode={'date'}
                            is24Hour={true}
                            onChange={ChangeFim}
                        />
                        )}


                    <TouchableOpacity style={styles.button}  
                            onPress={this.verifica}>
                        <Text style={styles.buttonText}>Gerar relatório</Text>
                    </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }

    verifica = () => {
        if (this.state.medId != '' && this.state.DataIniView != 'Selecione' && this.state.DataIniView != 'Selecione'){
            this.navigation.replace('Historico', {
                medId : this.state.medId,
                DataIni: this.state.DataIniView,
                DataFim: this.state.DataFimView
                });
        } else {
            alert("Preencha todos os campos!");
        }
    }
    
}
export default Filtro;