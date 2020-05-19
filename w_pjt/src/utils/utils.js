import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';


export function validateScreenName(screenName) {
    if (screenNameList.indexOf(screenName) >= 0)
        return true;
    return false;
}

const screenNameList = [
    'filterManagement',
    'exercise',
    'usage'
]

export const yyyyMMddhhmmss = (date) => {
    var MM = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();

    return [
        //TODO date.getFullYear(),
        (MM > 9 ? '' : '0') + MM,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm,
        (ss > 9 ? '' : '0') + ss,
    ].join('');
};

export class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export const _TIMESTAMP_TO_TIME = 1000;
