import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from "@react-navigation/native";

import Home from "../pages/Home";
import Gaveta from "../pages/Gaveta/";
import Calendario from "../pages/Calendario/";
import ListagemMedicamento from "../pages/Medicamento/listagem";
import Configuracao from "../pages/Configuracao/";
import CadastroTela from "../pages/Medicamento/cadastro";
import Cadastrar from "../Cadastrar";
import VisualizarMedicamentoTela from "../pages/Medicamento/visualizarMedicamento";
import EditarMedicamento from "../pages/Medicamento/editarMedicamento";
import TelaContatos from "../pages/Configuracao/telaContatos";
import Gavetas from "../pages/Gaveta/gavetas";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            name="Home2" 
            component={HomeTabs} 
            options={{ headerShown: false }}/>
        <Stack.Screen
            name="Cadastro"
            component={CadastroTela}/>
        <Stack.Screen
            name="Visualizacao"
            component={VisualizarMedicamentoTela}/>
        <Stack.Screen
            name="Editar"
            component={EditarMedicamento}/>
        <Stack.Screen
            name="Contatos"
            component={TelaContatos}/>
      </Stack.Navigator>
        
    )

}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
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
            
            <Tab.Screen name="Medicamento" component={ListagemMedicamento}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="pills" size={size} color={color} />
                    )
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
