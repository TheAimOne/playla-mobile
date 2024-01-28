import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Layout from './Layout';
import store from './store/store';

const LinearGradient = require('expo-linear-gradient').LinearGradient

const theme = extendTheme({
  fontConfig: {
    alkatra: {
      700: {
        normal: "Alkatra"
      }
    },
    kayana: {
      500: {
        normal: "Kayana"
      }
    }
  }
})

export default function App() {

  const [fontsLoaded, fontError] = Font.useFonts({
    'Alkatra': require('./assets/fonts/Alkatra-SemiBold.ttf'),
    'kayana': require('./assets/fonts/Kayana.otf')
  })

  useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const loginSuccess = () => {

  }

  return (
    <NativeBaseProvider config={config} theme={theme} >
      <Provider store={store}>
        {/* {!isAuthenticated && <Login loginSuccess={loginSuccess} />}
        {isAuthenticated && <Layout />} */}
        <Layout />
      </Provider>
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