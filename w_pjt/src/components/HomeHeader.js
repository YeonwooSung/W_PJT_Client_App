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


const { width, height } = Dimensions.get('window');
const MENU_BUTTON_IMG = require('../../assets/menu.png');

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

        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>퓨리케어 미니</Text>
                </View>
                <Menu 
                    ref={this.setMenuRef}
                    button={MENU_BUTTON}
                >
                    <MenuItem onPress={() => this.handleOnSelect('filterManagement')}>필터 관리</MenuItem>
                    <MenuItem onPress={() => this.handleOnSelect('test2')}>2</MenuItem>
                </Menu>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
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
