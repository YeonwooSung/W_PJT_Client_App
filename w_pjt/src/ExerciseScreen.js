import React from 'react'
import {
    ActivityIndicator,
    BackHandler,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'

import {LoadingScreen} from './utils/utils'


const _TIMESTAMP_TO_TIME = 1000;

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
                    {isRefreshing &&
                        <ActivityIndicator size="large" color="red"/>
                    }
                    <View 
                        style = {
                            {
                                paddingRight: 10,
                                paddingLeft: 10,
                                height: 400,
                                padding: 0,
                                flexDirection: "row"
                            }
                        }
                    >
                        <YAxis
                            data={data} 
                            yAccessor={({ item }) => item.amount} 
                            style={{ marginBottom: xAxisHeight }} 
                            contentInset={verticalContentInset} 
                            svg={yAxesSvg} 
                            formatLabel={value => (typeof value == 'number') ? value : `${value}`} 
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
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
                                    //return "     " + dateFns.format(value, "HH:mm");
                                    //TODO if (...) return ""  ->  to show only some of x values
                                    return "     " + value.toString();
                                    }
                                }
                                contentInset={{ left: 10, right: 10 }}
                                svg={xAxesSvg}
                            />
                        </View>
                    </View>
                </View>
            );
        }

        return (<LoadingScreen/>);
    }
}

const yyyyMMddhhmm = () => {
    var MM = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var hh = this.getHours();
    var mm = this.getMinutes();

    return [
        //this.getFullYear(),
        (MM > 9 ? '' : '0') + MM,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm
    ].join('');
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});
