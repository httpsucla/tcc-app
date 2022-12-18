import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome5';


import Home from "../pages/Home";
import Gaveta from "../pages/Gaveta/";
import Calendario from "../pages/Calendario/";
import ListagemMedicamento from "../pages/Medicamento/listagem";
import Configuracao from "../pages/Configuracao/";
import CadastroTela from "../pages/Medicamento/cadastro";
import Cadastrar from "../Cadastrar";
import { DrawerActions } from "@react-navigation/native";
import TelaContatos from "../pages/Configuracao/telaContatos";

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
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
            <Tab.Screen name="Cadastro" component={CadastroTela}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="clock" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Medicamento" component={ListagemMedicamento}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="pills" size={size} color={color} />
                    )
                }} />
            <Tab.Screen name="Gaveta" component={Gaveta}
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
            <Tab.Screen name="Cadastrar" component={Cadastrar}
                options={{
                    
                    title: "Cadastrarr"
                }}
            />
            <Tab.Screen name="Contatos" component={TelaContatos}
            />

        </Tab.Navigator>
    )

}