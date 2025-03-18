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
import remiderHelper from './helper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
class reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: [],
      TaskId: this.props.route.params.TaskId,
      Deleteremid: '',
      Reminder: false,
      Delete: false,
      ReminderText: '',

      dropcategory: [
        'Tomorrow',
        'Day After Tomorrow',
        'Next Week',
        'One Day Before Due date',
        'Two Days Before Due date',
        'Three Days Before Due date',
        'Five Days Before Due date ',
      ],
    };
    this.helper = new remiderHelper(this);
  }
  componentDidMount() {
    this.helper.reminderList();
  }
  render() {
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
            title="Set Reminder"
            lefticon={utils.icons.Back}
            leftFunction={() => {
              this.props.navigation.goBack();
            }}
          />
          <View
            style={[styles.shadowView, {width: '97%', alignSelf: 'center'}]}>
            {this.state.Reminder !== true ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({Reminder: true});
                }}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 20,
                }}>
                <Icon
                  name="plus-circle"
                  size={40}
                  color="#3083EF"
                  style={{alignSelf: 'center', marginRight: 20}}
                />
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      alignSelf: 'center',
                      fontSize: 18,
                      color: utils.color.textColor,
                    },
                  ]}>
                  Add a new reminder.
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({Reminder: false});
                  }}>
                  <Icon
                    name="minus-circle"
                    size={40}
                    color="#3083EF"
                    style={{
                      alignSelf: 'center',
                      // marginLeft: 10,
                      marginRight: 20,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    {
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      borderWidth: 1,
                      width: '82%',
                      alignSelf: 'center',
                      borderRadius: 10,
                      //   marginTop: 10,
                      height: 'auto',
                    },
                  ]}>
                  {/* <Icon
                    name="paste"
                    size={20}
                    color="#3083EF"
                    style={{alignSelf: 'center', marginLeft: 10}}
                  /> */}
                  <SelectDropdown
                    data={this.state.dropcategory}
                    // defaultValueByIndex={1}
                    // defaultValue={'Egypt'}
                    onSelect={(selectedItem, index) => {
                      this.setState({
                        ReminderText: selectedItem,
                        // projectCategoryCode:
                        //   this.state.dropcategoryData[index].Category,
                        // projectCategoryCodeid:
                        //   this.state.dropcategoryData[index].CategoryId,
                      });
                      this.helper.Savereminder();
                      setTimeout(() => {
                        this.helper.reminderList();
                      }, 1000);

                      console.log(selectedItem, index);
                    }}
                    defaultButtonText={'Select Reminder'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={{
                      width: '100%',
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
              </View>
            )}
          </View>
          <FlatList
            style={{
              marginTop: vh(20),
              height: '100%',
              paddingLeft: 20,
              paddingRight: 20,
              //   backgroundColor: 'red',
            }}
            showsHorizontalScrollIndicator={false}
            data={this.state.reminder?.length>0?this.state.reminder:[]}
            keyExxtractor={(item, index) => index.toString}
            renderItem={({item, index}) => this.renderItem(item, index)}
          />
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
          {/* <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate("LiveLocation")}}> */}
          {/* trash */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <View
              style={{
                height: 'auto',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                width: '40%',
                backgroundColor: utils.color.background,
                justifyContent: 'center',
                borderRightWidth: 0.5,
              }}>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    fontSize: 14,
                    color: utils.color.textColor,
                  },
                ]}>
                Created On
              </Text>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    fontSize: 16,
                    color: utils.color.HeaderColor,
                  },
                ]}>
                {moment(item.CreatedOn).format('ll')}
              </Text>
            </View>
            <View
              style={{
                height: 'auto',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                width: '40%',
                backgroundColor: utils.color.background,
                justifyContent: 'center',
                borderRightWidth: 0.5,
              }}>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    fontSize: 14,
                    color: utils.color.textColor,
                  },
                ]}>
                Reminder me on
              </Text>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    fontSize: 16,
                    color: utils.color.HeaderColor,
                  },
                ]}>
                {moment(item.ReminderDate).format('ll')}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                // alert(item.ReminderId);

                this.setState({Delete: true, Deleteremid: item.ReminderId});
              }}
              style={{
                height: 'auto',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                width: '20%',
                backgroundColor: utils.color.background,
                justifyContent: 'center',
              }}>
              <Icon
                name="trash"
                size={30}
                color="red"
                style={{alignSelf: 'center', marginLeft: 20, marginRight: 20}}
              />
            </TouchableOpacity>
          </View>

          {/* </TouchableOpacity> */}
        </View>
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
                Are you sure want to Delete Reminder?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    this.helper.deletereminder();
                    setTimeout(() => {
                      this.setState({Delete: false, deletereminder: '0'});
                      this.helper.reminderList();
                    }, 1000);
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
                    this.setState({
                      Delete: false,
                    });
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
      </View>
    );
  }
}
export const Reminder = withMyHook(reminder);
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
    padding: 5,
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
