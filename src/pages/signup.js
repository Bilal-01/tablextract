import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up Screen</Text>
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
      <TextInput
        style={{ marginTop: 20, padding: 10, borderWidth: 1 }}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(inputConfirmPass) => setConfirmPassword(inputConfirmPass)}
      />
       <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}
        onPress={handleSignUp}
        // onPress={() => navigation.navigate('Home')}

      >
        <Text style={{ color: 'white' }}>Sign Up</Text>
      
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10 }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10 }}
        onPress={() => navigation.navigate('Home')}
      >
        <Text>Go to Home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
