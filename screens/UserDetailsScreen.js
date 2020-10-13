import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Header, Card, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import {AppHeader} from '../components/AppHeader';
import {RFValue} from 'react-native-response-fontsize';

export default class RecieverDetailScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId : firebase.auth().currentUser.email, 
            receiverId : this.props.navigation.getParam('details')['user_ID'],
            requestId : this.props.naigation.getParam('details')['unique_ID'],
            itemName : this.props.navigation.getParam('details')['item_name'],
            reason : this.props.navigation.getParam('details')['description'],
            recieverName : '',
            recieverContact : '',
            recieverAddress : '',
            recieverRequestDocID : '',
        }
    }
getRecieverDetails(){
    db.collection('User').where('emailID', '==', this.state.receiverId).get()
    .then(snapShot=>{
        snapShot.forEach(doc=>{
            this.setState({
                recieverName : doc.data().first_name,
                recieverContact : doc.data().contact,
                recieverAddress : doc.data().address,
            })
        })
    })
    db.collection('Exchange_Items').where('unique_ID', '==', this.state.requestId).get()
    .then(snapShot=>{
        snapShot.forEach(doc=>{
            this.setState({
                recieverRequestDocID : doc.id
            })
        })
    })
}
componentDidMount(){
    this.getRecieverDetails()
}
updateItemstatus = ()=>{
    db.collecion('All_donations').add({
        'item_name' : this.state.itemName,
        'unique_ID' : this.state.requestId,
        'requested_by' : this.state.recieverName,
        'donor_id' : this.state.userId,
        'request_status' : 'Donor Inerested',
    })
}
addNotification = ()=>{
    var messages = this.state.userName + ' ' + 'has shown interest in donating the item!!!'
    db.collection('All_notifications').add({
        'targeted_user_id' : this.state.receiverId,
        'donor_id' : this.state.userId,
        'request_id' : this.state.requestId,
        'item_name' : this.state.itemName,
        'date' : firebase.firestore.FieldValue.serverTimestamp(),
        'notification_status' : "unread",
        'message' : messages
    })
}

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex : 0.1}}>
                    <AppHeader title = {"User Details Screen"} />
                    <Header 
                    leftComponent = {<Icon name = 'arrow-left' type = 'feather' color = 'black' onPress = {()=>
                    this.props.navigation.goBack()
                        }/>}
                    centerComponent = {{text : 'donate Items', style : {color : 'black', fontSize : RFValue(20), fontWeight : 'bold',
                    backgroundColor : 'yellow'}}}/>
                </View>
                <View style = {{flex : 0.3}}>
                    <Card
                    title = {"Item Information"}
                    titleStyle = {{fontSize : RFValue(20)}}>
                    </Card>
                    <Card>
                    <Text style = {{fontWeight : "bold"}}>Name : {this.state.itemName}</Text>
                    </Card>
                    <Card>
                    <Text style = {{fontWeight : "bold"}}>reason : {this.state.reason}</Text>
                    </Card>
                    <View style  = {{flex : 0.3}}>
                        <Card
                        title = {"Reciever information"}
                        titleStyle = {{fontSize : RFValue(20)}}>
                            <Card>
                            <Text style = {{fontWeight : "bold"}}>Name : {this.state.recieverName}</Text>
                            </Card>
                            <Card>
                            <Text style = {{fontWeight : "bold"}}>Contact : {this.state.recieverContact}</Text>
                            </Card>
                            <Card>
                            <Text style = {{fontWeight : "bold"}}>Address : {this.state.recieverAddress}</Text>
                            </Card>
                        </Card>
                    </View>
                </View>
                <View style = {styles.buttonContainer}>
                    {this.state.receiverId !== this.state.userId}
                    ?(
                        <TouchableOpacity style = {styles.button} onPress = {()=>{
                            this.updateItemstatus()
                            this.addNotification()
                            this.props.navigation.navigate('Home')
                        }}><Text>Exchange</Text></TouchableOpacity>
                    )
                    : null
                </View>
            </View>
        )
    }
}