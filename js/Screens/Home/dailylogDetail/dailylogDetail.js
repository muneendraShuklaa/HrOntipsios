import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import DailyLogHelperr from './helper';
import Modal from 'react-native-modal';

class dailylogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideModalLogsAdd: false,
      clockIn: '',
      out: '',
      InLoc: 'N/A',
      OutLoc: 'N/A',
      totall: '',
      Data: '',
      total: '',
      cardDeatils: [
        {
          Type: 'Clock In ',
          Type1: 'Clock Out ',
          outTime: '04:55 PM',
          Time: '09:12 AM',
          height: 80,
          colorr: 'green',
          add: 'Noida',
          TimeTotal: '4.88',
          Next: 40,
        },

        // {
        //   Type: 'Clock In ',
        //   Type1: 'Clock Out ',
        //   outTime: '55',
        //   Time: '09:12 AM',
        //   height: 80,
        //   colorr: 'green',
        //   add: 'Noida',
        //   TimeTotal: '4.88',
        // },
      ],
      Dateee: this.props.route.params.Dateee,

      LogDetails: [],
    };
    this.helper = new DailyLogHelperr(this);
  }
  componentDidMount() {
    this.helper.dailylogdataData();
    setTimeout(() => {
      this.calculateTotal();
      // alert('ggg');
    }, 500);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View style={{flex: 1, backgroundColor: utils.color.BackPagecolor}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{flexDirection: 'row'}}>
            <ImageBackground
              style={{flexDirection: 'row', height: 60, width: '100%'}}
              source={utils.icons.buttonnBacl}>
              <Image
                source={utils.icons.Back}
                style={{
                  alignSelf: 'center',
                  marginRight: 10,
                  marginLeft: 20,
                  tintColor: '#fff',
                }}
              />

              <Text
                style={[
                  utils.fontStyle.FontFamilymachoB,
                  {color: '#fff', fontSize: normalize(22), alignSelf: 'center'},
                ]}>
                {/* {this.state.Dateee} */}
                {moment(this.state.Dateee).format('ll')}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <ScrollView>
            <View
              style={{
                backgroundColor: utils.color.background,
                height: 'auto',
                margin: 15,
                borderRadius: 20,
                //   width: '100%',
              }}>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    textAlign: 'center',
                    color: utils.color.textColorheading,
                    paddingTop: 10,
                    fontSize: 20,
                  },
                ]}>
                {' '}
                Total Working Hours
              </Text>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    textAlign: 'center',
                    color: utils.color.textColor,
                    fontSize: 20,
                  },
                ]}>
                {moment
                  .utc(
                    moment
                      .duration(this.state.total, 'minutes')
                      .asMilliseconds(),
                  )
                  .format('H [Hrs] m [Mins ]')}
              </Text>
              <View
                style={{
                  height: 0.5,
                  marginTop: 20,
                  backgroundColor: 'grey',
                  width: '100%',
                }}></View>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    textAlign: 'center',
                    color: utils.color.textColor,
                    fontSize: 14,
                    marginTop: 10,
                  },
                ]}>
                Day Logs
              </Text>
              <FlatList
                style={{height: 'auto', padding: 10}}
                showsHorizontalScrollIndicator={false}
                data={this.state.LogDetails}
                keyExxtractor={(item, index) => index.toString}
                renderItem={({item, index}) => this.renderItem(item, index)}
              />
            </View>
          </ScrollView>
        </View>
        <Modal
          isVisible={this.state.sideModalLogsAdd}
          // animationIn="slideInLeft"
          // animationOut="slideOutLeft"
          style={{margin: 0}}>
          <View
            style={{
              height: vh(554),
              alignSelf: 'center',
              width: '80%',
              borderWidth: 1,
              borderColor: this.props.themeColor.borderLine,
              backgroundColor: '#fff',
              borderBottomEndRadius: 30,
              borderBottomStartRadius: 30,
            }}>
            <Text
              style={[
                styles.Title,
                utils.fontStyle.TextSemiBold,
                {
                  textAlign: 'center',
                  color: utils.color.HeaderColor,
                  fontSize: 14,
                  marginTop: 20,
                },
              ]}>
              More Details
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                marginTop: 10,
                backgroundColor: '#000',
              }}></View>
            <View style={{padding: 20}}>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Icon
                  name="clock-o"
                  size={20}
                  color={utils.color.HeaderColor}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      color: utils.color.HeaderColor,
                      fontSize: 14,
                      marginLeft: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  Time
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      styles.Title,
                      utils.fontStyle.FontFamilyRegular,
                      {
                        textAlign: 'left',
                        color: utils.color.textColor,
                        fontSize: 14,
                        marginTop: 10,
                      },
                    ]}>
                    {moment(this.state.clockIn)
                      .add(5, 'h')
                      .add(30, 'm')
                      .format('LT')}
                    -
                  </Text>
                  <Text
                    style={[
                      styles.Title,
                      utils.fontStyle.FontFamilyRegular,
                      {
                        textAlign: 'left',
                        color: utils.color.textColor,
                        fontSize: 14,
                        marginTop: 10,
                      },
                    ]}>
                    {moment(this.state.out)
                      .add(5, 'h')
                      .add(30, 'm')
                      .format('LT')}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {
                      textAlign: 'left',
                      color: utils.color.textColor,
                      fontSize: 14,
                      marginTop: 10,
                    },
                  ]}>
                  {moment
                    .utc(
                      moment
                        .duration(this.state.totall, 'minutes')
                        .asMilliseconds(),
                    )
                    .format('H [Hrs] m [Mins ]')}
                </Text>
              </View>
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  marginTop: 20,
                  backgroundColor: 'grey',
                }}></View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Icon
                  name="map-marker"
                  size={20}
                  color={utils.color.HeaderColor}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      color: utils.color.HeaderColor,
                      fontSize: 14,
                      marginLeft: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  Clock In Location
                </Text>
              </View>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.FontFamilyRegular,
                  {
                    textAlign: 'left',
                    color: utils.color.textColor,
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: 10,
                  },
                ]}>
                {this.state.InLoc}
              </Text>
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  marginTop: 20,
                  backgroundColor: 'grey',
                }}></View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Icon
                  name="map-marker"
                  size={20}
                  color={utils.color.HeaderColor}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      color: utils.color.HeaderColor,
                      fontSize: 14,
                      marginLeft: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  Clock Out Location
                </Text>
              </View>
              {this.state.OutLoc == '' ? (
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {
                      textAlign: 'left',
                      color: utils.color.textColor,
                      fontSize: 14,
                      marginTop: 10,
                    },
                  ]}>
                  UnKnown
                </Text>
              ) : (
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {
                      textAlign: 'left',
                      color: utils.color.textColor,
                      fontSize: 14,
                      marginTop: 10,
                    },
                  ]}>
                  {this.state.OutLoc}
                </Text>
              )}
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  marginTop: 20,
                  backgroundColor: 'grey',
                }}></View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({sideModalLogsAdd: false});
                }}
                style={{
                  height: 'auto',
                  width: '50%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                  borderRadius: 10,
                  backgroundColor: utils.color.HeaderColor,
                }}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#fff',
                      alignSelf: 'center',
                      padding: 10,
                      fontSize: 14,
                    },
                  ]}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  calculateTotal = () => {
    // const {LogDetails} = this.state;
    // let sum = 0;
    // LogDetails.forEach(item => {
    //   sum += item.Duration;
    // });
    const sum = this.state.Data.reduce(
      (acc, currentValue) => acc + parseInt(currentValue),
      0,
    );
    this.setState({total: sum});
  };
  renderItem(item, index) {
    return (
      <View
        style={{
          height: 'auto',
          width: '98%',
          justifyContent: 'center',
          alignSelf: 'center',
          // backgroundColor: 'grey',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text
            style={[
              utils.fontStyle.TextSemiBold,
              {
                color: '#000',
                marginRight: 5,
                marginTop: 5,
                width: '40%',
                fontSize: 18,
                textAlign: 'right',
              },
            ]}>
            {moment(item.InTime).add(5, 'h').add(30, 'm').format('LT')}
          </Text>
          {/* <Text>{item.Duration}</Text> */}
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: 'green',
                // backgroundColor: utils.color.HeaderColor,
              }}></View>
          </View>
          <TouchableOpacity
            style={{
              marginLeft: 5,
              flexDirection: 'row',
              // backgroundColor: 'red',
              marginTop: 5,
              width: '40%',
            }}
            onPress={() => {
              this.setState({
                sideModalLogsAdd: true,
                clockIn: item.InTime,
                out: item.OutTime,
                InLoc: item.Location,
                OutLoc: item.OutLocation,
                totall: item.Duration,
              });
            }}>
            <Text
              style={[
                utils.fontStyle.TextSemiBold,
                {
                  color: 'green',

                  fontSize: 18,
                  textAlign: 'left',
                },
              ]}>
              Clock In
            </Text>
            <Icon
              name="map-marker"
              size={25}
              color="green"
              style={{marginLeft: 10, marginTop: -5}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              width: '45%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            {/* <Icon
              name="map-marker"
              size={35}
              style={{
                alignSelf: 'center',
                marginRight: 10,
                color: utils.color.HeaderColor,
              }}
            /> */}
            {/* <Text
              // numberOfLines={1}
              style={{
                alignSelf: 'center',
                width: '85%',
                // backgroundColor: 'red',
              }}>
              {item.Location}
            </Text> */}
          </View>
          <View
            style={{
              height: 100,
              width: 2,
              backgroundColor: utils.color.HeaderColor,
              alignSelf: 'center',
            }}></View>
          <View
            style={{
              width: '45%',
              flexDirection: 'row',
              // backgroundColor: 'green',
              justifyContent: 'center',
            }}>
            <Icon
              name="clock-o"
              size={20}
              color={utils.color.HeaderColor}
              style={{alignSelf: 'center'}}
            />
            <Text style={{marginLeft: 10, alignSelf: 'center'}}>
              {moment
                .utc(moment.duration(item.Duration, 'minutes').asMilliseconds())
                .format('H [Hrs] m [Mins ]')}
            </Text>
          </View>
        </View>
        {item.OutTime == null ? null : (
          <View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {
                    // color: item.colorr,
                    marginRight: 5,
                    marginTop: 5,
                    width: '40%',
                    color: '#000',
                    fontSize: 18,
                    textAlign: 'right',
                    // alignSelf: 'center',
                  },
                ]}>
                {/* {} */}
                {moment(item.OutTime).add(5, 'h').add(30, 'm').format('LT')}
              </Text>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderWidth: 2,
                    borderColor: 'red',
                    // backgroundColor: utils.color.HeaderColor,
                  }}></View>
              </View>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {
                    color: item.outTime == 'green' ? '#000' : 'red',
                    marginLeft: 5,
                    // backgroundColor: 'green',
                    marginTop: 5,
                    width: '40%',
                    fontSize: 18,
                    textAlign: 'left',
                  },
                ]}>
                Clock Out
              </Text>
            </View>
            <View
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#fff',
                borderStyle: 'dashed',
                width: 1,
                backgroundColor: '#000',
                alignSelf: 'center',
              }}></View>
          </View>
        )}
        {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              width: '40%',
              backgroundColor: 'red',
              justifyContent: 'center',
            }}>
            <Text style={{}}>a128 noida</Text>
          </View>
          <View
            style={{
              height: item.height,
              width: 3,
              backgroundColor: utils.color.HeaderColor,
              alignSelf: 'center',
            }}></View>
          <View
            style={{
              width: '40%',
              backgroundColor: 'green',
              justifyContent: 'center',
            }}>
            <Text style={{marginLeft: 10}}>01 hrs 32 min</Text>
          </View>
        </View> */}
      </View>
    );
  }
}
export const DailylogDetail = withMyHook(dailylogDetail);
const styles = StyleSheet.create({
  Title: {
    // color: '#000',
  },
  shadowView: {
    height: vh(70),
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
