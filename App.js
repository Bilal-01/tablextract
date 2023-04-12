import 'react-native-gesture-handler';
import React from 'react';
import Home from './src/pages/home.js'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator.js';


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    
    // <Stack.Screen name="Home" component={Home} />
    // <Home />
  );
}