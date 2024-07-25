
import React, { Component, PureComponent } from 'react'
import { View, Text, StatusBar, Image, TouchableOpacity, Platform } from 'react-native'
import utils from '../../Utils'
import { normalize, vh, vw } from '../../Utils/dimentions';
import styles from './styles'
import { Modal } from 'react-native';
class drawer extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.state.sideModalD}
                        backdropColor="transparent"
                        onBackdropPress={() => { this.setState({ sideModalD: false }) }}
                        // onBackdropPress={() => sideModalD(false)}

                        animationIn="slideInLeft"
                        animationOut='slideOutLeft'
                        style={{ margin: 0, backgroundColor: "transform" }}
                    >

                        <View style={{ flex: 1, backgroundColor: utils.color.lightBackgroundGrey, marginLeft: vw(-10) }}>
                            <StatusBar
                                hidden={false}
                            />
                            <View style={{ height: "100%", width: vw(340), backgroundColor: utils.color.ButtonAll, borderTopRightRadius: 30, borderBottomRightRadius: 30 }}>
                                <View style={{ height: "100%", width: "100%", backgroundColor: utils.color.background }}>
                                    <View style={{ flex: 1, }}>
                                        {/* <TouchableOpacity

                                                onPress={() => this.setState({ sideModalD: false })}
                                                style={{ padding: 0, paddingBottom: 60 }}
                                            >
                                                <Image source={utils.icons.Back} style={{ alignSelf: 'flex-end', marginTop: vh(50), marginRight: vw(30), height: vh(40), width: vw(40), tintColor: '#fff' }} />
                                            </TouchableOpacity> */}
                                        <View style={{ backgroundColor: utils.color.HeaderColor }}>
                                            {/* <TouchableOpacity  >
                                                    <Image source={utils.icons.User} style={{ alignSelf: 'center', height: vh(150), width: vw(150), }} />
                                                </TouchableOpacity> */}
                                            <TouchableOpacity onPress={()=>{this.setState({imageselect:true}) }} style={{ height: vh(112), alignSelf: "center", width: vw(112), borderRadius: 110, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center', marginTop: 50 }}>
                                                {/* <Text style={{ fontSize: 36, color: utils.color.HeaderColor, fontWeight: 'bold' }} >{profileName}</Text> */}
                                                <Image source={utils.icons.Userprofile} style={{ height: vh(105), width: vw(100), alignSelf: 'center' }} />
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'column', alignSelf: 'center', marginTop: vh(10), marginBottom: vh(30) }}>
                                                <Text style={[utils.fontStyle.FontFamilymachoB, { alignSelf: 'center', color: utils.color.whiteText, fontSize: normalize(24) }]}>Hello Mariakaa </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>My Profile</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({ sideModalD: false }); this.props.navigation.navigate("Goal") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>My goal</Text>
                                            </View>
                                        </TouchableOpacity><TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>My task</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Announcement") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Announcement</Text>
                                            </View>
                                        </TouchableOpacity><TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>DSR</Text>
                                            </View>
                                        </TouchableOpacity><TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>My Team</Text>
                                            </View>
                                        </TouchableOpacity><TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Reimbursement</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Regularization</Text>
                                            </View>
                                        </TouchableOpacity><TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Terms & Services</Text>
                                            </View>
                                        </TouchableOpacity><TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Manage Attendance</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Terms") }}>
                                            <View style={{ marginLeft: vw(30), marginTop: Platform.OS === "ios" ? vh(20) : vh(10), flexDirection: 'row' }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Reset Password</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("Privacy") }}>
                                            <View style={{ marginLeft: vw(30), flexDirection: 'row', marginTop: Platform.OS === "ios" ? vh(20) : vh(10) }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.Privacy}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Privacy policy</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.props.navigation.navigate("AboutUs") }} >
                                            <View style={{ marginLeft: vw(30), flexDirection: 'row', marginTop: Platform.OS === "ios" ? vh(20) : vh(10) }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.AboutUs}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>About Us</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setState({ sideModalD: false }); this.Logout_Alert() }}>
                                            <View style={{ marginLeft: vw(30), flexDirection: 'row', marginTop: Platform.OS === "ios" ? vh(20) : vh(10) }}>
                                                <Image style={{ height: vh(30), width: vw(30), tintColor: '#fff', alignSelf: 'center', marginRight: vw(20) }} source={utils.icons.Go}></Image>

                                                <Text style={[utils.fontStyle.FontFamilyBold, { fontSize: normalize(20), color: utils.color.whiteText }]}>Log out</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
            </View>


        );
    }
}

export const Drawer = drawer

