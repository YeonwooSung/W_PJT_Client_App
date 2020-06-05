import React from 'react'
import {
    Dimensions,
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';

import OpenURLButton from './OpenURLButton'
import * as theme from '../utils/themes';


const {width, height} = Dimensions.get('window');

const CUSTOMER_SERVICE_URL = 'https://www.lgservice.co.kr'

export default class Footer extends React.Component {
    static propTypes = {
        refresh: PropTypes.func.isRequired
    }

    render() {
        const {refresh} = this.props;
        const str = '리프레쉬'

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonBox} onPress={refresh}>
                    <Text style={styles.text}>{str}</Text>
                </TouchableOpacity>
                <OpenURLButton url={CUSTOMER_SERVICE_URL} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        width: width,
        height: height / 10,
    },
    buttonBox: {
        width: width / 2 - 30,
        height: height / 18,
        backgroundColor: 'white', //'#a8a9ad',
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
        textAlign: 'center'
    },
});
