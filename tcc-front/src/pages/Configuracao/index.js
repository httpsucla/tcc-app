import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import styles from './style';

class Configuracao extends Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>
            <TouchableOpacity style={styles.button} onPress={this.telaContato} >
                <Text style={styles.buttonText}>Contatos</Text>
            </TouchableOpacity>
        </View>
        );
    }

    telaContato = (() => {
        this.props.navigation.navigate("Contatos")
    }).bind(this)

}
export default Configuracao;