import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {AppHeader} from '../components/AppHeader';

export default class MyBarters extends React.Component{
    constructor(){
        super()
        this.state = {
            requestedItemsList : [],
            donorName : '',
            donorId : firebase.auth().currentUser.email
        }
        this.requestRef = null
    }
    getRequestedItemsList = ()=>{
        this.requestRef = db.collection('Requested_Items')
        .onSnapshot(snapshot=>{
            var requestedItemsList = snapshot.docs.map(document=>document.data())
            this.setState({
                requestedItemsList : requestedItemsList
            })
        })
    }
    getDonorDetails=(donorId)=>{
        db.collection("User").where("email_id","==", donorId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              "donorName" : doc.data().first_name + " " + doc.data().last_name
            })
          });
        })
      }
      sendItem=(itemDetails)=>{
        if(itemDetails.request_status === "Item Sent"){
          var requestStatus = "Donor Interested"
          db.collection("all_donations").doc(itemDetails.doc_id).update({
            "request_status" : "Donor Interested"
          })
          this.sendNotification(itemDetails,requestStatus)
        }
        else{
          var requestStatus = "Item Sent"
          db.collection("all_donations").doc(itemDetails.doc_id).update({
            "request_status" : "Item Sent"
          })
          this.sendNotification(itemDetails,requestStatus)
        }
      }
   
    sendNotification=(itemDetails,requestStatus)=>{
        var requestId = itemDetails.request_id
        var donorId = itemDetails.donor_id
        db.collection("All_notifications")
        .where("request_id","==", requestId)
        .where("donor_id","==",donorId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var message = ""
            if(requestStatus === "Item Sent"){
              message = this.state.donorName + " sent you book"
            }else{
               message =  this.state.donorName  + " has shown interest in donating the book"
            }
            db.collection("all_notifications").doc(doc.id).update({
              "message": message,
              "notification_status" : "unread",
              "date"                : firebase.firestore.FieldValue.serverTimestamp()
            })
          });
        })
      }
    keyExtractor = (item, index)=>index.toString()

renderItem = ({item, i})=>{
    return(
        <ListItem 
        key = {i}
        title = {item.item_name}
        subTitle = {item.description}
        titleStyle = {{color : 'black', fontWeight : 'bold'}}
        rightElement = {
            <TouchableOpacity style = {styles.button} onPress = {()=>{
                this.updateItemStatus()
            }}><Text style = {{color : 'yellow'}}>Exchange</Text></TouchableOpacity>
        }
        bottomDivider/>
    )
}
    render(){
        return(
            <View>
                <AppHeader title = "Donate Items"/>
                <View style = {{flex : 1}}>
                    {this.state.requestedItemsList.length === 0
                    ? (
                        <View style = {styles.subContainer}>
                            <Text style = {{fontSize : 20}}>List of all requested Items</Text>
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