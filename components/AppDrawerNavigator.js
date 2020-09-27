import * as React from 'react';
import {AppTabNavigator} from './AppTabNavigator';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu from './SideBarMenu';
import SettingsScreen from '../screens/SettingsScreen';
import MyBarters from '../screens/MyBarters';

export const AppDrawerNavigator = createDrawerNavigator ({
    Home : {
        screen : AppTabNavigator
    },
    Settings : {
        screen : SettingsScreen
    },
    MyBarters : {
        screen : MyBarters
    }
},
{
    contentComponent : SideBarMenu
},
{
    initialRouteName : 'Home'

})