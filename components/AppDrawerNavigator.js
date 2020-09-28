import * as React from 'react';
import {AppTabNavigator} from './AppTabNavigator';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu from './SideBarMenu';
import SettingsScreen from '../screens/SettingsScreen';
import MyBarters from '../screens/MyBarters';
import Notification from '../screens/NotificationsScreen'

export const AppDrawerNavigator = createDrawerNavigator ({
    Home : {
        screen : AppTabNavigator
    },
    Settings : {
        screen : SettingsScreen
    },
    MyBarters : {
        screen : MyBarters
    },
    Notification : {
        screen : Notification
    }
},
{
    contentComponent : SideBarMenu
},
{
    initialRouteName : 'Home'

})