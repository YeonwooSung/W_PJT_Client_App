import React from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import MenuButton from 'react-native-menu-button'
import PropTypes from 'prop-types';

const menu = [
  {key: '0', value: '필터관리', text: '필터관리'},
  {key: '1', value: '운동량', text: '운동량'},
  {key: '2', value: '마스크 살균 진행률', text: '마스크 살균 진행률'},
  {key: '3', value: '기기 컨트롤', text: '기기 컨트롤'},
];

export default class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        navigate: PropTypes.func.isRequired
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>퓨리케어 미니</Text>
                </View>
                <MenuButton
                    buttonStyle={[styles.menuButtonStyle]} 
                    menuGroup={menu} 
                    //onSelect={}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1
    },
    menuButtonStyle: {
        //TODO
    },
    titleContainer: {
        //
    },
    titleText: {
        //TODO
    }
});
