import * as React from 'react';
import { StyleSheet, Text, View, Input, TouchableOpacity, Alert, ScrollView, Modal, KeyboardAvoidingView, Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import db from '../config';
import firebase from 'firebase';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    Exchange : {
        screen : ExchangeScreen,
        navigationOptions : {
            tabBarIcon : <Image source = {require('../assets/images.png')}/>,
            tabBarLabel : 'Exchange Screen'
        }
    },
    Home : {
        screen : HomeScreen,
        navigationOptions : {
            tabBarIcon : <Image source = {require('../assets/download.png')}/>,
            tabBarLabel : 'Home Screen'
        }
    }
})