import React from 'react';
import {Alert} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import {LoadingScreen} from './src/utils/utils'
import HomeScreen from './src/HomeScreen'
import SettingScreen from './src/SettingScreen'


const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount = () => {
    this.checkPermission();
    this.listenForNotifications();
    this.setState({isLoaded: true});
  }

  componentWillUnmount(){
    this.notificationOpenedListener();
    this.messageListener();
  }

  async checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      // execute when user has permissions
      this.updateTokenToServer();
    } else {
      // execute when the user doesn't have permission
      this.requestPermission();
    }
  }

  listenForNotifications = async () => {
    //TODO  need to test
    this.notificationOpenedListener = messaging().onNotificationOpenedApp((notificationOpen) => {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    });

    this.messageListener = messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });

    const notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
        console.log('getInitialNotification', notificationOpen);
    }
  }

  async requestPermission(){
    try {
      // User has authorised
      await messaging().requestPermission();

      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }

      await this.updateTokenToServer();
    } catch (error) {
        // User has rejected permissions
        alert("you can't handle push notification");
    }
  }

  async updateTokenToServer(){
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    let {isLoaded} = this.state;

    if (isLoaded) {
      return (
        <NavigationContainer initialRouteName="home">
          <Stack.Navigator>
            <Stack.Screen 
              options={{
                headerShown:false
              }} 
              name="home" 
              component={HomeScreen}
            />
            <Stack.Screen 
              name="setting" 
              component={SettingScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return <LoadingScreen/>
  }
}
