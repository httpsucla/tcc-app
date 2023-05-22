import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';
import Box from './components/Box';
import Database from '../../services/database';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Gavetas({ navigation }) {

    const [gavetas, setGavetas] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        Database.addGavetaTeste();
        Database.getGavetas((gavetas) => {
            setGavetas(gavetas);
            console.log(gavetas);
        })
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500)

        Database.getGavetas((gavetas) => {
            setGavetas(gavetas)
        });
    }, []);

    return (
        
            <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0.5, 0.9]}
                    colors={['#A62A5C', '#6A2597']}
                    style={styles.container}
                >
            {
                gavetas.length > 0 ?
                    <FlatList
                        style={styles.lista}
                        data={gavetas}
                        numColumns={2}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        keyExtractor={((item, index) => "Index do item" + index)}
                        renderItem={({ item }) => (

                            <View style={styles.gaveta}>
                                <View style={styles.unidadeGaveta}>
                                <Text style={styles.title}>Gaveta {item.id + 1}</Text>
                                <Box todasGavetas={gavetas} gaveta={item} navigation={navigation} meds={item.id_medicamento}/>
                                </View>
                                
                            </View>

                        )}
                    />
                    :
                    null
            }
            </LinearGradient>
    
    )
}
