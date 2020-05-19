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

// constants for battery status images
const BATTERY_FULL     = require('../../assets/full_battery.png');
const BATTERY_EMPTY    = require('../../assets/empty_battery.png');
const BATTERY_RECHARGE = require('../../assets/recharge_battery.png');

// get the window size
const {width, height} = Dimensions.get('window');

//constants for image size
const IMAGE_WIDTH = width / 6;
const IMAEG_HEIGHT = width / 6;

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

            switch (batteryStatus) {
                case 'full':
                    battery_img = BATTERY_FULL;
                    break;
                case 'empty':
                    battery_img = BATTERY_EMPTY;
                    break;
                case 'charging':
                    battery_img = BATTERY_RECHARGE;
                    break;
                default:
                    battery_img = BATTERY_EMPTY;
            }

            return (
                <View style={styles.container}>
                    <Image source={battery_img} style={styles.image}/>
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
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAEG_HEIGHT,
    }
});
