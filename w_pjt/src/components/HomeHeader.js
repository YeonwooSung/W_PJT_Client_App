import React from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import PropTypes from 'prop-types';
// import uuid from 'react-native-uuid'
// import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import * as theme from '../utils/themes';
import BatteryStatusView from './BatteryStatusView';


const { width, height } = Dimensions.get('window');
const MENU_BUTTON_IMG = require('../../assets/menu.png');

// const menu_items = [
//     ['exercise', '운동량'],
//     ['usage', '마스크 사용'],
//     ['filterManagement', '필터 관리'],
// ];

export default class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        // this.handleOnSelect = this.handleOnSelect.bind(this);
        // this.setMenuRef = this.setMenuRef.bind(this);
        // this.showMenu = this.showMenu.bind(this);
        // this.hideMenu = this.hideMenu.bind(this);

        this.state = {
            battery_status: 'full'
        }
    }

    static propTypes = {
        //navigate: PropTypes.func.isRequired,
        batteryStatus: PropTypes.string,
        passBatteryStatus: PropTypes.bool.isRequired
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = async () => {
        const url_battery = 'https://t6j2dvjrza.execute-api.ap-northeast-2.amazonaws.com/prod/battery'
        const new_battery_status = await this.getData_battery(url_battery);
        this.setState({battery_status: new_battery_status});
    }

    getData_battery = async (url) => {
        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            const batteryData = responseJson['battery'];
            const percentage = batteryData['status'];

            return percentage;
        } catch (error) {
            console.log(error);
            return this.state.battery_status
        }
    }

    // handleOnSelect(value) {
    //     this.hideMenu();
    //     this.props.navigate(value);
    // }

    // setMenuRef = (ref) => {
    //     this.menu = ref;
    // }

    // hideMenu = () => {
    //     this.menu.hide();
    // }

    // showMenu = () => {
    //     this.menu.show();
    // }

    render() {
        const {batteryStatus, passBatteryStatus} = this.props;
        const {battery_status} = this.state;

        let battery_status_val = passBatteryStatus ? batteryStatus: battery_status;

        // const MENU_BUTTON = (
        //     <TouchableOpacity style={styles.menuButton} onPress={this.showMenu}>
        //         <Image source={MENU_BUTTON_IMG} style={styles.menuButtonImg}/>
        //     </TouchableOpacity>
        // );

        // const menuItemList = menu_items.map(item => {
        //     let [screenName, itemName] = item;

        //     return (
        //         <MenuItem key={uuid.v1()} onPress={() => this.handleOnSelect(screenName)}>
        //             {itemName}
        //         </MenuItem>
        //     );
        // });

        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={theme.fonts.h3}>퓨리케어 미니</Text>
                </View>
                <BatteryStatusView batteryStatus={battery_status_val}/>
                {/* <Menu 
                    ref={this.setMenuRef}
                    button={MENU_BUTTON}
                >
                    {menuItemList}
                </Menu> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
        width: width,
        height: height / 8,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: width / 15
    },
    menuButton: {
        width: width / 10,
        height: width / 10
    },
    menuButtonImg: {
        width: width / 10 - 5,
        height: width / 10 - 5
    }
});
