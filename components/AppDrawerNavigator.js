import * as React from 'react';
import {AppTabNavigator} from './AppTabNavigator';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu from './SideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator ({
    Home : {
        screen : AppTabNavigator
    },
},
{
    contentComponent : SideBarMenu
},
{
    initialRouteName : 'Home'

})