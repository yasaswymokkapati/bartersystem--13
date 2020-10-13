import * as React from 'react';
import { StyleSheet, Text, View, Input, TouchableOpacity, Alert, ScrollView, Modal, KeyboardAvoidingView} from 'react-native';
import {ListItem} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import {AppHeader} from '../components/AppHeader';
import {RFValue} from 'react-native-response-fontsize';

export default class BookDonateScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            requestedItemsList : []
        }
        this.requestRef = null
    }
getRequestedItemsList = ()=>{
    this.requestRef = db.collection('Exchange_items')
    .onSnapshot(snapshot=>{
        var requestedItemsList = snapshot.docs.map(document=>document.data())
        this.setState({
            requestedItemsList : requestedItemsList
        })
    })
}
componentDidMount(){
    this.getRequestedItemsList()
}
componentWillUnmount(){
    this.requestRef()
}
keyExtractor = (item, index)=>index.toString()

renderItem = ({item, i})=>{
    return(
        <ListItem 
        key = {i}
        title = {item.book_title}
        subTitle = {item.reason}
        titleStyle = {{color : 'black', fontWeight : 'bold'}}
        rightElement = {
            <TouchableOpacity style = {styles.button} onPress = {()=>{
                this.props.navigation.navigate('UserDetails', {'details' : item})
            }}><Text style = {{color : 'yellow'}}>View</Text></TouchableOpacity>
        }
        bottomDivider/>
    )
}
    render(){
        return(
            <View style = {{flex : 1}}>
                <AppHeader title = "Donate Items"/>
                <View style = {{flex : 1}}>
                    {this.state.requestedItemsList.length === 0
                    ? (
                        <View style = {styles.subContainer}>
                            <Text style = {{fontSize : RFValue(20)}}>List of all requested Items</Text>
                        </View>
                    )
                    : (
                        <FlatList 
                        keyExtractor = {this.keyExtractor()}
                        data = {this.state.requestedItemsList}
                        renderItem = {this.renderItem()}/>
                    )
                }
                </View>
            </View>
        )
    }
}