import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../components/AppHeader';
import { ListItem, Icon } from 'react-native-elements';

export default class Notification extends React.Component{
        constructor(props) {
          super(props);
      
          this.state = {
            userId :  firebase.auth().currentUser.email,
            allNotifications : []
          };
      
          this.notificationRef = null
        }
        getNotifications=()=>{
            this.requestRef = db.collection("All_notifications")
            .where("notification_status", "==", "unread")
            .where("targeted_user_id",'==',this.state.userId)
            .onSnapshot((snapshot)=>{
              var allNotifications =  []
              snapshot.docs.map((doc) =>{
                var notification = doc.data()
                notification["doc_id"] = doc.id
                allNotifications.push(notification)
              });
              this.setState({
                  allNotifications : allNotifications
              });
            })
          }
          componentDidMount(){
            this.getNotifications()
          }
        
          componentWillUnmount(){
            this.notificationRef()
          }
        
          keyExtractor = (item, index) => index.toString()
        
          renderItem = ({item,index}) =>{
              return (
                <ListItem
                  key={index}
                  leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
                  title={item.item_name}
                  titleStyle={{ color: 'black', fontWeight: 'bold' }}
                  subtitle={item.message}
                  bottomDivider
                />
              )
         }
        
    render(){
        return(
        <View style={styles.container}>
        <View style={{flex:0.1}}>
          <AppHeader title={"Notifications"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allNotifications}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
        )
    }
}