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
import {Dropdown} from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RBSheet from 'react-native-raw-bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import taskdata from './helper';

class newTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: false,
      selectedDate: '',
      imageselect: false,
      assignUsername: [],
      Category: [],
      projectCategoryCodeid: '',
      projectCategory: '',
      AssignCode: '',
      projectpriority: '',
      dropcategoryData: '',
      Dropdownproject: '',
      CategoryCode: '',
      type: '',
      Priority: ['VIP', 'High', 'Medium', 'Low'],
      Task: this.props.route.params.TaskName,
      discribe: this.props.route.params.Taskdetails,
      imageArray2: [],
      Date: this.props.route.params.Date,
      pripoityy: this.props.route.params.Priority,
      TaskIdd: this.props.route.params.TaskIdd,
      Status: this.props.route.params.Status,
      EditOn: this.props.route.params.EditOn,
    };
    this.helper = new taskdata(this);
  }
  img_ipdate() {
    console.warn('done..Api Uploading');
    // this.helper.AddImage();

    setTimeout(async () => {
      // await this.helper.UserPDetails();
    }, 2000);
  }
  componentDidMount() {
    this.helper.AssignUser();
    this.helper.category();
  }
  takeScreenshot = () => {
    ImagePicker.openPicker({
      width: vw(300),
      height: vh(400),
      // multiple: true,
      // cropping: true,
      // includeBase64: true
    })
      .then(imageUrl => {
        // let tmpArr = this.state.imageArray2;
        // tmpArr.push(imageUrl.path);
        // console.warn(imageUrl.path);
        this.setState({imageArray2: imageUrl});
        // this.img_ipdate();
        console.log(this.state.imageArray2, 'Imageeeeeeass');
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
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
        // tmpArr.push(imageUrl.path);
        // console.warn(imageUrl.path);
        this.setState({imageArray2: imageUrl});
        // this.img_ipdate();
        console.log(this.state.imageArray2, 'Imagessss');
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }
  validateSaveTask = () => {
    if (this.state.Task == '') {
      alert('Enter task name');
    } else {
      if (this.state.discribe == '') {
        alert('Describe your task');
      } else {
        if (this.state.projectCategoryCodeid == '') {
          alert('Select Category Type');
        } else {
          if (this.state.projectpriority == '') {
            alert('Select priority type');
          } else {
            if (this.state.AssignCode == '') {
              alert('Select Assign Enp name');
            } else {
              if (this.state.selectedDate == '') {
                alert('select task assign date.');
              } else {
                // this.props.navigation.navigate("Dashboard")
                this.helper.AddTask();

                setTimeout(async () => {
                  // this.helper.AddImage();
                  this.props.route.params.refetch();
                }, 2000);
              }
            }
          }
        }
      }
    }
  };
  validateSaveTaskWithImage = () => {
    if (this.state.Task == '') {
      alert('Enter task name');
    } else {
      if (this.state.discribe == '') {
        alert('Describe your task');
      } else {
        if (this.state.projectCategoryCodeid == '') {
          alert('Select Category Type');
        } else {
          if (this.state.projectpriority == '') {
            alert('Select priority type');
          } else {
            if (this.state.AssignCode == '') {
              alert('Select Assign Enp name');
            } else {
              if (this.state.selectedDate == '') {
                alert('select task assign date.');
              } else {
                // this.props.navigation.navigate("Dashboard")
                this.helper.AddImage();
                setTimeout(async () => {
                  // this.helper.AddImage();

                  this.props.route.params.refetch();
                }, 2000);
              }
            }
          }
        }
      }
    }
  };

  validateUpdateTask = () => {
    if (this.state.Task == '') {
      alert('Enter task name');
    } else {
      if (this.state.discribe == '') {
        alert('Describe your task');
      } else {
        if (this.state.projectCategoryCodeid == '') {
          alert('Select Category Type');
        } else {
          if (this.state.projectpriority == '') {
            alert('Select priority type');
          } else {
            if (this.state.AssignCode == '') {
              alert('Select Assign Enp name');
            } else {
              if (this.state.selectedDate == '') {
                alert('select task assign date');
              } else {
                // this.props.navigation.navigate("Dashboard")
                this.helper.UpdateTask();
                // this.props.route.params.refetch();
              }
            }
          }
        }
      }
    }
  };
  render() {
    console.log('upcomeing props is ---------->', this.props);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.isDark
              ? '#000'
              : utils.color.BackPagecolor,
            padding: 10,
          }}>
          {/* <StatusBar
                hidden={false}
                backgroundColor={utils.color.HeaderColor}
            /> */}
          <Header
            title="Add Task"
            lefticon={utils.icons.Back}
            leftFunction={() => {
              this.props.navigation.goBack();
            }}
            isDark={this.props.isDark}
            // rightIcon={utils.icons.splashLogo} rightFunctionality={() => { this.props.navigation.navigate("Profile") }}
          />
          <View
            style={{
              height: 'auto',
              width: '98%',
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.shadowView,
                {
                  height: 'auto',
                  backgroundColor: this.props.isDark ? '#000' : '#fff',
                  borderWidth: this.props.isDark ? 1 : 0,
                  borderColor: this.props.isDark ? '#fff' : 'white',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  marginBottom: 5,
                }}></View>

              <View
                style={{
                  height: 100,
                  borderWidth: 0.4,
                  bordercolor: 'grey',
                  width: '95%',
                  backgroundColor: this.props.isDark ? '#0000' : '#fff',
                  borderRadius: 10,
                  marginTop: 10,
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: this.props.isDark ? '#fff' : 'grey',
                }}>
                <TextInput
                  placeholder="Add Your Task"
                  placeholderTextColor={this.props.isDark ? '#fff' : '#000'}
                  value={this.state.Task}
                  allowFontScaling={false}
                  onChangeText={text => {
                    this.setState({Task: text});
                  }}
                  multiline={true}
                  maxLength={500}
                  style={{
                    marginLeft: 10,
                    color: this.props.isDark ? '#fff' : '#000',
                  }}></TextInput>
              </View>
              <View
                style={{
                  height: 140,
                  borderWidth: 0.4,
                  bordercolor: 'grey',
                  width: '95%',
                  backgroundColor: this.props.isDark ? '#000' : '#fff',
                  borderWidth: 1,
                  borderColor: this.props.isDark ? '#fff' : 'grey',
                  borderRadius: 10,
                  marginTop: 20,
                  marginLeft: 10,
                }}>
                <TextInput
                  placeholder="Describe Your Task"
                  allowFontScaling={false}
                  onChangeText={text => {
                    this.setState({discribe: text});
                  }}
                  multiline={true}
                  value={this.state.discribe}
                  maxLength={500}
                  placeholderTextColor={this.props.isDark ? '#fff' : '#000'}
                  style={{
                    marginLeft: 10,
                    color: this.props.isDark ? '#fff' : '#000',
                  }}></TextInput>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: 'auto',
                    borderWidth: 0.4,
                    bordercolor: 'grey',
                    width: '45%',
                    // backgroundColor: '#fff',
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                    borderWidth: 1,
                    borderColor: this.props.isDark ? '#fff' : 'grey',
                  }}>
                  <SelectDropdown
                    data={this.state.Category}
                    // defaultValueByIndex={1}
                    // defaultValue={'Egypt'}
                    onSelect={(selectedItem, index) => {
                      this.setState({
                        projectCategory: selectedItem,

                        projectCategoryCodeid:
                          this.state.dropcategoryData[index].CategoryId,
                      });
                      console.log(selectedItem, index);
                    }}
                    defaultButtonText={'Category'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={{
                      width: '90%',
                      height: 40,
                      backgroundColor: this.props.isDark ? '#000' : '#FFF',
                      borderRadius: 20,
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
                    height: 'auto',
                    backgroundColor: this.props.isDark ? '#000' : '#fff',

                    borderWidth: 0.4,
                    bordercolor: this.props.isDark ? '#fff' : 'grey',
                    width: '45%',
                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                    borderRadius: 10,
                    marginTop: 10,
                  }}>
                  <SelectDropdown
                    data={this.state.Priority}
                    // defaultValueByIndex={1}
                    defaultValue={'Priority'}
                    onSelect={(selectedItem, index) => {
                      this.setState({
                        projectpriority: selectedItem,

                        // projectpriorityCodeid:
                        //   this.state.dropcategoryData[index].Category,
                      });
                      console.log(selectedItem, index);
                    }}
                    defaultButtonText={this.state.pripoityy || 'Priority'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={{
                      width: '90%',
                      height: 40,
                      backgroundColor: this.props.isDark ? '#000' : '#FFF',
                      borderRadius: 20,
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
              </View>

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
                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                    borderColor: this.props.isDark ? '#fff' : '#000',
                  },
                ]}>
                <Icon
                  name="user"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginLeft: 15}}
                />

                <SelectDropdown
                  data={this.state.assignUsername}
                  // defaultValueByIndex={1}
                  defaultValue={'Egypt'}
                  onSelect={(selectedItem, index) => {
                    this.setState({
                      // Category: selectedItem,
                      AssignCode: this.state.Dropdownproject[index].UserId,
                      type: this.state.Dropdownproject[index].AssignToClientId,
                    });

                    console.log(selectedItem, index);
                  }}
                  defaultButtonText={'Assign To'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    width: '90%',
                    height: 40,
                    backgroundColor: this.props.isDark ? '#000' : '#FFF',
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

              <TouchableOpacity
                onPress={() => {
                  this.RBSheet.open();
                }}
                style={{
                  height: 40,
                  borderWidth: 1,
                  bordercolor: 'grey',
                  width: '95%',
                  backgroundColor: this.props.isDark ? '#000' : '#fff',
                  flexDirection: 'row',
                  borderRadius: 10,
                  marginTop: 20,
                  marginLeft: 10,
                  borderColor: this.props.isDark ? '#fff' : '#000',
                }}>
                <Icon
                  name="calendar"
                  size={20}
                  color="#3C97FF"
                  style={{alignSelf: 'center', marginLeft: '5%'}}
                />
                <TextInput
                  placeholder=""
                  editable={false}
                  placeholderTextColor={this.props.isDark ? '#fff' : '#000'}
                  style={{
                    marginLeft: 10,
                    color: this.props.isDark ? '#fff' : '#000',
                  }}>
                  {moment(this.state.selectedDate?.dateString).format('ll')}
                </TextInput>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({imageselect: true});
                }}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    padding: 10,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: utils.color.HeaderColor,
                  }}>
                  Upload Document
                </Text>
              </TouchableOpacity>
              {this.state.EditOn !== 'EditONN' ? (
                <View>
                  {this.state.imageArray2 == '' ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.validateSaveTask();
                        // alert(this.state.TaskIdd);
                      }}
                      style={{
                        height: 50,
                        marginTop: 20,
                        marginBottom: 20,
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
                        Save
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.validateSaveTaskWithImage();
                        // alert(this.state.TaskIdd);
                      }}
                      style={{
                        height: 50,
                        marginTop: 20,
                        marginBottom: 20,
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
                        Save Task With Image
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.validateUpdateTask();
                    // alert(this.state.TaskIdd);
                  }}
                  style={{
                    height: 50,
                    marginTop: 20,
                    marginBottom: 20,
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
              )}
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
                Select Task Date.
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
              // minDate={new Date()}
              maxDate={'2099-09-22'}
              onDayPress={day => {
                console.log('selected day', day);
                console.log('nnnnnnnnn', this, this.helper);
                // this.helper.FilterTask();
                this.RBSheet.close();
                this.setState({
                  selectedDate: day,
                });
              }}
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
              monthFormat={'MMM yyyy'}
              markingType="period"
            />
          </View>
        </RBSheet>
        <Modal
          isVisible={this.state.imageselect}
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
                    color: '#000',
                    marginTop: 10,
                    textAlign: 'center',
                    color: '#009BE7',
                  },
                ]}>
                Upload documents
              </Text>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'column', marginTop: 15}}
                  onPress={() => {
                    this.pickSingleWithCamera(),
                      this.setState({imageselect: false});
                  }}>
                  <Icon
                    name="camera"
                    size={40}
                    color={this.props.themeColor.IconColor}
                    style={{alignSelf: 'center', marginLeft: '5%'}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: this.props.themeColor.blackTitle,
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
                    this.takeScreenshot(), this.setState({imageselect: false});
                  }}>
                  <Icon
                    name="file-image-o"
                    size={40}
                    color={this.props.themeColor.IconColor}
                    style={{alignSelf: 'center', marginLeft: '5%'}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: this.props.themeColor.blackTitle,
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
                    this.setState({imageselect: false});
                  }}>
                  <Icon
                    name="times-circle-o"
                    size={40}
                    color={this.props.themeColor.IconColor}
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
                        color: this.props.themeColor.blackTitle,
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
      </SafeAreaView>
    );
  }
}
export const NewTask = withMyHook(newTask);
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
