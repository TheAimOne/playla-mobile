import { NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';
import Layout from './Layout';
import Login from './pages/login/Login';
import React from 'react';

const LinearGradient = require('expo-linear-gradient').LinearGradient

// SplashScreen.preventAutoHideAsync()

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  const loginSuccess = () => {
    console.log("auth")
    setIsAuthenticated(true)
  }

  return (
    <NativeBaseProvider config={config} >
      {!isAuthenticated && <Login loginSuccess={loginSuccess} />}
      {isAuthenticated && <Layout />}
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