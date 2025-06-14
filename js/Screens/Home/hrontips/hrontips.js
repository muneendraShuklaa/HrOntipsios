import React, { Component, } from 'react';
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
  ActivityIndicator,
  AppState

} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { withMyHook } from '../../../Utils/Dark';
import { vh, vw, normalize } from '../../../Utils/dimentions';
import Modal from 'react-native-modal';
import { Header } from '../../../Components/Header';
// import { Timer, FlipNumber } from 'react-native-flip-timer';
import ImagePicker from 'react-native-image-crop-picker';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import utils from '../../../Utils';
import RNLocation from 'react-native-location';
// import Geocoder from 'react-native-geocoding';
// import Geolocation from 'react-native-geolocation-service';
import DashboardHelper from './helper';
const timer = require('react-native-timer');
import * as geolib from 'geolib';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

// import {Camera, CameraZoomPinch} from 'react-native-vision-camera';
// import { RNCamera } from 'react-native-camera';

// const handleTimerComplete = () => alert("custom completion function");
// import {RNCamera} from 'react-native-camera';
// import {CameraKitCamera, CameraKitCameraScreen} from 'react-native-camera-kit';
// import { CameraKitCameraScreen, } from 'react-native-camera-kit';


class hrontips extends Component {
  constructor(props) {
    super(props);
    this.camera = React.createRef();
    // const options = ;
    this.state = {
      appState: AppState.currentState,
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
      taskLocation: [28.62756, 77.38059],
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
      latitude: 0,
      longitude: 0,
      Department: '',
      batteryLevel: null,
      RemarkDate: '',
      count: 0,
      Birthday: [],
      Anniversary: [],
      Quote: '',
      LastName: '',
      isloading: false,
      formattedAddress: '',
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.helper = new DashboardHelper(this);
  }

  pollGeolocation() {
    RNLocation.getLatestLocation({ timeout: 60000 })
      .then(latestLocation => {
        if (!latestLocation) {
          console.warn('Location is null – unable to get location.');
          return;
        }
  
        const { latitude, longitude } = latestLocation;
  
        var NY = {
          lat: latitude ?? 0,
          lng: longitude ?? 0,
        };
  
        const { taskLocation } = this.state;
  
        let text = 'Waiting..';
        if (this.state.location) {
          text = JSON.stringify(this.state.location);
        }
  
        const dist = geolib.getDistance(
          { latitude, longitude },
          {
            latitude:
              taskLocation.length > 0 ? parseFloat(taskLocation[0]) : 28.34567,
            longitude:
              taskLocation.length > 0 ? parseFloat(taskLocation[1]) : 81.34567,
          },
        );
  
        if (dist <= 12410197) {
          this.helper.track();
          setTimeout(() => {
            this.helper.track();
            this.setState({ play: true, StatusClockin: 1 });
          }, 60000);
  
          clearInterval(this.pollingInterval);
        }
      })
      .catch(error => {
        console.error('Failed to get latest location:', error);
      });
  }
  



  async componentDidMount() {
  
      console.log("📌 componentDidMount triggered"); // Minimal test
    
    
    this.setState({ isloading: false });
    this.appStateSubscription = AppState.addEventListener("change", this.handleAppStateChange);

    try {
      this.getBatteryLevel();
  

      this.helper.GetImageProfile();
  
      // Then again after 3 seconds
      this.imageProfileTimeout = setTimeout(() => {
        this.helper.GetImageProfile();
        this.setState({ isloading: false });
      }, 30000);
  
      timer.clearTimeout(this); // unclear usage, consider revising this
  
      // Await all AsyncStorage values
      const [Name, Department, allreadyLogin, NotiToken, RoleName, LastName] =
        await Promise.all([
          AsyncStorage.getItem('Name'),
          AsyncStorage.getItem('Department'),
          AsyncStorage.getItem('allreadyLogin'),
          AsyncStorage.getItem('NotiToken'),
          AsyncStorage.getItem('RoleName'),
          AsyncStorage.getItem('LastName'),
        ]);
  

        this.getLocationUser();
      // Track time
      this.helper.TimeTracker();
  
      // Get location after 2 seconds
      this.locationTimeout = setTimeout(() => {
        this.getLocationUser();
      }, 20000);
  
      // Set all state at once
      this.setState({
        Name,
        Department,
        allreadyLogin,
        NotiToken,
        RoleName,
        LastName,
      });
  
    } catch (error) {
      this.setState({ isloading: false });
      console.error('componentDidMount error:', error);
      alert('Something went wrong during initialization.');
    } finally {
      this.setState({ isloading: false });
    }
  }
  
 
  componentWillUnmount() {
    // Remove AppState listener
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
    }
  
    // Clear all timeouts and intervals
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    if (this.imageProfileTimeout) {
      clearTimeout(this.imageProfileTimeout);
    }
    if (this.locationTimeout) {
      clearTimeout(this.locationTimeout);
    }
  }
  handleAppStateChange = (nextAppState) => {
    console.log("📱 App State Changed:", nextAppState); // Debugging log
   
  
    if ( nextAppState === "inactive") {
      console.log("App went to background");
      this.resetStopwatch();

    }
  
    if ( nextAppState === "active") {
      console.log("App came to foreground");
      this.helper.TimeTracker();

    }
  
    this.setState({ appState: nextAppState });
  };
  

  

  getFormattedTime(time) {
    this.currentTime = time;
  }


  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false });
  }

  resetTimer() {
    this.setState({ timerStart: false, timerReset: true });
  }

  toggleStopwatch() {
    this.setState({ stopwatchStart: true, stopwatchReset: false });
  }
  //   toggleStopwatch() {
  //     this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  //   }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  // getFormattedTime(time) {
  //   this.currentTime = time;
  // }

  showMsg() {
    this.setState({ showMsg: true }, () =>
      timer.setTimeout(
        this,
        'hideMsg',
        () => this.setState({ showMsg: false }),
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
          this.setState({ play: false });
        },
      },
    ]);
  }
  play = () => {
    this.setState(({ play }) => ({ play: !play }));
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
        // console.warn(imageUrl.path);
        this.setState({ imageArray2: tmpArr });
        this.img_ipdate();
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        // console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  getBatteryLevel = async () => {
    try {
      const batteryLevel = await DeviceInfo.getBatteryLevel();
      this.setState({ batteryLevel: batteryLevel * 100 }); // Convert to percentage
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
        this.setState({ imageArray2: imageUrl.path });
        this.img_ipdate();
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        console.log(e);
        // Alert.alert(e.message ? e.message : e);
      });
  }

  


getAddressFromLatLng = async (latitude, longitude) => {
  try {
    console.log("📍 Using coordinates:", latitude, longitude);
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ReactNativeApp/1.0',
        'Accept-Language': 'en'
      }
    });

    const data = await response.json();
    console.log("📦 Nominatim Response:", JSON.stringify(data, null, 2));

    if (data && data.address) {
      const { house_number, road, city, state, country } = data.address;

      // Construct display address with house_number (street number)
      const displayAddress = `${house_number ? house_number + ', ' : ''}${road || ''}${road ? ', ' : ''}${city || ''}${city ? ', ' : ''}${state || ''}${state ? ', ' : ''}${country || ''}`;
      console.log("✅ Address:", displayAddress);

      this.setState({
        address: displayAddress,
        formattedAddress: displayAddress,
        latitude,
        longitude,

      
      });
    } else {
      console.warn("⚠️ No address found in response");
    }
  } catch (error) {
    console.error("❌ Error while fetching address:", error.message || error);
  }
};




  formatStopwatchTime(timeString) {
    const parts = timeString.split(':');
    return `${parts[1]}:${parts[2]}`; // returns MM:SS
  }
  
  getLocationUser = async () => {
    try {
      const granted = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: { detail: 'fine' }
      });
      if (!granted) {
        console.warn("Location permission not granted");
        return;
      }
  
      const latestLocation = await RNLocation.getLatestLocation({ timeout: 60000 });
      if (!latestLocation) {
        console.warn("No location found");
        return;
      }
      const { latitude, longitude } = latestLocation;
      this.setState({ latitude, longitude });
      
      await this.getAddressFromLatLng(latitude, longitude);
    } catch (error) {
      console.error("Error getting user location:", error);
    }
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
        imageStyle={{
          tintColor: this.props.isDark && '#000',
          // tintColor: this.props.isDark && '#000' : '',
        }}
        source={utils.icons.backImage}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}>
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
                backgroundColor: this.props.themeColor.themeBackground,
                // backgroundColor: 'black',
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
                borderWidth: this.props.isDark ? 1 : 0,
                borderColor: this.props.isDark ? '#fff' : 'white',
              }}>
              <View
                style={{ height: 'auto', width: '100%', marginBottom: vh(10) }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: vh(20),
                    paddingHorizontal: vw(20),
                  }}>
                  <View style={{ width: vw(290) }}>
                    {/* <Text>{this.state.ImagePicUrl}</Text> */}
                    <Text
                      style={[
                        utils.fontStyle.FontFamilymachoB,
                        {
                          color: this.props.themeColor.textColor,
                          fontSize: 26,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {this.state.Name} {this.state.LastName}
                    </Text>
                    <Text
                      style={[
                        utils.fontStyle.FontFamilymachoB,
                        { color: '#afafaf', fontSize: 16 },
                      ]}>
                      {this.state.Department}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'column', marginLeft: -10 }}>
                    <ImageBackground
                      imageStyle={{ resizeMode: 'contain' }}
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
                <View style={{ marginLeft: 20, marginTop: 0 }}>
                  {this.state.play == true && this.state.StatusClockin == 1 ? (
                    <View style={{ flexDirection: 'row' }}>
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
                        // msecs
                        start={this.state.stopwatchStart}
                        reset={this.state.stopwatchReset}
                        startTime={this.state.stopwatchStartTime}
                        // options={options}
                        getTime={this.getFormattedTime} 
                        
                        options={{
                          container: {
                            backgroundColor: this.props.isDark ? utils.color.Darkk: utils.color.TextColorWhite,
                            // backgroundColor: utils.color.HeaderColor,
                            // padding: 5,
                            borderRadius: 5,
                            width: 220,
                          },
                          text: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            // color: '#FFF',
                            color: this.props.isDark ? utils.color.TextColorWhite:utils.color.HeaderColor,
                            marginLeft: 7,
                          },
                        }}
                        isDark={this.props.isDark}
                      />
                    </View>
                  ) : null}
                  {/* <Text>{this.state.stopwatchStartTime}</Text> */}
                  {this.state.play == true && this.state.StatusClockin == 1 ? (
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <Image
                        source={utils.icons.Location}
                        style={{
                          height: vh(30),
                          width: vw(30),
                          alignSelf: 'center',
                          marginRight: 15,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={[
                          utils.fontStyle.FontFamilymachoB,
                          {
                            color: this.props.themeColor.themeText,
                            fontSize: 20,
                          },
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
                      imageStyle={{ tintColor: '#cacaca' }}
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
                        {/* Clocked In({allreadyLogin}){' '} */}
                        {/* Clocked In({moment(allreadyLogin, 'h:mm').subtract(30, 'm').format('h:mm')}){' '} */}
                        Clocked In({allreadyLogin ? moment(allreadyLogin, 'h:mm').subtract(30, 's').format('h:mm') : ''}){' '}

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
                    disabled={this.state.isloading}
                    style={{ marginTop: 15, opacity: this.state.isloading ? 0.6 : 1 }}
                      // style={{ marginTop: 15 }}
                      onPress={async () => {
                        try {
                          this.setState({
                            play: true,
                            stopwatchStartTime: 0,
                            StatusClockin: 1,
                            isloading: false,
                          });
                          this.setState({ isloading: true });
                          await this.helper.ClockInOut();
                          await this.helper.registerAddress();
                          await this.helper.track();
                         
                          await this.helper.TimeTracker();
                        
                          this.setState({ isloading: false });
                        } catch (error) {
                          this.setState({ isloading: false });
                          console.log(error);
                        }
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
                          Clock In {' '}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                  {/* <Image source={utils.icons.biplus} style={{ alignSelf: 'center', height: vh(30), width: vw(30) }} /> */}
                  {/* </TouchableOpacity> */}

                  {play == true && StatusClockin == 1 ? (
                   <TouchableOpacity
                   disabled={this.state.isloading}
                   style={{ marginTop: 15, opacity: this.state.isloading ? 0.6 : 1 }}
                   onPress={async () => {
                     this.setState({ isloading: true });
                 
                     try {
                       // Delay (you can remove this if not required)
                       await new Promise(resolve => setTimeout(resolve, 1000));
                 
                       // Await helper method calls
                       await this.helper.registerAddress();
                       await this.helper.ClockOut();
                 
                       // Reset stopwatchclock 
                       this.resetStopwatch();
                 
                       // Update play state
                      //  this.setState({ play: false });
                       this.setState({
                        play: false,
                        isloading: false,
                      });
                 
                     } catch (error) {
                       console.error('Error during ClockOut:', error);
                       alert('Something went wrong. Please try again.');
                       this.setState({ isloading: false });
                     } finally {
                       this.setState({ isloading: false });
                     }
                   }}
                 >
                 
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
                      imageStyle={{ tintColor: '#cacaca' }}
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
                        Clock Out {' '}
                      </Text>
                    </ImageBackground>
                  )}
                  {/* <Image source={utils.icons.biplus} style={{ alignSelf: 'center', height: vh(30), width: vw(30) }} /> */}

                  {/* </LinearGradient> */}
                </View>
              </View>
            </View>


 <Modal
  transparent={true}
  animationType="none"
  visible={this.state.isloading}
  onRequestClose={() => {}}>
  <View style={styles.modalBackground}>
    <View style={styles.activityIndicatorWrapper}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  </View>
</Modal>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>

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

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'space-between',
                  height: 'auto',
                  width: '100%',
                  padding: 12,
                  borderRadius: 5,
                  alignSelf: 'center',
                  backgroundColor: this.props.themeColor.themeBackground,
                  // backgroundColor: 'black',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                  borderWidth: this.props.isDark ? 1 : 0,
                  borderColor: this.props.isDark ? '#fff' : 'white',
                }}>
                <View style={{ flexDirection: 'row' }}>

                  {this.state.count == 0 && (
                    <Text
                      style={[
                        utils.fontStyle.FontFamilyRegular,
                        {
                          alignSelf: 'center',
                          color: this.props.themeColor.themeText,
                          fontSize: 16,
                          fontWeight: 'bold',

                        },
                      ]}>
                      {this.state.Quote} 

                    </Text>
                  )}
                  <View>
                    {this.state.Anniversary.length !== 0 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 5,
                        }}>
                        <Image
                          source={utils.icons.fireWork}
                          style={{ height: 25, width: 25, resizeMode: 'contain' }}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#3083EF',
                              fontWeight: '900',
                            }}>
                            Work Anniversary's Today!
                          </Text>
                          {this.state.Anniversary.map((item, index) => {
                            return (
                              <View key={`body--${index}`}>
                                <Text
                                  style={[
                                    styles.remarkText,
                                    { color: this.props.themeColor.textColor },
                                  ]}>
                                  {item}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )}
                    {this.state.Birthday.length !== 0 && (
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Image
                          source={utils.icons.Cake}
                          style={{ height: 24, width: 24, resizeMode: 'contain' }}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#3083EF',
                              fontWeight: '900',
                            }}>
                            Birthday's Today!
                          </Text>
                          {this.state.Birthday.map((item, index) => {
                            return (

                              <Text
                                key={`body-${index}`}
                                style={[
                                  styles.remarkText,
                                  { color: this.props.themeColor.textColor },
                                ]}>
                                {item}
                              </Text>

                            );
                          })}
                        </View>
                      </View>
                    )}
                  </View>


                </View>
                <View style={{ alignSelf: 'center' }}>

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
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
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
                        color: this.props.themeColor.textColor,
                        // color: '#ffff',
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    My Task 
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('DSR');

                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
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
                        color: this.props.themeColor.textColor,
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
                  marginTop: vh(30),
                  marginBottom: vh(10),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('LeaveBalance');
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
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
                        color: this.props.themeColor.textColor,

                        // color: '#ffff',
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
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
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
                        color: this.props.themeColor.textColor,
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
                  marginTop: vh(20),
                  marginBottom: vh(10),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('DailyLogs');
                    // alert('We are launching soon..');
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
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
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    Daily Logs
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Announcement', {
                      role: this.state.RoleName,
                    });
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
                  <Image
                    source={utils.icons.promoter}
                    style={{ alignSelf: 'center', height: 40, width: 40 }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    Announcement
                  </Text>
                </TouchableOpacity>
                {/* ) : null} */}
              </View>

              {this.state.RoleName !== 'End User' && <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(10),
                  marginBottom: vh(20),
                }}>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Team');
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
                  <Image
                    source={utils.icons.teamtracker}
                    style={{ alignSelf: 'center', height: 35, width: 35 }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyRegular,
                      {
                        alignSelf: 'center',
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    My Team
                  </Text>
                </TouchableOpacity>



                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ApproveLeaves');
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
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
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                      },
                    ]}>
                    Approve Leave
                  </Text>
                </TouchableOpacity>

              </View>}



              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(10),
                marginBottom: vh(20)
              }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('RegularizationStatus', {
                      role: this.state.RoleName,
                    });
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
                  <Image
                    source={utils.icons.Regularisation}
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
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                        textAlign: 'center'
                      },
                    ]}>
                    Regularization{"\n"}Status
                  </Text>
                </TouchableOpacity>
                {this.state.RoleName !== 'End User' ? <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('RegularizationApproval', {
                      role: this.state.RoleName,
                    });
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                    },
                  ]}>
                  <Image
                    source={utils.icons.Regularisation}
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
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                        textAlign: 'center'
                      },
                    ]}>
                    Regularization{"\n"}Approval
                  </Text>
                </TouchableOpacity> : null}
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(10),
              }}>
                {this.state.RoleName !== 'End User' && <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ManageAttendance', {
                      role: this.state.RoleName,
                    });
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                      marginBottom: vh(20)
                    },
                  ]}>
                  <Image
                    source={utils.icons.Regularisation}
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
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                        textAlign: 'center'
                      },
                    ]}>
                    Manage{"\n"}Attendance
                  </Text>
                </TouchableOpacity>}
                {this.state.RoleName !== 'End User' && <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('AttendanceReport', {
                      role: this.state.RoleName,
                    });
                  }}
                  style={[
                    styles.Card,
                    {
                      backgroundColor: this.props.themeColor.themeBackground,
                      borderWidth: this.props.isDark ? 1 : 0,
                      borderColor: this.props.isDark ? '#fff' : 'white',
                      marginBottom: vh(20)
                    },
                  ]}>
                  <Image
                    source={utils.icons.Regularisation}
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
                        color: this.props.themeColor.textColor,
                        fontSize: 16,
                        marginTop: 7,
                        textAlign: 'center'
                      },
                    ]}>
                    Attendance{"\n"}Report
                  </Text>
                </TouchableOpacity>}

              </View>
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ViewReimbursement');
                }}
                style={[
                  styles.Card,
                  {
                    backgroundColor: this.props.themeColor.themeBackground,
                    borderWidth: this.props.isDark ? 1 : 0,
                    borderColor: this.props.isDark ? '#fff' : 'white',
                    marginBottom: vh(20),
                    marginTop: vh(10),
                  },
                ]}>
                <Image
                  source={utils.icons.Regularisation}
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
                      color: this.props.themeColor.textColor,
                      fontSize: 16,
                      marginTop: 7,
                      textAlign:'center'
                    },
                  ]}>
                  View{'\n'}Reimbursement
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>

        <Modal
          isVisible={this.state.sideModalD}
          backdropColor="transparent"
          onBackdropPress={() => {
            this.setState({ sideModalD: false });
          }}
          // onBackdropPress={() => sideModalD(false)}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          style={{ margin: 0, backgroundColor: 'transform' }}>
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
                <View style={{ flex: 1 }}>

                  <View style={{ backgroundColor: utils.color.HeaderColor }}>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ imageselect: true });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                      this.setState({ sideModalD: false });
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
                  style={{ flexDirection: 'column', marginTop: 15 }}
                  onPress={() => {
                    this.pickSingleWithCamera(),
                      this.setState({ imageselect: false });
                  }}>
                  <Image
                    source={utils.icons.Cameraa}
                    style={{ alignSelf: 'center', height: vh(63), width: vw(60) }}
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
                  style={{ flexDirection: 'column', marginTop: 15 }}
                  onPress={() => {
                    this.takeScreenshot(), this.setState({ imageselect: false });
                  }}>
                  <Image
                    source={utils.icons.Imagee}
                    style={{ alignSelf: 'center', height: vh(63), width: vw(60) }}
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
                  style={{ flexDirection: 'column', marginTop: 15 }}
                  onPress={() => {
                    this.setState({ imageselect: false });
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
            this.setState({ isModalVisible: false });
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

          </View>
        </Modal>

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
    backgroundColor: 'white',
    // backgroundColor: 'black',
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
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  remarkText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  modalBackground: {
    // flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StatusBar,
//   ImageBackground,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from 'react-native';
// import utils from '../../../Utils';
// import {withMyHook} from '../../../Utils/Dark';
// import {vh, vw, normalize} from '../../../Utils/dimentions';

// import ImageHelper from './helper';
// import {SafeAreaView} from 'react-native-safe-area-context';
// class hrontips extends Component {
//   constructor(props) {
 
//     super(props);
//     this.state = {
     
//     };
//     this.helper = new ImageHelper(this);
//   }


//   render() {
//     return (
//       <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
       
//       </SafeAreaView>
//     );
//   }
// }
// export const HrOnTips = withMyHook(hrontips);
// const styles = StyleSheet.create({});
