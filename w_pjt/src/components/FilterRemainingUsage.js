import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import PropTypes from 'prop-types';


export default class FilterRemainingUsage extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        percentage: PropTypes.number.isRequired
    }

    render() {
        let {percentage} = this.props;

        return (
            <View style={styles.container}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
