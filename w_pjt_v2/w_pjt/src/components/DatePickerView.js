import React from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PropTypes from 'prop-types';

import * as theme from '../utils/themes';


const {width, height} = Dimensions.get('window');

export default class DatePickerView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minDate: new Date(),
            isDatePickerVisible: false,
            buttonLabel: 'Select alert time'
        }

        this.changeDate = this.changeDate.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.renderDateTimePickerModal = this.renderDateTimePickerModal.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
    }

    static propTypes = {
        onDateChange: PropTypes.func.isRequired,
        hour: PropTypes.number.isRequired,
        minute: PropTypes.number.isRequired,
        useTimeString: PropTypes.bool.isRequired,
    }

    componentDidMount = () => {
        let {useTimeString, hour, minute} = this.props;

        if (useTimeString) {
            const newLabel = `Selected: ${hour}:${minute}`;

            this.setState({buttonLabel: newLabel})
        }
    }

    changeDate = (date) => {
        let {onDateChange} = this.props;
        onDateChange(date);
    }

    handleConfirm = (date) => {
        this.hideDatePicker();
        this.changeDate(date);
        let newLabelStr = `Selected: ${date.getHours()}:${date.getMinutes()}`
        this.setState({ buttonLabel: newLabelStr });
    }

    setDatePickerVisibility = (visible) => {
        this.setState({isDatePickerVisible: visible});
    }

    showDatePicker = () => {
        this.setDatePickerVisibility(true);
    };

    hideDatePicker = () => {
        this.setDatePickerVisibility(false);
    }

    renderDateTimePickerModal = () => {
        let {minDate, isDatePickerVisible} = this.state;
        const {hour, minute} = this.props;
        let initDate = new Date();
        initDate.setMinutes(minute);
        initDate.setHours(hour);

        return (
            <DateTimePickerModal
                isVisible={isDatePickerVisible}  
                mode="time" 
                onConfirm={this.handleConfirm} 
                onCancel={this.hideDatePicker} 
                date={initDate} 
                minimumDate={minDate} 
            />
        );
    }

    render() {
        let {buttonLabel} = this.state;

        return (
            <View style={styles.container}>
                {this.renderDateTimePickerModal()}
                <TouchableOpacity style={styles.buttonBox} onPress={() => this.showDatePicker()}>
                    <Text style={styles.buttonText}>{buttonLabel}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonBox: {
        width: width * 4 / 5,
        height: height / 15,
        backgroundColor: theme.colors.lightseagreen,
        borderRadius: 25,
        marginVertical: width / 15,
        paddingVertical: 5,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: width / 25,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
});
