import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types';


export default class HomeScreenCards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //TODO
        {/* TODO 텍스트 (3개 - row) */}
    }
}

const styles = StyleSheet.create({
    //
});

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        label: PropTypes.string.isRequired,   // 미세먼지, 초미세먼지, etc
        degree: PropTypes.string.isRequired,  // 좋음, 나쁨, 적당 ,etc
        value: PropTypes.number.isRequired,   // 값
    }

    render() {
        let {label, degree, value} = this.props;

        return (
            <View>
                <Text>
                    {label}
                </Text>
                <Text>
                    {degree}
                </Text>
                <Text>
                    {value}
                </Text>
            </View>
        )
    }
}
