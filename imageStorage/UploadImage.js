import React,{Component} from 'react';
import {View,Image,ActivityIndicator , Platform} from 'react-native';
import { Container, Header, Content, Button, Text,List ,Icon, ListItem, Body,Left,Right, Thumbnail} from 'native-base';
import firebase from './../components/FireBaseConfig';
var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob'
// image picker
var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
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
export default class UploadImageStorage extends Component{
    constructor(props){
        
        super(props);
        this.state={

        }
        console.ignoredYellowBox = [
            'Setting a timer'
            ];
    }
    pickImage(){
        ImagePicker.showImagePicker(options, (response) => {
           this.setState({avatarSource:''})
            if (response.didCancel) {
              
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

    
    render(){
        return(
            <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                {
                    (()=>{
                        switch(this.state.avatarSource){
                            case null:
                                return null
                            case '':
                                return <ActivityIndicator />
                            default:
                                return (
                                    <View>
                                    <Image source={{uri:this.state.avatarSource}} style ={{height:200, width:200}}/>
                                    <Text>{this.state.avatarSource}</Text>
                                    </View>
                                )
                        }
                    }) ()
                }
                <View>
                    
                <Button iconLeft transparent primary bordered  
                style={{alignItems:'center', justifyContent:'center'}}
                onPress={this.pickImage.bind(this)}
                >
                    <Icon name='image' />
                    <Text>Upload</Text>
                </Button>
                </View>
            </View>
        );
    }
}