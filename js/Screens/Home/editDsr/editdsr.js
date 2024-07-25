import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import {Dropdown} from 'react-native-material-dropdown';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SafeAreaView} from 'react-native-safe-area-context';
import DSREditHelper from './helper';
import SelectDropdown from 'react-native-select-dropdown';

class editdsr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: false,
      Comments: this.props.route.params.Comments,
      TotalHours: this.props.route.params.TotalHours,
      ProjectDescription: this.props.route.params.ProjectDescription,
      date: this.props.route.params.date,
      dropcategory: '',
      DSRDate: this.props.route.params.DSRDate,
      ProjectId: this.props.route.params.ProjectId,
      ProjectModuleId: this.props.route.params.ProjectModuleId,
      DsrStatus: this.props.route.params.DsrStatus,
      ProjectCategoryId: this.props.route.params.ProjectCategoryId,
      editcomment: '',
      projectCategoryCode: '',
      projectCategory: '',
      hour: '',
      dropcategoryData: '',
    };
    this.helper = new DSREditHelper(this);
  }
  componentDidMount() {
    this.helper.Dropdowntaskcate();
  }
  validateEdirDSR = () => {
    if (this.state.projectCategory == '') {
      alert('Please select project Category.');
    } else {
      // this.props.navigation.navigate("Dashboard")
      this.helper.EditttDsr();
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View style={{flexDirection: 'row'}}>
          <ImageBackground
            imageStyle={{tintColor: utils.color.HeaderColor}}
            style={{flexDirection: 'row', height: 60, width: '100%'}}
            source={utils.icons.buttonnBacl}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{flexDirection: 'row'}}>
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
                numberOfLines={1}
                style={[
                  utils.fontStyle.FontFamilymachoB,
                  {
                    color: '#fff',
                    //   backgroundColor: 'red',
                    fontSize: 16,
                    fontWeight: 'bold',
                    width: '50%',
                    alignSelf: 'center',
                  },
                ]}>
                {this.state.ProjectDescription.replace(/<(?:.|\n)*?>/gm, '')}
              </Text>
            </TouchableOpacity>

            <Text
              style={[
                utils.fontStyle.FontFamilymachoB,
                {
                  color: '#fff',
                  fontSize: 20,
                  alignSelf: 'center',
                  marginLeft: '5%',
                },
              ]}>
              {moment(this.state.date).format('ll')}
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: utils.color.BackPagecolor,
            padding: 10,
          }}>
          <View
            style={{
              height: 'auto',
              width: '98%',
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View style={[styles.shadowView, {height: 'auto'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  marginBottom: 5,
                }}></View>

              <View
                style={{
                  height: 40,
                  borderWidth: 0.4,
                  bordercolor: 'grey',
                  width: '95%',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                <Icon
                  name="hourglass-2"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginLeft: 10}}
                />
                <TextInput
                  placeholder="Select time"
                  maxLength={10}
                  keyboardType="numeric"
                  placeholderTextColor={'#000'}
                  allowFontScaling={false}
                  onChangeText={text => {
                    this.setState({hour: text});
                  }}
                  style={{marginLeft: 10, color: '#000'}}>
                  {this.state.TotalHours}
                </TextInput>
              </View>

              <View
                style={{
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  borderWidth: 1,
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginTop: 10,
                  height: 'auto',
                }}>
                <Icon
                  name="file-text-o"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginLeft: 10}}
                />
                <SelectDropdown
                  data={this.state.dropcategory}
                  // defaultValueByIndex={1}
                  //   defaultValue={'Egypt'}
                  onSelect={(selectedItem, index) => {
                    this.setState({
                      projectCategory: selectedItem,
                      projectCategoryCode:
                        this.state.dropcategoryData[index].Category,
                      projectCategoryCodeid:
                        this.state.dropcategoryData[index].CategoryId,
                    });
                    console.log(selectedItem, index);
                  }}
                  defaultButtonText={this.state.ProjectDescription.replace(
                    /<(?:.|\n)*?>/gm,
                    '',
                  )}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    width: '90%',
                    height: 40,
                    borderRadius: 8,

                    backgroundColor: '#FFF',
                  }}
                  renderDropdownIcon={isOpened => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#444'}
                        size={14}
                      />
                    );
                  }}
                  buttonTextStyle={{
                    color: '#444',
                    paddingLeft: 0,
                    textAlign: 'left',
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={{
                    marginTop: -25,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                  }}
                  rowStyle={{}}
                  rowTextStyle={{
                    color: '#444',
                    textAlign: 'left',
                    marginLeft: vw(30),
                  }}
                />
              </View>

              <View
                style={{
                  height: 200,
                  borderWidth: 0.4,
                  bordercolor: 'grey',
                  width: '95%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                <Icon
                  name="comment-o"
                  size={20}
                  color="#3083EF"
                  style={{margin: 10}}
                />
                <TextInput
                  placeholder="Add Comment"
                  allowFontScaling={false}
                  onChangeText={text => {
                    this.setState({editcomment: text});
                  }}
                  multiline={true}
                  maxLength={500}
                  placeholderTextColor={'#000'}
                  style={{
                    textAlignVertical: 'top',
                    width: '85%',
                    color: '#000',
                  }}>
                  {this.state.Comments}
                </TextInput>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.validateEdirDSR();
                }}
                style={{
                  height: 50,
                  marginTop: 20,
                  width: '90%',
                  backgroundColor: utils.color.HeaderColor,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export const EditDSR = withMyHook(editdsr);
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
