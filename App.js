import React, { useEffect } from 'react';
import { RouterConfig } from './src/Router/RouterConfig';
import SplashScreen from 'react-native-splash-screen'
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store/index';
import { StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { primaryColor } from './src/Common/Styles';
import { enableLatestRenderer } from 'react-native-maps';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserData } from './src/services/session/sessionAction';
import { notification } from './src/services/Manifestsession/ManifestAction';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import reactotron from 'reactotron-react-native';
enableLatestRenderer();


const App = () => {
  if (__DEV__) {
    import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
    );
  }

  useEffect(async () => {
    SplashScreen.hide();

    let userData = await AsyncStorage.getItem('userLoggedData')
    userData = JSON.parse(userData);
    if (Object.keys(userData).length > 0) {
      store.dispatch(updateUserData(userData));
    }
    registerAppWithFCM()

    store.dispatch(notification());

  }, [])
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }

  return (<>
    <StatusBar backgroundColor={primaryColor} />
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Provider store={store}>

          <RouterConfig />
        </Provider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </>
  );
};

export default App