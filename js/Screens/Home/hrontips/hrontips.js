import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import Modal from 'react-native-modal';
import {Header} from '../../../Components/Header';
// import { Timer, FlipNumber } from 'react-native-flip-timer';
import ImagePicker from 'react-native-image-crop-picker';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import utils from '../../../Utils';
import RNLocation from 'react-native-location';
import Geocoder from 'react-native-geocoder';
import DashboardHelper from './helper';
const timer = require('react-native-timer');
import * as geolib from 'geolib';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';

// import {Camera, CameraZoomPinch} from 'react-native-vision-camera';
// import { RNCamera } from 'react-native-camera';

// const handleTimerComplete = () => alert("custom completion function");
// import {RNCamera} from 'react-native-camera';
// import {CameraKitCamera, CameraKitCameraScreen} from 'react-native-camera-kit';
// import { CameraKitCameraScreen, } from 'react-native-camera-kit';

const options = {
  container: {
    backgroundColor: utils.color.HeaderColor,
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 7,
  },
};
class hrontips extends Component {
  constructor(props) {
    super(props);
    this.camera = React.createRef();

    this.state = {
      isFaceDetected: false,
      sideModalD: false,
      play: false,
      NotiToken: '',
      BName: 'Muneendra',
      RoleName: '',
      ImagePicUrl: '',
      startTimeinSec: 0,
      StatusClockin: '',
      imageArray2: [],
      taskLocation: [28.619202239130537, 77.37922096635252],
      imageselect: false,
      showMsg: false,
      allreadyLogin: 0,
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchStartTime: 0,
      timerReset: false,
      stopwatchReset: false,
      isModalVisible: false,
      Name: '',
      address: '',
      latitude: '',
      longitude: '',
      Department: '',
      batteryLevel: null,
      RemarkDate: '',
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.helper = new DashboardHelper(this);
  }

  pollGeolocation() {
    console.log('POLLING');
    RNLocation.getLatestLocation({timeout: 60000}).then(latestLocation => {
      var NY = {
        lat: latestLocation.latitude,
        lng: latestLocation.longitude,
      };
      const {latitude, longitude} = latestLocation;
      const {taskLocation} = this.state;
      // alert(ActiveStatus)
      let text = 'Waiting..';
      if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }

      const dist = geolib.getDistance(
        {latitude, longitude},
        {
          latitude:
            taskLocation.length > 0 ? parseFloat(taskLocation[0]) : 28.34567,
          longitude:
            taskLocation.length > 0 ? parseFloat(taskLocation[1]) : 81.34567,
        },
      );
      console.log('disttanceee', dist);
      if (dist <= 12410197) {
        // this.helper.track();
        setTimeout(() => {
          this.helper.track();
          this.helper.ClockInOut();

          this.setState({play: true, StatusClockin: 1});
        }, 1000);

        // alert('Automatic Clocked In Based On your Location');
        clearInterval(this.pollingInterval());
      }
    });
  }
  async componentDidMount() {
    // setTimeout(() => {
    //   this.pollingInterval = setInterval(() => {
    //     this.pollGeolocation();
    //   }, 30 * 1000);
    // }, 10000);
    // }, 1 * 60 * 1000);
    this.helper.GetImageProfile();

    setTimeout(() => {
      this.helper.GetImageProfile();
    }, 3000);

    this.getBatteryLevel();
    this.helper.UserData();
    timer.clearTimeout(this);
    let Name = await AsyncStorage.getItem('Name');

    let Department = await AsyncStorage.getItem('Department');
    let allreadyLogin = await AsyncStorage.getItem('allreadyLogin');
    let NotiToken = await AsyncStorage.getItem('NotiToken');
    let RoleName = await AsyncStorage.getItem('RoleName');
    this.helper.TimeTracker();
    this.getLocationUser();
    setTimeout(() => {
      this.getLocationUser();
    }, 2000);
    this.setState({
      Name: Name,
      NotiToken: NotiToken,
      RoleName: RoleName,
      allreadyLogin: allreadyLogin,
      Department: Department,
    });
  }
  getFormattedTime(time) {
    this.currentTime = time;
  }
  // handleFaceDetection = async () => {
  //   try {
  //     const camera = this.camera.current;
  //     const faces = await camera.takePhoto({base64: true});
  //     // Perform face detection logic here using faces
  //     // Update state based on face detection result
  //     if (faces && faces.faces.length > 0) {
  //       this.setState({isFaceDetected: true});
  //     } else {
  //       this.setState({isFaceDetected: false});
  //     }
  //   } catch (error) {
  //     console.error('Error detecting face:', error);
  //   }
  // };

  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }

  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: true, stopwatchReset: false});
  }
  //   toggleStopwatch() {
  //     this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  //   }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  showMsg() {
    this.setState({showMsg: true}, () =>
      timer.setTimeout(
        this,
        'hideMsg',
        () => this.setState({showMsg: false}),
        2000,
      ),
    );
  }
  clockout_Alert() {
    Alert.alert('Are you sure!', 'You want to Clock-Out', [
      {
        text: 'No',
        onPress: () => console.log('No'),
        style: 'Cancel',
      },
      {
        text: 'Yes',
        // onPress: () => this.props.navigation.navigate("Login")
        onPress: () => {
          this.setState({play: false});
        },
      },
    ]);
  }
  play = () => {
    this.setState(({play}) => ({play: !play}));
  };
  img_ipdate() {
    // console.warn("done")
    // this.helper.SaveTaskImage()
    alert('Uploaded succesfully');
  }
  takeScreenshot = () => {
    ImagePicker.openPicker({
      width: vw(300),
      height: vh(400),
      // multiple: true,
      cropping: true,
      // includeBase64: true
    })
      .then(imageUrl => {
        let tmpArr = this.state.imageArray2;
        tmpArr.push(imageUrl.path);
        console.warn(imageUrl.path);
        this.setState({imageArray2: tmpArr});
        this.img_ipdate();
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };
  getBatteryLevel = async () => {
    try {
      const batteryLevel = await DeviceInfo.getBatteryLevel();
      this.setState({batteryLevel: batteryLevel * 100}); // Convert to percentage
    } catch (error) {
      console.log('Battery level could not be retrieved', error);
    }
  };
  pickSingleWithCamera() {
    ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      cropping: false,
      useFrontCamera: true,
      includeBase64: true,
    })
      .then(imageUrl => {
        // let tmpArr = this.state.imageArray2
        // tmpArr.push(imageUrl.path)
        // console.warn(imageUrl.path)
        this.setState({imageArray2: imageUrl.path});
        this.img_ipdate();
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        console.log(e);
        // Alert.alert(e.message ? e.message : e);
      });
  }
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
        RNLocation.getLatestLocation({timeout: 60000}).then(latestLocation => {
          var NY = {
            lat: latestLocation.latitude,
            lng: latestLocation.longitude,
          };
          Geocoder.geocodePosition(NY)
            .then(res => {
              this.setState({address: res[0].locality});
              setTimeout(() => {
                this.setState({address: res[0].locality});
              }, 1000);
            })
            .catch(err => console.log(err));
          this.setState({
            latitude: latestLocation.latitude,
            longitude: latestLocation.longitude,
            current_latitude: latestLocation.latitude,
            current_longitude: latestLocation.longitude,
          });
        });
      }
    });
  };

  render() {
    const {
      play,
      user_name,
      profileName,
      StatusClockin,
      address,
      IsClockIn,
      ClockIn_datetime,
      allreadyLogin,
    } = this.state;

    return (
      <ImageBackground
        imageStyle={{tintColor: this.props.themeColor.Darkk}}
        source={utils.icons.backImage}
        style={{flex: 1, height: '100%', width: '100%'}}>
        <StatusBar
          hidden={false}
          backgroundColor={utils.color.HeaderColor}
          translucent
          barStyle="light-content"
        />

        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={{}}>
            <View
              style={{
                marginTop: 70,
                height: 'auto',
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
              }}>
              <View
                style={{height: 'auto', width: '100%', marginBottom: vh(10)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: vh(20),
                    paddingHorizontal: vw(20),
                  }}>
                  <View style={{width: vw(290)}}>
                    {/* <Text>{this.state.ImagePicUrl}</Text> */}
                    <Text
                      style={[
                        utils.fontStyle.FontFamilymachoB,
                        {
                          color: '#000',
                          fontSize: 32,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {this.state.Name}
                    </Text>
                    <Text
                      style={[
                        utils.fontStyle.FontFamilymachoB,
                        {color: '#afafaf', fontSize: 16},
                      ]}>
                      {this.state.Department}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', marginLeft: -10}}>
                    <ImageBackground
                      imageStyle={{resizeMode: 'contain'}}
                      source={utils.icons.User}
                      style={{
                        height: 90,
                        width: 90,
                        borderRadius: normalize(80),
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        // marginRight: vw(40),
                        alignItems: 'center',
                      }}>
                      {/* <Text style={{ fontSize: normalize(40), color: "#009BE7", fontWeight: 'bold' }} >MS</Text> */}
                      <Image
                        // source={utils.icons.Userprofile}
                        source={{
                          uri: `data:image/jpg;base64,${this.state.ImagePicUrl}`,
                        }}
                        style={{
                          height: 87,
                          width: 87,
                          resizeMode: 'contain',
                          // backgroundColor: 'red',
                          // alignSelf: 'center',
                          // marginRight: 10,
                          borderRadius: normalize(60),
                        }}
                      />
                    </ImageBackground>
                  </View>
                </View>
                <View style={{marginLeft: 20, marginTop: 0}}>
                  {this.state.play == true && this.state.StatusClockin == 1 ? (
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={utils.icons.Clock}
                        style={{
                          height: vh(30),
                          width: vw(30),
                          alignSelf: 'center',
                          marginRight: 10,
                          resizeMode: 'contain',
                        }}
                      />
                      <Stopwatch
                        laps
                        msecs
                        start={this.state.stopwatchStart}
                        reset={this.state.stopwatchReset}
                        startTime={this.state.stopwatchStartTime}
                        options={options}
                      />
                    </View>
                  ) : null}
                  {/* <Text>{this.state.stopwatchStartTime}</Text> */}
                  {this.state.play == true && this.state.StatusClockin == 1 ? (
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <Image
                        source={utils.icons.Location}
                        style={{
                          height: vh(30),
                          width: vw(30),
                          alignSelf: 'center',
                          marginRight: 10,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={[
                          utils.fontStyle.FontFamilymachoB,
                          {color: '#3083EF', fontSize: 20},
                        ]}>
                        {address}
                      </Text>
                      {/* <Text>
                        Battery Level:{''}
                        {this.state.batteryLevel !== null
                          ? `${this.state.batteryLevel.toFixed(0)}%`
                          : 'Fetching...'}
                      </Text> */}
                    </View>
                  ) : null}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                  }}>
                  {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#3083EF', "#88b8f6"]}
                                                style={{ height: vh(45), width: "45%", borderRadius: 5, marginTop: 15, justifyContent: 'center' }}> */}

                  {/* <TouchableOpacity
                    style={{marginTop: 15}}
                    onPress={() => {
                      // this.pickSingleWithCamera();
                      // this.setState({isModalVisible: true});
                      // this.helper.track();
                      // this.setState({ClockButton: true});
                    }}> */}
                  {play == true && StatusClockin == 1 ? (
                    <ImageBackground
                      imageStyle={{tintColor: '#cacaca'}}
                      source={utils.icons.Rectangl}
                      style={{
                        height: vh(40),
                        marginTop: 15,
                        width: vw(190),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={[
                          utils.fontStyle.FontFamilymachoB,
                          {
                            color: '#000',
                            fontSize: normalize(16),
                            textAlign: 'center',
                          },
                        ]}>
                        Clocked In({allreadyLogin}){' '}
                      </Text>
                      {/* <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 12,
                            color: '#000',
                          }}>
                          ({allreadyLogin})
                        </Text> */}
                    </ImageBackground>
                  ) : (
                    <TouchableOpacity
                      style={{marginTop: 15}}
                      onPress={() => {
                        setTimeout(() => {
                          this.helper.track();
                          this.setState({play: true, StatusClockin: 1});
                        }, 1000);
                        // setTimeout(() => {
                        //   this.helper.TimeTracker();
                        // }, 5000);

                        this.helper.ClockInOut();
                      }}>
                      <ImageBackground
                        source={utils.icons.Rectangl}
                        style={{
                          height: vh(40),
                          width: vw(190),
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={[
                            utils.fontStyle.FontFamilymachoB,
                            {
                              color: '#fff',
                              fontSize: 16,
                              textAlign: 'center',
                            },
                          ]}>
                          Clock In{' '}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                  {/* <Image source={utils.icons.biplus} style={{ alignSelf: 'center', height: vh(30), width: vw(30) }} /> */}
                  {/* </TouchableOpacity> */}

                  {play == true && StatusClockin == 1 ? (
                    <TouchableOpacity
                      style={{marginTop: 15}}
                      onPress={() => {
                        setTimeout(() => {
                          this.helper.ClockOut();
                          this.resetStopwatch();
                        }, 1000);

                        this.setState({play: false});
                      }}>
                      <ImageBackground
                        // imageStyle={{tintColor: '#cacaca'}}
                        source={utils.icons.Rectangl}
                        style={{
                          height: vh(40),
                          width: vw(190),
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={[
                            utils.fontStyle.FontFamilymachoB,
                            {
                              alignSelf: 'center',
                              color: '#fff',
                              fontSize: normalize(16),
                              textAlign: 'center',
                            },
                          ]}>
                          Clock Out{' '}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  ) : (
                    <ImageBackground
                      imageStyle={{tintColor: '#cacaca'}}
                      source={utils.icons.Rectangl}
                      style={{
                        height: vh(40),
                        marginTop: 15,
                        width: vw(190),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={[
                          utils.fontStyle.FontFamilymachoB,
                          {
                            alignSelf: 'center',
                            color: '#000',
                            fontSize: normalize(16),
                            textAlign: 'center',
                          },
                        ]}>
                        Clock Out{' '}
                      </Text>
                    </ImageBackground>
                  )}
                  {/* <Image source={utils.icons.biplus} style={{ alignSelf: 'center', height: vh(30), width: vw(30) }} /> */}

                  {/* </LinearGradient> */}
                </View>
              </View>
            </View>

            <View style={{paddingLeft: 20, paddingRight: 20}}>
              {/* <View
                style={{
                  width: '40%',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 10,
                  padding: 5,
                  marginTop: 10,
                  marginBottom: -3,
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },

                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}> */}
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {
                    marginTop: this.state.play == true ? 30 : 30,
                    color: this.props.themeColor.textColor,
                    fontSize: 16,
                    // alignSelf: 'center',
                  },
                ]}>
                What's New
              </Text>
              {/* </View> */}

              {/* <Text>
                {this.state.latitude}@@@
                {this.state.longitude}
              </Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  // marginTop: 5,
                  justifyContent: 'space-between',
                  height: 'auto',
                  width: '100%',
                  padding: 10,
                  borderRadius: 5,
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={utils.icons.Cake}
                    style={{
                      height: vh(30),
                      width: vw(30),
                      // alignSelf: 'center',
                      resizeMode: 'contain',

                      marginLeft: 10,
                    }}
                  />
                  {this.state.RemarkDate == '' ? (
                    <Text
                      style={[
                        utils.fontStyle.FontFamilyRegular,
                        {
                          alignSelf: 'center',
                          marginLeft: 10,
                          width: '77%',
                          // backgroundColor: 'red',
                          color: '#000',
                          fontSize: 17,
                        },
                      ]}>
                      Welcome Back {this.state.Name}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        utils.fontStyle.FontFamilyRegular,
                        {
                          alignSelf: 'center',
                          marginLeft: 10,
                          width: '77%',
                          // backgroundColor: 'red',
                          color: '#000',
                          fontSize: 17,
                        },
                      ]}>
                      Happy {this.state.RemarkDate.split('#').join(' ')}
                      {/* Welcome Back {this.state.Name} */}
                    </Text>
                  )}

                  <Image
                    source={utils.icons.Balloons}
                    style={{
                      height: 30,
                      width: 30,
                      // alignSelf: 'center',
                      resizeMode: 'contain',

                      // marginRight: 20,
                    }}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  {/* <Image
                    source={utils.icons.Balloons}
                    style={{
                      height: vh(30),
                      width: vw(30),
                      // alignSelf: 'center',
                      // marginRight: 20,
                    }}
                  /> */}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('MyTask');
                  }}
                  style={[styles.Card, {}]}>
                  <Image
                    source={utils.icons.Primetime}
                    style={{
                      alignSelf: 'center',
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: '#000',
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    My Task
                  </Text>
                </TouchableOpacity>
                {/* <Text>{this.state.NotiToken}</Text> */}
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('DSR');
                    // alert('We are launching soon.');
                  }}
                  style={[styles.Card, {}]}>
                  <Image
                    source={utils.icons.DDSSRR}
                    style={{
                      alignSelf: 'center',
                      // tintColor: '#3083EF',
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: '#000',
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    DSR
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 30,
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('LeaveBalance');
                  }}
                  style={[styles.Card, {}]}>
                  <Image
                    source={utils.icons.Research}
                    style={{
                      alignSelf: 'center',
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: '#000',
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    Leave Status
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('RequestLeave');
                  }}
                  style={[styles.Card]}>
                  <Image
                    source={utils.icons.Leavee}
                    style={{
                      alignSelf: 'center',
                      height: 35,
                      width: 35,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: '#000',
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    Apply Leave
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('DailyLogs');
                    // alert('We are launching soon..');
                  }}
                  style={[styles.Card, {}]}>
                  <Image
                    source={utils.icons.Clipboard}
                    style={{
                      alignSelf: 'center',
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: '#000',
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    Daily Logs
                  </Text>
                </TouchableOpacity>
                {/* {this.state.RoleName !== 'End User' ? ( */}
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Announcement');
                  }}
                  style={[styles.Card, {}]}>
                  <Image
                    source={utils.icons.promoter}
                    style={{alignSelf: 'center', height: 40, width: 40}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: '#000',
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    Announcement
                  </Text>
                </TouchableOpacity>
                {/* ) : null} */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                {this.state.RoleName !== 'End User' ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Team');
                    }}
                    style={[styles.Card, {}]}>
                    <Image
                      source={utils.icons.teamtracker}
                      style={{alignSelf: 'center', height: 35, width: 35}}
                    />
                    <Text
                      style={[
                        utils.fontStyle.FontFamilyRegular,
                        {
                          alignSelf: 'center',
                          color: '#000',
                          fontSize: 16,
                          marginTop: 7,
                        },
                      ]}>
                      My Team
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {this.state.RoleName !== 'End User' ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ApproveLeaves');
                    }}
                    style={[styles.Card]}>
                    <Image
                      source={utils.icons.Leaveapproval}
                      style={{
                        alignSelf: 'center',
                        // tintColor: '#3083EF',
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={[
                        utils.fontStyle.FontFamilyRegular,
                        {
                          alignSelf: 'center',
                          color: '#000',
                          fontSize: 16,
                          marginTop: 7,
                        },
                      ]}>
                      Approve Leave
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {/* <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('leaveStatus');
                  }}
                  style={[styles.Card]}>
                  <Image
                    source={utils.icons.eye}
                    style={{alignSelf: 'center', height: 50, width: 50}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: this.props.themeColor.textColor,
                        fontSize: normalize(18),
                        marginTop: 7,
                      },
                    ]}>
                    Leave Status
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </ScrollView>

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
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({imageselect: true});
                      }}
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
                    </TouchableOpacity>
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
                            fontSize: 24,
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        My Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({sideModalD: false});
                      this.props.navigation.navigate('Goal');
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        My goal
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        My task
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({sideModalD: false});
                      this.props.navigation.navigate('Announcement');
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        Announcement
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({sideModalD: false});
                      this.props.navigation.navigate('DSR');
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        DSR
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        My Team
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        Reimbursement
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        Regularization
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                            fontSize: 20,
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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        Manage Attendance
                      </Text>
                    </View>
                  </TouchableOpacity>

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
                            fontSize: 20,
                            color: utils.color.whiteText,
                          },
                        ]}>
                        Reset Password
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
                            fontSize: 20,
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
                            fontSize: 20,
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
                            fontSize: 20,
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
        <Modal
          isVisible={this.state.imageselect}
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
                height: vh(200),
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
                    color: '#009BE7',
                  },
                ]}>
                Upload Task Image
              </Text>

              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.pickSingleWithCamera(),
                      this.setState({imageselect: false});
                  }}>
                  <Image
                    source={utils.icons.Cameraa}
                    style={{alignSelf: 'center', height: vh(63), width: vw(60)}}
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
                    this.takeScreenshot(), this.setState({imageselect: false});
                  }}>
                  <Image
                    source={utils.icons.Imagee}
                    style={{alignSelf: 'center', height: vh(63), width: vw(60)}}
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
                    this.setState({imageselect: false});
                  }}>
                  <Image
                    source={utils.icons.Cancel}
                    style={{
                      tintColor: 'lightgrey',
                      alignSelf: 'center',
                      height: vh(63),
                      width: vw(60),
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
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => {
            this.setState({isModalVisible: false});
          }}
          // animationType="slide"
          // transparent={true}
          // visible={this.state.isModalVisible}
          style={{}}>
          <View
            style={{
              alignSelf: 'center',
              borderWidth: 5,
              borderColor: '#560BAD',
              height: 500,
              width: '100%',
              borderTopRightRadius: 80,
              borderTopLeftRadius: 80,
              backgroundColor: utils.color.whiteText,
            }}>
            {/* <CameraKitCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{flex: 1}}
              onFacesDetected={this.onFacesDetected}
              facesDetectedColor={'rgba(255, 0, 0, 0.5)'}
              facesDetectedInfo={'Move your face into the frame'}
            />

            <View
              style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: this.state.isFaceDetected ? 'green' : 'red',
                  borderRadius: 5,
                }}
                disabled={!this.state.isFaceDetected}
                onPress={() => {
                  // Implement clock-in logic here
                  alert('Clock-in successful!');
                }}>
                <Text style={{color: 'white'}}>Clock In</Text>
              </TouchableOpacity>
            </View> */}
            {/* <Camera /> */}
            {/* <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
            /> */}

            {/* <TouchableOpacity
              onPress={this.handleFaceDetection()}
              style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
              <Text style={{fontSize: 20, color: 'white'}}>Detect Face</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              onPress={() => {
                // this.setState({isModalVisible: false});
                this.handleFaceDetection();
              }}
              style={{
                backgroundColor: 'grey',
                height: vh(40),
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: normalize(20),
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Back to Home
              </Text>
            </TouchableOpacity> */}
          </View>
        </Modal>

        {/* </View> */}
      </ImageBackground>
    );
  }
}
export const HrOnTips = withMyHook(hrontips);
var styles = StyleSheet.create({
  viewhome: {
    height: 100,
    borderRadius: 10,
    width: '47%',
    justifyContent: 'center',
  },
  Card: {
    height: 'auto',
    paddingTop: 16,
    paddingBottom: 16,
    width: '47%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
