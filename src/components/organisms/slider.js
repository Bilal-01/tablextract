import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function CustomSlider({ 
  value,
  onValueChange, 
  title, 
  step=1,
  min=0,
  max=200 
}){

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        maximumTrackTintColor={colors.primary}
        minimumTrackTintColor={colors.secondary}
        thumbTintColor={colors.secondary}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.rangeText, { 
          position: 'absolute', 
          left: 25, 
          bottom: 15, 
          fontSize: 10
        }]}>
          {min}
        </Text>
        <Text style={[styles.rangeText, { 
          position: 'absolute', 
          right: 20, 
          bottom: 15, 
          fontSize: 10,
        }]}>
          {max}
        </Text>
        <Text style={[styles.text, { 
          position: 'absolute', 
          bottom: 55, 
          right: 20, 
          fontSize: 12 
        }]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const colors = {
  primary: '#F3E8FF',
  secondary: '#CE5959',
  base: '#BACDDB',
  gray: '#808080',
  base_f: '#454545',
  text: '#253e53',
  width: '100%',
};
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: -5,
    marginLeft: 0,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  rangeText: {
    color: colors.base_f,
    fontWeight: 'bold',
  },

});