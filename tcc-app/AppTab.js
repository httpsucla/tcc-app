import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Gaveta from './Gaveta';
import Cadastrar from './Cadastrar';

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
                <Screen name="Gaveta" component={Gaveta}
                    options = {{
                        tabBarLabel: "Gaveta"
                    }} />
                <Screen name="Cadastrar" component={Cadastrar} 
                    options = {{
                        tabBarLabel: "Adicionar medicamento"
                    }}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default AppTab;