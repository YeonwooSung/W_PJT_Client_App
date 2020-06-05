import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Linking,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

import * as theme from '../utils/themes';


const {width, height} = Dimensions.get('window');

export default class OpenURLButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.openBrowser = this.openBrowser.bind(this);
    }

    static propTypes = {
        url: PropTypes.string.isRequired,
    };

    openBrowser = () => {
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    };

    render() {
        const str = '필터 구매'

        return (
            <TouchableOpacity style={styles.buttonBox} onPress={this.openBrowser}>
                <Text style={styles.text}>{str}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonBox: {
        width: width / 2 - 30,
        height: height / 18,
        backgroundColor: '#ffffff', //'#a8a9ad',
        borderRadius: 25,
        marginVertical: width / 30,
        paddingVertical: width / 30,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.lightseagreen,
    },
    text: {
        fontSize: 17,
        fontWeight: '500',
        color: theme.colors.lightseagreen,
        textAlign: 'center',
    },
});
