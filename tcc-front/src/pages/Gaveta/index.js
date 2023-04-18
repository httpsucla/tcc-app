import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import styles from './style';
import Box from './components/Box';
import DatabaseManager from '../../services/testDb';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Gavetas({ navigation }) {

    const [gavetas, setGavetas] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        DatabaseManager.addGavetaTeste();
        DatabaseManager.getGavetas((gavetas) => {
            setGavetas(gavetas);
            console.log(gavetas);
        })
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500)

        DatabaseManager.getGavetas((gavetas) => {
            setGavetas(gavetas)
        });
    }, []);

    return (
        <View style={styles.container}>
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
                                <Text style={styles.title}>Gaveta {item.id + 1}</Text>
                                <Box gaveta={item} navigation={navigation} meds={item.id_medicamento} />
                            </View>

                        )}
                    />
                    :
                    null
            }
        </View>
    )
}
