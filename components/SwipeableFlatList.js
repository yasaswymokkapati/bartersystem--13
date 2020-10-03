import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';
import {ListItem, Item, Icon} from 'react-native-elements';

export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allNotifications : this.props.allNotifications
        }
    }
updateMarkAsRead = (notification)=>{
    db.collection('All_notifications').doc(notification.doc_id).update({
        'notification_status' : 'read'
    })
}
onSwipeValueChange = (swipeData)=>{
    var allNotifications = this.state.allNotifications
    const {key, value} = swipeData
    if(value < -Dimensions.get("window").width){
        const newData = [...allNotifications]
        const prevIndex = allNotifications.findIndex(item => item.key === key)
        this.updateMarkAsRead(allNotifications[prevIndex])
        newData.splice(prevIndex, 1)
        this.setState({
            allnotifications : newData
        })
    }
}
renderItem = ()=>{
    var data;
    <ListItem 
    leftElement = {<Icon 
    name = "Book" 
    type = "font-awesome" 
    color = "pink" 
    title = {data.item.item_name} 
    titleStyle = {{color : 'purple', fontWeight : 'bold'}}
    subTitle = {data.item.message}
    bottomDivider/>} />
}
renderHiddenItem = ()=>{
    <View style = {styles.backrow}>
        <View style = {[styles.backRightButton, styles.backRightButtonRight]}>
            <Text style = {styles.backText}></Text>
        </View>
    </View>
}
    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView 
                disableRightSwipe
                data = {this.state.allNotifications}
                renderItem = {this.renderItem()}
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-DeferredPermissionRequest.get('window').width}
                previewRowKey = {0}
                previewOpenValue = {-40}
                previewOpenDelay = {300}
                onSwipeValueChange = {this.onSwipeValueChange()}/>
            </View>
        )
    }
}