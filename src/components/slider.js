import React, { useState } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

const MySlider = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);

  const handleValueChange1 = (newValue) => {
    setValue1(newValue);
  };

  const handleValueChange2 = (newValue) => {
    setValue2(newValue);
  };

  const handleValueChange3 = (newValue) => {
    setValue3(newValue);
  };

  const handleValueChange4 = (newValue) => {
    setValue4(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text style={styles.title}>Slider 1</Text>
        <View style={styles.sliderInfo}>
          <Text style={styles.infoText}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={200}
            step={1}
            value={value1}
            onValueChange={handleValueChange1}
            minimumTrackTintColor="gray"
            maximumTrackTintColor="red"
            thumbTintColor="yellow"
          />
          <Text style={styles.infoText}>200</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.title}>Slider 2</Text>
        <View style={styles.sliderInfo}>
          <Text style={styles.infoText}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={200}
            step={1}
            value={value2}
            onValueChange={handleValueChange2}
            minimumTrackTintColor="gray"
            maximumTrackTintColor="red"
            thumbTintColor="yellow"
          />
          <Text style={styles.infoText}>200</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.title}>Slider 3</Text>
        <View style={styles.sliderInfo}>
          <Text style={styles.infoText}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={200}
            step={1}
            value={value3}
            onValueChange={handleValueChange3}
            minimumTrackTintColor="gray"
            maximumTrackTintColor="red"
            thumbTintColor="yellow"
          />
          <Text style={styles.infoText}>200</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.title}>Slider 4</Text>
        <View style={styles.sliderInfo}>
          <Text style={styles.infoText}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={200}
            step={1}
            value={value4}
            onValueChange={handleValueChange4}
            minimumTrackTintColor="gray"
            maximumTrackTintColor="red"
            thumbTintColor="yellow"
          />
          <Text style={styles.infoText}>200</Text>
        </View>
      </View>
   
