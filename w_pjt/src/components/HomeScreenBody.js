import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'


export default class HomeScreenBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* TODO 이미지 및 메인 부분 */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
});
