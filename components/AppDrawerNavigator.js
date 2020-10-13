import * as React from 'react';
import {AppTabNavigator} from './AppTabNavigator';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu from './SideBarMenu';
import SettingsScreen from '../screens/SettingsScreen';
import MyBarters from '../screens/MyBarters';
import Notification from '../screens/NotificationsScreen';
import MyReceivedItemsScreen from '../screens/MyRecievedItemsScreen';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator ({
    Home : {
        screen : AppTabNavigator,
        navigationOptions : {
            drawerIcon : <Icon name = "home" type = "fontawesome5"/>
        }
    },
    MyRecievedItemsScreen : {
        screen : MyRecievedItemsScreen,
        navigationOptions : {
            drawerIcon : <Icon name = "recieved books" type = "font-awesome"/>,
            drawerLabel : 'myRecievedItems'
        }
    },
    Setting : {
        screen : SettingsScreen,
        navigationOptions : {
            drawerIcon : <Icon name = "settings" type = "fontawesome5"/>,
            drawerLabel : 'settings'
        }
    },
    Notification : {
        screen : Notification,
        navigationOptions : {
            drawerIcon : <Icon name = "bell" type = "fontawesome5"/>,
            drawerLabel : 'notifications'
        }
    },
    MyBarters : {
        screen : MyBarters,
        navigationOptions : {
            drawerIcon : <Icon name = "gift" type = "font-awesome"/>,
            drawerLabel : 'myBarters'
        }
    }
},
{
    contentComponent : SideBarMenu
},
{
    initialRouteName : 'Home'

})