import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  ImageBackground,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import utils from '../../../Utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {StackActions} from '@react-navigation/native';

import {withMyHook} from '../../../Utils/Dark';

import Modal from 'react-native-modal';
// import RNLocation from 'react-native-location'
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProfiledHelper from './helper';
// navigator.geolocation = require('@react-native-community/geolocation');
class profile extends Component {
  constructor(props) {
    super(props);
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false; //<--------Set allowFontScaling false for Screen

    this.state = {
      Contact: false,
      Address: false,
      PaySlip: false,
      Departmentt: false,
      sideModalImageDoc: false,
      Mobile: '',
      Name: '',
      imageArray2: '',
      DateofBirth: '',
      Address1: '',
      Department: '',
      Departmenttt: '',
      Email: '',
      EmployeeName: '',
      JobTittle: '',
      ManagerName: '',
      Maritalstatus: '',
      ImagePicUrl: '',
      Aadhar: '',
      PAN: '',
      Address2: '',
    };

    this.helper = new ProfiledHelper(this);
  }

  async componentDidMount() {
    this.helper.UserData(), this.helper.UserPersonalData();
    let Name = await AsyncStorage.getItem('Name');
    let Departmenttt = await AsyncStorage.getItem('Department');

    let ImagePicUrl = await AsyncStorage.getItem('ImagePicUrl');

    this.setState({
      Name: Name,
      ImagePicUrl: ImagePicUrl,
      Departmenttt: Departmenttt,
    });
  }
  takeScreenshot = () => {
    ImagePicker.openPicker({
      width: vw(300),
      height: vh(400),
      // multiple: true,
      // cropping: true,
      //   includeBase64: true
    })
      .then(imageUrl => {
        // let tmpArr = this.state.imageArray2
        // tmpArr.push(imageUrl.path)
        // console.warn(imageUrl.path);
        // this.setState({ imageArray2: tmpArr })
        this.setState({ImagePicUrl: imageUrl.path});
        // this.img_ipdate()
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        console.log(e);
        // Alert.alert(e.message ? e.message : e);
      });
  };
  pickSingleWithCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      // includeBase64: true
    })
      .then(imageUrl => {
        // let tmpArr = this.state.imageArray2
        // tmpArr.push(imageUrl.path)
        // console.warn(imageUrl.path)
        this.setState({ImagePicUrl: imageUrl.path});
        // this.img_ipdate()
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }
  render() {
    // console.warn(ClockIn_datetime, 'hhhhhhhhh');
    const {
      play,
      user_name,
      profileName,
      User_Type,
      address,
      IsClockIn,
      ClockIn_datetime,
    } = this.state;
    return (
      <ImageBackground
        imageStyle={{tintColor: this.props.themeColor.Darkk}}
        source={utils.icons.backImage}
        style={{flex: 1, height: '100%', width: '100%'}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 'auto',
            width: vw(390),
            alignSelf: 'center',
            marginTop: 100,
            paddingBottom: 50,

            borderRadius: 20,
            backgroundColor: '#0055C3',
          }}>
          {/* <Text>{this.state.imageArray2}</Text> */}
          <ImageBackground
            imageStyle={{resizeMode: 'contain'}}
            source={utils.icons.User}
            style={{
              height: 140,
              width: 140,
              // borderWidth: 2,
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderRadius: normalize(100),
              marginTop: -50,
            }}>
            <Image
              // source={{uri: this.state.imageArray2}}
              // <Image
              // source={utils.icons.Userprofile}
              source={{
                uri: `data:image/jpg;base64,${this.state.ImagePicUrl}`,
              }}
              style={{
                height: 135,
                width: 135,
                resizeMode: 'contain',
                alignSelf: 'center',
                borderRadius: normalize(100),
                // marginTop: -60,
              }}
            />
          </ImageBackground>
          {/* <TouchableOpacity
            onPress={() => {
              this.setState({sideModalImageDoc: true});
            }}>
            <Icon
              name="edit"
              size={30}
              color="#fff"
              style={{
                alignSelf: 'center',
                marginTop: -20,
                marginLeft: '20%',
              }}></Icon>
          </TouchableOpacity> */}
          <Text
            style={[
              utils.fontStyle.FontFamilymachoB,
              {
                color: '#fff',
                fontSize: normalize(26),
                fontWeight: 'bold',
                alignSelf: 'center',
              },
            ]}>
            {this.state.EmployeeName}
          </Text>
          <Text
            style={[
              utils.fontStyle.FontFamilymachoB,
              {color: '#fff', fontSize: normalize(18), alignSelf: 'center'},
            ]}>
            {this.state.Departmenttt}
          </Text>
          {/* Reject: r
Locationp
Lock: req
Payslip:  */}
        </View>
        <View
          style={{
            height: 'auto',
            width: '80%',
            backgroundColor: this.props.themeColor.theameColor,
            alignSelf: 'center',
            marginTop: -20,
            borderRadius: 10,
            marginBottom: -50,
            borderWidth: this.props.isDark ? 1 : 0,
            borderColor: this.props.isDark ? '#fff' : 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={utils.icons.Contact}
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: this.props.themeColor.textColor,
                }}>
                Personal Details
              </Text>
            </View>
            {this.state.Contact == false ? (
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  padding: 10,
                }}
                onPress={() => {
                  this.setState({
                    Contact: true,
                    Address: false,
                    PaySlip: false,
                    Departmentt: false,
                  });
                }}>
                <Image
                  source={utils.icons.down}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  padding: 10,
                }}
                onPress={() => {
                  this.setState({Contact: false});
                }}>
                <Image
                  source={utils.icons.Vector}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            )}
          </View>
          {this.state.Contact == true ? (
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'lightgrey',
                marginTop: 5,
                marginBottom: 10,
                padding: 15,
                marginLeft: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="mobile"
                  size={30}
                  color="#3C97FF"
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    width: '8%',
                    // backgroundColor: 'red',
                  }}
                />

                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      fontSize: normalize(18),
                      alignSelf: 'center',
                    },
                  ]}>
                  {this.state.Mobile}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 6,
                  // backgroundColor: 'red',
                }}>
                <Icon
                  name="envelope-o"
                  size={20}
                  color="#3C97FF"
                  style={{
                    alignSelf: 'center',
                    width: '8%',
                  }}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      fontSize: normalize(18),
                      textAlign: 'center',
                    },
                  ]}>
                  {this.state.Email}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 6}}>
                <Icon
                  name="gittip"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center', width: '8%'}}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      fontSize: normalize(18),
                      textAlign: 'center',
                    },
                  ]}>
                  {this.state.Maritalstatus}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 6}}>
                <Icon
                  name="calendar-o"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center', width: '8%'}}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      fontSize: normalize(18),
                      textAlign: 'center',
                    },
                  ]}>
                  {moment(this.state.DateofBirth).format('ll')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 6}}>
                <Icon
                  name="vcard"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center', width: '8%'}}
                />

                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      fontSize: normalize(18),
                      textAlign: 'center',
                    },
                  ]}>
                  {this.state.Aadhar}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 6}}>
                <Icon
                  name="id-card-o"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center', width: '8%'}}
                />

                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      fontSize: normalize(18),
                      textAlign: 'center',
                    },
                  ]}>
                  {this.state.PAN}
                </Text>
              </View>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={utils.icons.Locationp} style={{}} />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: this.props.themeColor.textColor,
                }}>
                Address
              </Text>
            </View>
            {this.state.Address == false ? (
              <TouchableOpacity
                style={{alignSelf: 'center', padding: 10}}
                onPress={() => {
                  this.setState({
                    Address: true,
                    Contact: false,
                    PaySlip: false,
                    Departmentt: false,
                  });
                }}>
                <Image
                  source={utils.icons.down}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{alignSelf: 'center', padding: 10}}
                onPress={() => {
                  this.setState({Address: false});
                }}>
                <Image
                  source={utils.icons.Vector}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            )}
          </View>
          {this.state.Address == true ? (
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'lightgrey',
                marginTop: 10,
                marginBottom: 10,
                padding: 5,
              }}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Icon
                  name="address-card"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center', width: '8%'}}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      width: '90%',
                      fontSize: normalize(18),
                      // textAlign: 'center',
                    },
                  ]}>
                  {this.state.Address1}
                </Text>
              </View>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Icon
                  name="address-card-o"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center', width: '8%'}}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      fontSize: normalize(18),
                      width: '90%',
                    },
                  ]}>
                  {this.state.Address2}
                </Text>
              </View>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={utils.icons.Group}
                style={{alignSelf: 'center', height: 20, width: 20}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: this.props.themeColor.textColor,
                }}>
                Department
              </Text>
            </View>
            {this.state.Departmentt == false ? (
              <TouchableOpacity
                style={{alignSelf: 'center', padding: 10}}
                onPress={() => {
                  this.setState({
                    Departmentt: true,
                    Contact: false,
                    Address: false,
                  });
                }}>
                <Image
                  source={utils.icons.down}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{alignSelf: 'center', padding: 10}}
                onPress={() => {
                  this.setState({Departmentt: false});
                }}>
                <Image
                  source={utils.icons.Vector}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            )}
          </View>
          {this.state.Departmentt == true ? (
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'lightgrey',
                marginTop: 10,
                marginBottom: 10,
                padding: 5,
              }}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Icon
                  name="user-circle"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      width: '90%',
                      fontSize: normalize(18),
                      // textAlign: 'center',
                    },
                  ]}>
                  {this.state.ManagerName}
                </Text>
              </View>
              <View style={{flexDirection: 'row', padding: 10, marginTop: -10}}>
                <Icon
                  name="vcard"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: this.props.themeColor.textColor,
                      paddingLeft: 10,
                      width: '90%',
                      fontSize: normalize(18),
                      // textAlign: 'center',
                    },
                  ]}>
                  {this.state.Department}
                </Text>
              </View>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="money"
                size={24}
                color="#3C97FF"
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: this.props.themeColor.textColor,
                }}>
                PaySlip
              </Text>
            </View>
            {this.state.PaySlip == false ? (
              <TouchableOpacity
                style={{alignSelf: 'center', padding: 10}}
                onPress={() => {
                  this.setState({
                    PaySlip: true,
                    Contact: false,
                    Address: false,
                    Departmentt: false,
                  });
                }}>
                <Image
                  source={utils.icons.down}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{alignSelf: 'center', padding: 10}}
                onPress={() => {
                  this.setState({PaySlip: false});
                }}>
                <Image
                  source={utils.icons.Vector}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            )}
          </View>
          {this.state.PaySlip == true ? (
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'lightgrey',
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                padding: 5,
              }}>
              {/* <Image
                                    source={utils.icons.phone}
                                    style={{ height: vh(20), width: vw(20), alignSelf: 'center', marginLeft: 5 }}
                                /> */}
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 18,
                  color: this.props.themeColor.textColor,
                  textAlign: 'center',
                }}>
                Coming Soon
              </Text>
            </View>
          ) : null}
        </View>
        <View></View>
        <TouchableOpacity
          onPress={() => {
            this.setState({Logout: true});
            // this.props.navigation.navigate("Login"), AsyncStorage.setItem('IsAuthenticated', "false")}
          }}
          style={{
            height: 60,
            width: '80%',
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: 80,
            backgroundColor: this.props.themeColor.theameColor,
            borderWidth: this.props.isDark ? 1 : 0,
            borderColor: this.props.isDark ? '#fff' : 'white',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image source={utils.icons.Lock} style={{alignSelf: 'center'}} />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: this.props.themeColor.textColor,
                marginLeft: 15,
              }}>
              LogOut
            </Text>
          </View>
          <Image
            source={utils.icons.down}
            style={{alignSelf: 'center', marginRight: 10}}
          />
        </TouchableOpacity>
        <Modal isVisible={this.state.Logout}>
          <View
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: this.props.themeColor.theameColor,
              borderColor: '#fff',
              borderWidth: 2,
              borderRadius: 30,
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                backgroundColor: '#fff',
                backgroundColor: this.props.themeColor.theameColor,
                borderColor: '#fff',
                borderWidth: 2,
                marginTop: -50,
                alignSelf: 'center',
              }}>
              <Image
                source={utils.icons.Groupllot}
                style={{alignSelf: 'center', marginTop: 20}}
              />
            </View>
            <View style={{margin: 15}}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    textAlign: 'center',
                    color: this.props.themeColor.textColor,
                    marginBottom: 10,
                    fontSize: 32,
                  },
                ]}>
                Are you sure want to logout?
              </Text>

              <TouchableOpacity
                onPress={async () => {
                  AsyncStorage.removeItem('Answer1');
                  AsyncStorage.removeItem('IsAuthenticated');
                  AsyncStorage.removeItem('EmpId');
                  setTimeout(() => {
                    // this.props.navigation.navigate('Login'),
                    this.props.navigation.dispatch(
                      StackActions.replace('AuthStack'),
                    );

                    AsyncStorage.setItem('ImagePicUrl', '');
                    this.setState({Logout: false});
                  }, 1000);
                }}
                style={[styles.ButtonView, {marginTop: 20}]}>
                <ImageBackground
                  imageStyle={{borderRadius: 5}}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={utils.icons.buttonn}>
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {color: '#fff'},
                      {textAlign: 'center', fontSize: 20},
                    ]}>
                    LogOut
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({Logout: false});
                }}
                style={[styles.ButtonView, {marginTop: 10}]}>
                <ImageBackground
                  imageStyle={{tintColor: '#A3A3A3', borderRadius: 5}}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={utils.icons.buttonn}>
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {color: '#fff'},
                      {textAlign: 'center', fontSize: 20},
                    ]}>
                    Cancel
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.sideModalImageDoc}
          animationIn="zoomInDown"
          animationOut="bounceOutDown"
          style={{}}>
          <View
            style={{
              flex: 1,
              backgroundColor: utils.color.lightBackgroundGrey,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: vh(180),
                width: '100%',
                borderWidth: 1,
                borderColor: this.props.themeColor.border,
                backgroundColor: '#fff',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyBold,
                  {
                    color: '#000',
                    marginTop: 10,
                    textAlign: 'center',
                    color: '#3C97FF',
                  },
                ]}>
                Upload Or Edit Profile Picture
              </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.pickSingleWithCamera(),
                      this.setState({sideModalImageDoc: false});
                  }}>
                  <Icon
                    name="camera"
                    size={30}
                    color="#3C97FF"
                    style={{alignSelf: 'center', marginLeft: '5%'}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: this.props.themeColor.blackTitle,
                        marginBottom: 10,
                        alignSelf: 'center',
                      },
                    ]}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.takeScreenshot(),
                      this.setState({sideModalImageDoc: false});
                  }}>
                  <Icon
                    name="file-image-o"
                    size={30}
                    color="#3C97FF"
                    style={{alignSelf: 'center', marginLeft: '5%'}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: this.props.themeColor.blackTitle,
                        marginBottom: 10,
                        alignSelf: 'center',
                      },
                    ]}>
                    Gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.setState({sideModalImageDoc: false});
                  }}>
                  <Icon
                    name="times-circle-o"
                    size={30}
                    color="#377F72"
                    style={{
                      alignSelf: 'center',
                      marginLeft: '5%',
                      color: 'grey',
                    }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: this.props.themeColor.blackTitle,
                        marginBottom: 10,
                        alignSelf: 'center',
                      },
                    ]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}
export const Profile = withMyHook(profile);
const styles = StyleSheet.create({});
