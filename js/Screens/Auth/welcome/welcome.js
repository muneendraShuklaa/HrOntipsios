import React, { Component } from 'react';
import { View,Text,StatusBar,ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native';
import utils from '../../../Utils';
import { Header } from "../../../Components/Header"
import { withMyHook } from "../../../Utils/Dark"

import { SafeAreaView } from 'react-native-safe-area-context';

class welcome extends Component {
  
  render() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: utils.color.HeaderColor }}>
              <StatusBar
                hidden={false}
                backgroundColor={utils.color.HeaderColor}
            />
        <View style={{ flex: 1, backgroundColor: 'lightgrey',justifyContent:'flex-end'}}>
          
          <TouchableOpacity style={{height:'auto',borderRadius:30,marginTop:30,width:'90%',alignSelf:'center',backgroundColor:utils.color.HeaderColor}} onPress={()=>{this.props.navigation.navigate("Login",{Title:"Manager/HR"})}}>
            <Text style={{textAlign:'center',padding:10,fontSize:16,fontWeight:'bold',color:"#fff"}}>Login By Manager</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:'auto',marginBottom:30,borderRadius:30,marginTop:30,width:'90%',alignSelf:'center',backgroundColor:utils.color.HeaderColor}} onPress={()=>{this.props.navigation.navigate("Login",{Title:"Employee"})}}>
            <Text style={{textAlign:'center',padding:10,fontSize:16,fontWeight:'bold',color:"#fff"}}>Login By Employee</Text>
          </TouchableOpacity>
     
  
      </View>
      </SafeAreaView>
    );
  }
}
export const Welcome = withMyHook(welcome)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
