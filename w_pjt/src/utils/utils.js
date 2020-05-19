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
    'exercise'
]

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
