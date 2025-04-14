import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import { withMyHook } from '../../../Utils/Dark';
import { vh, vw, normalize } from '../../../Utils/dimentions';
import utils from '../../../Utils';
import SignInHelper from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoder';
import { StackActions } from '@react-navigation/native';

// import Geolocation from '@react-native-community/geolocation';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
// import{ firebase } from '@react-native-firebase/auth';
// import { AppOpenAd, InterstitialAd, BannerAdSize, BannerAd, TestIds } from "react-native-google-mobile-ads";
// import { AppOpenAd, InterstitialAd, BannerAdSize, BannerAd, TestIds } from "react-native-google-mobile-ads";
import RNLocation from 'react-native-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../../../Utils';
import { color } from '../../../Utils/color';
import useNetworkStatus from '../../../Utils/useNetworkStatus';

// navigator.geolocation = require('@react-native-community/geolocation');

Icon.loadFont();
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: 'jht10047',
      // password: '123@Sitaram',
      email: '',
      password: '',
      isloading: false,
      Active: '',
      secureTextEntry: true,
      address: '',
      AuthToken: '',
      message: '',
      // Title:this.props.route.params.Title
    };
    this.helper = new SignInHelper(this);

    this.isMountedComponent = false;
    this.abortController = new AbortController();
  }
  async componentDidMount() {
    this.isMountedComponent = true;
    // console.log('Navigation in component:', this.props.navigation); // <-- should NOT be undefined


    try {
      let AuthToken = await AsyncStorage.getItem('AuthToken');
      if (this.isMountedComponent) {
        this.setState({ AuthToken });
      }
      this.helper.AuthCheck(this.abortController.signal);
      this.AuthCheck(this.abortController.signal);
    } catch (error) {
      console.log('Error fetching authtoken', error);

    }
 
  }

  componentWillUnmount() {
    this.isMountedComponent = false;
    this.abortController.abort();
  }

  AuthCheck = async (signal) => {
    if (signal?.aborted) return;

    try {
      let Active = await AsyncStorage.getItem('IsAuthenticated');
      let Answer1 = await AsyncStorage.getItem('Answer1');
      if (signal?.aborted) return;

      if (Active == 'True' && this.isMountedComponent) {
        this.props.navigation.dispatch(StackActions.replace('HomeStack'));
      }

    } catch (error) {
      console.log('Eror in authcheck :', error);

    }


    // if (Active == 'true' && Answer1 == 'hrontips') {
    //   this.props.navigation.navigate('bottomTabBarr');
    // }
    // if (Active == 'true' && Answer1 == 'ejoin') {
    //   this.props.navigation.navigate('WEJoin');
    // }

  };
  getLocationUser = async () => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.getLatestLocation({ timeout: 60000 }).then(latestLocation => {
          var NY = {
            lat: latestLocation?.latitude,
            lng: latestLocation?.longitude,
          };
          Geocoder.geocodePosition(NY)
            .then(res => {
              if (this.isMountedComponent) {
                this.setState({ address: res[0].locality });
              }
            })
            .catch(err => console.log(err));
          if (this.isMountedComponent) {
            this.setState({
              latitude: latestLocation?.latitude ?? 0,
              longitude: latestLocation?.longitude ?? 0,
              current_latitude: latestLocation?.latitude ?? 0,
              current_longitude: latestLocation?.longitude ?? 0,
            });
          }

        });
      }
    });
  };

  validateNLogin = () => {
    if (this.state.email == false) {
      alert('Please enter your Email-Id.');
    } else {
      if (this.state.password == '') {
        alert('Please enter your password.');
      } else {
        
        // this.props.navigation.navigate("Dashboard")
        const signal = this.abortController.signal;
        this.helper.signIN(signal);
        setTimeout(() => {
          this.helper.registerDevice(signal);
        }, 5000);
      }
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffff', height: '100%' }}>
        <StatusBar
          hidden={false}
          backgroundColor={utils.color.HeaderColor}
          translucent
          barStyle="light-content"
        />
        <ScrollView>
          <ImageBackground
            // mageStyle={{resizeMode: 'contain'}
            style={{
              height: vh(500),
              width: '100%',
              alignSelf: 'center',
              marginTop: -20,
              resizeMode: 'contain',
            }}
            source={
              this.props.isDark
                ? utils.icons.darkBackGround
                : utils.icons.loginback
            }></ImageBackground>

          {/* <ImageBackground source={utils.icons.backImage} style={{ height: "70%", width: '100%',  }} >
             </ImageBackground> */}

          <View
            style={{
              backgroundColor: this.props.themeColor.theameColor,
              borderTopLeftRadius: 20,
              borderTopEndRadius: 20,
              paddingBottom: 100,
              marginTop: -20,
              paddingLeft: 30,
              paddingRight: 30,
              justifyContent: 'center',
              borderWidth: this.props.isDark ? 1 : 0,
              borderColor: this.props.isDark ? '#fff' : 'white',
            }}>
            {/* <Image style={{ height: vh(130), width: vw(320), alignSelf: 'center', marginTop: 140 }} source={utils.icons.Logo}></Image> */}
            <Image
              style={{
                height: 70,
                width: 250,
                alignSelf: 'center',
                marginTop: vw(20),
                resizeMode: 'contain',
                // tintColor: 'white',
              }}
              source={
                this.props.isDark ? utils.icons.hrontips : utils.icons.Logo
              }></Image>
            {/* <Text>{this.state.Title}</Text> */}
            <View
              style={[
                styles.mobileText1,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: vh(40),
                  // borderColor: this.props.themeColor.bordercolor,
                  borderWidth: this.props.isDark ? 1 : 0,
                  borderColor: this.props.isDark ? 'white' : 'grey',
                  backgroundColor: this.props.isDark ? 'black' : '#e9efff',
                },
              ]}>
              <Image
                style={{
                  height: vh(30),
                  resizeMode: 'contain',
                  width: vw(30),
                  tintColor: '#3083EF',
                  alignSelf: 'center',
                  marginRight: vw(2),
                }}
                source={utils.icons.email}></Image>
              <TextInput
                placeholder={utils.Strings.EnterNumber}
                placeholderTextColor={this.props.isDark ? '#fff' : 'grey'}
                returnKeyType="done"
                keyboardType="email-address"
                allowFontScaling={false}
                // onBlur={() => this.state.validMail == false && this.setState({ Mobile: '' })}
                onChangeText={val => this.setState({ email: val })}
                value={this.state.email}
                maxLength={60}
                style={[
                  styles.mobileTextInput,
                  utils.fontStyle.FontFamilyRegular,
                  { color: this.props.isDark ? '#fff' : '#000' },
                ]}></TextInput>
            </View>
            <View
              style={[
                styles.mobileText1,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: vh(20),
                  // borderColor: this.props.themeColor.bordercolor,
                  borderWidth: this.props.isDark ? 1 : 1,
                  borderColor: this.props.isDark ? '#fff' : 'white',
                  backgroundColor: this.props.isDark ? 'black' : '#e9efff',
                },
              ]}>
              <Image
                style={{
                  height: vh(30),
                  width: vw(30),
                  tintColor: '#3083EF',
                  alignSelf: 'center',
                  resizeMode: 'contain',

                  marginRight: vw(2),
                }}
                source={utils.icons.padlock}></Image>
              <TextInput
                placeholder={utils.Strings.password}
                placeholderTextColor={this.props.isDark ? '#fff' : 'grey'}
                returnKeyType="done"
                secureTextEntry={this.state.secureTextEntry}
                allowFontScaling={false}
                // onBlur={() => this.state.validMail == false && this.setState({ Mobile: '' })}
                onChangeText={val => this.setState({ password: val })}
                value={this.state.password}
                maxLength={16}
                style={[
                  styles.mobileTextInput,
                  utils.fontStyle.FontFamilyRegular,
                  { color: this.props.isDark ? '#fff' : '#000' },
                ]}></TextInput>
              {this.state.secureTextEntry === true ? (
                <TouchableOpacity
                  onPress={() => this.setState({ secureTextEntry: false })}
                  style={{ justifyContent: 'center' }}>
                  <Image
                    source={utils.icons.hidden}
                    style={{
                      height: vh(30),
                      width: vw(30),
                      tintColor: '#3083EF',
                      alignSelf: 'center',
                      resizeMode: 'contain',

                      marginRight: vw(2),
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({ secureTextEntry: true })}
                  style={{ justifyContent: 'center' }}>
                  <Image
                    source={utils.icons.eye}
                    style={{
                      height: vh(30),
                      width: vw(30),
                      tintColor: '#3083EF',
                      alignSelf: 'center',
                      resizeMode: 'contain',

                      marginRight: vw(2),
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {/* {this.state.AuthToken!==null?
          <Text>Please Ender Valid Credentials</Text>
          : */}
            {/* null}
          <Text>{this.state.AuthToken}</Text> */}
            {this.state.message == 'incorrect password' ? (
              <Text
                style={[
                  utils.fontStyle.FontFamilyBold,
                  { color: 'red', marginTop: 5, marginLeft: 5 },
                ]}>
                Email Id or Password is incorrect
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Forgot');
                }}>
                {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}
                <Text
                  style={[
                    utils.fontStyle.FontFamilyBold,
                    { color: utils.color.ClorText, fontSize: 16 },
                  ]}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={[styles.ButtonView, {}]}
                onPress={() => {
                  // this.props.navigation.navigate("bottomTabBar");
                  // this.handleSendCode(), { Email: this.state.email, Password: this.state.password }
                  this.validateNLogin();
                
                }}>
                <Text
                  style={[
                    utils.fontStyle.FontFamilyExtraBold,
                    { color: utils.color.TextColorWhite },
                    { textAlign: 'center', fontSize: 22, fontWeight: 'bold' },
                  ]}>
                  {utils.Strings.login}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('WEJoin');
                }}>
                <Text>Ejoin</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export const Login = withMyHook(login);
const styles = StyleSheet.create({
  Image: {
    width: vw(50),
    tintColor: utils.color.ButtonAll,
    height: Platform.OS === 'ios' ? vh(50) : vh(50),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mobileText: {
    height: vh(50),
    width: '80%',
    fontSize: normalize(16),
    paddingLeft: vw(20),
  },

  mobileText1: {
    height: 'auto',
    // marginTop: vh(50),
    width: '100%',
    backgroundColor: '#e9efff',
    fontSize: normalize(18),
    paddingLeft: vw(20),
    borderRadius: normalize(10),
    // backgroundColor: '#fff',
    // borderColor: 'red',
    // borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
  },
  mobileTextInput: {
    paddingLeft: vw(15),
    height: 'auto',
    padding: 15,
    width: '80%',
    alignSelf: 'center',
  },
  ButtonView: {
    backgroundColor: '#3083EF',
    height: vh(60),
    width: '100%',
    borderRadius: vw(30),
    marginTop: vh(30),
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
