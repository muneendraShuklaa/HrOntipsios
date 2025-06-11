import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {OverDue} from '../overDue';
// import Leads from "../Announcement/Announcement";
import moment from 'moment';
// import {Complete} from '../complete';
// const TopTab = createMaterialTopTabNavigator();
import {NavigationContainer} from '@react-navigation/native';
import utils from '../../../Utils';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

import {Header} from '../../../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import DSRHelper from './helper';
class Mytask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MyTask: '1',
      Show: false,
      Assignedbyme: '',
      Overdue: '',
      Completed: '',
      Discribe: false,
      DSR: [
        // {
        //   date: '15 dec',
        // },
      ],
      Down: '-1',
      Details: '-1',
      doc: '',
      Type: false,
      progress: false,
      imageselect: false,
      Delete: false,
      list: '1',
      TaskIdd: '',
      Discribedata: '',
      PriorityTypee: '',
      imageArray2: [],
      Status: '',
      TaskPic: [],
      // refetch: this.helper.dsrData,
    };
    this.helper = new DSRHelper(this);
  }
  componentDidMount() {
    this.helper.dsrData();
  }

  TopTabNavigator = () => (
    <TopTab.Navigator
      initialRouteName="Announcement"
      screenOptions={{
        // indicatorStyle: {backgroundColor: null,},
        // indicatorStyle: {backgroundColor:'#4A6159'},
        style: styles.tabContainer,
      }}
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <TopTab.Screen
        name="OverDue"
        component={OverDue}
        options={{
          tabBarLabel: ({focused}) => (
            <View
              style={{
                // justifyContent: 'center',
                borderRadius: 2,
                height: 40,
                width: 120,
                borderBottomColor: focused ? '#F07341' : null,
                borderBottomWidth: focused ? 5 : null,
              }}>
              <Text
                style={{
                  alignContent: 'center',
                  textAlign: 'center',
                  fontWeight: focused ? 'bold' : null,
                  color: focused ? '#F07341' : 'red',
                  fontSize: normalize(16),
                  padding: 5,
                }}>
                Leaves
              </Text>
            </View>
          ),
        }}
      />
      <TopTab.Screen
        name="Complete"
        component={Complete}
        options={{
          tabBarLabel: ({focused}) => (
            <View
              style={{
                // justifyContent: 'center',
                borderRadius: 2,
                height: 40,
                width: 120,
                borderBottomColor: focused ? '#F07341' : null,
                borderBottomWidth: focused ? 5 : null,
              }}>
              <Text
                style={{
                  alignContent: 'center',
                  textAlign: 'center',
                  fontWeight: focused ? 'bold' : null,
                  color: focused ? '#F07341' : 'red',
                  fontSize: normalize(16),
                  padding: 5,
                }}>
                Reimbursement
              </Text>
            </View>
          ),
        }}
      />
    </TopTab.Navigator>
  );
  img_ipdate() {
    // console.log('done');
    setTimeout(() => {
      this.helper.AddImageOnTask();
    }, 2000);
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
        this.img_ipdate();
        // console.warn(this.state.imageArray.path)
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
        this.img_ipdate();
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }
  render() {
    const {Age, Gender, PhoneNumber, DateOfbirth} = this.state;
    // console.log('color name is --------->', this.props.isdark);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.isDark
              ? '#000'
              : utils.color.HeaderColor,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={{flexDirection: 'row'}}>
                <Image
                  source={utils.icons.Back}
                  style={{
                    alignSelf: 'center',
                    margin: 20,
                    marginLeft: 20,
                    tintColor: '#fff',
                  }}
                />
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {color: '#fff', fontSize: 18, alignSelf: 'center'},
                  ]}>
                  Task
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row',
           padding: 10,
             paddingBottom: -10
             }}>
            {/* <TouchableOpacity style={{height: 'auto', width: 'auto'}}>
              <Text style={{color: '#fff'}}>MyTask </Text>
            </TouchableOpacity> */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    MyTask: '1',
                    Assignedbyme: '0',
                    Overdue: '0',
                    Completed: '0',
                    list: '1',
                  });
                  this.helper.dsrData();
                }}
                style={{
                  height: 'auto',
                  width: 'auto',
                  borderBottomWidth: this.state.MyTask == '1' ? 2 : 0,
                  borderBottomColor: this.state.MyTask == '1' ? '#fff' : null,
                }}>
                <Text
                  style={{
                    color: this.state.MyTask == '1' ? '#fff' : '#d9d9d9',
                    fontSize: this.state.MyTask == '1' ? 18 : 18,
                    padding: 10,

                    fontWeight: this.state.MyTask == '1' ? 'bold' : '600',
                  }}>
                  My Task{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    MyTask: '0',
                    Assignedbyme: '1',
                    Overdue: '0',
                    Completed: '0',
                    list: '2',
                  });
                  this.helper.dsrData();
                }}
                style={{
                  height: 'auto',
                  width: 'auto',
                  borderBottomWidth: this.state.Assignedbyme == '1' ? 2 : 0,
                  borderBottomColor:
                    this.state.Assignedbyme == '1' ? '#fff' : null,
                }}>
                <Text
                  style={{
                    color: this.state.Assignedbyme == '1' ? '#fff' : '#d9d9d9',
                    fontSize: this.state.Assignedbyme == '1' ? 18 : 18,
                    padding: 10,

                    fontWeight: this.state.Assignedbyme == '1' ? 'bold' : '600',
                  }}>
                  Assigned by me{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    MyTask: '0',
                    Assignedbyme: '0',
                    Overdue: '1',
                    Completed: '0',
                    list: '3',
                  });
                  this.helper.dsrData();
                }}
                style={{
                  height: 'auto',
                  width: 'auto',
                  borderBottomWidth: this.state.Overdue == '1' ? 2 : 0,
                  borderBottomColor: this.state.Overdue == '1' ? '#fff' : null,
                }}>
                <Text
                  style={{
                    color: this.state.Overdue == '1' ? '#fff' : '#d9d9d9',
                    fontSize: this.state.Overdue == '1' ? 18 : 18,
                    padding: 10,

                    fontWeight: this.state.Overdue == '1' ? 'bold' : '600',
                  }}>
                  Overdue{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    MyTask: '0',
                    Assignedbyme: '0',
                    Overdue: '0',
                    Completed: '1',
                    list: '4',
                  });
                  this.helper.dsrData();
                }}
                style={{
                  height: 'auto',
                  width: 'auto',
                  borderBottomWidth: this.state.Completed == '1' ? 2 : 0,
                  borderBottomColor:
                    this.state.Completed == '1' ? '#fff' : null,
                }}>
                <Text
                  style={{
                    color: this.state.Completed == '1' ? '#fff' : '#d9d9d9',
                    fontSize: this.state.Completed == '1' ? 18 : 18,
                    padding: 10,

                    fontWeight: this.state.Completed == '1' ? 'bold' : '600',
                  }}>
                  Completed{' '}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {this.state.DSR == '' ? (
            <View
              style={{
                flex: 1,
                paddingTop: 200,
                backgroundColor: this.props.isDark ? '#000' : '#fff',
              }}>
              <Icon
                name="calendar-times-o"
                size={100}
                color="#3083EF"
                style={{alignSelf: 'center', marginLeft: 10}}
              />
              <Text
                style={{
                  color: this.props.isDark ? '#fff' : '#000',
                  textAlign: 'center',
                  fontSize: 22,
                  padding: 10,
                  fontWeight: 'bold',
                }}>
                No new Task
              </Text>
            </View>
          ) : (
            <FlatList
              style={{
                // marginTop: vh(20),
                height: '100%',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: this.props.isDark ? '#000' : '#fff',
              }}
              extraData={this.state.DSR || this.state.Down}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: vh(100)}}
              data={this.state.DSR?.length>0?this.state.DSR:[]}
              maxToRenderPerBatch={3}
              keyExxtractor={(item, index) => index.toString}
              renderItem={({item, index}) =>
                this.renderItem(item, index, this.props.isDark)
              }
            />
          )}

          {/* <View style={{height: '100%', width: '100%'}}>
            {this.TopTabNavigator()}
          </View> */}
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('NewTask', {
                refetch: this.helper.dsrData,
              });
            }}>
            <Icon
              name="plus-circle"
              size={30}
              color="#fff"
              style={{alignSelf: 'center'}}
            />

            <Text style={styles.txtBtn}> New Task</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.progress}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          onBackdropPress={() => this.setState({progress: false})}
          style={{}}>
          <View
            style={{
              flex: 1,
              backgroundColor: utils.color.lightBackgroundGrey,
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 'auto',
                width: '60%',
                marginLeft: -20,
                borderWidth: 1,
                justifyContent: 'center',
                borderColor: this.props.themeColor.border,
                backgroundColor: '#fff',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'Pending',
                    progress: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={[styles.progressButtonStyle, {marginTop: 20}]}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#3083EF',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  Pending
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'In Progress',
                    progress: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={[
                  styles.progressButtonStyle,
                  {backgroundColor: '#3083EF'},
                ]}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#fff',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  In Progress
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'Need Info',
                    progress: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={styles.progressButtonStyle}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#3083EF',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  Need Information
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'Re Work',
                    progress: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={styles.progressButtonStyle}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#3083EF',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  Re Work
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'On Hold',
                    progress: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={styles.progressButtonStyle}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#3083EF',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  On Hold
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'Completed',
                    progress: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={styles.progressButtonStyle}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#3083EF',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.Type}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          onBackdropPress={() => this.setState({Type: false})}
          style={{}}>
          <View
            style={{
              flex: 1,
              backgroundColor: utils.color.lightBackgroundGrey,
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 'auto',
                width: '60%',
                marginLeft: -20,
                borderWidth: 1,
                justifyContent: 'center',
                borderColor: this.props.themeColor.border,
                backgroundColor: '#fff',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    PriorityTypee: 'VIP',
                    Type: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdatePriority();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={[
                  styles.TypeButton,
                  {
                    backgroundColor: '#cc3300',
                    marginTop: 30,
                  },
                ]}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#fff',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  VIP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    PriorityTypee: 'High',
                    Type: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdatePriority();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={[
                  styles.TypeButton,
                  {
                    backgroundColor: '#ff4d4d',
                  },
                ]}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#fff',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  High
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    PriorityTypee: 'Medium',
                    Type: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdatePriority();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={[
                  styles.TypeButton,
                  {
                    backgroundColor: '#ffa31a',
                  },
                ]}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#fff',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  Medium
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    PriorityTypee: 'Low',
                    Type: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdatePriority();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}
                style={[
                  styles.TypeButton,
                  {
                    backgroundColor: '#a6a6a6',

                    marginBottom: 30,
                  },
                ]}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#fff',
                      fontSize: 16,
                      alignSelf: 'center',
                    },
                  ]}>
                  Low
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
                height: 'auto',
                width: '100%',
                borderWidth: 1,
                borderColor: this.props.themeColor.border,
                backgroundColor: '#fff',

                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    color: '#3083EF',
                    alignSelf: 'center',
                    marginTop: 20,
                  },
                ]}>
                Attached Files
              </Text>
              <FlatList
                // horizontal={true}
                style={{
                  marginTop: vh(20),
                  marginBottom: 10,
                  height: vh(400),
                  // backgroundColor: 'red',
                  width: '100%',
                }}
                showsHorizontalScrollIndicator={false}
                data={this.state.TaskPic.length>0?this.state.TaskPic:[]}
                keyExxtractor={(item, index) => index.toString}
                renderItem={({item, index}) =>
                  this.renderItemImage(item, index)
                }
              />
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
                Upload task image
              </Text>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: 'space-between',
                  marginBottom: 30,
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
        <Modal isVisible={this.state.Delete}>
          <View
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: this.props.themeColor.theameColor,
              borderColor: '#fff',
              borderWidth: 2,
              borderRadius: 30,
            }}>
            <View style={{margin: 15}}>
              <Icon
                name="trash"
                size={50}
                color="red"
                style={{alignSelf: 'center'}}
              />
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    textAlign: 'center',
                    color: this.props.themeColor.textColor,
                    marginBottom: 10,
                    alignSelf: 'center',
                    width: 250,
                    fontSize: 22,
                  },
                ]}>
                Are you sure want to Delete Task?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    this.helper.deletetask();
                    setTimeout(() => {
                      this.setState({Delete: false, TaskIdd: '0'});
                      this.helper.dsrData();
                    }, 200);
                  }}
                  style={[{marginTop: 10}]}>
                  <View
                    style={{
                      backgroundColor: utils.color.HeaderColor,
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={[
                        utils.fontStyle.TextSemiBold,
                        {color: '#fff'},
                        {
                          textAlign: 'center',
                          fontSize: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
                        },
                      ]}>
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({Delete: false});
                  }}
                  style={[{marginTop: 10}]}>
                  <View
                    style={{
                      backgroundColor: 'grey',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={[
                        utils.fontStyle.TextSemiBold,
                        {color: '#fff'},
                        {
                          textAlign: 'center',
                          fontSize: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
                        },
                      ]}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.Discribe}
          // animationIn="slideInLeft"
          // animationOut="slideOutLeft"
          onBackdropPress={() => this.setState({Discribe: false})}
          style={{}}>
          <View
            style={{
              flex: 1,
              backgroundColor: utils.color.lightBackgroundGrey,
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 'auto',
                width: '100%',
                // marginLeft: -20,
                borderWidth: 1,
                justifyContent: 'center',
                borderColor: this.props.themeColor.border,
                backgroundColor: '#fff',
                borderRadius: 30,
              }}>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {
                    color: '#3083EF',
                    margin: 20,
                    fontSize: 20,
                    alignSelf: 'center',
                    // fontWeight: 'bold',
                  },
                ]}>
                Task Description
              </Text>
              {this.state.Discribedata == '' ? (
                <Text
                  style={[
                    utils.fontStyle.FontFamilyBold,
                    {
                      color: '#000',
                      marginBottom: 10,
                      alignSelf: 'center',
                      fontSize: 18,
                      padding: 20,
                      // fontWeight: 'bold',
                    },
                  ]}>
                  No Description Available
                </Text>
              ) : (
                <Text
                  style={[
                    utils.fontStyle.FontFamilyBold,
                    {
                      color: '#000',
                      marginBottom: 10,
                      alignSelf: 'center',
                      fontSize: 18,
                      padding: 20,
                      // fontWeight: 'bold',
                    },
                  ]}>
                  {this.state.Discribedata}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Discribe: false,
                  });
                }}
                style={[styles.progressButtonStyle, {marginTop: 20}]}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {
                      color: '#3083EF',
                      fontSize: 20,
                      alignSelf: 'center',
                    },
                  ]}>
                  OK
                </Text>
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
        style={{
          height: 'auto',
          width: '100%',
          marginTop: vh(10),
          alignSelf: 'center',
          borderWidth: isDark ? 1 : 0.5,
          borderColor: isDark ? '#fff' : '#000',
          borderRadius: 15,
          paddingBottom: 10,
          marginBottom: 10,
          // backgroundColor: 'red',
          // shadowColor: '#000',
          // marginBottom: 20,
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.23,
          // shadowRadius: 2.62,
          // elevation: 4,
        }}>
        <View
          style={{
            height: 'auto',
            width: '100%',
            paddingTop: 10,
            flexDirection: 'row',

            // backgroundColor: 'purple',
            alignSelf: 'center',
          }}>
          <View
            style={{
              height: 'auto',
              // borderRightWidth: 1,
              // marginRight: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              width: '23%',

              // backgroundColor: 'grey',
            }}>
            {item.StatusColumn == 'Completed' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'In Progress',
                    progress: false,
                    TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}>
                <Icon
                  name="check-circle-o"
                  size={30}
                  color="green"
                  style={{
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Status: 'Completed',
                    progress: false,
                    TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }}>
                <Icon
                  name="circle-o"
                  size={30}
                  color={isDark ? '#fff' : 'grey'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            )}

            {/*  onPress={() => {
                  this.setState({
                    Status: 'Completed',
                    progress: false,
                    // TaskIdd: item.TaskId,
                  });
                  this.helper.UpdateTasksStatus();
                  setTimeout(() => {
                    this.helper.dsrData();
                  }, 1000);
                }} */}

            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 10,
                fontWeight: 'bold',
                color: isDark ? '#fff' : '#000',
              }}>
              {moment(item.DueDate).format('ll')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              // backgroundColor: 'yellow',
              width: '77%',
              height: 'auto',
              justifyContent: 'center',

              paddingLeft: 10,
              borderLeftWidth: 1,
              borderLeftColor: 'lightgrey',
            }}>
            <Text
              style={[
                utils.fontStyle.FontFamilyRegular,
                {
                  width: 'auto',
                  // padding: 5,
                  fontSize: 14,
                  color: isDark ? '#fff' : '#000',
                },
              ]}>
              {item.TaskName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 5,
                // alignSelf: 'center',
                // backgroundColor: 'yellow',
                // paddingTop: 10,
              }}>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  this.setState({progress: true, TaskIdd: item.TaskId});
                }}>
                {item.Status == 'O' ||
                item.Status == 'open' ||
                item.Status == 'IP' ? (
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {
                        width: 'auto',
                        fontSize: 14,
                        color: '#3083EF',
                      },
                    ]}>
                    In Progress
                  </Text>
                ) : (
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {
                        width: 'auto',
                        fontSize: 14,
                        color: '#3083EF',
                      },
                    ]}>
                    {item.Status}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({Type: true, TaskIdd: item.TaskId});
                }}
                style={{
                  backgroundColor:
                    item.Priority == 'High' || item.Priority == 'VIP'
                      ? 'red'
                      : 'grey',
                  // paddingLeft: 10,
                  // paddingRight: 10,a
                  padding: 7,
                  alignContent: 'center',
                  marginRight: 20,
                  borderRadius: 5,
                }}>
                <Text style={[utils.fontStyle.TextSemiBold, {color: '#fff'}]}>
                  {item.Priority}
                </Text>
              </TouchableOpacity>

              {this.state.Down == index ? (
                // Details
                <TouchableOpacity
                  onPress={() => {
                    this.setState({Down: index - 300});
                  }}>
                  <Icon
                    name="chevron-up"
                    size={20}
                    color="#3083EF"
                    style={{marginRight: 20, alignContent: 'center'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({Down: index});
                  }}>
                  <Icon
                    name="chevron-down"
                    size={20}
                    color="#3083EF"
                    style={{marginRight: 20}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {this.state.Down == index ? (
          <View
            style={{
              // flexDirection: 'row',
              marginTop: 10,
              // backgroundColor: 'pink',
            }}>
            {/* {this.state.Details == index ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({Details: index - 300});
                }}
                style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {alignSelf: 'center', marginLeft: 10, fontSize: 16},
                  ]}>
                  More
                </Text>
                <Icon
                  name="chevron-up"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginLeft: 10}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({Details: index});
                }}
                style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text
                  style={[
                    utils.fontStyle.TextSemiBold,
                    {alignSelf: 'center', marginLeft: 10, fontSize: 16},
                  ]}>
                  Less
                </Text>
                <Icon
                  name="chevron-down"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginLeft: 10}}
                />
              </TouchableOpacity>
            )} */}
            <View
              style={{
                justifyContent: 'flex-end',
                // backgroundColor: 'red',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Discribe: true,
                    Discribedata: item.Taskdetails,
                  });
                  // this.props.navigation.navigate('Commenting', {
                  //   TaskId: item.TaskId,
                  // }
                  // );
                }}>
                <Icon
                  name="info-circle"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginRight: 10, marginLeft: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Commenting', {
                    TaskId: item.TaskId,
                  });
                }}>
                <Icon
                  name="commenting-o"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginRight: 10, marginLeft: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Reminder', {
                    TaskId: item.TaskId,
                  });
                }}>
                <Icon
                  name="history"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginRight: 10, marginLeft: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({imageselect: true, TaskIdd: item.TaskId});
                  this.helper.ImageDataData();
                }}>
                <Icon
                  name="folder"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginRight: 10, marginLeft: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.props.navigation.navigate('NewTask', {
                    Date: item.DueDate,
                    Priority: item.Priority,
                    TaskName: item.TaskName,
                    Taskdetails: item.Taskdetails,
                    TaskIdd: item.TaskId,
                    Status: item.Status,
                    EditOn: 'EditONN',
                    refetch: this.helper.dsrData,
                  });
                }}>
                <Icon
                  name="pencil"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginRight: 10, marginLeft: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({Delete: true, TaskIdd: item.TaskId});
                }}>
                <Icon
                  name="trash"
                  size={20}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginRight: 10, marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {this.state.Down == index ? (
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  utils.fontStyle.TextTitleBold,
                  {width: 100, fontSize: 14, color: isDark ? '#fff' : '#000'},
                ]}>
                Category
              </Text>
              <Text>:</Text>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    width: 'auto',
                    fontSize: 14,
                    color: isDark ? '#fff' : '#000',
                    marginLeft: 20,
                  },
                ]}>
                {item.CategoryName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={[
                  utils.fontStyle.TextTitleBold,
                  {width: 100, fontSize: 14, color: isDark ? '#fff' : '#000'},
                ]}>
                Assigned by
              </Text>
              <Text>:</Text>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    width: 'auto',
                    fontSize: 14,
                    color: isDark ? '#fff' : '#000',
                    marginLeft: 20,
                  },
                ]}>
                {item.EmpName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={[
                  utils.fontStyle.TextTitleBold,
                  {width: 100, fontSize: 14, color: isDark ? '#fff' : '#000'},
                ]}>
                Assigned to
              </Text>
              <Text>:</Text>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    width: 'auto',
                    fontSize: 14,
                    color: isDark ? '#fff' : '#000',
                    marginLeft: 20,
                  },
                ]}>
                {item.AssignedToName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={[
                  utils.fontStyle.TextTitleBold,
                  {width: 100, fontSize: 14, color: isDark ? '#fff' : '#000'},
                ]}>
                Assigned on
              </Text>
              <Text>:</Text>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    width: 'auto',
                    fontSize: 14,
                    color: isDark ? '#fff' : '#000',
                    marginLeft: 20,
                  },
                ]}>
                {moment(item.CreatedDate).format('lll')}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={[
                  utils.fontStyle.TextTitleBold,
                  {
                    width: 100,
                    fontSize: 14,
                    color: isDark ? '#fff' : '#000',
                  },
                ]}>
                Due on
              </Text>
              <Text>:</Text>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    width: 'auto',
                    fontSize: 14,
                    color: isDark ? '#fff' : '#000',
                    marginLeft: 20,
                  },
                ]}>
                {moment(item.DueDate).format('lll')}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
  renderItemImage(item, index) {
    return (
      <View>
        {item.doc == '' ? null : (
          // <View style={{height: 500}}>
          //   <Icon
          //     name="image"
          //     size={70}
          //     color="#3083EF"
          //     style={{
          //       alignSelf: 'center',
          //       marginTop: 100,
          //       marginBottom: 20,
          //     }}
          //   />
          //   <Text
          //     style={[
          //       utils.fontStyle.FontFamilyExtraBold,
          //       {
          //         color: '#3083EF',
          //         alignSelf: 'center',
          //       },
          //     ]}>
          //     Image not Found
          //   </Text>
          // </View>
          <View
            style={{
              height: 'auto',
              width: 'auto',
              // backgroundColor: 'green',
              justifyContent: 'center',
              alignSelf: 'center',
              // backgroundColor: '#3083EF',
              borderWidth: 3,
              borderColor: '#3083EF',
              marginBottom: 20,
            }}>
            <View style={{padding: 20}}>
              <ImageBackground
                imageStyle={{alignSelf: 'center', tintColor: 'grey'}}
                source={utils.icons.backgroundBack}
                style={{
                  height: 200,
                  width: 200,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}></View>

                {/* {this.state.isloadingImg && (
            <ActivityIndicator
              size="large"
              color="#009BE7"
              style={{flex: 1, alignItems: 'center'}}
            />
          )} */}
                <Image
                  // source={{ uri: this.state.imageArray2 }}
                  source={{
                    uri: `data:image/jpg;base64,${item.doc}`,
                  }}
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 2,
                    resizeMode: 'stretch',
                  }}
                />
              </ImageBackground>
              <Text
                style={[
                  utils.fontStyle.FontFamilyRegular,
                  {
                    color: this.props.themeColor.blackTitle,
                    // textAlign: 'right',
                    paddingTop: 10,
                  },
                ]}>
                {moment(item.CreatedDate).format('llll')}
              </Text>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {
                    color: this.props.themeColor.blackTitle,
                    // textAlign: 'right',
                    paddingTop: 10,
                  },
                ]}>
                Upload By
              </Text>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {
                    color: this.props.themeColor.blackTitle,
                    // textAlign: 'right',
                    // paddingTop: 10,
                  },
                ]}>
                {item.UploadBy}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
export const MyTask = withMyHook(Mytask);
var styles = StyleSheet.create({
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
    width: vw(160),
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
  shadowView: {
    width: '100%',
    borderColor: '#2d5986',
    borderWidth: 1,
    borderRadius: normalize(10),
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  progressButtonStyle: {
    padding: 10,
    height: 'auto',
    width: 170,
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  TypeButton: {
    padding: 10,
    height: 'auto',
    width: 150,
    alignSelf: 'center',
    borderRadius: 10,
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
