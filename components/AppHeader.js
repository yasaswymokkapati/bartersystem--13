import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import  { Header } from 'react-native-elements';

export default class AppHeader extends React.Component{
    render(){
        return(
            <View>
                <Header backgroudColor = 'yellow' title = {this.props} style = {{fontSize : 30}} />
            </View>
        )
    }
}