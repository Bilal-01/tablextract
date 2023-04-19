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
      console.log('user created')
      console.log(email)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up Screen</Text>
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
      <TextInput
        style={{ marginTop: 20, padding: 10, borderWidth: 1 }}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
       <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}
        // onPress={handleSignUp}
        onPress={() => navigation.navigate('Home')}

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
