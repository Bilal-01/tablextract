import React, { useState } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

const MySlider = () => {
  const [value, setValue] = useState(0);

  const handleValueChange1 = (newValue) => {
    setValue(newValue);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={200}
        step={1}
        value={topValue}
        onValueChange={handleValueChange1}
        maximumTrackTintColor={colors.primary}
        minimumTrackTintColor={colors.secondary}
        thumbTintColor={colors.secondary}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {leftValue}
        </Text>
      </View>
    </View>
  );
}
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
  },
  textContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -20 }],
    top: -30,
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
