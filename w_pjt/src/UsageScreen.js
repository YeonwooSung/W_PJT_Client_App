import React from 'react'
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { PieChart } from 'react-native-svg-charts'

import {LoadingScreen, _TIMESTAMP_TO_TIME} from './utils/utils'
import HomeHeader from './components/HomeHeader'
import Footer from './components/Footer'


const {width, height} = Dimensions.get('window');

const GRAPH_WIDTH  = (width / 2);
const GRAPH_HEIGHT = (height / 2);

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

            let [data, max_continuous_count, startDatetime, endDatetime] = this.processData(usageData);

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

        let startingElement = usageData[0];
        let startingStatus = startingElement['status'];
        let startingTimestamp = startingElement['timestamp'];
        let startingIndex = 0;
        let piechart_key = 0;

        let currentObj = {
            status: startingStatus,
            key: piechart_key,
            continuousCount: 1,
            svg: {
                fill: 'red'
            }
        }

        let max_continuous_count = 0;
        let length = usageData.length;
        for (let i = 1; i < length; i++) {
            let element = usageData[i];
            let {timestamp, status} = element;
            //let datetime = new Date(timestamp * _TIMESTAMP_TO_TIME);

            if (startingStatus != status) {
                currentObj.continuousCount = (i - (startingIndex - 1)); //(i - (startingIndex + 1));
                currentObj.svg = { fill: (startingStatus == 'PUTON' ? 'blue' : 'red') }

                if (currentObj.continuousCount > max_continuous_count) max_continuous_count = currentObj.continuousCount;

                data.push(currentObj);

                startingStatus = status;
                startingTimestamp = timestamp;
                startingIndex = i;
                piechart_key += 1

                currentObj = {
                    status: startingStatus,
                    key: piechart_key,
                    continuousCount: 1,
                    svg: {
                        fill: 'red'
                    }
                }
            }
        }

        currentObj.continuousCount = (length - 1 - (startingIndex - 1));
        currentObj.svg = { fill: (startingStatus == 'PUTON' ? 'blue' : 'red') }
        if (currentObj.continuousCount > max_continuous_count) max_continuous_count = currentObj.continuousCount;
        data.push(currentObj);

        //start datetime & end datetime
        let startDatetime = new Date(startingElement['timestamp'] * _TIMESTAMP_TO_TIME);
        let endDatetime = new Date(usageData[length - 1]['timestamp'] * _TIMESTAMP_TO_TIME);

        return [data, max_continuous_count, startDatetime, endDatetime];
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
                    <View style={styles.innerContainer}>
                        <PieChart 
                            style={styles.pieChart} 
                            valueAccessor={({ item }) => item.continuousCount} 
                            //outerRadius={'100%'} 
                            innerRadius={20} 
                            data={data} 
                        />
                        {/* </PieChart> */}
                    </View>
                    <Footer/>
                </View>
            );
        }

        return (<LoadingScreen/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
    },
    innerContainer: {
        padding: 0,
        flex: 1,
    },
    pieChart: {
        width: GRAPH_WIDTH,
        height: GRAPH_HEIGHT,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});
