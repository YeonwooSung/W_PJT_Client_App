import React from 'react'
import {
    Dimensions,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native'


const {width, height} = Dimensions.get('window');

export default class Footer extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>button1</Text>
                <Text>button2</Text>
                <Text>button3</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'red',
        width: width,
        height: height / 8
    }
});
