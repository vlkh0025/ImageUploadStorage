import React,{Component} from 'react';
import{Alert} from 'react-native'
import { Container, Header, Content, Button, Text,List ,Icon, ListItem, Body,Left,Right, Thumbnail,Input,Item} from 'native-base';
import firebase from './../components/FireBaseConfig';
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = { 
            username:this.props.navigation.state.params.data.user.Username ,
            password:this.props.navigation.state.params.data.user.Password,
        };
        database = firebase.database();
        user = database.ref('User');
    }

    Edit(){
        user.child(this.props.navigation.state.params.data.key).set({
            Username:this.state.username,
            Password:this.state.password,
            avatar:this.props.navigation.state.params.data.user.avatar,
        },()=>Alert.alert(
            'Notice',
            'Login Succesfull '+this.state.email ,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'edit thanh cong', onPress: () => this.props.navigation.navigate('Demo')},
            ],
            { cancelable: false }
          ))
    }

    render(){
        var state   = this.props.navigation.state;
        return(
            <Container>
               <Text>id =: {state.params.data.key}</Text>
                <Text>{state.params.data.user.Username}</Text>
                <Text>{state.params.data.user.Password}</Text>
                <Text>{state.params.data.user.avatar}</Text>
                <Item>
                    <Input  
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}/>
                </Item>
                <Item>
                    <Input 
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}/>
                </Item>
                <Button bordered info onPress={()=>this.Edit()}>
                    <Text>Edit</Text>
                 </Button>
            </Container>
        );
    }
}