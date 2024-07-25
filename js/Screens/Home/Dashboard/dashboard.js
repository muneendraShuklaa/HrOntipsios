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
import {Header} from '../../../Components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Timer, FlipNumber} from 'react-native-flip-timer';
// import homeHelper from './helper'
import {withMyHook} from '../../../Utils/Dark';
// import StepIndicator from 'react-native-step-indicator';
// import SignaturePad from 'react-native-signature-pad';
import Modal from 'react-native-modal';
// import RNLocation from 'react-native-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geocoder from 'react-native-geocoder';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Dropdown} from 'react-native-material-dropdown';
import Geolocation from '@react-native-community/geolocation';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import homeHelper from './helper'
// navigator.geolocation = require('@react-native-community/geolocation');
class dashboard extends Component {
  constructor(props) {
    super(props);
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false; //<--------Set allowFontScaling false for Screen

    this.state = {
      sideModalD: false,
    };
  }

  async componentDidMount() {}

  render() {
    console.warn(ClockIn_datetime, 'hhhhhhhhh');
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
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <View style={{backgroundColor: '#fff'}}>
          <StatusBar
            hidden={false}
            backgroundColor={utils.color.HeaderColor}
            translucent
            barStyle="light-content"
          />

          <Modal
            isVisible={this.state.sideModalD}
            backdropColor="transparent"
            onBackdropPress={() => {
              this.setState({sideModalD: false});
            }}
            // onBackdropPress={() => sideModalD(false)}

            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            style={{margin: 0, backgroundColor: 'transform'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: utils.color.lightBackgroundGrey,
                marginLeft: vw(-10),
              }}>
              <StatusBar hidden={false} />
              <View
                style={{
                  height: '100%',
                  width: vw(340),
                  backgroundColor: utils.color.ButtonAll,
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: utils.color.background,
                  }}>
                  <View style={{flex: 1}}>
                    {/* <TouchableOpacity

                                                    onPress={() => this.setState({ sideModalD: false })}
                                                    style={{ padding: 0, paddingBottom: 60 }}
                                                >
                                                    <Image source={utils.icons.Back} style={{ alignSelf: 'flex-end', marginTop: vh(50), marginRight: vw(30), height: vh(40), width: vw(40), tintColor: '#fff' }} />
                                                </TouchableOpacity> */}
                    <View style={{backgroundColor: utils.color.HeaderColor}}>
                      {/* <TouchableOpacity  >
                                                        <Image source={utils.icons.User} style={{ alignSelf: 'center', height: vh(150), width: vw(150), }} />
                                                    </TouchableOpacity> */}
                      <View
                        style={{
                          height: vh(112),
                          alignSelf: 'center',
                          width: vw(112),
                          borderRadius: 110,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          marginTop: 50,
                        }}>
                        {/* <Text style={{ fontSize: 36, color: utils.color.HeaderColor, fontWeight: 'bold' }} >{profileName}</Text> */}
                        <Image
                          source={utils.icons.Userprofile}
                          style={{
                            height: vh(105),
                            width: vw(100),
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignSelf: 'center',
                          marginTop: vh(10),
                          marginBottom: vh(30),
                        }}>
                        <Text
                          style={[
                            utils.fontStyle.FontFamilymachoB,
                            {
                              alignSelf: 'center',
                              color: utils.color.whiteText,
                              fontSize: normalize(24),
                            },
                          ]}>
                          Hello Mariakaa{' '}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({sideModalD: false});
                        this.props.navigation.navigate('Terms');
                      }}>
                      <View
                        style={{
                          marginLeft: vw(30),
                          marginTop: Platform.OS === 'ios' ? vh(20) : vh(10),
                          flexDirection: 'row',
                        }}>
                        <Image
                          style={{
                            height: vh(30),
                            width: vw(30),
                            tintColor: '#fff',
                            alignSelf: 'center',
                            marginRight: vw(20),
                          }}
                          source={utils.icons.AboutUs}></Image>

                        <Text
                          style={[
                            utils.fontStyle.FontFamilyBold,
                            {
                              fontSize: normalize(20),
                              color: utils.color.whiteText,
                            },
                          ]}>
                          Terms & Services
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({sideModalD: false});
                        this.props.navigation.navigate('Privacy');
                      }}>
                      <View
                        style={{
                          marginLeft: vw(30),
                          flexDirection: 'row',
                          marginTop: Platform.OS === 'ios' ? vh(20) : vh(10),
                        }}>
                        <Image
                          style={{
                            height: vh(30),
                            width: vw(30),
                            tintColor: '#fff',
                            alignSelf: 'center',
                            marginRight: vw(20),
                          }}
                          source={utils.icons.Privacy}></Image>

                        <Text
                          style={[
                            utils.fontStyle.FontFamilyBold,
                            {
                              fontSize: normalize(20),
                              color: utils.color.whiteText,
                            },
                          ]}>
                          Privacy policy
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({sideModalD: false});
                        this.props.navigation.navigate('AboutUs');
                      }}>
                      <View
                        style={{
                          marginLeft: vw(30),
                          flexDirection: 'row',
                          marginTop: Platform.OS === 'ios' ? vh(20) : vh(10),
                        }}>
                        <Image
                          style={{
                            height: vh(30),
                            width: vw(30),
                            tintColor: '#fff',
                            alignSelf: 'center',
                            marginRight: vw(20),
                          }}
                          source={utils.icons.AboutUs}></Image>

                        <Text
                          style={[
                            utils.fontStyle.FontFamilyBold,
                            {
                              fontSize: normalize(20),
                              color: utils.color.whiteText,
                            },
                          ]}>
                          About Us
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({sideModalD: false});
                        this.Logout_Alert();
                      }}>
                      <View
                        style={{
                          marginLeft: vw(30),
                          flexDirection: 'row',
                          marginTop: Platform.OS === 'ios' ? vh(20) : vh(10),
                        }}>
                        <Image
                          style={{
                            height: vh(30),
                            width: vw(30),
                            tintColor: '#fff',
                            alignSelf: 'center',
                            marginRight: vw(20),
                          }}
                          source={utils.icons.Go}></Image>

                        <Text
                          style={[
                            utils.fontStyle.FontFamilyBold,
                            {
                              fontSize: normalize(20),
                              color: utils.color.whiteText,
                            },
                          ]}>
                          Log out
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
export const Dashboard = withMyHook(dashboard);
const styles = StyleSheet.create({});
