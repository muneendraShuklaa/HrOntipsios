import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import DSRHelper from './helper';
import Modal from 'react-native-modal';

import {vh, vw, normalize} from '../../../Utils/dimentions';
import {Dropdown} from 'react-native-material-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
class dsrDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: false,
      date: this.props.route.params.date,
      day: this.props.route.params.day,
      TotalHours: this.props.route.params.TotalHours,
      Status: this.props.route.params.Status,
      ProjectDescription: '',
      Comments: '',
      Logout: false,
      DSREmpDataId: '',
      DSRDate: '',
      DsrStatus: '',
      ProjectId: '',
      ProjectModuleId: '',
    };
    this.helper = new DSRHelper(this);
  }
  componentDidMount() {
    this.helper.DSRDetail();
    // this.helper.DSRSubmit();
  }
  render() {
    let data = [
      {
        value: 'IT',
      },
      {
        value: 'HR',
      },
      {
        value: 'Sales',
      },
    ];
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          {/* <StatusBar
                hidden={false}
                backgroundColor={utils.color.HeaderColor}
            /> */}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{flexDirection: 'row'}}>
            <ImageBackground
              imageStyle={{tintColor: utils.color.HeaderColor}}
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
                  {color: '#fff', fontSize: 20, alignSelf: 'center'},
                ]}>
                {this.state.date}
              </Text>
              <Text
                style={[
                  utils.fontStyle.FontFamilymachoB,
                  {
                    color: '#fff',
                    fontSize: 20,
                    alignSelf: 'center',
                    marginLeft: '30%',
                  },
                ]}>
                {moment(this.state.day).format('dddd')}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{flex: 1, backgroundColor: utils.color.BackPagecolor}}>
            <View
              style={{backgroundColor: '#fff', margin: 10, borderRadius: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  // padding: 10,
                }}>
                <Icon
                  name="file-text-o"
                  size={20}
                  style={{
                    alignSelf: 'center',
                    marginLeft: '5%',
                    color: '#3083EF',
                  }}
                />
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      width: '65%',
                      marginLeft: 10,
                      fontSize: 11,
                      alignSelf: 'center',
                    },
                  ]}>
                  {this.state.ProjectDescription.replace(/<(?:.|\n)*?>/gm, '')}
                </Text>

                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      width: 'auto',
                      marginLeft: 10,
                      backgroundColor: utils.color.HeaderColor,
                      padding: 8,
                      borderRadius: 3,
                      color: '#fff',
                    },
                  ]}>
                  {this.state.TotalHours}.0 Hrs
                </Text>
              </View>

              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {width: '100%', marginTop: 10, padding: 20},
                ]}>
                {this.state.Comments}
              </Text>
              {this.state.DsrStatus == 'S' ? null : (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('EditDSR', {
                      Comments: this.state.Comments,
                      TotalHours: this.state.TotalHours,
                      date: this.state.day,
                      ProjectDescription: this.state.ProjectDescription,
                      DSRDate: this.state.DSRDate,
                      ProjectId: this.state.ProjectId,
                      ProjectModuleId: this.state.ProjectModuleId,
                      DsrStatus: this.state.DsrStatus,
                      ProjectCategoryId: this.state.ProjectCategoryId,
                    });
                  }}>
                  <Icon
                    name="edit"
                    size={20}
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: '5%',
                      marginBottom: 10,
                      color: '#3083EF',
                    }}
                  />
                </TouchableOpacity>
              )}
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  borderTopWidth: 1,
                  borderTopColor: 'grey',
                }}>
                {this.state.DsrStatus == 'S' ? (
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                      margin: 10,
                    }}>
                    Already Submitted
                    {/* {this.state.DSREmpDataId} */}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({Logout: true});
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        margin: 10,
                      }}>
                      Submit DSR
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
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
            <View style={{margin: 10}}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    textAlign: 'center',
                    color: this.props.themeColor.textColor,
                    marginTop: 10,
                    fontSize: 22,
                  },
                ]}>
                Are you sure{'\n'}{' '}
                <Text style={{fontSize: 17, fontWeight: '100'}}>
                  Are you sure to submit DSR ?
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    this.helper.DSRSubmit();

                    this.setState({Logout: false});
                    setTimeout(() => {
                      this.helper.DSRDetail();
                    }, 1000);
                  }}
                  style={[
                    {
                      height: 'auto',
                      width: '45%',
                      padding: 5,
                      borderRadius: 10,
                      backgroundColor: utils.color.HeaderColor,
                    },
                  ]}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#fff',
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({Logout: false});
                  }}
                  style={[
                    styles.ButtonView,
                    {
                      height: 'auto',
                      width: '45%',
                      padding: 5,
                      borderRadius: 10,
                      backgroundColor: 'grey',
                    },
                  ]}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#fff',
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
export const DsrDetail = withMyHook(dsrDetail);
const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
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
