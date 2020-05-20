import React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import PropTypes from 'prop-types';

import Block from './Block'
import * as theme from '../utils/themes';


const EXERCISE_IMAGE = require('../../assets/exercise.png');
const USAGE_IMAGE = require('../../assets/maskUsage.png');

const {width, height} = Dimensions.get('window');
const BUTTON_SIZE = width / 3;
const IMAGE_SIZE = width / 5;

export default class ButtonBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        navigate: PropTypes.func.isRequired
    }

    render() {
        const {label, navigate} = this.props;
        const buttonImage = (label == 'exercise' ? EXERCISE_IMAGE : USAGE_IMAGE);

        return (
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => navigate(label)}
            >
                <Block center middle style={styles.button}>
                    <Image 
                        style={styles.buttonImage}
                        source={buttonImage}
                    />
                    <Text style={{ marginTop: theme.sizes.base * 0.5 }}>
                        {label}
                    </Text>
                </Block>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#57A0D3',
        width: BUTTON_SIZE,  //151
        height: BUTTON_SIZE, //151
        borderRadius: BUTTON_SIZE / 2,
    },
    buttonImage: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
});
