import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native'


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

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
