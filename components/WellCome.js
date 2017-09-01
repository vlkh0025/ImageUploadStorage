import React,{Component} from 'react';
import {View, Text ,TextInput,TouchableOpacity,Alert} from 'react-native';


export default class WellCome extends Component{
    static navigationOptions = {
        headerTitle: 'WellCome',
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
                      
                    >
                        <Text>Confirm</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}