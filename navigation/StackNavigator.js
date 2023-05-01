import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/pages/home';
import Login from '../src/pages/login';
import Signup from '../src/pages/signup';
import Main from '../src/pages/uploadfile';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    );
};
export default StackNavigator;