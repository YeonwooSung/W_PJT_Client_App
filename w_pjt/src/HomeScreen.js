import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'

import Footer from './components/Footer';
import HomeHeader from './components/HomeHeader';
import HomeScreenBody from './components/HomeScreenBody';
import {validateScreenName, LoadingScreen} from './utils/utils';


const {width, height} = Dimensions.get('window');

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isRefreshing: false,
            battery_status: 'empty',
            filter_cleaning_percentage: 0,
            filter_remaining_percentage: 0,
        };

        this.getData = this.getData.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount = () => {
        this.getData();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.refreshData();
        });
    }

    navigateTo = (screenName) => {
        let {navigate} = this.props.navigation;

        // validate the screen name
        if (validateScreenName(screenName)) {
            navigate(screenName);
            //this.props.navigation.navigate(screenName, {email: email});
        }
    }

    refreshData = async () => {
        this.setState({isRefreshing: true});
        await this.getData();
    }

    getData = async () => {
        const url_battery = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/battery'
        const url_cleaning = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/cleaning'
        const url_filter = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/filter'

        const new_battery_status = await this.getData_battery(url_battery);
        const new_filter_cleaning_percentage = await this.getData_cleaning(url_cleaning);
        const new_filter_remain_percentage = await this.getData_filter(url_filter);

        this.setState({
            isLoaded: true,
            isRefreshing: false,
            battery_status: new_battery_status,
            filter_cleaning_percentage: new_filter_cleaning_percentage,
            filter_remaining_percentage: new_filter_remain_percentage,
        });
    }

    getData_battery = async (url) => {
        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const batteryData = responseJson['battery'];
            const percentage = batteryData['status'];

            return percentage;
        } catch (error) {
            console.log(error);
            return this.state.battery_status
        }
    }

    getData_cleaning = async (url) => {
        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const batteryData = responseJson['cleaning'];
            const percentage = batteryData['percent'];

            return percentage;
        } catch (error) {
            console.log(error);
            return this.state.filter_cleaning_percentage;
        }
    }

    getData_filter = async (url) => {
        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const filterData = responseJson['filter'];
            const percentage = filterData['remain_percent'];

            return percentage;
        } catch (error) {
            console.log(error);
            return this.state.filter_remain_percentage;
        }
    }

    render() {
        let {
            isLoaded,
            isRefreshing,
            battery_status,
            filter_cleaning_percentage,
            filter_remaining_percentage
        } = this.state;

        if (isLoaded) {
            return (
                <SafeAreaView style={styles.body}>
                    <StatusBar/>
                    <View style={styles.container}>
                        <HomeHeader navigate={this.navigateTo} />
                        <HomeScreenBody 
                            isRefreshing={isRefreshing} 
                            battery_status={battery_status} 
                            filter_cleaning_percentage={filter_cleaning_percentage} 
                            filter_remaining_percentage={filter_remaining_percentage}
                        />
                    </View>
                    <Footer/>
                </SafeAreaView>
            );
        }

        return <LoadingScreen/>;
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        width: width,
        height: height
    },
});
