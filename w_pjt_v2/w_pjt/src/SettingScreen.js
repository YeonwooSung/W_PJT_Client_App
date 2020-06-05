import React from 'react'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    Keyboard,
    TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import {LoadingScreen} from './utils/utils';
import DatePickerView from './components/DatePickerView';
import * as theme from './utils/themes';


const {width, height} = Dimensions.get('window');

const ASYNC_STORAGE_KEY_DEVICE_NAME = 'w_pjt@deviceName';
const ASYNC_STORAGE_KEY_MINUTE      = 'w_pjt@minute';
const ASYNC_STORAGE_KEY_HOUR        = 'w_pjt@hour';
const ASYNC_STORAGE_KEY_LOCATION    = 'w_pjt@location'

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hour: (new Date().getHours()),
            minute: (new Date().getMinutes()),
            deviceName: '',
            location: '',
            isLoaded: false,
            timeIsStored: false,
        }

        this.changeDate = this.changeDate.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.setDeviceName_async = this.setDeviceName_async.bind(this);
        this.setHourAndMinute_async = this.setHourAndMinute_async.bind(this);
        this.setLocation_async = this.setLocation_async.bind(this);
    }

    componentDidMount = () => {
        this.getDataFromLocalStorage_async();
    }

    getDataFromLocalStorage_async = async () => {
        let {deviceName, location, minute, hour} = this.state;
        let timeIsStored = false;

        try {
            let new_deviceName = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_DEVICE_NAME);
            if (new_deviceName != null) deviceName = new_deviceName;

            let new_location = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_LOCATION);
            if (new_location != null) location = new_location;

            let new_hour = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_HOUR);
            if (new_hour != null) hour = new_hour;

            let new_minute = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_MINUTE);
            if (new_minute != null) minute = new_minute;

            // check if both minute and hour are stored
            if (new_minute != null && new_hour != null) timeIsStored = true;
        } catch (error) {
            console.log(error);
        }

        this.setState({
            isLoaded: true, 
            timeIsStored: timeIsStored,
            deviceName: deviceName, 
            location: location, 
            hour: hour, 
            minute: minute
        });
    }

    changeDate = (date) => {
        let h = date.getHours()
        let m = date.getMinutes()

        this.setState({ hour: h, minute: m });
    }

    fetchData = async () => {
        const {hour, minute, deviceName, location} = this.state;

        const url = `https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/setting`;

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deviceName: deviceName,
                    location: location,
                    alertTime: {
                        h: hour,
                        m: minute
                    }
                })
            })

            console.log('fetch success');
        } catch (error) {
            console.error(error);
        }

        await this.setDeviceName_async(deviceName);
        await this.setHourAndMinute_async(`${hour}`, `${minute}`);
        await this.setLocation_async(location);

        this.props.navigation.goBack();
    }

    setLocation_async = async (location) => {
        try {
            await AsyncStorage.setItem(ASYNC_STORAGE_KEY_LOCATION, location);
        } catch (e) {
            console.log(e);
        }
    }

    setHourAndMinute_async = async (hour, minute) => {
        try {
            await AsyncStorage.setItem(ASYNC_STORAGE_KEY_HOUR, hour);
            await AsyncStorage.setItem(ASYNC_STORAGE_KEY_MINUTE, minute);
        } catch (e) {
            console.log(e);
        }
    }

    setDeviceName_async = async (deviceName) => {
        try {
            await AsyncStorage.setItem(ASYNC_STORAGE_KEY_DEVICE_NAME, deviceName);
        } catch (e) {
            console.log(e);
        }
    }

    renderBody = () => {
        const {hour, minute, deviceName, location, timeIsStored} = this.state;

        const placeholder_deviceName = (deviceName == '' ? 'Device Name' : deviceName);
        const placeholder_location = (location == '' ? 'Location' : location);

        return (
            <View style={styles.container}>
                <DatePickerView 
                    onDateChange={this.changeDate} 
                    hour={hour} 
                    minute={minute} 
                    useTimeString={timeIsStored} 
                />
                <TextInput style={styles.inputBox}
                    placeholder={placeholder_deviceName}
                    placeholderTextColor="#ffffff"
                    selectionColor="#1a3f95"
                    keyboardType="email-address"
                    onChangeText={(deviceName) => this.setState({ deviceName: deviceName })}
                    value={this.state.deviceName}
                />
                <TextInput style={styles.inputBox}
                    placeholder={placeholder_location}
                    placeholderTextColor="#ffffff"
                    selectionColor="#1a3f95"
                    onChangeText={(location) => this.setState({ location: location })}
                    value={this.state.location}
                />
                <TouchableOpacity style={styles.buttonBox} onPress={() => this.fetchData()}>
                    <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {isLoaded} = this.state;

        if (!isLoaded) {
            return (<LoadingScreen/>)
        }

        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.select({ ios: 0, android: width / 3 })}
                style={styles.keyboardAvoidingContainer}
                behavior={Platform.OS === "ios" ? "padding" : null}
                enabled
            >
                <SafeAreaView style={styles.root}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView>
                            {this.renderBody()}
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    root: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height / 7
    },
    inputBox: {
        width: width * 4 / 5,
        height: height / 15,
        backgroundColor: theme.colors.lightseagreen,
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: width / 25,
        color: "white",
        marginVertical: width / 15,
        textAlign: 'center'
    },
    buttonBox: {
        width: width * 4 / 5,
        height: height / 15,
        backgroundColor: 'darkgray', //'#a8a9ad'
        borderRadius: 25,
        marginVertical: width / 15,
        paddingVertical: 5,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: width / 25,
        fontWeight: '500',
        color: 'white', //'#1a3f95'
        textAlign: 'center'
    },
});
