import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Button, Image, ImageBackground } from 'react-native'
import { withMyHook } from "../../../Utils/Dark"
import { vh, vw, normalize } from '../../../Utils/dimentions';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Announcement} from "../Announcement";
// import Leads from "../Announcement/Announcement";
import {DSR} from "../dsr";
const TopTab = createMaterialTopTabNavigator();
import { NavigationContainer } from '@react-navigation/native';
import utils from '../../../Utils';
import { Header } from "../../../Components/Header"

class pendingaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    async componentDidMount() {
       
    }
    
    TopTabNavigator = () => (
        <TopTab.Navigator
            initialRouteName="Announcement"
            screenOptions={{
                // indicatorStyle: {backgroundColor: null,},
                // indicatorStyle: {backgroundColor:'#4A6159'},
                // style: styles.tabContainer,
            }}
            tabBarOptions={{
                indicatorStyle: {
                    // backgroundColor: utils.color.HeaderColor,
                },
            }}
        >
         
            <TopTab.Screen
                name="Announcement"
                component={Announcement}
                options={{
                    tabBarLabel: ({ focused }) =>
                        <View style={{
                            justifyContent: 'center',
                            borderRadius: 2,height:"auto",width:vw(230),
                            // borderBottomColor: focused ? "#fff" : null,
                            // backgroundColor:"red",

                            // borderBottomWidth: focused ? 5 : null

                        }}>
                         
                            <Text style={{
                                alignContent: 'center', textAlign: 'center',
                                fontWeight: focused ? 'bold' : null,
                                color: focused ? "#fff" : "grey",
                                backgroundColor:focused?utils.color.HeaderColor:"lightgrey",
                                fontSize: normalize(16),paddingTop:10,paddingBottom:10
                            }}>Leaves</Text>
                        </View>
                }}
            />
               <TopTab.Screen
                name="DSR"
                component={DSR}
                options={{
                    tabBarLabel: ({ focused }) =>
                        <View style={{
                            justifyContent: 'center',
                            borderRadius: 2,height:"auto",width:vw(230),
                            // borderBottomColor: focused ? "#fff" : null,
                            backgroundColor:focused?utils.color.HeaderColor:"lightgrey",

                            // borderBottomWidth: focused ? 5 : null

                        }}>
                         
                            <Text style={{
                                alignContent: 'center', textAlign: 'center',
                                fontWeight: focused ? 'bold' : null,
                                color: focused ? "#fff" : "grey",
                                fontSize: normalize(16),paddingTop:10,paddingBottom:10
                            }}>Reimbursement</Text>
                        </View>
                }}
            />
 
        </TopTab.Navigator>
    )
   
    render() {
        const { Age, Gender, PhoneNumber, DateOfbirth } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: utils.color.HeaderColor ,marginTop:20}}>
              {/* <StatusBar
                    hidden={false}
                    backgroundColor={utils.color.HeaderColor}
                /> */}
              <Header
                title="Leave Announcement"
                // lefticon={utils.icons.Back} leftFunction={() => { this.props.navigation.goBack() }}
              // rightIcon={utils.icons.splashLogo} rightFunctionality={() => { this.props.navigation.navigate("Profile") }}
              />
                {/* {this.TopTabNavigator()} */}

                   
            </SafeAreaView>

        )
    }
}
export const PendingAction = withMyHook(pendingaction)
var styles = StyleSheet.create({
  
});