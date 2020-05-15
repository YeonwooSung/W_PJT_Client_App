import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import {LoadingScreen} from './utils'

export default class FilterManagementScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
        }
    }

    componentDidMount = () => {
        this.setState({isLoaded: true});
    }

    render() {
        let {isLoaded} = this.state;

        if (isLoaded) {
            return (
                <View style={styles.container}>
                    <Text>here</Text>
                </View>
            );
        }

        return <LoadingScreen/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
