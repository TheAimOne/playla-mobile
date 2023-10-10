import { NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';
import Layout from './Layout';
import Login from './pages/login/Login';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

const LinearGradient = require('expo-linear-gradient').LinearGradient

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  const loginSuccess = () => {
    setIsAuthenticated(true)
  }

  return (
    <NativeBaseProvider config={config} >
      <Provider store={store}>
        {!isAuthenticated && <Login loginSuccess={loginSuccess} />}
        {isAuthenticated && <Layout />}
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