import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DatabaseManager from './src/services/testDb';
import Routes from './src/store/routes'

export default function App() {
  
  useEffect(() => {
    DatabaseManager.createTables();
    DatabaseManager.teste();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}