import React from 'react'
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import PropTypes from 'prop-types';
import {
    Text,
    Image,
    G
} from 'react-native-svg'
import { StackedBarChart } from 'react-native-svg-charts'

import * as theme from '../utils/themes';
import Block from './Block'
import ButtonBlock from './ButtonBlock'


// cut off value
const CUT_OFF = 55;

// constants for components' sizes
const {width, height} = Dimensions.get('window');
const GRAPH_CONTAINER_WIDTH  = width / 5 * 2;
const GRAPH_CONTAINER_HEIGHT = (height / 3);

// constants for keys of bar charts
const FILTER_CLEANING_KEYS = ['completed', 'todo'];
const FILTER_REMAINING_KEYS = ['remaining', 'used'];

// lists of colors
const COLORS  = [theme.colors.blue, theme.colors.gray]
const COLORS_REMAINING = [theme.colors.purple, theme.colors.lightpurple]

// constants for images
const STERILIZATION_IMAGE = require('../../assets/Sterilization.png');
const AIR_FILTER_IMAGE    = require('../../assets/air_filter.png');


export default class HomeScreenBody extends React.Component {
    constructor(props) {
        super(props);

        this.renderBarCharts = this.renderBarCharts.bind(this);
    }

    static propTypes = {
        isRefreshing: PropTypes.bool.isRequired,
        filter_cleaning_percentage: PropTypes.number.isRequired,
        filter_remaining_percentage: PropTypes.number.isRequired,
        navigate: PropTypes.func.isRequired
    }

    renderBarCharts() {
        const {
            filter_cleaning_percentage,
            filter_remaining_percentage,
        } = this.props;

        const cleaning_data = [
            {
                completed: filter_cleaning_percentage,
                todo: (100 - filter_cleaning_percentage),
            }
        ];
        const Label1 = ({ x, y, width, height }) => {
            // alert(width);
            const completed = filter_cleaning_percentage;
            const val = `필터 살균율 : ${completed}`;

            return(
                <G>
                    <Image
                        width={width / 3} //"30%"
                        height={width / 3} //"30%"
                        x={width / 3}
                        y={height / 3}
                        href={STERILIZATION_IMAGE}
                    />
                    <Text
                        key={1}
                        //y={height - 10}
                        y={height / 3 * 2}
                        x={width / 2}
                        fontSize={theme.sizes.normal} //TODO sizes.h3? h4? normal?
                        fill={completed > CUT_OFF ? 'white' : 'white'}
                        alignmentBaseline={'middle'}
                        textAnchor={'middle'}
                    >
                        {val}
                    </Text>
                </G>
            );
        }

        const remaining_data = [
            {
                used: (100 - filter_remaining_percentage),
                remaining: filter_remaining_percentage
            }
        ];
        const Label2 = ({ x, y, width, height }) => {
            const completed = filter_remaining_percentage;
            const val = `필터 잔량  : ${completed}`;

            return(
                <G 
                    key={0} 
                    // x={width / 2} 
                    // y={height / 2} 
                >
                    <Image
                        width={width / 3}
                        height={width / 3}
                        x={width / 3}
                        y={height / 3}
                        href={AIR_FILTER_IMAGE}
                    />
                    <Text
                        key={1}
                        //y={height - 10}
                        y={height / 3 * 2}
                        x={width / 2}
                        fontSize={theme.sizes.normal}
                        fill={completed > CUT_OFF ? 'white' : 'white'}
                        alignmentBaseline={'middle'}
                        textAnchor={'middle'}
                    >
                        {val}
                    </Text>
                </G>
            );
        }

        return (
            <View style={styles.innerContainer}>
                <StackedBarChart
                    style={styles.barchartSize}
                    keys={FILTER_CLEANING_KEYS}
                    colors={COLORS}
                    data={cleaning_data}
                    showGrid={false}
                    contentInset={{ top: 30, bottom: 30 }} 
                >
                    <Label1/>
                </StackedBarChart>
                <StackedBarChart
                    style={styles.barchartSize}
                    keys={FILTER_REMAINING_KEYS}
                    colors={COLORS}
                    data={remaining_data}
                    showGrid={false}
                    contentInset={{ top: 30, bottom: 30 }}
                >
                    <Label2/>
                </StackedBarChart>
            </View>
        );
    }


    render() {
        const {isRefreshing, navigate} = this.props;

        return (
            <View style={styles.container}>
                {/* <ScrollView 
                    //contentContainerStyle={styles.container} 
                    scrollEnabled={true} 
                    indicatorStyle={'white'} 
                > */}
                {this.renderBarCharts()}
                {isRefreshing && <ActivityIndicator size="large" color="red" />}
                <Block column space="between" style={{marginTop: width / 30}}>
                    <Block row space="around" style={{ marginVertical: theme.sizes.normal }}>
                        <ButtonBlock label='exercise' navigate={navigate} />
                        <ButtonBlock label='usage' navigate={navigate} />
                    </Block>
                </Block>
                {/* </ScrollView> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    barchartSize: {
        width: GRAPH_CONTAINER_WIDTH,
        height: GRAPH_CONTAINER_HEIGHT,
        justifyContent: 'center'
    },
    innerContainer: {
        padding: 0,
        flexDirection: "row",
        justifyContent: 'space-around',
    },
});
