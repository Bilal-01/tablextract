import React, { useState } from 'react';
import { StyleSheet,View, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
      navigation.navigate('Home');
        console.log(email,password)
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
        // style={{ marginTop: 20, padding: 10, backgroundColor: colors.secondary }}
        onPress={handleLogin}
      >
        <Text style={{ color: colors.text, ...styles.buttonText,...styles.loginButton }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10 }}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};
const colors = {
  primary: '#F3E8FF',
  secondary: '#CE5959',
  base: '#BACDDB',
  gray: '#808080',
  base_f: '#454545',
  text: '#253e53'
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: colors.text
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginBottom: 5,
    marginTop: 20,
    width: 200,
    alignSelf:'center'
  },
})

export default Login;
