import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Button,
    View,
    Text,
    Alert,
  } from 'react-native';


export default function CustomButton(props) {
  return (
    <View style={styles.container}>
      <Button
        title = {props.title}
        onPress = {props.onPressHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    
});
