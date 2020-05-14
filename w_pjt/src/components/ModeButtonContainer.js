import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types';


const BUTTON_VAL_AUTO__ = 1;  //button value for auto mode
const BUTTON_VAL_MANUAL = 2;  //button value for manual mode
const BUTTON_VAL_TURBO_ = 3;  //button value for turbo mode


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

        return (
            <View style={styles.bottonContainer}>
                <TouchableOpacity
                    style={(selected == BUTTON_VAL_AUTO__) ? styles.button_clicked : styles.button_not_clicked} 
                    onPress={() => this.changeMode(BUTTON_VAL_AUTO__)}
                >
                    <Text style={(selected == BUTTON_VAL_AUTO__) ? styles.text_clicked : styles.text_not_clicked}>
                        자동
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={(selected == BUTTON_VAL_MANUAL) ? styles.button_clicked : styles.button_not_clicked}
                    onPress={() => this.changeMode(BUTTON_VAL_MANUAL)}
                >
                    <Text style={(selected == BUTTON_VAL_MANUAL) ? styles.text_clicked : styles.text_not_clicked}>
                        수동
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={(selected == BUTTON_VAL_TURBO_) ? styles.button_clicked : styles.button_not_clicked}
                    onPress={() => this.changeMode(BUTTON_VAL_TURBO_)}
                >
                    <Text style={(selected == BUTTON_VAL_TURBO_) ? styles.text_clicked : styles.text_not_clicked}>
                        쾌속
                    </Text>
                </TouchableOpacity>
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
