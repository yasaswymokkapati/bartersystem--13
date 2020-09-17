import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Modal, KeyboardAvoidingView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elemets';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../components/AppHeader';

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            requestedItemsList : []
        }
        this.requestRef = null
    }
    getRequestedBooksList = ()=>{
        this.requestRef = db.collection('Exchange_items')
        .onSnapshot(snapshot=>{
            var requestedItemsList = snapshot.docs.map(document=>document.data())
            this.setState({
                requestedItemsList : requestedItemsList
            })
        })
    }
    componentDidMount(){
        this.getRequestedBooksList()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    render(){
        return(
            <View>
                <AppHeader title = {"Home screen"}/>
                <FlatList
          data = {this.state.requestedItemsList}
          renderItem = {({item})=>(
            <View style = {{borderBottomWidth : 2}}>
                <Text>{'User ID : ' + item.user_ID}</Text>
                <Text>{'Unique ID : ' + item.unique_ID}</Text>
                <Text>{'Item Name : ' + item.item_name}</Text>
                <Text>{'Description : ' + item.description}</Text>
            </View>
          )}
          keyExtractor = {(item, index)=>index.toString()}
          />
            </View>
        )
    }
}