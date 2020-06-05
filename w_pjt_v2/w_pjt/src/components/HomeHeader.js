import React from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import PropTypes from 'prop-types';

import * as theme from '../utils/themes';


const { width, height } = Dimensions.get('window');

export default class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        navigateToSettings: PropTypes.func.isRequired,
    }

    render() {
        const {navigateToSettings} = this.props;

        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>마스크</Text>
                </View>
                <View style={styles.subContainer}>
                    <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
                        <Text style={styles.settingText}>설정</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
        width: width,
        height: height / 16,
        backgroundColor: '#f2f2f2'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: width / 15
    },
    titleText: {
        fontFamily: 'Rubik-Medium',
        fontSize: width / 30,
        color: '#cccccc',
        letterSpacing: 0,
        fontWeight: 'bold'
    },
    subContainer: {
        justifyContent: 'center',
        width: width / 4,
        height: height / 16,
    },
    button: {
        width: width / 10,
        height: width / 15,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    settingText: {
        fontFamily: 'Rubik-Medium',
        fontSize: width / 28,
        color: theme.colors.lightseagreen,
        letterSpacing: 0,
        fontWeight: 'bold'
        //lineHeight: 18,
    }
});
