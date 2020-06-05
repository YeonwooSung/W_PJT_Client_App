import React from 'react'
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native'
import PropTypes from 'prop-types';
import {
    Text as SVGText,
    G,
} from 'react-native-svg'
import {
    StackedBarChart,
    YAxis,
    XAxis,
    BarChart,
    Grid
} from 'react-native-svg-charts'

import * as theme from '../utils/themes';

var uuid = require('react-native-uuid');


// constants for components' sizes
const {width, height} = Dimensions.get('window');
const GRAPH_CONTAINER_WIDTH  = width / 2 - 20;
const GRAPH_CONTAINER_HEIGHT = (height / 4);

// constants for keys of bar charts
const KEYS = ['colored', 'gray'];

// lists of colors
const COLORS  = [theme.colors.lightseagreen, theme.colors.gray]


export default class HomeScreenBody extends React.Component {
    constructor(props) {
        super(props);

        this.renderStackedBarCharts = this.renderStackedBarCharts.bind(this);
        this.renderStackedBarChart = this.renderStackedBarChart.bind(this);
        this.renderBarCharts = this.renderBarCharts.bind(this);
    }

    static propTypes = {
        isRefreshing: PropTypes.bool.isRequired,
        filter_cleaning_percentage: PropTypes.number.isRequired,
        filter_remaining_percentage: PropTypes.number.isRequired,
        usage_values: PropTypes.array.isRequired,
        usage_times: PropTypes.array.isRequired,
        changePeriod: PropTypes.func.isRequired,
        period: PropTypes.number.isRequired,
    }

    renderStackedBarChart = (percentage_value, keys) => {
        const contentInset = { top: 30, bottom: 30, right: 30 }
        const data = [{ colored: percentage_value, gray: (100 - percentage_value) }];

        const Label = ({ x, y, width, height }) => {
            const completed = percentage_value;
            const val = `${completed}%`;

            return(
                <G>
                    <SVGText
                        key={1}
                        y={height / 5 * 3}
                        x={width / 2 - 15}
                        fill={'white'}
                        alignmentBaseline={'baseline'}
                        textAnchor={'middle'}
                        fontSize={theme.sizes.h3}
                    >
                        {val}
                    </SVGText>
                </G>
            );
        }
        const PercentageLabels = ({x, y, width, height}) => {
            const percentage_str_100 = '100%';
            const percentage_str_50  = '50';
            const percentage_str_0   = '0';

            const widthVal = width - 30;
            const fontSize = 12;

            return (
                <G>
                    <SVGText
                        key={100}
                        y={30}
                        x={widthVal}
                        fontSize={fontSize}
                        fill={'gray'}
                        alignmentBaseline={'top'}
                    >
                        {percentage_str_100}
                    </SVGText>
                    <SVGText
                        key={50}
                        y={height / 2}
                        x={widthVal}
                        fontSize={fontSize}
                        fill={'gray'}
                        alignmentBaseline={'middle'}
                    >
                        {percentage_str_50}
                    </SVGText>
                    <SVGText
                        key={1000}
                        y={height - 30}
                        x={widthVal}
                        fontSize={fontSize}
                        fill={'gray'}
                        alignmentBaseline={'baseline'}
                    >
                        {percentage_str_0}
                    </SVGText>
                </G>
            );
        }

        return (
            <StackedBarChart
                style={styles.barchartSize}
                keys={keys}
                colors={COLORS}
                data={data}
                showGrid={false}
                contentInset={contentInset} 
            >
                <Label/>
                <PercentageLabels/>
            </StackedBarChart>
        );
    }

    renderStackedBarCharts = () => {
        const {
            filter_cleaning_percentage,
            filter_remaining_percentage,
        } = this.props;

        const str1 = 'UV Nano 살균 상태 ';
        const str2 = '집진 필터 상태 ';

        return (
            <View style={styles.bodyContainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.textContainer_stacked}>
                        <Text style={styles.text1}>{str1}</Text>
                        <Text style={styles.text2}>{str2}</Text>
                    </View>
                    <View>
                        {this.renderStackedBarChart(filter_cleaning_percentage, KEYS)}
                        {this.renderStackedBarChart(filter_remaining_percentage, KEYS)}
                    </View>
                </View>
                {this.renderBarCharts()}
            </View>
        );
    }

    renderBarCharts = () => {
        const contentInset = { top: 20, bottom: 20, left: 20, right: 20 };
        const axesSvg = { fontSize: 10, fill: 'grey' }
        const {usage_values, usage_times, changePeriod, period} = this.props;

        const formatLabel_period1 = (value) => (`${value.getHours()}`);
        const formatLabel_period7 = (value) => `${value.getDate()}`;

        const formatLabel = (period == 1 ? formatLabel_period1 : formatLabel_period7);

        // const Labels = ({ x, y, bandwidth, data }) => {
        //     console.log(data)
        // };
        const Title_X = ({ x, y, width, height }) => {
            const val = '(일)';

            return(
                <G>
                    <SVGText
                        key={'x'}
                        y={height - 5}
                        x={width - 10}
                        fill={'gray'}
                        alignmentBaseline={'baseline'}
                        textAnchor={'middle'}
                        fontSize={10}
                    >
                        {val}
                    </SVGText>
                </G>
            );
        }

        const Title_Y = ({x, y, width, height}) => {
            const val = '(L)';

            return (
                <G>
                    <SVGText
                        key={'y'} 
                        y={10}
                        x={6}
                        fill={'gray'}
                        alignmentBaseline={'baseline'} 
                        textAnchor={'middle'} 
                        fontSize={10}
                    >
                        {val}
                    </SVGText>
                </G>
            )
        }

        const Labels = ({x, y, bandwidth, data}) => (
            data.map((element, index) => {
                let value = element.val;

                if (value > 0) {
                    return (
                        <G key={uuid.v1()}>
                            <SVGText
                                y={y(value) - 3}
                                x={x(index)}
                                fontSize={10}
                                fill={'gray'}
                            >
                                {value}
                            </SVGText>
                        </G>
                    );
                }
            })
        );

        return (
            <View style={styles.usageBarChartContainer}>
                <View style={styles.textContainer}>
                    <Text 
                        style={{fontSize: width / 30, color: (period == 7 ? theme.colors.lightseagreen : 'black')}} onPress={() => changePeriod(7)}
                    >
                        최근 7일 사용량
                    </Text>
                    <Text style={{fontSize: width / 30}}>/</Text>
                    <Text 
                        style={{fontSize: width / 30, color: (period == 1 ? theme.colors.lightseagreen : 'black')}} 
                        onPress={() => changePeriod(1)}
                    >
                        오늘 사용량
                    </Text>
                </View>
                <View style={styles.usageBarChartContainer_yaxis}>
                    <YAxis
                        style={{ marginBottom: 0, height: height / 5 }} 
                        data={usage_values} 
                        spacing={0.1} 
                        contentInset={contentInset} 
                        yAccessor={({ item }) => item.val} 
                        formatLabel={(value) => `${value}`} 
                        svg={axesSvg} 
                        min={0} 
                    >
                        <Title_Y/>
                    </YAxis>
                    <View style={styles.usageBarChartContainer_xaxis}>
                        <BarChart
                            data={usage_values} 
                            contentInset={contentInset}
                            //svg={{ fill: '#02a0b6', onPress: (val) => console.log(val) }} 
                            yAccessor={({ item }) => item.val} 
                            xAccessor={({ item }) => item.time} 
                            style={{ width: width / 5 * 4, height: height / 5, marginLeft: 8 }}
                            gridMin={0}
                            onPress={(value) => console.log(value)}
                        >
                            {/* <Title_Y/> */}
                            <Title_X/>
                            <Labels/>
                            <Grid/>
                        </BarChart>
                        <XAxis
                            style={{ width: width / 5 * 4 }} 
                            data={usage_times} 
                            svg={axesSvg}
                            contentInset={contentInset} 
                            formatLabel={formatLabel}
                            xAccessor={({ item }) => item }
                        />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const {isRefreshing} = this.props;

        return (
            <ScrollView>
                <View style={styles.container}>
                    {isRefreshing && <ActivityIndicator size="large" color="red" />}
                    {this.renderStackedBarCharts()}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
    },
    barchartSize: {
        width: GRAPH_CONTAINER_WIDTH,
        height: GRAPH_CONTAINER_HEIGHT,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 0,
        marginLeft: 0
    },
    usageBarChartSize: {
        width: width / 5 * 4,
        height: height / 7,
        // flex: 1
    },
    usageBarChartContainer: {
        width: width,
        height: height / 4,
        marginHorizontal: width / 20,
    },
    usageBarChartContainer_yaxis: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
    },
    usageBarChartContainer_xaxis: {
        flex: 1
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bodyContainer: {
        flex: 1
    },
    innerContainer: {
        padding: 0,
        // flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    text1: {
        marginLeft: 10,
        paddingBottom: GRAPH_CONTAINER_HEIGHT,
        fontSize: width / 28,  //15
        color: theme.colors.lightseagreen,
        fontWeight: 'bold',
    },
    text2: {
        marginLeft: 10,
        fontSize: width / 28, //15
        color: theme.colors.lightseagreen,
        fontWeight: 'bold',
    },
    textContainer_stacked: {
        width: width / 3 + 20,
        height: height / 2,
    },
});
