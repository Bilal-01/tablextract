import React, { useState } from 'react';
import { StyleSheet,View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = getAuth();
  const handleSignUp = () => {
    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address i.e. @domai.com');
      return;
    }

    // Password validation
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigation.navigate('UploadFile')
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert(`Email address already in use.`);
          break;
        case 'auth/invalid-email':
          alert(`Email address is invalid.`);
          break;
        case 'auth/operation-not-allowed':
          alert(`Error during sign up.`);
          break;
        case 'auth/weak-password':
          alert('Password is not strong enough. Add additional characters including special characters and numbers.');
          break;
        default:
          alert(error.message);
          break;
      }
    });
    
  };

  return (
  
    <View style={{ color:'white',backgroundColor:'black',flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Sign Up</Text> */}
      
      <View style={{marginTop:60,...styles.inputView}}>
      <TextInput
        style={{ ...styles.TextInput}}
        placeholder="Email"
        onChangeText={(inputEmail) => setEmail(inputEmail)}
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        style={{ ...styles.TextInput}}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(inputPass) => setPassword(inputPass)}
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        style={{ ...styles.TextInput}}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(inputConfirmPass) => setConfirmPassword(inputConfirmPass)}
      />
      </View>
       <TouchableOpacity
        style={styles.signUpBtn}
        onPress={handleSignUp}
        // onPress={() => navigation.navigate('Home')}

      >
        <Text style={{ color: 'white' ,...styles.signUpText}}>Sign Up</Text>
      
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10 }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{color:'white'}}>Already have an account? Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 0,marginBottom:20}}
        onPress={() => navigation.navigate('Home')}
      >
       <Text style={{color:'white'}}>Go to Home Page</Text>
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
  signUpBtn:
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
  signUpText:{
    fontSize:18,
    color : colors.text,
    fontWeight:'bold'
  },
  inputView: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: "70%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
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
    marginTop: 60,
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
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 5,
    color: colors.gray,
  }
})


export default Signup;
