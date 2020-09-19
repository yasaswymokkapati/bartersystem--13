import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';

export default class SideBarMenu extends React.Component{
    render(){
        return(
            <View style = {{flex : 1}}>
                <View style = {styles.DIContainer}>
                    <DrawerItems 
                    {...this.props}/>
                </View>
                <View style = {styles.logout}>
                    <TouchableOpacity style = {styles.logoutButton}
                    onPress = {()=>{
                        this.props.navigation.navigate('SignupLoginScreen')
                        firebase.auth().signOut()
                    }}><Text style = {styles.logout}>Logout</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}