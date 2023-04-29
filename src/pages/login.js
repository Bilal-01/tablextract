import React, { useState } from 'react';
import { Image,StyleSheet,View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logo from '../assets/logo.png';



const Login = ({ navigation }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        userCredential.user.getIdToken().then((token) => {
          console.log(token);
        });
        navigation.navigate('UploadFile', {token: token});
      })
      .catch((error) => {
        console.log(error)
        alert('Error logging in. Email or password invalid');
      });
  }
  const handleForgotPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, inputEmail)
      .then(() => {
        alert('Password reset email sent. Please check your inbox.');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('Error: Email not registered. Please try again.');
        } else {
          alert('Enter your email address.');
        }
      });
  }
  

  return (
    <View style={{ color:'white',backgroundColor:'black',flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text style={styles.loginText}>Login</Text> */}
      <Image source={logo} style={styles.image} />
      <View style={styles.inputView}>
      <TextInput
        style={{ ...styles.TextInput}}
        placeholder="Email"
        // placeholderTextColor='#003f5c'
        onChangeText={(inputEmail) => setInputEmail(inputEmail)}
        />
      </View>
      <View style={styles.inputView}>
      <TextInput
        style={{ ...styles.TextInput}}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(inputPass) => setInputPassword(inputPass)}
      />
      </View>
      <TouchableOpacity style={styles.loginBtn}onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleForgotPassword}
      >
        <Text style={{...styles.forgot_button,color:'white'}}>Forgot Password?</Text> 
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 0, padding: 10 }}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={{color:'white'}}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Contact Us</Text>
        <Text style={styles.footerText}>tablextract.app@gmail.com</Text>
      </View>
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
  loginBtn:
  {
    width:"45%",
    borderRadius:5,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10,
    backgroundColor:colors.secondary,
  },
  loginText:{
    fontSize:20,
    color : colors.text,
    fontWeight:'bold'
  },
  inputView: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    // alignItems: "start",
    // padding: '20px',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
    color: colors.text,
  },
   forgot_button: {
    height: 30,
    marginTop:20,
    marginBottom: 0,
  },
  image: {
    marginBottom: 40,
    width: 100,
    height: 100,
    alignItems: 'center',
    marginLeft:10,
    borderRadius: 20,
  },  
  footer: {
    backgroundColor: colors.base_f,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    width:'100%',
    bottom:0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 5,
    color: colors.gray,
  }
})

export default Login;
