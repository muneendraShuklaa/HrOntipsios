import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {withMyHook} from '../../../Utils/Dark';
import utils from '../../../Utils';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import Modal from 'react-native-modal';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EjoinHelper from './helper';
class wejoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      Logout: false,
      check: true,

      cardDownload: [
        {
          title: 'Welcome Policy',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Leave Policy',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Hr Policy',
        },
        {
          date: 'Apr 22, 2023',
          title: 'time Policy',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
      ],
    };
    this.helper = new EjoinHelper(this);
  }
  componentDidMount() {
    this.helper.EjoinBalance();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        {/* <Text>wejoin</Text> */}
        <ImageBackground
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 60,
            marginTop: 40,
            width: '100%',
          }}
          source={utils.icons.buttonn}>
          <Image
            source={utils.icons.hrontips}
            style={{alignSelf: 'center', marginLeft: 20}}
          />
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              this.setState({Logout: true});
            }}>
            <Image
              source={utils.icons.Grouplogout}
              style={{alignSelf: 'center', marginRight: 20}}
            />
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          style={{height: 280}}
          source={utils.icons.lastImage}></ImageBackground>
        <View
          style={{
            height: '90%',
            marginTop: '-30%',
            width: '100%',
            backgroundColor: this.props.themeColor.theameColor,
            borderRadius: 30,
          }}>
          <View>
            <Text
              style={[
                styles.Title,
                utils.fontStyle.TextSemiBold,
                {
                  fontSize: normalize(36),
                  color: this.props.themeColor.EjoinText,
                  marginTop: 20,
                  paddingLeft: 20,
                },
              ]}>
              Getting started
            </Text>
            <View
              style={{
                backgroundColor: this.props.themeColor.theameColor,
                height: 'auto',
                width: '100%',
                marginTop: 20,
                borderRadius: 5,
              }}>
              <FlatList
                style={{
                  marginTop: vh(10),
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: vh(385),
                }}
                showsHorizontalScrollIndicator={false}
                data={this.state.data}
                keyExxtractor={(item, index) => index.toString}
                renderItem={({item, index}) => this.renderItem(item, index)}
              />

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('EJoin');
                }}>
                <Image
                  source={utils.icons.startt}
                  style={{
                    alignSelf: 'center',
                    marginTop: '10%',
                    width: vw(411),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal isVisible={this.state.Logout}>
          <View
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: this.props.themeColor.theameColor,
              borderWidth: 2,
              // margin: 15,
              borderColor: '#fff',
              borderRadius: 30,
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                backgroundColor: this.props.themeColor.theameColor,
                borderWidth: 2,
                borderColor: this.props.themeColor.textColor,
                marginTop: -50,
                alignSelf: 'center',
              }}>
              <Image
                source={utils.icons.Groupllot}
                style={{alignSelf: 'center', marginTop: 20}}
              />
            </View>
            <View
              style={{
                margin: 15,
                // backgroundColor:,
              }}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    textAlign: 'center',
                    color: this.props.themeColor.textColor,
                    marginBottom: 10,
                    fontSize: 30,
                  },
                ]}>
                Are you sure want to logout?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.removeItem('Answer1');
                  AsyncStorage.removeItem('IsAuthenticated');
                  setTimeout(() => {
                    this.props.navigation.dispatch(
                      StackActions.replace('AuthStack'),
                    );
                    this.setState({Logout: false});
                  }, 2000);
                }}
                style={[styles.ButtonView, {marginTop: 20}]}>
                <ImageBackground
                  imageStyle={{borderRadius: 5}}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 10,
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
      </SafeAreaView>
    );
  }
  renderItem(item, index) {
    return (
      <View
        style={{
          height: 'auto',
          width: '98%',
          marginBottom: vh(10),
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <View style={styles.shadowView}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 60,
                marginLeft: 10,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              {item.eSign == false ? (
                <Image
                  source={utils.icons.Tick}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <Image
                  source={utils.icons.ring}
                  style={{alignSelf: 'center'}}
                />
              )}
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 20,
                }}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {fontSize: 16, color: utils.color.textColor},
                  ]}>
                  {item.TaskName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export const WEJoin = withMyHook(wejoin);
const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    height: vh(70),
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#e9efff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
