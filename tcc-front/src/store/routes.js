import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from "@react-navigation/native";

import Home from "../pages/Home";
import Configuracao from "../pages/Configuracao/";
import VisualizarMedicamento from "../pages/CadastroMedTeste/visualizar";
import EditarMedicamento from "../pages/Medicamento/editarMedicamento";
import TelaContatos from "../pages/Configuracao/telaContatos";
import Gavetas from "../pages/Gaveta/";
import Historico from "../pages/Historico";
import Calendario from "../pages/Calendario";
import CadastrarMedicamento from "../pages/CadastroMedTeste/cadastrar";
import CadastroMedTeste from "../pages/CadastroMedTeste";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
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
        </Stack.Navigator>
    )
}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: "#414BB2",
                tabBarInactiveTintColor: "#808080",
                tabBarActiveBackgroundColor: 'transparent',
                tabBarInactiveBackgroundColor: 'transparent',
                tabBarStyle: {
                    paddingTop: 5,
                    paddingBottom: 5
                },
                tabBarLabelStyle: {
                    fontSize: 9,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
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
            <Tab.Screen name="CadastroMedTeste" component={CadastroMedTeste}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="pills" size={size} color={color} />
                    ),
                    title: "Medicamento"
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
        </Tab.Navigator>
    )
}
