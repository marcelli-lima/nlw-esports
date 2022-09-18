import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';

import { getPushNotificationToken } from './src/services/getPushNotificationToken'
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import './src/services/notificationConfigs';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotifictionListenes = useRef<Subscription>();
  const responseNotifictionListenes = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getNotifictionListenes.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseNotifictionListenes.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if(getNotifictionListenes.current && responseNotifictionListenes.current ){
        Notifications.removeNotificationSubscription(getNotifictionListenes.current);
        Notifications.removeNotificationSubscription(responseNotifictionListenes.current);
      }
    }
  },[])
  
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading/> }
    </Background>
  );
}
