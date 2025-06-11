import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import DSRHelper from './helper';
import RBSheet from 'react-native-raw-bottom-sheet';

import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import { back } from 'react-native/Libraries/Animated/Easing';
class dsr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DSR: [],
      filter: false,
    };
    this.helper = new DSRHelper(this);
  }
  componentDidMount() {
    this.helper.dsrData();
  }
  render() {
    // alert(this.state.filter);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.themeColor.BackPagecolor,
          }}>
          {/* <StatusBar
                hidden={false}
                backgroundColor={utils.color.HeaderColor}
            /> */}
          <Header
            title="Daily Status Report "
            lefticon={utils.icons.Back}
            leftFunction={() => {
              this.props.navigation.goBack();
            }}
            rightIcon={utils.icons.Adjust}
            rightFunctionality={() => {
              this.RBSheet.open();
            }}
         
            isDark={this.props.isDark}
          />

          {this.state.DSR == '' ? (
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
                No DSR Available
              </Text>
            </View>
          ) : (
            <View>
              {this.state.filter == false ? (
                <FlatList
                  style={{
                    marginTop: vh(20),
                    height: '100%',
                    paddingLeft: 20,
                    paddingRight: 20,
                    //   backgroundColor: 'red',
                  }}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.DSR?.length>0??[]}
                  // data={this.state.DSR?.sort((a, b) => {
                  //   return a.SubmittedOn - b.SubmittedOn;
                  // })}
                  keyExxtractor={(item, index) => index.toString}
                  renderItem={({item, index}) => this.renderItem(item, index)}
                />
              ) : (
                <FlatList
                  style={{
                    marginTop: vh(20),
                    height: '100%',
                    paddingLeft: 20,
                    paddingRight: 20,
                    //   backgroundColor: 'red',
                  }}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.DSR?.sort((a, b) => {
                    return b.TotalHours - a.TotalHours;
                  })}
                  keyExxtractor={(item, index) => index.toString}
                  renderItem={({item, index}) => this.renderItem(item, index)}
                />
              )}
            </View>
          )}
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('AddDSR', {
                CId: this.state.CId,
                refetch: this.helper.dsrData,
              });
            }}>
            <Icon
              name="plus-circle"
              size={30}
              color="#fff"
              style={{alignSelf: 'center'}}
            />
            <Text style={styles.txtBtn}> New</Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={vh(250)}
          width={'100%'}
          minClosingHeight={20}
          openDuration={250}
          closeOnDragDown={false}
          customStyles={{
            container: {
              borderTopLeftRadius: normalize(26),
              borderTopRightRadius: normalize(26),
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
                    color: '#000',
                    fontSize: 16,
                  },
                ]}>
                Sort DSR with different parameters
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.RBSheet.close();
                }}>
                <Icon
                  name="times-circle"
                  size={30}
                  color="#000"
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.helper.dsrData();
                this.setState({filter: false}), this.RBSheet.close();
              }}
              style={{
                flexDirection: 'row',
                padding: 15,
                borderBottomWidth: 0.5,
              }}>
              <Icon
                name="history"
                size={30}
                color="#000"
                style={{alignSelf: 'center', marginRight: 10}}
              />
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 16,
                  },
                ]}>
                Recent First
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({filter: true}), this.RBSheet.close();
              }}
              style={{
                flexDirection: 'row',
                padding: 15,
              }}>
              <Icon
                name="briefcase"
                size={30}
                color="#000"
                style={{alignSelf: 'center', marginRight: 10}}
              />
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 16,
                  },
                ]}>
                Working Hours
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </SafeAreaView>
    );
  }
  renderItem(item, index) {
    return (
      <View
        style={{
          height: 'auto',
          width: '98%',
          marginBottom: vh(15),
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DsrDetail', {
              date: item.DSRDate,
              day: item.DSRDate1,
              TotalHours: item.TotalHours,
              Status: item.Status,
            });
          }}
          style={[styles.shadowView, {}]}>
          {/* <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate("LiveLocation")}}> */}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                height: 'auto',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                width: '25%',
                backgroundColor: utils.color.HeaderColor,
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    fontSize: 18,
                    color: utils.color.TextColorWhite,
                  },
                ]}>
                {moment(item.DSRDate1).format('ddd')}
              </Text>
            </View>
            <View
              style={{
                height: 'auto',
                justifyContent: 'center',
                width: '50%',
                backgroundColor: this.props.isDark ? 'lightgrey' : '#fff',
                // borderWidth: 1,
                // borderColor: this.props.isDark ? '#FFF' : '#fff',
              }}>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    fontSize: 16,
                    color: this.props.isDark ? '#000' : '#000',
                  },
                ]}>
                {item.DSRDate}
              </Text>
            </View>

            <View
              style={{
                height: 'auto',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                width: '25%',
                backgroundColor: item.TotalHours < 7 ? 'red' : 'green',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                    fontSize: 15,
                    color: utils.color.TextColorWhite,
                  },
                ]}>
                {item.TotalHours}.0 Hrs
              </Text>
            </View>
          </View>

          {/* </TouchableOpacity> */}
        </TouchableOpacity>
      </View>
    );
  }
}
export const DSR = withMyHook(dsr);
const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    height: 'auto',
    width: '100%',
    borderRadius: 10,
    // backgroundColor: '#fff',
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
  viewBtn: {
    position: 'absolute',
    // flexDirection: 'row',
    bottom: 40,
    height: 0,
    width: '100%',
    marginBottom: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btn: {
    height: 50,
    flexDirection: 'row',
    width: vw(100),
    backgroundColor: '#3083EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
