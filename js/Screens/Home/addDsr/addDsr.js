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
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import adddsrHelper from './helper';

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Calendar,
  CalendarList,
  CalendarProvider,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
class adddsr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: false,
      lastWeekDates: this.getLastWeekDates(),

      Search: '',
      hours: '',
      Category: '',
      Categorytype: '',
      CategoryCode: '',
      projectCategoryCodeid: '',
      Dropdownproject: '',
      ProjectModuleId: '',
      type: '',
      ProjectId: '',
      dropcategory: [],
      selectedItemm: '',
      selectedDate: '',
      projectCategory: '',
      CategoryId: '',
      dropcategoryData: '',
      Comments: '',
    };
    this.helper = new adddsrHelper(this);
  }
  componentDidMount() {
    this.helper.Dropdownproject();
    this.helper.Dropdowntaskcate();
  }
  validateDSR = () => {
    if (this.state.selectedDate == '') {
      alert('Please select date.');
    } else {
      if (this.state.CategoryCode == '') {
        alert('Please select project.');
      } else {
        if (this.state.hours == '') {
          alert('Please enter working hours.');
        } else {
          if (this.state.Comments == '') {
            alert('Please enter your Comments.');
          } else {
            if (this.state.projectCategoryCodeid == '') {
              alert('Please select category.');
            } else {
              // this.props.navigation.navigate("Dashboard")
              this.helper.AddDsr();
              setTimeout(() => {
                this.props.route.params.refetch();
              }, 2000);
            }
          }
        }
      }
    }
  };

  getLastWeekDates = () => {
    const lastWeekDates = {};
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      lastWeekDates[dateString] = {disabled: true}; // or any validation logic you want
    }
    return lastWeekDates;
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            flex: 1,
            backgroundColor: utils.color.BackPagecolor,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{height: 50, justifyContent: 'center'}}>
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
                    marginLeft: 5,
                    tintColor: '#000',
                  }}
                />
                <Text
                  style={[
                    utils.fontStyle.FontFamilymachoB,
                    {color: '#000', fontSize: 18, alignSelf: 'center'},
                  ]}>
                  Add New
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                // onPress={() => {
                //   this.showDateTimePickerEnd();
                // }}
                onPress={() => {
                  this.RBSheet.open();
                }}
                style={{
                  height: 'auto',
                  marginRight: 10,
                  width: 'auto',
                }}>
                <TextInput
                  style={[
                    utils.fontStyle.FontFamilyRegular,
                    {
                      color: '#000',
                      textAlign: 'center',
                      // width: '80%',
                      fontSize: 18,
                    },
                  ]}
                  editable={false}>
                  {moment(this.state.selectedDate?.dateString).format('ll')}
                  {/* {moment(this.state.selectedDate?.dateString).format('ll')} */}
                  {/* {this.state.selectedEndDate?.dateString} */}
                </TextInput>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Text>{this.state.selectedDate}</Text> */}
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
                style={[
                  {
                    // backgroundColor: 'red',
                    // flexDirection: 'row',
                    borderWidth: 1,
                    width: '95%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    borderRadius: 10,
                    height: 'auto',
                  },
                ]}>
                <Icon
                  name="file-text-o"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginLeft: 10}}
                />

                <SelectDropdown
                  data={this.state.Search}
                  // defaultValueByIndex={1}
                  defaultValue={'Egypt'}
                  onSelect={(selectedItem, index) => {
                    this.setState({
                      Category: selectedItem,
                      CategoryCode: this.state.Dropdownproject[index].text,
                      type:
                        this.state.Dropdownproject[index].Value.split(
                          '_',
                        )[2].trim() || '',
                      ProjectId:
                        this.state.Dropdownproject[index].Value.split(
                          '_',
                        )[1].trim() || '',
                      ProjectModuleId:
                        this.state.Dropdownproject[index].Value.split(
                          '_',
                        )[0].trim() || '',
                    });

                    console.log(selectedItem, index);
                  }}
                  defaultButtonText={'Select project'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    width: '90%',
                    height: 40,
                    backgroundColor: '#FFF',
                    borderRadius: 8,
                  }}
                  renderDropdownIcon={isOpened => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#444'}
                        size={18}
                      />
                    );
                  }}
                  buttonTextStyle={{
                    color: '#444',
                    // paddingLeft: 10,
                    textAlign: 'left',
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={{
                    marginTop: -25,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                  }}
                  search
                  searchInputStyle={{
                    backgroundColor: '#EFEFEF',
                    borderRadius: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: '#444',
                  }}
                  searchPlaceHolder={'Search here'}
                  searchPlaceHolderColor={'darkgrey'}
                  renderSearchInputLeftIcon={() => {
                    return (
                      <FontAwesome name={'search'} color={'#444'} size={18} />
                    );
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
                  // backgroundColor: '#f2f2f2',
                  flexDirection: 'row',
                  borderWidth: 1,
                  marginTop: 10,
                  height: 40,
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  paddingLeft: 10,
                  // height: 'auto',
                }}>
                <Icon
                  name="history"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center'}}
                />
                <TextInput
                  placeholder="Enter Working Hours"
                  maxLength={3}
                  allowFontScaling={false}
                  onChangeText={text => {
                    this.setState({hours: text});
                  }}
                  keyboardType="numeric"
                  placeholderTextColor={'#000'}
                  style={{marginLeft: 10, color: '#000'}}></TextInput>
              </View>
              <View
                style={[
                  {
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    borderWidth: 1,
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 10,
                    height: 'auto',
                  },
                ]}>
                <Icon
                  name="paste"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginLeft: 10}}
                />
                <SelectDropdown
                  data={this.state.dropcategory}
                  // defaultValueByIndex={1}
                  defaultValue={'Egypt'}
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
                  defaultButtonText={'Select Category'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    width: '90%',
                    height: 40,
                    backgroundColor: '#FFF',
                    borderRadius: 8,
                  }}
                  renderDropdownIcon={isOpened => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#444'}
                        size={18}
                      />
                    );
                  }}
                  buttonTextStyle={{
                    color: '#444',
                    // paddingLeft: 10,
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
                  height: vh(280),
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
                  name="comment-o"
                  size={20}
                  color="#3083EF"
                  style={{margin: 10}}
                />
                <TextInput
                  placeholder="Add Comment"
                  allowFontScaling={false}
                  onChangeText={text => {
                    this.setState({Comments: text});
                  }}
                  multiline={true}
                  maxLength={500}
                  placeholderTextColor={'#000'}
                  style={{
                    // marginLeft: 10,
                    textAlignVertical: 'top',
                    color: '#000',
                    width: '85%',
                  }}></TextInput>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.validateDSR();
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
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={vh(550)}
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
                    color: utils.color.blackText,
                    fontSize: 16,
                  },
                ]}>
                Select Date
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
            <Calendar
              style={{
                backgroundColor: 'transparent',
                overflow: 'hidden',
              }}
              markedDates={this.state.lastWeekDates}
              theme={{
                header: {height: 0},
                backgroundColor: '#2d5986',
                calendarBackground: 'transparent',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: 'red',
                selectedDayBackgroundColor: '#2d5986',
                todayTextColor: '#2d5986',
                dayTextColor: '#2d4150',
                textDisabledColor: 'lightgrey',
                dotColor: '#2d5986',
                arrowColor: '#2d5986',
                disabledArrowColor: '#d9e1e8',
                indicatorColor: 'blue',
                textDayFontWeight: '300',
                monthTextColor: '#2d5986',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 22,
                textDayHeaderFontSize: 16,
              }}
              // minDate={new Date()}
              maxDate={'2099-09-22'}
              onDayPress={day => {
                console.log('selected day', day);
                // console.log('nnnnnnnnn', this, this.helper);
                // this.helper.FilterTask();
                this.setState({
                  selectedDate: day,
                });
                this.RBSheet.close();
              }}
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
              monthFormat={'MMM yyyy'}
              markingType={'period'}
            />
          </View>
        </RBSheet>
      </SafeAreaView>
    );
  }
}
export const AddDSR = withMyHook(adddsr);
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
