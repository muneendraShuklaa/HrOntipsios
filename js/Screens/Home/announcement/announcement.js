import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnnouncementHelper from './helper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import Modal from 'react-native-modal';

import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
class announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      Announcement: [],
      Announcementtype: [],
      filter: false,
      //   TaskId: this.props.route.params.TaskId,
      // CommentText: '',
      Commentid: '0',
      Comments: '',
      subject: '',
      Type: '',
      Date: moment().format('MM/DD/YYYY'),
      dropcategory: [
        'Celebration',
        'Event',
        'Notice',
        'Warning',
        'Did you know',
      ],
      selectVal: '',
      // role: '',
    };
    this.helper = new AnnouncementHelper(this);
  }
  async componentDidMount() {
    this.helper.AnnoucementType();

    this.helper.AnnouncementData();
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  validateAnnoucements = () => {
    if (this.state.subject == '') {
      alert('Please enter the Subject.');
    } else {
      if (this.state.Comments == '') {
        alert('Plaese Add Annoucement.');
      } else {
        this.helper.PostAnnoucement();
        setTimeout(() => {
          this.helper.AnnouncementData();
        }, 2000);
      }
    }
  };

  render() {
    const {route} = this.props;
    const {role} = route.params;
   console.log('type  ----->', this.state.Announcementtype);
 
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
            title="Announcement"
            lefticon={utils.icons.Back}
            leftFunction={() => {
              this.props.navigation.goBack();
            }}
            isDark={this.props.isDark}
          />

          {this.state.Announcement == '' ? (
            <ActivityIndicator
              size="large"
              color="#3083EF"
              animating={true}
              style={[{marginTop: 320}]}
            />
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
              data={this.state.Announcement?.length>0?this.state.Announcement:[]}
              contentContainerStyle={{paddingBottom: vh(100)}}
              keyExxtractor={(item, index) => index.toString}
              renderItem={({item, index}) =>
                this.renderItem(item, index, this.props.isDark)
              }
            />
          )}

          {role !== 'End User' ? (
            <View style={styles.viewBtn2}>
              <TouchableOpacity
                style={styles.btn2}
                onPress={() => this.setModalVisible(true)}>
                <Icon
                  name="plus-circle"
                  size={30}
                  color="#fff"
                  style={{alignSelf: 'center'}}
                />
                <Text style={styles.txtBtn}> Post</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}>
          <View
            style={[
              styles.modalBackground,
              {backgroundColor: this.props.isDark ? '#000' : '#fff'},
            ]}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                <Icon
                  name="close"
                  size={20}
                  color="lightgrey"
                  style={{alignSelf: 'flex-end', margin: 10}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                {
                  backgroundColor: this.props.isDark ? '#000' : '#fff',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: this.props.isDark ? '#fff' : '#000',

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
                color={this.props.isDark?"#fff":"#darkgrey"}
                style={{alignSelf: 'center', marginLeft: 10}}
              />
              <SelectDropdown
                data={this.state.dropcategory}
                // defaultValueByIndex={1}
                defaultValue={'Egypt'}
                onSelect={(selectedItem, index) => {
                  this.setState({
                    Type: selectedItem,
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
                // backgroundColor: this.props.isDark ? '#000' : '#f2f2f2',
                borderWidth: 1,
                borderColor: this.props.isDark ? '#fff' : '#000',
                flexDirection: 'row',
                borderWidth: 1,
                bordercolor: 'grey',
                marginTop: 10,
                height: 40,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
                paddingLeft: 10,
                // height: 'auto',
              }}>
              <Icon
                name="edit"
                size={20}
                color="#3083EF"
                style={{alignSelf: 'center'}}
              />
              <TextInput
                placeholder="Enter Subject"
                maxLength={100}
                allowFontScaling={false}
                onChangeText={text => {
                  this.setState({subject: text});
                }}
                placeholderTextColor={this.props.isDark ? '#fff' : '#000'}
                style={{
                  marginLeft: 10,
                  color: this.props.isDark ? '#fff' : '#000',
                  fontWeight: 'bold',
                  width: '90%',
                }}></TextInput>
            </View>
            <View>
              <View
                style={{
                  height: vh(390),
                  borderWidth: 0.4,
                  bordercolor: 'grey',
                  width: '95%',
                  flexDirection: 'row',
                  backgroundColor: this.props.isDark ? '#000' : '#fff',
                  borderRadius: 10,
                  marginTop: 10,
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: this.props.isDark ? '#fff' : '#000',
                }}>
                <Icon
                  name="comment-o"
                  size={20}
                  color="#3083EF"
                  style={{margin: 10}}
                />
                <TextInput
                  placeholder="Add Announcement"
                  allowFontScaling={false}
                  onChangeText={text => {
                    this.setState({Comments: text});
                  }}
                  multiline={true}
                  maxLength={500}
                  placeholderTextColor={this.props.isDark ? '#fff' : '#000'}
                  style={{
                    // marginLeft: 10,
                    textAlignVertical: 'top',
                    color: this.props.isDark ? '#fff' : '#000',
                    width: '85%',
                  }}></TextInput>
              </View>
              <TouchableOpacity
                onPress={() => {
                  // this.setModalVisible(false);
                  this.validateAnnoucements();
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
        </Modal>
      </SafeAreaView>
    );
  }
  renderItem(item, index, isDark) {
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
                  {item.ClientDescription}
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
                  {item.FromDate}
                </Text>
              </View>

              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    fontSize: 14,
                    backgroundColor: isDark ? '#000' : '#fff',
                    color: utils.color.HeaderColor,
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 5,
                  },
                ]}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      fontSize: 16,
                      color: isDark ? '#fff' : '#000',
                      marginTop: 10,
                    },
                  ]}>
                  {item.Heading}
                  {'.\n'} {'\n'}
                </Text>
                <Text
                  style={{color: isDark ? 'white' : utils.color.HeaderColor}}>
                  {item.Message.replace(/<\/?[^>]+(>|$)/g, '')}
                </Text>
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      fontSize: 14,
                      color: '#fff',
                      marginTop: 10,
                    },
                  ]}>
                  Posted By - {item.CreatedBy}
                </Text>
              </View>
            </View>
          </View>

          {/* </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
export const Announcement = withMyHook(announcement);
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
  viewBtn2: {
    position: 'absolute',
    // flexDirection: 'row',
    bottom: 30,
    height: 0,
    width: '100%',
    marginBottom: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
  },
  btn2: {
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
