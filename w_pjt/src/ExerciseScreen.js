import React from 'react'
import {
    ActivityIndicator,
    BackHandler,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'

import {LoadingScreen, _TIMESTAMP_TO_TIME} from './utils/utils'
import HomeHeader from './components/HomeHeader'



const xAxesSvg = {
    fontSize: 12,
    fill: "black",
    rotation: 70,
    originY: 15,
    y: 10
};
const yAxesSvg = {
    fontSize: 12,
    fill: "black"
};
const verticalContentInset = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
};
const xAxisHeight = 50;

const {height} = Dimensions.get('window');

export default class ExerciseScreen extends React.Component {
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
        this.refreshData();
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
        let url = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/exercise?m=5&d=17';

        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const exerciseData = responseJson['exercise'];

            let [data, time_array, maxAmount] = this.processData(exerciseData);

            this.setState({
                isLoaded: true,
                isRefreshing: false,
                times: time_array,
                data: data,
                maxAmount: maxAmount
            });
        } catch (error) {
            this.setState({ isLoaded: true, isRefreshing: false, error: true});

            console.log(error);
        }
    }

    processData = (exerciseData) => {
        let data = [];
        let times = [];
        let maxAmount = 0;

        //TODO times -> 모든 시간 데이터를 다 넣기 보다는 그 중 일부만 넣는 것은 어떨까?

        exerciseData.forEach(element => {
            let {timestamp, amount} = element;
            let datetime = new Date(timestamp * _TIMESTAMP_TO_TIME);
            data.push({amount: amount, time: datetime});
            times.push({datetime: datetime});

            if (amount > maxAmount) maxAmount = amount;
        });

        let firstElement = times[0];
        let middleElement = times[(times.length / 2)];
        let lastElement = times[times.length - 1];
        times = [];
        times.push(firstElement);
        times.push(middleElement);
        times.push(lastElement);

        return [data, times, maxAmount];
    }

    render() {
        let {isLoaded, isRefreshing, data, times, maxAmount, error} = this.state;

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
                    <View style={styles.svgChartsContainer}>
                        <YAxis
                            data={data} 
                            yAccessor={({ item }) => item.amount} 
                            style={{ marginBottom: xAxisHeight }} 
                            contentInset={verticalContentInset} 
                            svg={yAxesSvg} 
                            formatLabel={value => (typeof value == 'number') ? value : `${value}`} 
                        />
                        <View style={styles.lineChartContainer}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={data}
                                yAccessor={({ item }) => item.amount}
                                xAccessor={({ item }) => item.time}
                                yMin={0}
                                yMax={maxAmount}
                                xMin={times[0].time}
                                xMax={times[times.length - 1].time}
                                contentInset={verticalContentInset}
                                svg={{ stroke: "rgb(134, 65, 244)" }}
                            >
                            <Grid />
                            {/* <Decorator /> */}
                            </LineChart>
                            <XAxis
                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                data={times}
                                xAccessor={({ item }) => item.datetime} 
                                formatLabel={value => {
                                    //need spaces in order for last time ti fit in screen-else it disappears
                                    //return "     " + dateFns.format(value, "HH:mm");  ->  utils.yyyyMMddhhmm(date) ??
                                    //TODO if (...) return ""  ->  to show only some of x values
                                    return "     " + value.toString();    
                                }}
                                contentInset={{ left: 10, right: 10 }}
                                svg={xAxesSvg}
                            />
                        </View>
                    </View>
                    {/* <View></View> */}
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
    svgChartsContainer: {
        paddingRight: 10,
        paddingLeft: 10,
        height: height / 2,
        padding: 0,
        flexDirection: "row",
        justifyContent: 'center'
    },
    lineChartContainer: {
        flex: 1,
        marginLeft: 10
    }
});
