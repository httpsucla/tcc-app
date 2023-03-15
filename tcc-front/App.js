import React from 'react';
import { NavigationContainer, Screen } from '@react-navigation/native'; 
import Routes from './src/store/routes'

export default function App() {
  return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
  );
}