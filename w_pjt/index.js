/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Amplify from 'aws-amplify'
import config from './aws-exports'

import App from './App';
import {name as appName} from './app.json';

Amplify.configure(config);
AppRegistry.registerComponent(appName, () => App);
