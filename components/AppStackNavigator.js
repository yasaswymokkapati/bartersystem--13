import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

export const AppStackContainer = createStackNavigator({
    HomeList : {
        screen : HomeScreen,
        navigationOptions : {
            headerShown : false,

        }
    },
    UserDetails : {
        screen : UserDetailsScreen,
        navigationOptions : {
            headerShown : false
        }
    },
    
},
{initialRouteName : 'HomeList'}
)