import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Footer from './components/Footer';
import HomeHeader from './components/HomeHeader';
import ModeButtonContainer from './components/ModeButtonContainer';
import HomeScreenBody from './components/HomeScreenBody';
import HomeScreenCards from './components/HomeScreenCards';
import {validateScreenName} from './utils';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 1,
            isLoaded: false
        };

        this.selectMode = this.selectMode.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }

    componentDidMount = () => {
        this.setState({isLoaded: true});
    }

    selectMode = (newMode) => {
        //TODO
        this.setState({selected: newMode});
    }

    navigateTo = (screenName) => {
        let {navigate} = this.props.navigation;

        // validate the screen name
        if (validateScreenName(screenName)) {
            navigate(screenName);
            //this.props.navigation.navigate(screenName, {email: email});
        }
    }

    render() {
        let {isLoaded, selected} = this.state;

        if (isLoaded) {
            return (
                <View style={styles.body}>
                    <StatusBar/>
                    <View style={styles.container}>
                        <HomeHeader navigate={this.navigateTo} />
                        <HomeScreenBody/>
                        <HomeScreenCards/>
                        <ModeButtonContainer selected={selected} execOnPress={this.selectMode} />
                    </View>
                    <Footer/>
                </View>
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
    body: {
        flex: 1
    },
    container: {
        flex: 1
    },
});
