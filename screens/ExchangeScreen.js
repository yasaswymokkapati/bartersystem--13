import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Modal, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {AppHeader} from '../components/AppHeader';

export default class extends React.Component{
    constructor(){
        super()
        this.state = {
            userID : firebase.auth().currentUser.email,
            itemName : '',
            description : ''
        }
    }
    createUniqueID(){
        var uniqueID = Math.random().toString(36).substring(5)
    }
    addExchange = (itemName, description)=>{
        var userID = this.state.userID
        var randomUniqueID = this.createUniqueID()
        db.collection('Exchange_items').add({
            'user_ID' : userID,
            'unique_ID' : randomUniqueID,
            'item_name' : this.state.itemName,
            'description' : this.state.description
        })
        this.setState({
            itemName : '',
            description : ''
        })
        return Alert.alert("Exchange Requested Successfully")
    }
    render(){
        return(
            <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <AppHeader title = {"ExchangeScreen"}/>
                <TextInput
                style = {styles.inputBox}
                placeholder = {'Item name'}
                onChangeText = {(text)=>{
                    this.setState({
                        itemName : text
                    })
                }}/>
                <TextInput
                style = {styles.inputBox}
                placeholder = {'Description'}
                multiline
                numberOfLines = {8}
                onChangeText = {(text)=>{
                    this.setState({
                        description : text
                    })
                }}/>
                <TouchableOpacity style = {styles.button} onPress = {()=>{
                    this.exchange()
                }}><Text>Add item</Text></TouchableOpacity>
            </View>
        )
    }
}