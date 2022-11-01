import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Gaveta from './Gaveta';
import Cadastrar from './Cadastrar';
import Home from './Home';
import Calendario from './Calendario';

const { Navigator, Screen } = createBottomTabNavigator();

function AppTab() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#32264d",
                    tabBarInactiveTintColor: "#c1bccc",
                    tabBarActiveBackgroundColor: "#ebebf5",
                    tabBarInactiveBackgroundColor: "#fafafc",
                    tabBarLabelStyle: {
                        fontSize: 13,
                        position: 'absolute',
                        top: 15,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    tabBarIconStyle: { display: "none" }
                }}
            >
                <Screen name="Home" component={Home}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View>
                                <Icon name="rocket" size={30} color="#900" />
                                <Text>Teste</Text>
                            </View>
                            
                        )
                    }}
                />
                <Screen name="Calendário" component={Calendario}
                    options={{
                        title: "Calendário"
                    }}
                />
                <Screen name="Gaveta" component={Gaveta}
                    options={{
                        title: "Gaveta"
                    }} />
                <Screen name="Cadastrar" component={Cadastrar}
                    options={{
                        title: "Cadastrar",
                        initial: false
                    }} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppTab;