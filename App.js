import React, { Component } from 'react';
import {
  AppRegistry,Navigator,StyleSheet,
} from 'react-native';

import {
    StackNavigator,
  } from 'react-navigation';

import Login from './components/Login';
import Register from './components/Register';
import WellCome from './components/WellCome';
import Demo1 from './demoFirebase/Demo1';
import Detail from './demoFirebase/Detail';
import UploadImageStorage from './imageStorage/UploadImage';
import LamChoi from './components/LamChoi';
const App = StackNavigator({
    Login: { screen: Login },
    Register: { screen: Register },
    WellCome: { screen: WellCome },
    Demo: { screen: Demo1 },
    Detail: { screen: Detail },
    UploadImageStorage: { screen: UploadImageStorage },
    LamChoi: {screen: LamChoi }
    },

    {
        initialRouteName:'LamChoi',
        headerMode:'none',
        navigationOptions :{
            
        }
    }

);
export default App;

