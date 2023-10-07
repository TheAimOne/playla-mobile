import { NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';
import Layout from './Layout';

const LinearGradient = require('expo-linear-gradient').LinearGradient

// SplashScreen.preventAutoHideAsync()

export default function App() {

  return (
    <NativeBaseProvider config={config} >
      <Layout />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20
  }
});

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}