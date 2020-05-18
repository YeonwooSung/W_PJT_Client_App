import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import {LoadingScreen} from './src/utils/utils'
import HomeScreen from './src/HomeScreen'
import FilterManagementScreen from './src/FilterManagementScreen'

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount = () => {
    this.setState({isLoaded: true});
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
              name="filterManagement" 
              component={FilterManagementScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return <LoadingScreen/>
  }
}
