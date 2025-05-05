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
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentHelper from './helper';
import Modal from 'react-native-modal';

import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
class commenting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comment: [],
      filter: false,
      TaskId: this.props.route.params.TaskId,
      CommentText: '',
      Commentid: '0',
    };
    this.helper = new CommentHelper(this);
  }
  componentDidMount() {
    this.helper.CommentData();
  }
  validcomment = () => {
    if (this.state.CommentText == '') {
      alert('Enter Comment');
    } else {
      this.helper.AddComment();
      setTimeout(async () => {
        this.helper.CommentData();
      }, 500);
    }
  };
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
            title="Add Comment"
            lefticon={utils.icons.Back}
            leftFunction={() => {
              this.props.navigation.goBack();
            }}
          />

          {this.state.Comment == '' ? (
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
              data={this.state.Comment || []}
              contentContainerStyle={{paddingBottom: vh(100)}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => this.renderItem(item, index)}
            />
          )}
        </View>
        <View style={styles.viewBtn}>
          <TextInput
            placeholder="Enter your comment"
            onChangeText={text => {
              this.setState({CommentText: text});
            }}
            ref={input => {
              this.textInput = input;
            }}
            allowFontScaling={false}
            returnKeyType="done"
            value={this.state.CommentText}
            type={'custom'}
            style={{
              height: 50,
              width: '80%',
              fontSize: 16,
              paddingLeft: 20,
              backgroundColor: '#fff',
              //   borderRadius: 10,
            }}></TextInput>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.validcomment();
              this.setState({ CommentText: '' });
              // this.textInput.clear();
            }}>
            <Icon
              name="send"
              size={30}
              color="#fff"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
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
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.Title,
                    utils.fontStyle.TextSemiBold,
                    {
                      fontSize: 18,
                      color: utils.color.TextColorWhite,
                    },
                  ]}>
                  {item.UName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // alert(item.ReminderId);
                    this.helper.deletecomment();
                    this.setState({Commentid: item.Id});
                    setTimeout(() => {
                      this.setState({Commentid: '0'});
                      this.helper.CommentData();
                    }, 500);
                  }}>
                  <Icon
                    name="trash"
                    size={30}
                    color="#fff"
                    style={{
                      alignSelf: 'center',
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    fontSize: 14,
                    color: utils.color.TextColorWhite,
                  },
                ]}>
                {item.postedtime}
              </Text>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    fontSize: 14,
                    backgroundColor: '#fff',
                    color: utils.color.HeaderColor,
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 5,
                  },
                ]}>
                {item.Comments}
              </Text>
            </View>
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
                    this.helper.deletecomment();
                    setTimeout(() => {
                      this.setState({Delete: false, Commentid: '0'});
                      this.helper.reminderList();
                    }, 500);
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
export const Commenting = withMyHook(commenting);
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
