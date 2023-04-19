import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        navigation.navigate('Home');
        console.log(email,password)
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const handleForgotPassword = () => {
    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <TextInput
        style={{ marginTop: 20, padding: 10, borderWidth: 1 }}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={{ marginTop: 20, padding: 10, borderWidth: 1 }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}
        onPress={handleLogin}
      >
        <Text style={{ color: 'white' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10 }}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10 }}
        onPress={handleForgotPassword}
      >
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
