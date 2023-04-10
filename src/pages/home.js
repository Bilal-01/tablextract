import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Extraction App</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ScanScreen')}
      >
        <Text style={styles.buttonText}>Scan Document</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#0099ff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minWidth: 300,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
