import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './src/HomeScreen'

const AppStackNavigator = createStackNavigator({
  home: { screen: HomeScreen }
});
const Container = createAppContainer(AppStackNavigator);

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
      return <Container />;
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
