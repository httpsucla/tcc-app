import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import Box from './components/Box';
import Database from '../../services/database2';

export default class Gavetas extends React.Component {
    constructor(props) {
        super(props);
        this.db = new Database();
        this.navigation = props.navigation;
        this.state = {
            gavetas: [],
            medicamentos: [],
            carregando: true,
            navigatedAway: false
        }
    }

    componentDidMount() {
        this.db.executarSelect('SELECT * FROM tb_gavetas', [])
            .then(res =>{
                this.setState({ gavetas: res })
            });

        this.db.executarSelect('SELECT * FROM tb_medicamentos', [])
            .then(res =>{
                this.setState({ medicamentos: res })
            });
    }

    refresh = () => {
        this.db.executarSelect('SELECT * FROM tb_gavetas', [])
            .then(res =>{
                this.setState({ gavetas: res })
            });
    }

    render() {
      if (this.state.gavetas.length>0) {
        const { gavetas } = this.state;
        const { medicamentos } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{marginTop: 30}} onPress={() => this.refresh()}>
                    <Icon name="undo" size={20} color={'#292929f3'} />
                </TouchableOpacity>
                <View style={styles.flex}>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 1</Text>
                        <Box gaveta = {gavetas[0]} navigation = {this.props.navigation} db = {this.db} meds = {medicamentos} />
                    </View>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 2</Text>
                        <Box gaveta = {gavetas[1]} navigation = {this.props.navigation} db = {this.db} meds = {medicamentos}/>
                    </View>
                </View>
                <View style={styles.flex}>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 3</Text>
                        <Box gaveta = {gavetas[2]} navigation = {this.props.navigation} db = {this.db} meds = {medicamentos}/>
                    </View>
                    <View style={styles.gaveta}>
                        <Text style={styles.title}>Gaveta 4</Text>
                        <Box gaveta = {gavetas[3]} navigation = {this.props.navigation} db = {this.db} meds = {medicamentos}/>
                    </View>
                </View>
            </View>            
        )
      }
    }
}
