import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import Footer from './components/Footer';
import HomeHeader from './components/HomeHeader';
import HomeScreenBody from './components/HomeScreenBody';
import BatteryStatusView from './components/BatteryStatusView';
import {LoadingScreen} from './utils/utils';
import * as theme from './utils/themes';


const {width, height} = Dimensions.get('window');
const ASYNC_STORAGE_KEY = 'w_pjt@deviceName';

const URL_BATTERY = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/battery'
const URL_CLEANING = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/cleaning'
const URL_FILTER = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/filter'

const URL_USAGE = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/usage'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isRefreshing: false,
            battery_status: 'empty',
            filter_cleaning_percentage: 0,
            filter_remaining_percentage: 0,
            period: 7,
            usage_times: [],
            usage_values: [],
        };

        this.getData = this.getData.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setPeriod = this.setPeriod.bind(this);
        this.navigateToSettings = this.navigateToSettings.bind(this);
        this.updatePeriodAndData = this.updatePeriodAndData.bind(this);
    }

    componentDidMount = () => {
        this.getData();
    }

    setPeriod = (new_period) => {
        const {period} = this.state;

        // do nothing if the value of new period is equal to the value of current period
        if (period == new_period) return;

        this.setState({period: new_period});
        this.refreshData();
    }

    refreshData = async () => {
        this.setState({isRefreshing: true});
        await this.getData();
    }

    getData = async () => {
        const deviceName = await this.getDeviceName_async();
        const {period} = this.state;

        const date = new Date();
        const m = (date.getMonth() + 1);
        const d = date.getDate();

        const url_battery = `${URL_BATTERY}?deviceName=${deviceName}`
        const url_cleaning = `${URL_CLEANING}?deviceName=${deviceName}`
        const url_filter = `${URL_FILTER}?deviceName=${deviceName}`
        const url_usage = `${URL_USAGE}?deviceName=${deviceName}&m=${m}&d=${d}&period=${period}`;

        const new_battery_status = await this.getData_battery(url_battery);
        const new_filter_cleaning_percentage = await this.getData_cleaning(url_cleaning);
        const new_filter_remain_percentage = await this.getData_filter(url_filter);
        const [usage_dates, usage_values] = await this.getData_usage(url_usage, period);

        this.setState({
            isLoaded: true,
            isRefreshing: false,
            battery_status: new_battery_status,
            filter_cleaning_percentage: new_filter_cleaning_percentage,
            filter_remaining_percentage: new_filter_remain_percentage,
            usage_values: usage_values,
            usage_times: usage_dates,
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

    getData_usage = async (url, period) => {
        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const events = responseJson['events'];

            return (period == 1 ? this.processData_period1(events) : this.processData_period7(events));
        } catch (error) {
            console.log(error);
            return [[], []];
        }
    }

    processData_period1 = (events) => {
        try {
            let dates = [];
            let values = [];

            for (let i = 0; i < events.length; i++) {
                let {amount, timestamp} = events[i];
                const date = new Date(timestamp * 1000);

                values.push({val: amount, time: date, svg: { fill: '#02a0b6' }});
                dates.push(date);
            }

            return [dates, values];
        } catch (error) {
            console.log(error);
            return [[], []]
        }
    }

    processData_period7 = (events) => {
        try {
            let dates = [];
            let values = [];
            let current_amount = events[0].amount;
            let current_date = new Date(events[0].timestamp * 1000);
            let current_month = (current_date.getMonth() + 1);
            let current_day = current_date.getDate();

            for (let i = 1; i < events.length; i++) {
                let {amount, timestamp} = events[i];
                const date = new Date(timestamp * 1000);
                const month = (date.getMonth() + 1)
                const day = date.getDate();

                if (day != current_day || month != current_month) {
                    dates.push(current_date);
                    const day_val = current_day;
                    const month_val = current_month;
                    values.push({val: current_amount, time: current_date, svg: { fill: '#02a0b6', onPress: () => this.updatePeriodAndData(month_val, day_val) }});

                    current_amount = amount;
                    current_date = date;
                    current_month = month;
                    current_day = day;
                } else {
                    current_amount += amount;
                }
            }

            const month_val = current_month;
            const day_val = current_day;
            values.push({val: current_amount, time: current_date, svg: { fill: '#02a0b6', onPress: () => this.updatePeriodAndData(month_val, day_val) }});
            dates.push(current_date);

            return [dates, values];
        } catch (error) {
            console.log(error);
            return [[], []]
        }
    }

    updatePeriodAndData = async (m, d) => {
        this.setState({isRefreshing: true});

        const deviceName = await this.getDeviceName_async();
        const url_usage = `${URL_USAGE}?deviceName=${deviceName}&m=${m}&d=${d}&period=1`;
        const [usage_dates, usage_values] = await this.getData_usage(url_usage, 1);

        this.setState({
            isRefreshing: false,
            usage_values: usage_values,
            usage_times: usage_dates,
            period: 1
        });
    }

    getDeviceName_async = async () => {
        const default_deviceName = 'client-id-1';
        try {
            const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            return (value == null ? default_deviceName : value);
        } catch(e) {
            console.log(e);
            return default_deviceName;
        }
    }

    setDeviceName_async = async (deviceName) => {
        try {
            await AsyncStorage.setItem(ASYNC_STORAGE_KEY, deviceName);
        } catch(e) {
            console.log(e);
        }
    }

    navigateToSettings = () => {
        this.props.navigation.navigate('setting');
    }

    renderColorLabel = () => {
        let {battery_status} = this.state;

        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: width / 30, marginTop: 10}}>
                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                        <View style={{width: 10, height: 10, backgroundColor: theme.colors.gray, alignSelf: 'center'}}/>
                        <Text style={{fontSize: width / 30, alignSelf: 'center', textAlign: 'center', marginLeft: 5}}>사용</Text>
                    </View>
                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                        <View style={{width: 10, height: 10, backgroundColor: theme.colors.lightseagreen, alignSelf: 'center', marginLeft: 20}}/>
                        <Text style={{fontSize: width / 30, alignSelf: 'center', textAlign: 'center', marginLeft: 5}}>잔여</Text>
                    </View>
                </View>
                <BatteryStatusView batteryStatus={battery_status}/>
            </View>
        );
    }

    render() {
        let {
            isLoaded,
            isRefreshing,
            battery_status,
            filter_cleaning_percentage,
            filter_remaining_percentage,
            usage_values,
            usage_times,
            period
        } = this.state;

        if (isLoaded) {
            return (
                <SafeAreaView style={styles.body}>
                    <StatusBar />
                    <View style={styles.container}>
                        <HomeHeader navigateToSettings={this.navigateToSettings}/>
                        {this.renderColorLabel()}
                        {/* <BatteryStatusView batteryStatus={battery_status}/> */}
                        <HomeScreenBody
                            isRefreshing={isRefreshing}
                            filter_cleaning_percentage={filter_cleaning_percentage}
                            filter_remaining_percentage={filter_remaining_percentage}
                            usage_values={usage_values}
                            usage_times={usage_times}
                            changePeriod={this.setPeriod}
                            period={period}
                        />
                        <Footer refresh={this.refreshData} />
                    </View>
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
        backgroundColor: 'white'
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        width: width,
        height: height
    },
});
