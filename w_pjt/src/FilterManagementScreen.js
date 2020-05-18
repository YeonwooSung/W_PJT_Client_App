import React from 'react'
import {
    ActivityIndicator,
    BackHandler,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'

import {LoadingScreen} from './utils/utils'

export default class FilterManagementScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isRefreshing: false,
            remain_percent: 0,
        }

        this.receiveData = this.receiveData.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount = () => {
        this.refreshData();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.refreshData();
        });
        //TODO this.blurListener = this.props.navigation.addListener('willBlur', payload => {});
    }

    refreshData = async () => {
        this.setState({isRefreshing: true});
        await this.receiveData();
    }

    receiveData = async () => {
        let url = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/filter';

        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const filterData = responseJson['filter'];
            const percentage = filterData['remain_percent'];

            this.setState({
                isLoaded: true,
                isRefreshing: false,
                remain_percent: percentage
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let {isLoaded, isRefreshing, remain_percent} = this.state;

        if (isLoaded) {
            return (
                <View style={styles.container}>
                    {isRefreshing &&
                        <ActivityIndicator size="large" color="red"/>
                    }
                    <Text>{remain_percent}</Text>
                </View>
            );
        }

        return <LoadingScreen/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
