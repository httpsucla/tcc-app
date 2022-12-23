import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Configuracao extends Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            connection: false
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.campo}>
                        <Text style={styles.text}>Conexão com a gaveta</Text>
                        {this.state.connection
                            ?
                            <Text style={styles.textItalic}>conectado</Text>
                            :
                            <Text style={styles.textItalic}>desconectado</Text>
                        }
                    </View>
                    <View>
                        <TouchableOpacity style={styles.campo} onPress={this.telaContato}>
                            <Text style={styles.text}>Contatos</Text>
                            <Icon name="angle-right" size={18} color={'#414BB2'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.text}>Notificações</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.text}>Manual do usuário</Text>
                    </View>

                </View>
            </View>
        );
    }

    telaContato = (() => {
        this.props.navigation.navigate("Contatos")
    }).bind(this)

}
export default Configuracao;