import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import LeavedHelper from './helper';
// import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

class leavebalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ViewCard: false,
      LeaveRecord: [],
      approvedIndex: '-1',
      Logout: false,
      TransIdd: '',
      count: 0,

      cardDeatils: [
        {
          Name: 'Sick Leaves',
          title: '12',
          date: '12Feb - 16Feb',
          Icon: utils.icons.Vectorgreen,
          Status: utils.icons.Approve,
        },
      ],
      LeaveDeatilsss: [],
    };
    this.helper = new LeavedHelper(this);
  }

  componentDidMount() {
    this.helper.LeaveStatus();
    this.helper.GetLeaveBalance();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <ImageBackground
          // imageStyle={{tintColor: this.props.themeColor.Darkk}}
          // imageStyle={{tintColor: this.props.themeColor.Darkk}}
          source={utils.icons.backImage}
          style={{flex: 1, height: '100%', width: '100%'}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              flexDirection: 'row',
              padding: 20,
              marginTop: Platform.OS == 'ios' ? 1 : 30,
            }}>
            <Image
              source={utils.icons.Back}
              style={{alignSelf: 'center', marginRight: 10, tintColor: '#fff'}}
            />
            <Text
              style={[
                utils.fontStyle.FontFamilymachoB,
                {color: '#fff', fontSize: 20},
              ]}>
              Leave Request Status
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: 110,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <FlatList
              horizontal
              style={{
                width: '100%',
                // marginTop: 10,

                // marginLeft: '10%',
              }}
              showsHorizontalScrollIndicator={false}
              data={this.state.LeaveDeatilsss?.length>0?this.state.LeaveDeatilsss:[]}
              keyExxtractor={(item, index) => index.toString}
              renderItem={({item, index}) =>
                this.renderItemLeave(item, index, this.props.isDark)
              }
            />
          </View>
          {this.state.LeaveRecord == '' ? (
            <View style={{flex: 1, marginTop: 50}}>
              {/* <LottieView style={{ height: 100, width: 100, alignSelf: 'center',  }} source={require('../../../Components/Lottie/98288-loading.json')} autoPlay loop /> */}
              <Text
                style={{
                  color: this.props.themeColor.textColor,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginTop: 200,
                }}>
                No applied leave
              </Text>
            </View>
          ) : (
            <FlatList
              extraData={this.state.approvedIndex}
              style={{padding: 20, marginTop: 10}}
              showsHorizontalScrollIndicator={false}
              data={this.state.LeaveRecord?this.state.LeaveRecord:[]}
              keyExxtractor={(item, index) => index.toString}
              renderItem={({item, index}) =>
                this.renderItem(item, index, this.props.isDark)
              }
            />
          )}
        </ImageBackground>
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
              {/* <Image
                source={utils.icons.Groupllot}
                style={{alignSelf: 'center', marginTop: 20}}
              /> */}
              <Icon
                name="trash"
                size={75}
                color="#3C97FF"
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
                    fontSize: 28,
                  },
                ]}>
                Are you sure want to Cancel Leave?
              </Text>

              <TouchableOpacity
                onPress={async () => {
                  await this.helper.CancelLeave();
                  setTimeout(async () => {
                    this.setState({Logout: false});
                    this.helper.LeaveStatus();
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
                    Leave Cancel
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
                    Close
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  renderItem(item, index, isDark) {
    return (
      <View
        style={[
          styles.shadowView,
          {backgroundColor: isDark ? 'lightgrey' : '#fff'},
        ]}>
        {this.state.approvedIndex == index ? (
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              this.setState({ViewCard: false, approvedIndex: index});
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                paddingBottom: 10,
              }}>
              {/* <View style={{ alignSelf: 'center' }}>
                            <Image source={item.Icon} style={{ height: vh(30), width: vw(30), marginLeft: 10 }} />
                        </View> */}
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      width: vw(230),
                      marginLeft: 15,
                      alignSelf: 'center',
                      fontSize: 16,
                    },
                  ]}>
                  {item.LeaveName}
                </Text>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {
                      width: vw(230),
                      marginLeft: 15,
                      alignSelf: 'center',
                      fontSize: 12,
                    },
                  ]}>
                  {moment(item.FromDate).format('ll')}-
                  {moment(item.ToDate).format('ll')}
                </Text>
              </View>

              {item.Status == 'Approved' ? (
                <Image
                  source={utils.icons.gted}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              ) : (
                <View>
                  {item.Status == 'Rejected' ? (
                    <Image
                      source={utils.icons.Rted}
                      style={{alignSelf: 'center', marginRight: 10}}
                    />
                  ) : (
                    <View style={{}}>
                      {item.Status == 'Cancel' ? (
                        <Image
                          source={utils.icons.Canle}
                          style={{
                            alignSelf: 'center',
                            marginRight: 10,
                            // tintColor: 'red',
                          }}
                        />
                      ) : (
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={utils.icons.Vectoyellooo}
                            style={{
                              alignSelf: 'center',
                              marginRight: 10,
                              marginLeft: -20,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                Logout: true,
                                TransIdd: item.TransId,
                              });
                            }}
                            style={{alignSelf: 'center'}}>
                            <Image
                              source={utils.icons.Vectorred}
                              style={{alignSelf: 'center', marginRight: 10}}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
            <View>
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: isDark ? '#000' : '#cacaca',
                }}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      width: vw(180),
                      marginTop: 10,
                      marginLeft: 15,
                      fontSize: 16,
                    },
                  ]}>
                  Reason:
                </Text>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {width: vw(360), marginLeft: 15, fontSize: 12},
                  ]}>
                  {item.Comments}
                </Text>
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {width: vw(180), marginLeft: 15, fontSize: 16},
                  ]}>
                  HR Comment:
                </Text>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {width: '70%', marginLeft: 15, fontSize: 12},
                  ]}>
                  {item.Status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              this.setState({ViewCard: true, approvedIndex: index});
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                paddingBottom: 10,
              }}>
              {/* <View style={{ alignSelf: 'center' }}>
                            <Image source={item.Icon} style={{ height: vh(30), width: vw(30), marginLeft: 10 }} />
                        </View> */}
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      width: vw(230),
                      marginLeft: 15,
                      alignSelf: 'center',
                      fontSize: 16,
                    },
                  ]}>
                  {item.LeaveName}
                </Text>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {
                      width: vw(230),
                      marginLeft: 15,
                      alignSelf: 'center',
                      fontSize: 12,
                    },
                  ]}>
                  {moment(item.FromDate).format('ll')}-
                  {moment(item.ToDate).format('ll')}
                  {/* {item.TransId} */}
                </Text>
              </View>
              {item.Status == 'Approved' ? (
                <Image
                  source={utils.icons.gted}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              ) : (
                <View>
                  {item.Status == 'Rejected' ? (
                    <Image
                      source={utils.icons.Rted}
                      style={{alignSelf: 'center', marginRight: 10}}
                    />
                  ) : (
                    <View style={{}}>
                      {item.Status == 'Cancel' ? (
                        <Image
                          source={utils.icons.Canle}
                          style={{
                            alignSelf: 'center',
                            marginRight: 10,
                            // tintColor: 'grey',
                          }}
                        />
                      ) : (
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={utils.icons.Vectoyellooo}
                            style={{
                              alignSelf: 'center',
                              marginRight: 10,
                              marginLeft: -20,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                Logout: true,
                                TransIdd: item.TransId,
                              });
                            }}
                            style={{alignSelf: 'center'}}>
                            <Image
                              source={utils.icons.Vectorred}
                              style={{alignSelf: 'center', marginRight: 10}}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
              {/* <Image
                        source={utils.icons.Vector}
                        style={{ alignSelf: 'center', marginRight: 10,  }}
                    /> */}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  renderItemLeave(item, index, isDark) {
    return (
      <View style={{height: 'auto', width: 'auto'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{height: 100, width: 100}}>
            <View
              style={{
                backgroundColor: isDark ? '#000' : '#fff',
                height: 60,
                width: 60,
                borderRadius: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: isDark ? '#fff' : '#fff',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28,
                  color: utils.color.textColorheading,
                  fontWeight: 'bold',
                }}>
                {item.Balance}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 5,
              }}>
              {item.LeaveCode}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export const LeaveBalance = withMyHook(leavebalance);
const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    height: 'auto',
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
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
