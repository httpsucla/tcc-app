import React from 'react';
import { NavigationContainer, Screen } from '@react-navigation/native'; 
import Routes from './src/store/routes'
import TelaContatos from './src/pages/Configuracao/telaContatos';

export default function App() {
  
  return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
  );
}