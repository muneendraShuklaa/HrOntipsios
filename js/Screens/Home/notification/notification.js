import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotificationHelper from './helper';
import Modal from 'react-native-modal';

import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
    };
    this.helper = new NotificationHelper(this);
  }
  componentDidMount() {
    this.helper.NotificationData();
    setTimeout(() => {
      // alert('hhh');
      this.helper.NotificationData();
    }, 1000);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.themeColor.BackPagecolor,
          }}>
          <Header
            title="Notifications"
            // lefticon={utils.icons.Back}
            // leftFunction={() => {
            //   this.props.navigation.goBack();
            // }}
            isDark={this.props.isDark}
          />

          {this.state.notification == '' ? (
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
                No new notification
              </Text>
            </View>
          ) : (
            <FlatList
              style={{
                marginTop: vh(20),
                paddingBottom: 200,
                height: '100%',
                paddingLeft: 20,
                paddingRight: 20,
                //   backgroundColor: 'red',
              }}
              showsHorizontalScrollIndicator={false}
              data={this.state.notification}
              contentContainerStyle={{paddingBottom: vh(100)}}
              keyExxtractor={(item, index) => index.toString}
              renderItem={({item, index}) => this.renderItem(item, index)}
            />
          )}
        </View>
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
        <View style={[styles.shadowView, {}]}>
          <View style={{}}>
            <View
              style={{
                height: 'auto',
                borderRadius: 5,
                width: '100%',
                padding: 15,
                backgroundColor: utils.color.HeaderColor,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      fontSize: 16,
                      color: utils.color.TextColorWhite,
                    },
                  ]}>
                  {item.ModuleName}
                </Text>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      fontSize: 14,
                      color: utils.color.TextColorWhite,
                    },
                  ]}>
                  {item.CreateDate}
                </Text>
              </View>

              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    fontSize: 14,
                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                    color: this.props.isDark ? '#fff' : utils.color.HeaderColor,
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 5,
                  },
                ]}>
                {item.Notification}
              </Text>
            </View>
          </View>

          {/* </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
export const Notification = withMyHook(notification);
const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    height: 'auto',
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
  viewBtn: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    height: 0,
    width: '100%',
    // padding: 5,
    // marginBottom: 20,
    // paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btn: {
    height: 50,
    flexDirection: 'row',
    width: '20%',
    backgroundColor: '#3083EF',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 40,
  },
});
