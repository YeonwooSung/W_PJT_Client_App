import React from 'react';
import {
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import Footer from './components/Footer'

const BUTTON_VAL_AUTO__ = 1;  //button value for auto mode
const BUTTON_VAL_MANUAL = 2;  //button value for manual mode
const BUTTON_VAL_TURBO_ = 3;  //button value for turbo mode

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //TODO
        };
    }

    static navigationOptions = {
        header: null
    };

    render() {
        let selected = 1; //TODO let {selected} = this.state; ?

        //TODO more codes...

        return (
            <View style={styles.body}>
                <StatusBar></StatusBar>
                <View style={styles.container}>
                    {/* TODO 퓨리케어 미니 */}
                    {/* TODO 이미지 및 메인 부분 */}
                    {/* TODO 텍스트 (3개 - row) */}
                    <View style={styles.bottonContainer}>
                        <TouchableOpacity style={(selected == BUTTON_VAL_AUTO__) ? button_clicked : button_not_clicked}>
                            <Text style={(selected == BUTTON_VAL_AUTO__) ? text_clicked : text_not_clicked}>
                                자동
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={(selected == BUTTON_VAL_MANUAL) ? button_clicked : button_not_clicked}>
                            <Text style={(selected == BUTTON_VAL_MANUAL) ? text_clicked : text_not_clicked}>
                                수동
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={(selected == BUTTON_VAL_TURBO_) ? button_clicked : button_not_clicked}>
                            <Text style={(selected == BUTTON_VAL_TURBO_) ? text_clicked : text_not_clicked}>
                                쾌속
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Footer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    container: {
        flex: 1
    },
    bottonContainer: {
        flex:1,
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
