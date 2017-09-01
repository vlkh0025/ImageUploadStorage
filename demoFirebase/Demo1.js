import React, { Component } from 'react';
import {
  AppRegistry,View,StyleSheet,TouchableOpacity, TextInput, Dimensions,Alert,ListView, ActivityIndicator,Platform
} from 'react-native';
import { Container, Header, Content, Button, Text,List ,Icon, ListItem, Body,Left,Right, Thumbnail} from 'native-base';
import firebase from './../components/FireBaseConfig';
//storage
var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob'

// image picker
var options = {
    title: 'Select Avatar',
    
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
// strorage 
const storage = firebase.storage();
const Blob =  RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mine = 'application/octet-stream') =>{
    return new Promise((resolve, reject)=>{
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://','') : uri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = storage.ref('images').child(`${sessionId}.png`);

        fs.readFile(uploadUri, 'base64')
        .then((data)=>{
            return Blob.build(data,{type:`${mine}; BASE64`})
        })
        .then((blob)=>{
            uploadBlob = blob
            return imageRef.put(blob,{contentType: mine})
        })
        .then(()=>{
            uploadBlob.close()
            return imageRef.getDownloadURL()
        })
        .then((url)=>{
            resolve(url)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

var {height, width} = Dimensions.get('window');

export default class Demo1 extends Component{

    constructor(props){
        super(props);
        
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        if (this.refs.myRef) 
            this.setState({myVar: true});
        items=[];
        this.state={
           username:'',
           password:'',
           avatarSource:'...',
           dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            //basic: true,
           //listViewData: items,
          
        }
        database = firebase.database();
        user = database.ref('User');
    }

    Submit(){
        user.set({
            Username:this.state.username,
            Password:this.state.password,
            avatar:this.state.avatarSource,
        },()=>Alert.alert(
            'Notice',
            'Login Succesfull '+this.state.email ,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK'},
            ],
            { cancelable: false }
          ))
    }

    Push(){
        user.push({
            Username:this.state.username,
            Password:this.state.password,
            avatar:this.state.avatarSource,
        },()=>Alert.alert(
            'Notice',
            'Login Succesfull '+this.state.email ,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK'},
            ],
            { cancelable: false }
          ))
    }

    addDB(){
        user.child('SinhVien').child('Ten').on('value',function(snapShot){
            alert(snapShot.val())
        })
    }

    Delete(data){
        user.child(data.key).remove();
    }

    Detail(data){
        this.props.navigation.navigate('Detail',{
            data: data
        });
    }

    componentWillMount(){
        user.on('value', (snap)=>{
            items=[];
            snap.forEach((data)=>{
                items.push(
                {   
                    key:data.key,
                    user:data.val(),
                });
            });
            this.setState({dataSource:this.state.dataSource.cloneWithRows(items)});
        });
    }

    pickImage(){
        ImagePicker.showImagePicker(options, (response) => {
           this.setState({avatarSource:''})
            if (response.didCancel) {
                this.setState({avatarSource:'...'})
            }
            else if (response.error) {
             
            }
            else if (response.customButton) {
             
            }
            else {
            uploadImage(response.uri)
              .then(url => this.setState({avatarSource: url}))
              .catch(error => console.log(error))
            
            }
          });
    }

    renderRow(data){
        return(
           
           
                   
                <ListItem  avatar onPress={()=>this.Detail(data)} style={{borderColor:'gray', borderWidth:1}}>
                
                <Left>
                    <Thumbnail source={{ uri: data.user.avatar }} />
                    
                </Left>
                <Body>
                    <Text>{data.user.Username}</Text>
                    <Text note>{data.user.Password}</Text>
                   
                </Body>
                <Right>
                    <Text note>{data.key}</Text>
                   
                </Right>
                
                </ListItem>
              
                
        );
    }

    render(){
        return(
            <View style = {styles.container}>
                
                <View style={{flex:0.6}}>
                
                 <List enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}

                    renderLeftHiddenRow={data=>
                        <Button style={{backgroundColor:'red'}}  onPress={() => this.Delete(data) }>
                          <Icon active name="trash" />
                        </Button>}
                    

                    renderRightHiddenRow={data =>
                        <Button style={{backgroundColor:'red'}}  onPress={() => this.Delete(data) }>
                          <Icon active name="trash" />
                        </Button>}

                        //leftOpenValue={75}
                    rightOpenValue={-75}
                 /> 
                
                </View>

                <View style={{flex:0.4}}>

                <TextInput style={{height: 40,width:width/1.5, borderColor: 'gray', borderWidth: 1}}
                 placeholder={"user name"} onChangeText={(username)=>this.setState({username})}
                 value={this.state.username}/>
                <TextInput style={{height: 40,width:width/1.5, borderColor: 'gray', borderWidth: 1}}
                 placeholder={"password"} secureTextEntry={true} onChangeText={(password) => this.setState({password})}
                 value={this.state.password}/>

  
                <View> 
                <Button iconLeft transparent primary bordered  
                style={{alignItems:'center', justifyContent:'center'}}
                onPress={this.pickImage.bind(this)}
                >
                    <Icon name='image' />
                    <Text>Upload</Text>
                </Button>
             
            
                { //xet xem sourceImage co chua, chua co thi cho quay, co thi dua link ra

                    (()=>{
                        switch(this.state.avatarSource){
                            case null:
                                return null
                            case '':
                                return <ActivityIndicator />
                            default:
                                return (
                                    <View>    
                                    <TextInput style={{height: 40,width:width/1.5, borderColor: 'gray', borderWidth: 1}}
                                    placeholder={"avatarSource"} onChangeText={(avatarSource) => this.setState({avatarSource})}
                                    value={this.state.avatarSource}/>                             
                                    </View>
                                )
                        }
                    }) ()
                }
                </View>
                 <TouchableOpacity  style={{marginTop:10}}onPress={this.Submit.bind(this)}>
                    <Text>set</Text>
                </TouchableOpacity> 
                <TouchableOpacity  style={{marginTop:10}}onPress={this.Push.bind(this)}>
                    <Text>push</Text>
                </TouchableOpacity> 
                <TouchableOpacity  style={{marginTop:10}}onPress={this.addDB.bind(this)}>
                    <Text>addDB</Text>
                </TouchableOpacity> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center',
        //alignItems:'center',
    }
})
