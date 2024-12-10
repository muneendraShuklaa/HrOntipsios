import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  ImageBackground,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import {Header} from '../../../Components/Header';
import utils from '../../../Utils';
import {Dropdown} from 'react-native-material-dropdown';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import RBSheet from 'react-native-raw-bottom-sheet';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import RequestHelper from './helper';
import ImagePicker from 'react-native-image-crop-picker';
const Available = ['Email', 'Mobile', 'Both', 'None'];
class requestleave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      isDateTimePickerVisibleEnd: false,
      LeaveType: '',
      Full: 'Full',
      Time: 'Start Date',
      TimeEnd: 'End Date',
      DropdownVendorList: [],
      sideModalImageDoc: false,
      imageArray2: [],
      selectedDate: '',
      selectedEndDate: '',
      notesadd: '',
      avalavleType: '',
      LeaveSplit: '',
      Leavevalue: '',
      Balance: '0',
    };

    this.helper = new RequestHelper(this);
  }
  async componentDidMount() {
    this.helper.GetLeaveType();
  }
  // showDateTimePicker = () => {
  //   this.setState({isDateTimePickerVisible: true});
  // };

  // hideDateTimePicker = () => {
  //   this.setState({isDateTimePickerVisible: false});
  // };

  // showDateTimePickerEnd = () => {
  //   this.setState({isDateTimePickerVisibleEnd: true});
  // };

  // hideDateTimePickerEnd = () => {
  //   this.setState({isDateTimePickerVisibleEnd: false});
  // };

  // handleDatePicked = time => {
  //   console.log('A date has been picked: ', time);
  //   // alert(time)
  //   this.hideDateTimePicker();
  //   this.setState({
  //     Time: time.toString('dd/MM/yyyy'),
  //   });
  // };
  // handleDatePickedEnd = date => {
  //   console.log('A date has been picked: ', date);
  //   alert('select End Date');
  //   this.hideDateTimePickerEnd();
  //   this.setState({
  //     TimeEnd: date.toString('dd/MM/yyyy'),
  //   });
  // };
  takeScreenshot = () => {
    ImagePicker.openPicker({
      width: vw(300),
      height: vh(400),
      // multiple: true,
      // cropping: true,
      //   includeBase64: true
    })
      .then(imageUrl => {
        let tmpArr = [];
        // tmpArr.push(imageUrl.path)
        // console.warn(imageUrl.path);
        // this.setState({ imageArray2: tmpArr })
        this.setState({imageArray2: imageUrl});
        // this.img_ipdate()
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        console.log(e);
        // Alert.alert(e.message ? e.message : e);
      });
  };
  pickSingleWithCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      // includeBase64: true
    })
      .then(imageUrl => {
        // let tmpArr = this.state.imageArray2;
        // tmpArr.push(imageUrl.path)
        // console.warn(imageUrl.path)
        this.setState({imageArray2: imageUrl});
        // this.img_ipdate()
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }
  applyLeave(daysDiff) {
    if (this.state.LeaveType == '') {
      alert('Please Select Leave Type');
    } else {
      if (this.state.selectedDate == '') {
        alert('Please enter Start Date');
      } else {
        if (this.state.selectedEndDate == '') {
          alert('Please enter End Date');
        } else {
          if (this.state.notesadd == '') {
            alert('Please enter details of your leave');
          } else {
            if (this.state.avalavleType == '') {
              alert('Please select Availability Type');
            } else {
              // alert('hello');
              this.helper.uploadLeaveDoc();
              setTimeout(() => {
                // this.props.navigation.navigate('bottomTabBarr');
              }, 2000);
            }
          }
        }
      }
    }
    // this.helper.uploadLeaveDoc();
  }
  handleDateRangeSelect = range => {
    const {startDate, endDate} = range;
    this.setState({startDate, endDate});
  };
  render() {
    console.log(this.state.Full, 'typeeeeee');
    const {Age, Gender, PhoneNumber, DateOfbirth} = this.state;
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

    const endDate = new Date(this.state.selectedEndDate.dateString);
    const startDate = new Date(this.state.selectedDate.dateString);

    // Calculate the difference in milliseconds
    const differenceMs = endDate - startDate;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    console.log('Validation is ------>', this.state.validation);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.themeColor.BackPagecolor,
            marginTop: 20,
          }}>
          <StatusBar
            hidden={false}
            backgroundColor={utils.color.HeaderColor}
            translucent
            barStyle="light-content"
          />
          {/* <Header
                        title="Apply Leave"
                        lefticon={utils.icons.Back} leftFunction={() => { this.setState({ sideModalD: true }) }}
                    // rightIcon={utils.icons.padlock} rightFunctionality={() => { this.props.navigation.navigate("Profile") }}
                    /> */}
          {/* <Text>{this.state.Time}</Text>
<Text>{this.state.TimeEnd}</Text> */}

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{flexDirection: 'row'}}>
            <ImageBackground
              style={{
                flexDirection: 'row',
                height: 60,
                width: '100%',
              }}
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
                Apply Leave
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 40,
            }}>
            <SelectDropdown
              data={this.state.DropdownVendorList}
              // defaultValueByIndex={1}
              defaultValue={'Dropdown'}
              onSelect={(selectedItem, index) => {
                this.setState({
                  LeaveType: selectedItem,
                  Leavevalue: this.state.LeaveSplit[index].LeaveType,
                });
                console.log(selectedItem, index);
                this.helper.LeaveBalance();
              }}
              defaultButtonText={'Leave Type'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: '100%',
                height: 50,
                backgroundColor: this.props.isDark ? '#000' : '#FFF',
                borderWidth: 1,
                borderColor: this.props.isDark
                  ? '#fff'
                  : utils.color.bordercolor,
                borderRadius: 8,
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={this.props.isDark ? '#fff' : '#444'}
                    size={18}
                  />
                );
              }}
              buttonTextStyle={{
                color: this.props.isDark ? '#fff' : '#444',
                paddingLeft: 10,
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

            <View
              style={{
                height: 'auto',
                width: '100%',
                backgroundColor: '#3C97FF',
                marginTop: 15,
                borderRadius: 5,
                padding: 5,
              }}>
              <Text style={{color: '#fff', fontSize: 16, marginLeft: 20}}>
                Available Balance : {this.state.Balance}
              </Text>
            </View>
            {/* <TouchableOpacity style={{}} onPress={() => { this.showDateTimePicker() }}> */}

            <View
              style={{
                height: vh(50),
                width: '100%',
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                // onPress={() => {
                //   this.props.navigation.navigate('bottomTabBarr');
                // }}
                onPress={() => {
                  this.RBSheet.open();
                }}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  height: 50,
                  borderWidth: 1,
                  borderColor: utils.color.bordercolor,
                  backgroundColor: this.props.isDark ? '#000' : '#fff',
                  borderRadius: 10,
                  width: '47%',
                }}>
                <Icon
                  name="calendar"
                  size={20}
                  style={{
                    alignSelf: 'center',
                    marginLeft: '5%',
                    color: '#3083EF',
                  }}
                />

                <TextInput
                  style={[
                    utils.fontStyle.FontFamilyRegular,
                    {
                      color: this.props.isDark ? '#fff' : '#000',
                      textAlign: 'center',
                      backgroundColor: this.props.isDark ? '#000' : '#fff',
                      width: '80%',
                      fontSize: 18,
                      borderRadius: 10,
                    },
                  ]}
                  placeholder="Start Date"
                  placeholderTextColor={this.props.isDark ? '#fff' : 'grey'}
                  editable={false}>
                  {/* {moment(this.state.selectedEndDate?.dateString).format('ll')} */}
                  {this.state.selectedDate?.dateString}
                </TextInput>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => {
                //   this.showDateTimePickerEnd();
                // }}
                onPress={() => {
                  this.RBSheet1.open();
                }}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  height: 50,
                  borderWidth: 1,
                  borderColor: utils.color.bordercolor,
                  backgroundColor: this.props.isDark ? '#000' : '#fff',
                  borderRadius: 10,
                  width: '47%',
                }}>
                <Icon
                  name="calendar"
                  size={20}
                  style={{
                    alignSelf: 'center',
                    marginLeft: '5%',
                    color: '#3083EF',
                  }}
                />

                <TextInput
                  style={[
                    utils.fontStyle.FontFamilyRegular,
                    {
                      color: this.props.isDark ? '#fff' : '#000',
                      textAlign: 'center',
                      backgroundColor: this.props.isDark ? '#000' : '#fff',
                      width: '80%',
                      borderRadius: 10,
                      fontSize: 18,
                    },
                  ]}
                  placeholder="End Date"
                  placeholderTextColor={this.props.isDark ? '#fff' : 'grey'}
                  editable={false}>
                  {/* {moment(this.state.selectedDate).format('ll')} */}
                  {/* {moment(this.state.selectedDate?.dateString).format('ll')} */}
                  {this.state.selectedEndDate?.dateString}
                </TextInput>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 50,
                width: '100%',
                alignSelf: 'center',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: utils.color.HeaderColor,
                borderRadius: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({Full: 'full'});
                }}
                style={{
                  width: '50%',
                  height: 48,
                  justifyContent: 'center',
                  backgroundColor:
                    this.state.Full === 'full'
                      ? utils.color.HeaderColor
                      : this.props.isDark
                      ? '#000'
                      : '#fff',
                  borderBottomLeftRadius: 5,
                  borderTopLeftRadius: 5,
                }}>
                <Text
                  style={[
                    utils.fontStyle.FontFamilyRegular,
                    {
                      textAlign: 'center',
                      fontSize: 18,
                      color:
                        this.state.Full === 'full'
                          ? '#fff'
                          : this.props.isDark
                          ? '#fff'
                          : '#000',
                    },
                  ]}>
                  Full day
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({Full: 'half'});
                }}
                style={{
                  width: '50%',
                  height: 48,
                  justifyContent: 'center',
                  backgroundColor:
                    this.state.Full === 'full'
                      ? this.props.isDark
                        ? '#000'
                        : '#fff'
                      : utils.color.HeaderColor,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                }}>
                <Text
                  style={[
                    utils.fontStyle.FontFamilyRegular,
                    {
                      textAlign: 'center',
                      fontSize: 18,
                      color:
                        this.state.Full === 'full'
                          ? this.props.isDark
                            ? '#fff'
                            : '#000'
                          : '#fff',
                    },
                  ]}>
                  Half day
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: this.props.isDark ? '#000' : '#fff',
                marginTop: 20,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder={utils.Strings.enternote}
                placeholderTextColor={this.props.isDark ? '#fff' : 'grey'}
                returnKeyType="done"
                // keyboardType='email-address'
                // value={this.state.notesadd}
                type={'custom'}
                allowFontScaling={false}
                onChangeText={text => {
                  this.setState({notesadd: text});
                }}
                multiline={true}
                maxLength={350}
                style={[
                  styles.inputstyleaddnotes,
                  utils.fontStyle.FontFamilyRegular,
                  {
                    textAlignVertical: 'top',
                    color: this.props.isDark ? '#fff' : '#000',
                    height: vh(150),
                    paddingRight: 10,
                  },
                ]}></TextInput>
            </View>
            {/* <Text>{this.state.avalavleType.charAt(0)}</Text> */}

            <View style={{marginTop: 20}}></View>
            <SelectDropdown
              data={Available}
              // defaultValueByIndex={1}
              defaultValue={'Dropdown'}
              onSelect={(selectedItem, index) => {
                this.setState({avalavleType: selectedItem.charAt(0)});
                console.log(selectedItem.charAt(0), index);
              }}
              defaultButtonText={'Select Availability'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: '100%',
                height: 50,
                backgroundColor: this.props.isDark ? '#000' : '#FFF',
                borderWidth: 1,
                borderColor: utils.color.bordercolor,
                borderRadius: 8,
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={this.props.isDark ? '#fff' : '#444'}
                    size={18}
                  />
                );
              }}
              buttonTextStyle={{
                color: this.props.isDark ? '#fff' : '#444',
                paddingLeft: 10,
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
            {/* </TouchableOpacity> */}
            {/* <DateTimePicker
              // isDarkModeEnabled
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode="date"
            /> */}
            {/* <DateTimePicker
              // isDarkModeEnabled

              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePickedEnd}
              onCancel={this.hideDateTimePickerEnd}
              mode="date"
            /> */}
            <TouchableOpacity
              onPress={() => {
                this.setState({sideModalImageDoc: true});
              }}
              style={{
                height: 50,
                width: '100%',
                justifyContent: 'center',
                backgroundColor: this.props.isDark ? '#000' : '#fff',
                borderRadius: 10,
                marginTop: 20,
                borderWidth: 1,
                borderColor: utils.color.bordercolor,
              }}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    alignSelf: 'center',
                    fontSize: 20,
                    color: this.props.isDark ? '#fff' : '#000',
                  },
                ]}>
                Upload Documents
              </Text>
            </TouchableOpacity>

            {/* <Text style={[utils.fontStyle.FontFamilyRegular, { alignSelf: 'center', margin: 10 }]}>--Availability--</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ height: 28, width: 80, backgroundColor: utils.color.HeaderColor, justifyContent: 'center', borderWidth: 1, borderColor: utils.color.HeaderColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                <Text style={[utils.fontStyle.FontFamilyRegular,{ alignSelf: 'center', color: utils.color.TextColorWhite }]}>None</Text>
                            </View>
                            <View style={{ height: 28, width: 80, backgroundColor: '#fff', justifyContent: 'center', borderWidth: 1, borderColor: utils.color.HeaderColor }}>
                                <Text style={[utils.fontStyle.FontFamilyRegular,{ alignSelf: 'center', color: utils.color.textColor }]}>Phone</Text>
                            </View>
                            <View style={{ height: 28, width: 80, backgroundColor: '#fff', justifyContent: 'center', borderWidth: 1, borderColor: utils.color.HeaderColor }}>
                                <Text style={[utils.fontStyle.FontFamilyRegular,{ alignSelf: 'center', color: utils.color.textColor }]}>Email</Text>
                            </View>
                            <View style={{ height: 28, width: 80, backgroundColor: '#fff', justifyContent: 'center', borderWidth: 1, borderColor: utils.color.HeaderColor, borderTopEndRadius: 10, borderBottomEndRadius: 10 }}>
                                <Text style={[utils.fontStyle.FontFamilyRegular,{ alignSelf: 'center', color: utils.color.textColor }]}>Both</Text>
                            </View>
                        </View> */}

            <TouchableOpacity
              onPress={() => {
                this.applyLeave();
              }}
              style={{
                height: 50,
                width: '100%',
                justifyContent: 'center',
                backgroundColor: utils.color.HeaderColor,
                borderRadius: 30,
                marginTop: 30,
              }}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    alignSelf: 'center',
                    fontSize: 20,
                    color: utils.color.TextColorWhite,
                  },
                ]}>
                Apply leave
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          isVisible={this.state.sideModalImageDoc}
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
                height: vh(180),
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
                    // color: '#000',
                    marginTop: 10,
                    textAlign: 'center',
                    color: '#3C97FF',
                  },
                ]}>
                Upload Document
              </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.pickSingleWithCamera(),
                      this.setState({sideModalImageDoc: false});
                  }}>
                  <Icon
                    name="camera"
                    size={30}
                    color="#3C97FF"
                    style={{alignSelf: 'center', marginLeft: '5%'}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: '#3C97FF',
                        marginBottom: 10,
                        alignSelf: 'center',
                      },
                    ]}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.takeScreenshot(),
                      this.setState({sideModalImageDoc: false});
                  }}>
                  <Icon
                    name="file-image-o"
                    size={30}
                    color="#3C97FF"
                    style={{alignSelf: 'center', marginLeft: '5%'}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: '#3C97FF',
                        marginBottom: 10,
                        alignSelf: 'center',
                      },
                    ]}>
                    Gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.setState({sideModalImageDoc: false});
                  }}>
                  <Icon
                    name="times-circle-o"
                    size={30}
                    color="#377F72"
                    style={{
                      alignSelf: 'center',
                      marginLeft: '5%',
                      color: 'grey',
                    }}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: '#afafaf',
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
        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
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
                Select End date
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
              minDate={new Date()}
              maxDate={'2099-09-22'}
              onDayPress={day => {
                console.log('selected day', day);
                // console.log('nnnnnnnnn', this, this.helper);
                // this.helper.FilterTask();
                this.setState({
                  selectedEndDate: day,
                });
                this.RBSheet1.close();
              }}
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
              monthFormat={'MMM yyyy'}
              markingType={'period'}

              // markingType="period"
            />
          </View>
        </RBSheet>
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
                    fontSize: 20,
                  },
                ]}>
                Select Start date
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
              minDate={new Date()}
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
              markingType="period"
            />
          </View>
        </RBSheet>
      </SafeAreaView>
    );
  }
}
export const RequestLeave = withMyHook(requestleave);
var styles = StyleSheet.create({
  inputstyleaddnotes: {
    justifyContent: 'center',
    width: '100%',
    borderColor: '#3C97FF',
    borderWidth: 1,
    borderRadius: normalize(10),
    paddingLeft: vw(15),
  },
});
