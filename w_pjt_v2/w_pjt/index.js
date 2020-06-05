/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import Amplify from 'aws-amplify'
// import config from './aws-exports'

import App from './App';
import {name as appName} from './app.json';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

// Amplify.configure(config);
AppRegistry.registerComponent(appName, () => App);
