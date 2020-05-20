import React from 'react'
import {
    Dimensions,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native'
import OpenURLButton from './OpenURLButton'


const {width, height} = Dimensions.get('window');

const CUSTOMER_SERVICE_URL = 'https://www.lgservice.co.kr'
const EMAIL_QnA_URL = 'https://www.lgservice.co.kr/emailQna/emailQnaInsertForm.do'; //'mailto:neos960518@gmail.com';
const QUESTION_SERVICE_URL = 'https://www.google.com';

const CUSTOMER_SERVICE = 'customer_service';
const EMAIL_SERVICE = 'email';
const QUESTION_SERVICE = 'qna';

export default class Footer extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <OpenURLButton url={CUSTOMER_SERVICE_URL} type={CUSTOMER_SERVICE} />
                <OpenURLButton url={EMAIL_QnA_URL} type={EMAIL_SERVICE} />
                <OpenURLButton url={QUESTION_SERVICE_URL} type={QUESTION_SERVICE} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#89CFF0',
        width: width,
        height: height / 9
    }
});
