import React,{Component} from 'react';
import {View, Text ,TextInput,TouchableOpacity,Alert} from 'react-native';
import {FireBaseApp} from './FireBaseConfig';
export default class Register extends Component{
    static navigationOptions = {
        headerTitle: 'Register',
        headerStyle:{ backgroundColor:'#b0b0d9',},
        headerTitleStyle:{ color:'#ffffff',fontFamily:'Avenir', textAlign: 'center',alignSelf:'center'},
      }
      constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password:''
        };
      }
      DangKy(){
        FireBaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            Alert.alert(
                'Notice',
                'Register Succesfull '+this.state.email ,
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                ],
                { cancelable: false }
              )
              this.setState({
                  email:'',
                  password:''
              })
        })
        .catch(function(error) {
            Alert.alert(
                'Error',
                'Register Failed '+this.state.email ,
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
          });
      }
    render(){
        return(
            <View style ={{ flex:1, justifyContent:'center', alignContent:'center'}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <TouchableOpacity style={{backgroundColor:'#82ff82', padding:10, alignItems:'center'}}
                        onPress={() => {this.DangKy()}} 
                    >
                        <Text>Confirm</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}