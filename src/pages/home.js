import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CustomButton from '../components/atoms/CustomButton.js';

export default function Home({ navigation }) {
  return (
    <View styles = {styles.container}>
      <CustomButton
        title="Scan Doc" 
        onPressHandler={() => Alert.alert('Scanning Doc')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
