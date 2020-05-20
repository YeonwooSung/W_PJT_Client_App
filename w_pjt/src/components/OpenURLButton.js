import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Linking,
    Image
} from 'react-native';
import PropTypes from 'prop-types';


const {width, height} = Dimensions.get('window');

const SERVICE_CENTER_ICON  = require('../../assets/service_center.png');
const SENDING_EMAIL_ICON   = require('../../assets/email.png');
const QUESTION_BUTTON_ICON = require('../../assets/qna.png');

export default class OpenURLButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.openBrowser = this.openBrowser.bind(this);
    }

    static propTypes = {
        type: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    };

    openBrowser = () => {
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    };

    render() {
        const {type} = this.props;
        const img = (type == 'customer_service' ? SERVICE_CENTER_ICON : (type == 'email' ? SENDING_EMAIL_ICON : QUESTION_BUTTON_ICON));

        return (
            <TouchableOpacity style={styles.buttonBox} onPress={this.openBrowser}>
                {/* <Text style={styles.text}>{str}</Text> */}
                <Image source={img} style={styles.buttonImage} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonBox: {
        width: width / 8,
        height: width / 8,
        backgroundColor: '#B8E2F2', //'#a8a9ad',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 5,
        justifyContent: 'center'
    },
    buttonImage: {
        width: width / 10,
        height: width / 10,
        alignSelf: 'center',
    },
    text: {
        fontSize: width / 25,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: 'center'
    },
});
