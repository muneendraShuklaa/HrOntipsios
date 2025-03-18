import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,Image } from 'react-native';
import { WebView } from 'react-native-webview'
import utils from '../../../Utils';
import { Header } from "../../../Components/Header"
import { withMyHook } from "../../../Utils/Dark"
import { vh, vw, normalize } from '../../../Utils/dimentions';

import { SafeAreaView } from 'react-native-safe-area-context';

class leavestatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
        height:false,
        cardDeatils: [
              
            {
                date: 'Mar 08,2023-Mar 09,2023',
                leavetype: 'Casual Leaves',
                Status:"Approved",
                type:"Full Day",
                Reasion:": This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. Please notify the system manager if you hav: This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. Please notify the system manager if you have received this email in error. This message contains confidential information e received this email in error. This message contains confidential information ",
                Comment:"your leave is approved by Hr Head"
            },
            {
                date: 'Jan 08,2023-jan 09,2023',
                leavetype: 'Eaened Leaves',
                Status:"Pending",
                type:"half Day",
                Reasion:": This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. Please notify the system manager if you hav: This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. Please notify the system manager if you have received this email in error. This message contains confidential information e received this email in error. This message contains confidential information ",
                Comment:"your leave is approved by Hr Head"
            },
          
        ]
     
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: utils.color.HeaderColor }}>
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
          {/* <StatusBar
                hidden={false}
                backgroundColor={utils.color.HeaderColor}
            /> */}
          <Header
            title="Leave Balance"
            lefticon={utils.icons.Back} leftFunction={() => { this.props.navigation.goBack() }}
          // rightIcon={utils.icons.splashLogo} rightFunctionality={() => { this.props.navigation.navigate("Profile") }}
          />
 <FlatList
                                style={{ marginTop: vh(20), height:"100%" ,padding:20}}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.cardDeatils?.length>0?this.state.cardDeatils:[]}
                                keyExxtractor={(item, index) => index.toString}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                            />
                            






          

        </View>
      </SafeAreaView>
    );
  }
  renderItem(item, index) {
    return (
        <View style={{ height:'auto', width: "98%", marginTop: vh(5),marginBottom:10, justifyContent: 'center', alignSelf: 'center' }}>
            <View style={[styles.shadowView,{height: this.state.height ==true?"auto":"auto" }]}>
                {/* <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate("LiveLocation")}}> */}
                <View style={{ flexDirection: 'row',marginTop:10}}>
                    <View style={{ alignSelf: 'center' }}>
                    <Text style={[styles.Title, utils.fontStyle.TextSemiBold,{width:230,marginLeft:20, alignSelf:'center'}]}>{item.date}</Text>
                    <Text style={[styles.Title, utils.fontStyle.TextSemiBold,{width:200,marginLeft:20, }]}>{item.leavetype}</Text>
                    </View>
                    <View style={{ alignSelf: 'center', }}>
                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold,{ alignSelf:'center'}]}>{item.Status}</Text>
                        <Text style={[styles.Title, utils.fontStyle.FontFamilyRegular,{fontSize:12, color:'grey',alignSelf:'center'}]}>{item.type}</Text>
                       <TouchableOpacity  onPress={()=>{this.setState({height:true})
                    }}>
                        <Text style={[styles.Title, utils.fontStyle.FontFamilyRegular,{fontSize:12, color:'grey',alignSelf:'center'}]}>View Details</Text>
                        </TouchableOpacity>
                    </View>  
                </View>
                <Text style={[styles.Title, utils.fontStyle.TextSemiBold,{paddingTop:20,paddingLeft:20,paddingBottom:10}]}>Reasion</Text>
                        <Text style={[styles.Title, utils.fontStyle.FontFamilyRegular,{fontSize:12, color:'grey',paddingLeft:20,paddingBottom:20,paddingRight:10}]}>{item.Reasion}</Text>
                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold,{paddingTop:20,paddingLeft:20,paddingBottom:10}]}>Manager Comment</Text>
                        <Text style={[styles.Title, utils.fontStyle.FontFamilyRegular,{fontSize:12, color:'grey',paddingLeft:20,paddingBottom:20,paddingRight:10}]}>{item.Comment}</Text>
                          
           
                   </View>
                  
            
        </View>

    )
}
}
export const leaveStatus = withMyHook(leavestatus)
const styles = StyleSheet.create({
    Title: {
        color: "#000",
    },
    shadowView: {
      width: "100%", justifyContent: 'space-between',marginBottom:20,
        borderRadius: 10,
        backgroundColor: '#fff', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});
