import React, { useState } from 'react';
import { StyleSheet,View, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('UploadFile');
      })
      .catch((error) => {
        alert('Error logging in. Email or password invalid');
      });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <TextInput
        style={{ marginTop: 20, padding: 10, borderWidth: 1 }}
        placeholder="Email"
        onChangeText={(inputEmail) => setEmail(inputEmail)}
      />
      <TextInput
        style={{ marginTop: 20, padding: 10, borderWidth: 1 }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(inputPass) => setPassword(inputPass)}
      />
      <TouchableOpacity
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
