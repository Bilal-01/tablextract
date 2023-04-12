import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>TABLEXTRACT</Text>
        {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity> */}
      </View>
      <ScrollView>

        <View style={styles.content}>
          <Text style={styles.sectionHeading}>Getting started with Tablextract</Text>
          <Text style={styles.contentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non
            fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa,
            scelerisque vitae, consequat in, pretium a, enim. Pellentesque
            congue. Ut in risus volutpat libero pharetra tempor. Cras
            vestibulum bibendum augue. Praesent egestas leo in pede. Praesent
            blandit odio eu enim. Pellentesque sed dui ut augue blandit
            sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris
            sed pede pellentesque fermentum. Maecenas adipiscing ante non
            diam sodales hendrerit.{' '}
          </Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonTextBlue}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        <Text style={styles.footerText}>Contact us at:</Text>
        <Text style={styles.footerText}>123 Main Street</Text>
        <Text style={styles.footerText}>Anytown, USA</Text>
        <Text style={styles.footerText}>Phone: (123) 456-7890</Text>
        <Text style={styles.footerText}>Email: info@myapp.com</Text>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0099ff',
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 10,
    justifyContent: 'center',
  },
  navbarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentText: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  signInButton: {
    backgroundColor: '#0099ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
  },

  signUpButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#0099ff',
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextBlue: {
    color: '#0099ff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  footerText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#eee',
  }

})
 
