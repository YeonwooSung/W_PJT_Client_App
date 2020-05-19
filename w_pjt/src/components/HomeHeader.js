import React from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import PropTypes from 'prop-types';
import uuid from 'react-native-uuid'


const { width, height } = Dimensions.get('window');
const MENU_BUTTON_IMG = require('../../assets/menu.png');

const menu_items = [
    ['exercise', '운동량'],
    ['usage', '마스크 사용'],
    ['filterManagement', '필터 관리'],
];

export default class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.setMenuRef = this.setMenuRef.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    static propTypes = {
        navigate: PropTypes.func.isRequired
    }

    handleOnSelect(value) {
        this.hideMenu();
        this.props.navigate(value);
    }

    setMenuRef = (ref) => {
        this.menu = ref;
    }

    hideMenu = () => {
        this.menu.hide();
    }

    showMenu = () => {
        this.menu.show();
    }

    render() {
        const MENU_BUTTON = (
            <TouchableOpacity style={styles.menuButton} onPress={this.showMenu}>
                <Image source={MENU_BUTTON_IMG} style={styles.menuButtonImg}/>
            </TouchableOpacity>
        );

        const menuItemList = menu_items.map(item => {
            let [screenName, itemName] = item;

            return (
                <MenuItem key={uuid.v1()} onPress={() => this.handleOnSelect(screenName)}>
                    {itemName}
                </MenuItem>
            )
        })

        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>퓨리케어 미니</Text>
                </View>
                <Menu 
                    ref={this.setMenuRef}
                    button={MENU_BUTTON}
                >
                    {menuItemList}
                </Menu>
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
        height: height / 8
    },
    titleContainer: {
        //
    },
    titleText: {
        //TODO
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
