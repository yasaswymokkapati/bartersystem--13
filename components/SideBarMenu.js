import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import db from '../config';

export default class SideBarMenu extends React.Component{
    constructor(){
        super()
            this.state = {
                userId : firebase.auth().currentUser.email,
                image : '#',
                name : '',
                docId : ''
            
        }
    }
selectPicture = async ()=>{
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [4, 3],
            quality : 1
        })
        if(!cancelled){
            this.uploadImage(uri, this.state.userId)
        }
}
uploadImage = async (uri, imageName)=>{
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child('user_profiles/' + imageName)
        
        return ref.put(blob).then(response=>{
            this.fetchImage(imageName)
        })
}
fetchImage  = async(imageName)=>{
    var storageRef = firebase.storage().ref().child('user_profiles/' + imageName)
    storageRef.getDownloadURL().then(uri=>{
        this.setState({
            image : uri
        })
        .catch(error=>{
            this.setState({
                image : '#'
            })
        })
    })
}
getUserProfile(){
    db.collection('User').where('emailID', '==', this.state.userId).onSnapshot(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                name : doc.data().first_name + ' ' + doc.data().last_name
            })
        })
    })
}
componentDidMount(){
    this.fetchImage(this.state.userId)
    this.getUserProfile()
}
    render(){
        return(
            <View style = {{flex : 1}}>
                <View style =  {{flex : 0.5, alignItems : "center", backgroundColor : 'white'}}>
                    <Avatar
                    rounded
                    source = {{
                        uri : this.state.image
                    }}
                    size = "medium"
                    onPress = {()=>{
                        this.selectPicture()
                    }}
                    containerStyle = {styles.imageContainer}
                    showEditButton/>
                    <Text style = {{fontWeight : "bold", fontSize : 20, paddingTop : 10}}>{this.state.name}</Text>
                </View>
                <View style = {styles.DIContainer}>
                    <DrawerItems 
                    {...this.props}/>
                </View>
                <View style = {styles.logout}>
                    <TouchableOpacity style = {styles.logoutButton}
                    onPress = {()=>{
                        this.props.navigation.navigate('SignupLoginScreen')
                        firebase.auth().signOut()
                    }}><Text style = {styles.logout}>Logout</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}