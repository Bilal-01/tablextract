import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/home';
import Login from './src/pages/login';
import Signup from './src/pages/signup';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Testing my first application</Text> */}
      <Login />
      {/* <Signup /> */}
      {/* <Home /> */}
      <StatusBar style="auto" />
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
