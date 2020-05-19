import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { PieChart } from 'react-native-svg-charts'

import {LoadingScreen, _TIMESTAMP_TO_TIME} from './utils/utils'


export default class UsageScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isRefreshing: false,
            data: [],
            times: [],
            maxAmount: 0,
            error: false
        }

        this.receiveData = this.receiveData.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount = () => {
        this.receiveData();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.refreshData();
        });
        //TODO this.blurListener = this.props.navigation.addListener('willBlur', payload => {});
    }

    refreshData = async () => {
        this.setState({isRefreshing: true});
        await this.receiveData();
    }

    receiveData = async () => {
        let url = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/usage?m=5&d=17';

        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const usageData = responseJson['usage'];

            let data = this.processData(usageData);

            this.setState({
                isLoaded: true,
                isRefreshing: false,
                data: data
            });
        } catch (error) {
            this.setState({ isLoaded: true, isRefreshing: false, error: true});

            console.log(error);
        }
    }

    processData = (usageData) => {
        let data = [];

        //TODO algorithm....

        let length = usageData.length;
        for (let i = 0; i < length; i++) {
            let element = usageData[i];
            let {timestamp, status} = element;
            let datetime = new Date(timestamp * _TIMESTAMP_TO_TIME);

            //TODO data.push({status: status, time: datetime});
        }

        return data;
    }

    render() {
        let {isLoaded, isRefreshing, data, error} = this.state;

        // check if error is occurred while fetching data.
        if (error) {
            return (
                <View style={styles.container}>
                    {isRefreshing &&
                        <ActivityIndicator size="large" color="red"/>
                    }
                </View>
            )
        }

        if (isLoaded) {
            return (
                <View style={styles.container}>
                    <HomeHeader passBatteryStatus={false} />
                    {isRefreshing &&
                        <ActivityIndicator size="large" color="red"/>
                    }
                </View>
            );
        }

        return (<LoadingScreen/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});
