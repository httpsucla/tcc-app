import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Switch, FlatList } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Database from '../../services/database';

class Historico extends Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            isEnabled: false,
            medicamento: []
        }

    }

    setIsEnabled = (previousState) => {
        this.setState({ isEnabled: previousState });
    }

    render() {

        const toggleSwitch = () => setIsEnabled(previousState => !previousState);

        return (
            <View style={styles.container} >
                <View style={styles.filters}>
                    <View >
                        <TouchableOpacity style={styles.lupa}>
                            <Icon name="search" size={18} color={'black'} />
                            <Text style={styles.fontFilter}>Filtro</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.days}>
                        <Text style={styles.fontFilter}>Últimos 30 dias</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#8FD14F' }}
                            thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={this.state.isEnabled}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button}>
                   <Text style={styles.buttonText}>Gerar relatório</Text>
                </TouchableOpacity>

                <FlatList
                    style={styles.lista}
                    data={this.state.medicamento}
                    keyExtractor={((item, index) => "Index do item" + index)}
                    renderItem={({ item }) => (
                        <View style={styles.campolista}>
                            <View style={styles.campoconteudo}>
                            
                            </View >
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false} />
            
            </View>
        );
    }
}

export default Historico;
