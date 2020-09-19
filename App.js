import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import  { AppTabNavigator } from './components/AppTabNavigator'
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default class App extends React.Component{
  render(){
    return(
      <View>
        <Text>Hi! This is the barter system app. Please login or signup...</Text>
        <SignupLoginScreen />
      </View>
    )
  }
}

const 
AppTabNavigation = createSwitchNavigator({
  SignupLoginScreen : {screen : SignupLoginScreen},
  Drawer : {screen : AppDrawerNavigator}
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
