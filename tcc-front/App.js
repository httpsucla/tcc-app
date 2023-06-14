import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Database from './src/services/database';
import Routes from './src/store/routes'

export default function App() {
  
  useEffect(() => {
    Database.createTables();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}