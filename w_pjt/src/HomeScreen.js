import React from 'react';
import {
    StatusBar,
    Text,
    View,
} from 'react-native'

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
            selected: 1
        };

        this.selectMode = this.selectMode.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    selectMode = (newMode) => {
        //TODO
        this.setState({selected: newMode});
    }

    navigateTo = (screenName) => {
        if (validateScreenName(screenName)) {
            //this.props.navigation.navigate(screenName);
            //this.props.navigation.navigate(screenName, {email: email});
        }
    }

    render() {
        let {selected} = this.state;

        //TODO more codes...

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
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    container: {
        flex: 1
    },
});
