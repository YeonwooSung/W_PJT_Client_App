import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types';
import uuid from 'react-native-uuid'


const BUTTON_VAL_AUTO__ = 1;  //button value for auto mode
const BUTTON_VAL_MANUAL = 2;  //button value for manual mode
const BUTTON_VAL_TURBO_ = 3;  //button value for turbo mode

const BUTTON_CONSTANTS = [BUTTON_VAL_AUTO__, BUTTON_VAL_MANUAL, BUTTON_VAL_TURBO_];

export default class ModeButtonContainer extends React.Component {
    constructor(props) {
        super(props);

        this.changeMode = this.changeMode.bind(this)
    }

    static propTypes = {
        selected: PropTypes.number.isRequired,
        execOnPress: PropTypes.func.isRequired
    }

    changeMode = (newMode) => {
        let {selected, execOnPress} = this.props;
        if (selected != newMode)
            execOnPress(newMode);
    }

    render() {
        let {selected} = this.props;

        if (selected < 1 || selected > 3) {
            selected = 1;
        }

        let cards = BUTTON_CONSTANTS.map(constant => {
            let text = ''
            switch (constant) {
                case BUTTON_VAL_AUTO__:
                    text = '자동';
                    break;
                case BUTTON_VAL_MANUAL:
                    text = '수동';
                    break;
                case BUTTON_VAL_TURBO_:
                    text = '쾌속';
                    break;
                default:
                    return;
            }

            return (
                <TouchableOpacity
                    style={(selected == constant) ? styles.button_clicked : styles.button_not_clicked} 
                    onPress={() => this.changeMode(constant)} 
                    key={uuid.v1()}
                >
                    <Text style={(selected == constant) ? styles.text_clicked : styles.text_not_clicked}>
                        {text}
                    </Text>
                </TouchableOpacity>
            )
        });

        return (
            <View style={styles.bottonContainer}>
                {cards}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    button_clicked: {
        //TODO UI of clicked button
    },
    button_not_clicked: {
        //TODO UI for button that is not clicked.
    },
    text_clicked: {
        //TODO
    },
    text_not_clicked: {
        //TODO
    }
});
