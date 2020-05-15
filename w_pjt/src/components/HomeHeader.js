import React from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import PropTypes from 'prop-types';


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
        console.log(value)
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
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>퓨리케어 미니</Text>
                </View>
                <Menu 
                    ref={this.setMenuRef}
                    button={<Text onPress={this.showMenu}>menu</Text>}
                >
                    <MenuItem onPress={this.hideMenu}>1</MenuItem>
                    <MenuItem onPress={this.hideMenu}>2</MenuItem>
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
    }
});
