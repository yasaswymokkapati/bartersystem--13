import * as React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            firstName : '',
            lastName : '',
            contact : '',
            address : '',
            docID : ''
        }
    }
getData(){
    var user = firebase.auth().currentUser
    var email = user.email
    db.collection('User').where('email_ID', '===', email()).get()
    .then(snapShot=>{
        snapShot.forEach(doc=>{
            var data = doc.data()
            this.setState({
                docID : doc.id,
                firstName : data.first_Name,
                lastName : data.last_Name,
                address : data.address,
                contact : data.contact
            })
        })
    })
}
updateData = ()=>{
    db.collection('User').doc(this.state.docID).update({
        'first_Name' : this.state.firstName,
        'last_Name' : this.state.lastName,
        'contact' : this.state.contact,
        'address' : this.state.address
    })
    return Alert.alert("Profile Updated Successfully")
}
componentDidMount(){
    this.getData()
}
    render(){
        return(
            <View style = {styles.container}>
                <AppHeader title = "Profile Settings" navigation = {this.props.navigation()}/>
                <View style = {styles.fontContainer}>
                    <TextInput 
                    style = {styles.inputBox} 
                    placeholder = {"First Name"}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({
                            firstName : text
                        })
                    }}
                    value = {this.state.firstName}/>
                    <TextInput 
                    style = {styles.inputBox} 
                    placeholder = {"Last Name"}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({
                            lastName : text
                        })
                    }}
                    value = {this.state.lastName}/>
                    <TextInput 
                    style = {styles.inputBox} 
                    placeholder = {"Contact"}
                    keyboardType = "numeric"
                    maxLength = {10}
                    onChangeText = {(text)=>{
                        this.setState({
                            contact : text
                        })
                    }}
                    value = {this.state.contact}/>
                    <TextInput 
                    style = {styles.inputBox} 
                    placeholder = {"Address"}
                    multiline
                    numberOfLines = {8}
                    onChangeText = {(text)=>{
                        this.setState({
                            address : text
                        })
                    }}
                    value = {this.state.address}/>
                    <TouchableOpacity style = {styles.button}
                    onPress = {()=>{
                        this.updateData()
                    }}><Text>Save Changes</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}