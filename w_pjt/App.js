import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './src/HomeScreen'

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
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a3f95',
  },
});
