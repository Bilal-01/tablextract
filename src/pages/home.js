import React from 'react';
import { Image,StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/logo.png';




export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
      <Image source={logo} style={styles.logo} />
        <Text style={styles.navbarTitle}>Tablextract</Text>
        {/* <Text style={styles.navbarTitle}>TABLEXTRACT</Text> */}
        {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="base" />
        </TouchableOpacity> */}
      </View>
      <ScrollView>

        <View style={styles.content}>
          {/* <Text style={styles.sectionHeading}>Getting started with Tablextract</Text> */}
          <Text style={styles.contentText}>
            Welcome to Tablextract, the easiest way to extract data from invoices and other documents. Simply upload a JPG file of your invoice, and our advanced algorithms will automatically extract all of the relevant data.You can then convert this data to a CSV file and download it for further analysis or integration with your accounting software.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        <Text style={styles.footerText}>Contact Us</Text>
        <Text style={styles.footerText}>tablextract.app@gmail.com</Text>
      </View>
      </ScrollView>
    </View>
  );
}
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
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 0,
    justifyContent: 'center',
  },
  navbarTitle: {
    color: colors.text,
    fontSize: 40,
    fontWeight:'bold',
    // fontFamily: 'Arial',
    letterSpacing: 2,
  }
  ,
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingVertical: 20,
  },
  contentText: {
    marginTop:15,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    color:'white',

  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white',
  },

  loginButton: {
  backgroundColor: colors.primary,
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 30,
  marginBottom: 5,
  marginTop: 20,
  width: 200,
  alignSelf:'center'
},

signUpButton: {
  backgroundColor: colors.base,
  borderColor: colors.base,
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 30,
  marginBottom: 5,
  marginTop: 5,
  borderWidth: 2,
  width: 200, 
  alignSelf:'center'
},

  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  footer: {
    backgroundColor: colors.base_f,
    padding: 10,
    alignItems: 'center',
    marginTop: 25
  },

  footerText: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 5,
    color: colors.gray,
  }

})
 
