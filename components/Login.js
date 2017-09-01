import React,{Component} from 'react';
import {View, Text, TextInput, TouchableOpacity,Dimensions ,Alert} from 'react-native';
import {FireBaseApp} from './FireBaseConfig';
var {height, width} = Dimensions.get('window');
export default class Login extends Component{
    static navigationOptions = {
        headerTitle: 'Login',
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
      DangNhap(){
        FireBaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            Alert.alert(
                'Notice',
                'Login Succesfull '+this.state.email ,
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => this.props.navigation.navigate('WellCome')},
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
                'Login Failed '+this.state.email ,
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
            <View style ={{ flex:1, justifyContent:'center', alignItems:'center', padding:10}}>
                <TextInput
                    style={{height: 40,width:width/1.5, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    placeholder={'input email'}
                />
                <TextInput
                    style={{height: 40,width:width/1.5, borderColor: 'gray', borderWidth: 1}}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder={"input password"}
                />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{backgroundColor:'#80ffff', padding:10, marginRight:30}}
                        onPress={()=> this.DangNhap()}               
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#82ff82', padding:10, marginLeft:30}}
                        onPress={() => this.props.navigation.navigate('Register')} 
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}