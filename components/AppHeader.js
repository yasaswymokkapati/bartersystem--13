import * as React from 'react';
import { Header, Icon, Badge} from 'react-native-elements';
import { StyleSheet, Text, View, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase'

const BellIconWithBadge = (props)=>{

    return(
        <View>
            <Icon name = {"bell"} type = "font-awesome" color  = "blue" size = {25} 
            onPress = {props.navigation.navigate('Notification')}/>
            <Badge value = {this.state.num} 
            containerStyle = {{postion : "absolute", top : -3, right : -3}}/>
        </View>
    )
}
const MyHeader = props=>{
    return(
        <Header 
        rightComponent = {<BellIconWithBadge {...this.props}/>}
        leftComponent = {<Icon name = {"bars"} type = "font-awesome" color  = "pink" 
            onPress = {()=>props.navigation.toggleDrawer()}/>}
        centerComponent = {{text : props.title, style : {color : "white"}, fontSize : 20, fontWeight : 'bold'}}
        backgroundColor = "purple"/>
    )
}
export default class MtHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            num = ''
        }
    }
getNumberOfUnreadNotification(){
    db.collection('All_notifications').where('notification_status', '==', 'unread')
    .onSnapshot(snapshot=>{
        var unreadNotifications = snapshot.docs.map(doc=>{
            doc.data()
        })
        this.setState({
            num : unreadNotifications.length
        })
    })
}
componentDidMount(){
    this.getNumberOfUnreadNotification()
}
    render(){
        return(
            <View>

            </View>
        )
    }
}
export default MyHeader();