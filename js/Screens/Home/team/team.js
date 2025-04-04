import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import EmpListHelper from './helper';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = 28.618888228344087;
const LONGITUDE = 77.3792218967474;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      TeamTrack: [],
      markers: [],
      InLong: '',
      InLat: '',
    };
    this.helper = new EmpListHelper(this);
  }

  async componentDidMount() {
    this.helper.EmpList();
    let InLat = await AsyncStorage.getItem('InLat');
    let InLong = await AsyncStorage.getItem('InLong');

    this.setState({
      InLat: InLat,
      InLong: InLong,
    });
  }

  render() {
    const darkMapStyle = [
      {
        elementType: 'geometry',
        stylers: [{color: '#212121'}],
      },
      {
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{color: '#e0e0e0'}],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{color: '#212121'}],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{color: '#757575'}],
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}],
      },
    ];

    const lightMapStyle = [
      {
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}],
      },
      {
        elementType: 'labels.icon',
        stylers: [{visibility: 'on'}],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{color: '#000000'}],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ffffff'}],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{color: '#e0e0e0'}],
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [{color: '#333333'}],
      },
    ];

    // alert(this.state.TeamTrack);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.isDark ? '#000' : '#fff',
          }}>
          {/* <StatusBar
                hidden={false}
                backgroundColor={utils.color.HeaderColor}
            /> */}
          <Header
            title="Team Tracker"
            lefticon={utils.icons.Back}
            leftFunction={() => {
              this.props.navigation.goBack();
            }}
            isDark={this.props.isDark}
            // rightIcon={utils.icons.splashLogo} rightFunctionality={() => { this.props.navigation.navigate("Profile") }}
          />

          <View style={{}}>
            {/* <Text style={{color: '#000'}}>!!{this.state.InLat}...</Text>
            <Text>{this.state.InLong}</Text> */}

            <MapView
              // style={styles.map}
              scrollEnabled={true}
              customMapStyle={this.props.isDark ? darkMapStyle : lightMapStyle}
              // zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              showsUserLocation={true}
              followsUserLocation={true}
              showsCompass={true}
              showsBuildings={true}
              showsTraffic={true}
              showsIndoors={true}
              provider={
                Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
              }
              style={[styles.map, {shadowColor: '#000'}]}
              region={{
                latitude: 28.62269,
                longitude: 77.381699,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              {this.state.markers.map((marker,idx) => (
                <Marker key={`body-${idx}`} coordinate={marker.coordinates} title={marker.title} />
              ))}
            </MapView>
            <TouchableOpacity
              style={{
                position: 'absolute',
                flexDirection: 'row',
                alignSelf: 'center',
                padding: 10,
                backgroundColor: this.props.isDark
                  ? '#000'
                  : this.props.themeColor.HeaderColor,
                borderRadius: 20,
                margin: 10,
                justifyContent: 'flex-end',
              }}
              onPress={() => this.RBSheet.open()}>
              <Icon
                name="users"
                size={20}
                color="#fff"
                style={{alignSelf: 'center', marginRight: 10}}
              />
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {color: '#fff'},
                  {textAlign: 'center', fontSize: 14, alignSelf: 'center'},
                ]}>
                View all
              </Text>
            </TouchableOpacity>
          </View>

          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={vh(800)}
            width={'100%'}
            minClosingHeight={20}
            openDuration={250}
            closeOnDragDown={false}
            customStyles={{
              container: {
                borderTopLeftRadius: normalize(26),
                borderTopRightRadius: normalize(26),
                backgroundColor: this.props.themeColor.theameColor,
              },
            }}>
            <View
              style={{
                borderTopLeftRadius: normalize(25),
                borderTopRightRadius: normalize(25),
              }}>
              <View
                style={{
                  height: vh(75),
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                  justifyContent: 'space-between',
                  width: '100%',
                  borderBottomColor: utils.color.grey,
                  borderBottomWidth: vh(1),
                }}>
                <Text
                  style={[
                    utils.fontStyle.FontFamilyExtraBold,
                    {
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: this.props.isDark ? '#fff' : utils.color.blackText,
                      fontSize: normalize(20),
                    },
                  ]}>
                  Employees location
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.RBSheet.close();
                  }}>
                  <Icon
                    name="times-circle"
                    size={30}
                    color="#3083EF"
                    style={{alignSelf: 'center', marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {this.state.TeamTrack == '' ? (
              <View style={{height: 500}}>
                <Icon
                  name="times-circle"
                  size={50}
                  color="#3083EF"
                  style={{
                    alignSelf: 'center',
                    marginTop: 200,
                    marginBottom: 20,
                  }}
                />
                <Text
                  style={[
                    utils.fontStyle.FontFamilyExtraBold,
                    {
                      color: '#3083EF',
                      alignSelf: 'center',
                    },
                  ]}>
                  No direct reportee
                </Text>
              </View>
            ) : (
              <FlatList
                // inverted
                showsVerticalScrollIndicator={false}
                style={{marginTop: vh(10)}}
                // showsHorizontalScrollIndicator={false}
                data={this.state.TeamTrack?.length>0?this.state.TeamTrack:[]}
                keyExxtractor={(item, index) => index.toString}
                renderItem={({item, index}) => this.renderItem(item, index)}
              />
            )}
          </RBSheet>
        </View>
      </SafeAreaView>
    );
  }
  redirectToMap = (latlng, address) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${latlng[1]},${latlng[0]}`;
    const label = address;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  renderItem(item, index) {
    // let firstLetter = item.UserFullName.substring(
    //   0,
    //   item.UserFullName.indexOf(' '),
    // );
    // let secondLetter = item.UserFullName.substring(
    //   item.UserFullName.indexOf(' ') + 1,
    // );
    return (
      <View
        style={{
          height: 'auto',
          width: '100%',
          paddingBottom: vh(10),
          marginTop: vh(5),
          justifyContent: 'center',
          alignSelf: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View
          style={[
            styles.shadowView,
            {backgroundColor: this.props.themeColor.DarkBackground},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{alignSelf: 'center', flexDirection: 'column'}}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyExtraBold,
                    {
                      fontSize: normalize(20),
                      width: 'auto',
                      color: this.props.themeColor.textColor,
                    },
                  ]}>
                  {item.FirstName}
                </Text>
                {/* <Text style={[styles.Title, utils.fontStyle.FontFamilyRegular, { color: this.props.themeColor.blackText ,fontSize:normalize(12)}]}>React-native developer</Text> */}
              </View>
            </View>
            <View style={{}}>
              <TouchableOpacity
                style={{position: 'absolute', alignSelf: 'flex-end'}}
                onPress={() => {
                  this.RBSheet.close(),
                    this.redirectToMap(
                      [parseFloat(item.Longitude), parseFloat(item.Latitude)],
                      'Task Location',
                    );
                }}>
                <Image
                  source={utils.icons.map}
                  style={{
                    alignSelf: 'center',
                    tintColor: '#2d5986',
                    height: 30,
                    width: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="map-pin"
                size={20}
                color={this.props.themeColor.HeaderColor}
                style={{alignSelf: 'center', marginRight: 5}}
              />
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.FontFamilyRegular,
                  {
                    color: this.props.themeColor.textColor,
                    fontSize: normalize(15),
                    alignSelf: 'flex-end',
                  },
                ]}>
                Last Location:.
                {moment(item.TrackDateTime)
                  .add(5, 'h')
                  .add(30, 'm')
                  .format('LLL')}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="battery-3"
                size={20}
                color={this.props.themeColor.HeaderColor}
                style={{alignSelf: 'center', marginRight: 5}}
              />
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.FontFamilyRegular,
                  {
                    color: this.props.themeColor.textColor,
                    fontSize: normalize(12),
                    alignSelf: 'center',
                  },
                ]}>
                {item.Battery}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export const Team = withMyHook(team);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'relative',
    height: '97%',
    width: '100%',
    borderRadius: 30,
  },
  shadowView: {
    width: '100%',
    borderColor: '#2d5986',
    borderWidth: 1,
    borderRadius: normalize(10),
    padding: 10,
    backgroundColor: '#fff',
  },
});
