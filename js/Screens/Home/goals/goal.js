import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview'
import utils from '../../../Utils';
import { Header } from "../../../Components/Header"
import { withMyHook } from "../../../Utils/Dark"
import { vh, vw, normalize } from '../../../Utils/dimentions';
import { Dropdown } from 'react-native-material-dropdown';

import { SafeAreaView } from 'react-native-safe-area-context';

class goal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: false,
            cardDeatils: [

                {
                    Nmae: 'Amit Shukla ',
                    Mname: 'muneendra shukla',

                },
                {
                    Nmae: 'Amit Shukla ',
                    Mname: 'muneendra shukla',

                },

            ]

        }
    }
    render() {
        let data = [{
            value: 'IT',
        }, {
            value: 'HR',
        }, {
            value: 'Sales',
        }];
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
                        style={{ marginTop: vh(20), height: "100%", padding: 20 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.cardDeatils}
                        keyExxtractor={(item, index) => index.toString}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                    />









                </View>
            </SafeAreaView>
        );
    }
    renderItem(item, index) {
        let data = [{
            value: '2022',
        }, {
            value: '2023',
        }, {
            value: '2024',
        }];
        return (
            <View style={{ height: 'auto', width: "98%", marginTop: vh(5), marginBottom: 10, justifyContent: 'center', alignSelf: 'center' }}>
                <View style={[styles.shadowView, { height: "auto" }]}>
                    {/* <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate("LiveLocation")}}> */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold, { width: "36%", marginLeft: 10, }]}>Employee Name </Text>
                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold, { width: "2%", marginLeft: 10, }]}>:</Text>

                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold, { width: "100%", marginLeft: 10, }]}>{item.Nmae}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold, { width: "36%", marginLeft: 10, }]}>Manager Name</Text>
                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold, { width: "2%", marginLeft: 10, }]}>:</Text>

                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold, { width: "100%", marginLeft: 10, }]}>{item.Mname}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={[styles.Title, utils.fontStyle.TextSemiBold, { width: "36%", marginLeft: 10, color: utils.color.textColorheading, marginBottom: 10 }]}>Review Cycle</Text>
                    </View>
                    <View style={{ height: 40, borderWidth: 0.4, bordercolor: "grey", width: '95%', backgroundColor: '#fff', borderRadius: 10, marginLeft: 10 }}>
                        <Dropdown style={{ paddingRight: vw(10), color: this.props.themeColor.textColor, marginLeft: 10 }}
                            dropdownOffset={{ top: vh(9), left: 0 }}
                            inputContainerStyle={{ borderBottomColor: "#fff", }}
                            containerStyle={{ alignSelf: 'center', width: "98%", height: "auto", color: utils.color.textColor, }}
                            placeholder='Select Review Cycle Year'
                            placeholderTextColor={this.props.themeColor.textColor}
                            onChangeText={(val) => this.setState({ selectedItem: val })}

                            data={data}
                        />
                    </View>

                </View>


            </View>

        )
    }
}
export const Goal = withMyHook(goal)
const styles = StyleSheet.create({
    Title: {
        color: "#000",
    },
    shadowView: {
        width: "100%", justifyContent: 'space-between', padding: 10,
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
