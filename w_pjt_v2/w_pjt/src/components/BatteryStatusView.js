import React from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native'
import PropTypes from 'prop-types';

import {LoadingScreen} from '../utils/utils'
import * as theme from '../utils/themes';


// constants for battery status images
const BATTERY_FULL     = require('../../assets/full_battery.png');
const BATTERY_EMPTY    = require('../../assets/empty_battery.png');
const BATTERY_RECHARGE = require('../../assets/recharge_battery.png');

// get the window size
const {width, height} = Dimensions.get('window');

//constants for image size
const IMAGE_WIDTH = width / 10;
const IMAGE_HEIGHT = width / 10;

export default class BatteryStatusView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            invalidStatus: true
        }
    }

    static propTypes = {
        batteryStatus: PropTypes.string.isRequired,
    }

    componentDidMount = () => {
        const {batteryStatus} = this.props;
        let status_valid = false;

        switch (batteryStatus) {
            case 'full':
                break;
            case 'empty':
                break;
            case 'charging':
                break;
            default:
                status_valid = true;
        }

        this.setState({isLoaded: true, invalidStatus: status_valid});
    }

    render() {
        const {isLoaded, invalidStatus} = this.state;
        const {batteryStatus} = this.props;

        if (isLoaded) {
            if (invalidStatus) {
                return (
                    <View style={styles.container}>
                        {/* TODO invalidStatus message! */}
                        <Text>
                            {`${batteryStatus} -> invalid!`}
                        </Text>
                    </View>
                );
            }

            let battery_img = null;
            let val = '충전완료'

            switch (batteryStatus) {
                case 'full':
                    battery_img = BATTERY_FULL;
                    val = '충전완료'
                    break;
                case 'empty':
                    battery_img = BATTERY_EMPTY;
                    val = '충전필요'
                    break;
                case 'charging':
                    battery_img = BATTERY_RECHARGE;
                    val = '충전중'
                    break;
                default:
                    battery_img = BATTERY_EMPTY;
                    val = '충전필요'
            }

            return (
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.battery_text}>{val}</Text>
                        <Image source={battery_img} style={styles.image}/>
                    </View>
                </View>
            );
        } else {
            return (
                <LoadingScreen/>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginTop: width / 40,
        marginLeft: 10,
        width: width / 3,
        height: height / 20,
    },
    innerContainer: {
        flexDirection: 'row',
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        alignSelf: 'center'
    },
    battery_text: {
        fontSize: width / 28,
        color: theme.colors.lightseagreen,
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});
