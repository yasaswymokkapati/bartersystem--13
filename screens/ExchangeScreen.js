import * as React from 'react';
import { StyleSheet, Text, View, Input, TouchableOpacity, Alert, ScrollView, Modal, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {AppHeader} from '../components/AppHeader';

export default class extends React.Component{
    constructor(){
        super()
        this.state = {
            userID : firebase.auth().currentUser.email,
            itemName : '',
            description : '',
            requestID : '',
            requestedItemName : '',
            itemStatus : '',
            docId : '',
            isExchangeRequestActive : '',
            currencyCode : '',
            rate : ''
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
        
        await this.getItemRequest()
    db.collection('User').where('emailID', '==', userID).get()
    .then()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            db.collection('User').doc(doc.id).update({
                'isExchangeRequestActive' : true
            })
        })
    })
    this.setState({
        itemName : '',
        reason : ''
    })
    return Alert.alert("Item Requested Successfully")
}
getBookRequest = ()=>{
    var itemRequest = db.collection('Exchange_items').where('user_ID', '==', this.state.userID).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            if(doc.data().item_status !== 'recieved'){
                this.setState({
                    requestID : doc.data().request_ID,
                    requestedItemName : doc.data().item_name,
                    itemStatus : doc.data().item_status,
                    docId : doc.id
                })
            }
        })
    })
}
getIsBookRequestActive = ()=>{
    db.collection('User').where('emailID', '==', this.state.userID)
    .onSnapshot(querySnapShot=>{
        this.setState({
            isExchangeRequestActive : doc.data().isExchangeRequestActive,
            docId : doc.id
        })
    })
}

getCountryCode = ()=>{
    db.collection('User').where('emailID', '==', this.state.userID)
    .onSnapshot(querySnapShot=>{
        this.setState({
            currencyCode : doc.data().isExchangeRequestActive,
            docId : doc.id
        })
    })
}

updateBookStatus = ()=>{
    db.collection('Exchange_items').doc(this.state.docId).update({
        'item_status' : 'recieved'
    })
    db.collection('User').where('email_id', '==', this.state.userID).get()
    .then(snapshot =>{
        snapshot.forEach(doc=>{
            db.collection('User').doc(doc.id).update({
                'isExchangeRequestActive' : false 
            })
        })
    })
}

getData(){
    fetch('http://data.fixer.io/api/latest?access_key=7bbb0e9fa21a8ce9f2030430604956dc')
    .then(response=>{
        return response.json()
    }).then(responseData=>{
        var currencyCode = this.state.currencyCode
        var currency = responseData.rates.INR
        var value = 69/currency

        this.setState({
            rate : value
        })
    })
}

sendNotification = ()=>{
    db.collection('User').where('emailID', '==', this.state.userID).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            var name = doc.data().first_name
            var lastName = doc.data().last_name

            db.collection('All_notifications').where('request_id', '==', this.state.requestID).get()
            .then(snapshot=>{
                snapshot.forEach(doc=>{
                    var donorId = doc.data().donor_id
                    var itemName = doc.data.item_name

                    db.collection('All_notifications').add({
                        'targeted_user_id' : donorId,
                        'message' : name + ' ' + lastName + ' received the book ' + bookTitle,
                        'notification_status' : 'unread',
                        'item_name' : itemName
                    })
                })
            })
        })
    })
}
    render(){
        if(this.state.isExchangeRequestActive === true){
        return(
            <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <AppHeader title = {"ExchangeScreen"}/>
                <Input
                style = {styles.inputBox}
                placeholder = {'Item name'}
                onChangeText = {(text)=>{
                    this.setState({
                        itemName : text
                    })
                }}/>
                <Input
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
                <View style = {{flex : 1, justifyContent : 'center'}}>
                    <View style = {{borderColor : 'black', borderWidth : 2, justifyContent : 'center', alignItems : 'center',
                padding : 10}}>
                            <Text>Item Name</Text>
                            <Text>{this.state.requestedItemName}</Text>
                    </View>
                    <View style = {{borderColor : 'black', borderWidth : 2, justifyContent : 'center', alignItems : 'center',
                padding : 10}}>
                            <Text>Item Value</Text>
                            <Text>{this.state.rate}</Text>
                    </View>
                    <View style = {{borderColor : 'black', borderWidth : 2, justifyContent : 'center', alignItems : 'center',
                padding : 10}}>
                        <Text>Item Status</Text>
                            <Text>{this.state.itemStatus}</Text>
                    </View>
                    <TouchableOpacity style = {styles.button} onPress = {()=>{
                        this.updateBookStatus()
                        this.sendNotification()
                    }}><Text>I recieved the book</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
    else{
        return(
        <View style = {{flex : 1}}>
                <MyHeader title = "Book Request" navigation = {this.props.navigation()}/>
                <ScrollView>
                    <KeyboardAvoidingView style = {styles.keyboardStyle}>
                        <Input 
                        style = {styles.inputBox}
                        placeholder = "Enter Book Name"
                        onChangeText = {(text)=>{
                            this.setState({
                                bookTitle : text,
                            })
                        }
                    }
                    value = {this.state.bookTitle}/>

                        <Input 
                        style = {styles.inputBox}
                        multiline
                        numberOfLines = {8}
                        placeholder = "Why do you need the book"
                        onChangeText = {(text)=>{
                            this.setState({
                                reason : text,
                            })
                        }
                    }
                    value = {this.state.reason}/>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
    }
}