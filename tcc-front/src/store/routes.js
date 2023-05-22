import React from "react";
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from "expo-linear-gradient";

import Home from "../pages/Home";
import Configuracao from "../pages/Configuracao/";
import VisualizarMedicamento from "../pages/Medicamento/visualizar";
import EditarMedicamento from "../pages/Medicamento/editar";
import TelaContatos from "../pages/Configuracao/telaContatos";
import Gavetas from "../pages/Gaveta";;
import Filtro from "../pages/Historico/filtro";
import Historico from "../pages/Historico";
import Calendario from "../pages/Calendario";
import CadastrarMedicamento from "../pages/Medicamento/cadastrar";
import Medicamentos from "../pages/Medicamento";
import TesteAngelo from "../pages/TesteAngelo/angelo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerBackTitleVisible: false,
                headerTintColor: 'white'
            }}>
            <Stack.Screen
                name="Home2"
                component={HomeTabs}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Visualizar Medicamento"
                component={VisualizarMedicamento} />
            <Stack.Screen
                name="Editar Medicamento"
                component={EditarMedicamento} />
            <Stack.Screen
                name="Contatos"
                component={TelaContatos} />
            <Stack.Screen
                name="Cadastrar Medicamento"
                component={CadastrarMedicamento} />
            <Stack.Screen
                name="Filtro"
                component={Filtro} />
            <Stack.Screen
                name="Historico"
                component={Historico} />
            <Stack.Screen
                name="Teste angelo"
                component={TesteAngelo} />
        </Stack.Navigator>

    )
}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: "#A62A5C",
                tabBarInactiveTintColor: "#858585",
                tabBarActiveBackgroundColor: 'transparent',
                tabBarInactiveBackgroundColor: 'transparent',
                headerTransparent: true,
                headerTintColor: 'white',
                headerShadowVisible: true,
                tabBarStyle: {
                    paddingTop: 5,
                    paddingBottom: 5,
                    shadowColor: '#000',
                    shadowRadius: 5,
                    elevation: 10,
                    shadowOpacity: 0.2
                },
                tabBarLabelStyle: {
                    fontSize: 9,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }

            }}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="home" size={size} color={color} />
                    )
                }}

            />
            <Tab.Screen name="Historico" component={Historico}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="clock" size={size} color={color} />
                    ),
                    title: "Histórico"
                }}
            />
            <Tab.Screen name="Medicamentos" component={Medicamentos}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="pills" size={size} color={color} />
                    ),
                    title: "Medicamentos"
                }} />
            <Tab.Screen name="Gaveta" component={Gavetas}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="inbox" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Calendario" component={Calendario}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="calendar-day" size={size} color={color} />
                    ),
                    title: "Calendário"
                }}
            />
            <Tab.Screen name="Configuracao" component={Configuracao}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="cog" size={size} color={color} />
                    ),
                    title: "Configuração"
                }}
            />
            <Tab.Screen name="Teste Angelo" component={TesteAngelo}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="cog" size={size} color={color} />
                    ),
                    title: "TesteAngelo"
                }}
            />
        </Tab.Navigator>
    )
}
