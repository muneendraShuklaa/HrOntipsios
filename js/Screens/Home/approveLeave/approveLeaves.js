import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import Modal from 'react-native-modal';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import ApproveLeaveHelper from './helper';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
class approveLeaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ViewCard: false,
      LeaveRecord: [],
      notesadd: '',
      Pending: '0',
      Reject: '0',
      Approved: '0',
      rejetnotesadd: '',
      Approvalbutton: false,
      approvedIndex: '-1',
      TTransid: '',
      RejectTransid: '',

      sideModalcomment: false,
      cardDeatils: [],
      LeaveStatus: [],
    };
    this.helper = new ApproveLeaveHelper(this);
  }
  componentDidMount() {
    this.helper.LeaveApprove();
  }
  render() {
    console.log('Leave Record------->', this.state.LeaveRecord);
    return (
      <ImageBackground
        imageStyle={{tintColor: this.props.themeColor.Darkk}}
        source={utils.icons.backImage}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: utils.color.HeaderColor,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{flexDirection: 'row', padding: 20, marginTop: 20}}>
          <Image
            source={utils.icons.Back}
            style={{
              alignSelf: 'center',
              marginRight: 10,
              tintColor: '#fff',
              resizeMode: 'contain',
            }}
          />
          <Text
            style={[
              utils.fontStyle.FontFamilymachoB,
              {color: '#fff', fontSize: 20},
            ]}>
            Approve Leave
          </Text>
        </TouchableOpacity>

        <View
          style={{
            height: 100,
            // backgroundColor: 'red',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {/* <FlatList
            horizontal
            style={{
              width: '100%',
              marginTop: 20,
              height: 1,
              paddingLeft: '10%',
            }}
            showsHorizontalScrollIndicator={false}
            data={this.state.LeaveStatus}
            keyExxtractor={(item, index) => index.toString}
            renderItem={({item, index}) => this.renderItemLeave(item, index)}
          /> */}

          <View style={{height: 'auto', width: 'auto'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{height: 100, width: 100}}>
                <View
                  style={{
                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                    height: 65,
                    width: 65,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: this.props.isDark ? '#fff' : '#fff',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 28,
                      color: utils.color.textColorheading,
                      fontWeight: 'bold',
                    }}>
                    {this.state.Pending}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                    marginTop: 5,
                  }}>
                  Pending
                </Text>
              </View>

              <View style={{height: 100, width: 100}}>
                <View
                  style={{
                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                    borderWidth: 1,
                    borderColor: this.props.isDark ? '#fff' : '#fff',
                    height: 65,
                    width: 65,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 28,
                      color: utils.color.textColorheading,
                      fontWeight: 'bold',
                    }}>
                    {this.state.Approved}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                    marginTop: 5,
                  }}>
                  Approved
                </Text>
              </View>

              <View style={{height: 100, width: 100}}>
                <View
                  style={{
                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                    borderWidth: 1,
                    borderColor: this.props.isDark ? '#fff' : '#fff',
                    height: 65,
                    width: 65,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 28,
                      color: utils.color.textColorheading,
                      fontWeight: 'bold',
                    }}>
                    {this.state.Reject}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                    marginTop: 5,
                  }}>
                  Reject
                </Text>
              </View>
            </View>
          </View>
        </View>
        {this.state.LeaveRecord == '' ? (
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
              No leave for approval
            </Text>
          </View>
        ) : (
          <FlatList
            extraData={this.state.approvedIndex}
            style={{padding: 20, marginTop: 30}}
            showsHorizontalScrollIndicator={false}
            data={this.state.LeaveRecord}
            keyExxtractor={(item, index) => index.toString}
            renderItem={({item, index}) =>
              this.renderItem(item, index, this.props.isDark)
            }
          />
        )}

        <Modal
          isVisible={this.state.sideModalcomment}
          // animationType="fade",
          transparent={true}

          // animationIn="slideInLeft"
          // animationOut="slideOutLeft"
          // style={{ margin: 0 }}
        >
          <View
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 30,
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                backgroundColor: '#fff',
                marginTop: -50,
                alignSelf: 'center',
              }}>
              <Image
                source={utils.icons.Page}
                style={{alignSelf: 'center', marginTop: 20}}
              />
            </View>
            <View style={{margin: 15}}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {color: '#000', marginBottom: 10},
                ]}>
                Comments
              </Text>

              <TextInput
                placeholder="Please add your comments"
                placeholderTextColor="grey"
                returnKeyType="done"
                keyboardType="email-address"
                // value={this.state.notesadd}
                // type={'custom'}
                allowFontScaling={false}
                onChangeText={text => {
                  this.setState({rejetnotesadd: text});
                }}
                multiline={true}
                maxLength={330}
                style={[
                  styles.inputstyleaddnotes,
                  utils.fontStyle.FontFamilyRegular,
                  {
                    height: 150,
                    color: '#000',
                    textAlignVertical: 'top',
                    paddingRight: 10,
                  },
                ]}></TextInput>
              <TouchableOpacity
                style={[styles.ButtonView, {marginTop: 20}]}
                onPress={async () => {
                  await this.helper.AddCommentsReject();
                  setTimeout(async () => {
                    this.setState({sideModalcomment: false});
                    this.helper.LeaveApprove();
                  }, 1000);
                  // if (this.state.notesadd.length > 10) {
                  //     this.setState({ Approvalbutton: false })
                  //     await this.helper.AddComments(item.TransId)
                  //     // await this.helper.GetNotes()
                  // }
                  // else {
                  //     alert("Please enter min 10 characters in your notes")
                  // }
                }}>
                <ImageBackground
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={utils.icons.buttonn}>
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {color: '#fff'},
                      {textAlign: 'center'},
                    ]}>
                    Reject
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({sideModalcomment: false});
                }}
                style={[styles.ButtonView, {}]}>
                <ImageBackground
                  imageStyle={{tintColor: '#A3A3A3', borderRadius: 5}}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={utils.icons.buttonn}>
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {color: '#fff'},
                      {textAlign: 'center', fontSize: 16},
                    ]}>
                    Cancel
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.Approvalbutton} style={{margin: 20}}>
          <View
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 30,
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                backgroundColor: '#fff',
                marginTop: -50,
                alignSelf: 'center',
              }}>
              <Image
                source={utils.icons.Page}
                style={{alignSelf: 'center', marginTop: 20}}
              />
            </View>
            <View style={{margin: 15}}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {color: '#000', marginBottom: 10},
                ]}>
                Comments
              </Text>

              <TextInput
                placeholder="Please add your comments"
                placeholderTextColor="grey"
                returnKeyType="done"
                keyboardType="email-address"
                // value={this.state.notesadd}
                // type={'custom'}
                allowFontScaling={false}
                onChangeText={text => {
                  this.setState({notesadd: text});
                }}
                multiline={true}
                maxLength={330}
                style={[
                  styles.inputstyleaddnotes,
                  utils.fontStyle.FontFamilyRegular,
                  {
                    height: 150,
                    color: '#000',
                    textAlignVertical: 'top',
                    paddingRight: 10,
                  },
                ]}></TextInput>
              <TouchableOpacity
                style={[styles.ButtonView, {marginTop: 20}]}
                onPress={async () => {
                  // alert(item.TransId);
                  await this.helper.AddComments();
                  setTimeout(async () => {
                    this.setState({Approvalbutton: false});
                    this.helper.LeaveApprove();
                  }, 1000);
                  // if (this.state.notesadd.length > 10) {
                  //     this.setState({ Approvalbutton: false })
                  //     await this.helper.AddComments(item.TransId)
                  //     // await this.helper.GetNotes()
                  // }
                  // else {
                  //     alert("Please enter min 10 characters in your notes")
                  // }
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 5}}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={utils.icons.buttonn}>
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {color: '#fff'},
                      {textAlign: 'center'},
                    ]}>
                    Approve
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({Approvalbutton: false});
                }}
                style={[styles.ButtonView, {}]}>
                <ImageBackground
                  imageStyle={{tintColor: '#A3A3A3', borderRadius: 5}}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={utils.icons.buttonn}>
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {color: '#fff'},
                      {textAlign: 'center', fontSize: 16},
                    ]}>
                    Cancel
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    );
  }

  renderItem(item, index, isDark) {
    return (
      <View
        style={{
          height: 'auto',
          width: '98%',
          // paddingBottom: vh(10),
          marginBottom: vh(20),
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={[
            styles.shadowView,
            {
              backgroundColor: isDark ? 'lightgrey' : '#fff',
            },
          ]}>
          {this.state.approvedIndex == index ? (
            <View>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.setState({ViewCard: false, approvedIndex: index});
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    paddingBottom: 10,
                  }}>
                  <View style={{alignSelf: 'center'}}>
                    <Text
                      style={[
                        styles.Title,
                        utils.fontStyle.TextSemiBold,
                        {
                          width: vw(230),
                          marginLeft: 15,
                          alignSelf: 'center',
                          fontSize: 16,
                        },
                      ]}>
                      {item.Name}
                    </Text>
                    <Text
                      style={[
                        styles.Title,
                        utils.fontStyle.FontFamilyRegular,
                        {
                          width: vw(230),
                          marginLeft: 15,
                          alignSelf: 'center',
                          fontSize: 12,
                        },
                      ]}>
                      {item.LeaveName}
                    </Text>
                  </View>
                  <Image
                    source={item.Status}
                    style={{alignSelf: 'center', marginRight: 10}}
                  />
                  {item.Status == 'Approved' ? (
                    <Image
                      source={utils.icons.gted}
                      style={{alignSelf: 'center', marginRight: 10}}
                    />
                  ) : (
                    <View>
                      {item.Status == 'Rejected' ? (
                        <Image
                          source={utils.icons.Rted}
                          style={{
                            alignSelf: 'center',
                            marginRight: 10,
                          }}
                        />
                      ) : (
                        <View style={{}}>
                          {item.Status == 'Cancel' ? (
                            <Image
                              source={utils.icons.Canle}
                              style={{
                                alignSelf: 'center',
                                marginRight: 10,
                                // tintColor: 'red',
                              }}
                            />
                          ) : (
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                source={utils.icons.Vectoyellooo}
                                style={{
                                  alignSelf: 'center',
                                  marginRight: 10,
                                }}
                              />
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <View style={{height: 'auto'}}>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: isDark ? '#000' : '#cacaca',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={utils.icons.watch}
                    style={{
                      alignSelf: 'center',
                      marginRight: 10,
                      marginLeft: 15,
                      marginTop: 10,
                    }}
                  />
                  <Text
                    style={[
                      styles.Title,
                      utils.fontStyle.TextSemiBold,
                      {width: vw(230), fontSize: 14, marginTop: 10},
                    ]}>
                    {moment(item.FromDate).format('ll')}-
                    {moment(item.ToDate).format('ll')}
                  </Text>
                </View>
                <Text
                  multiline={true}
                  style={[
                    styles.Title,
                    utils.fontStyle.FontFamilyRegular,
                    {
                      // width: '60%',
                      height: 'auto',
                      marginLeft: 15,
                      fontSize: 12,
                      marginTop: 10,
                      marginBottom: 10,
                    },
                  ]}>
                  {item.Comments}
                </Text>

                {item.Support_Document == '' ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ImageView', {
                        Support_Document: item.Support_Document,
                      });
                    }}>
                    <Text
                      style={[
                        styles.Title,
                        utils.fontStyle.TextSemiBold,
                        {
                          color: utils.color.HeaderColor,
                          alignSelf: 'flex-end',
                          marginRight: 15,
                          fontSize: 12,
                          marginTop: 10,
                          marginBottom: 10,
                        },
                      ]}>
                      View Document
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {item.Status !== 'Rejected' &&
              item.Status !== 'Approved' &&
              item.Status !== 'Cancel' ? (
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        sideModalcomment: true,
                        RejectTransid: item.TransId,
                      })
                    }>
                    <Image
                      source={utils.icons.Reject}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        Approvalbutton: true,
                        TTransid: item.TransId,
                      });
                      // alert(item.TransId);
                    }}>
                    <Image source={utils.icons.Approvedd} style={{}} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ) : (
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                this.setState({ViewCard: true, approvedIndex: index});
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingBottom: 10,
                }}>
                {/* <View style={{ alignSelf: 'center' }}>
                            <Image source={item.Icon} style={{ height: vh(30), width: vw(30), marginLeft: 10 }} />
                        </View> */}
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={[
                      styles.Title,
                      utils.fontStyle.TextSemiBold,
                      {
                        width: vw(230),
                        marginLeft: 15,
                        alignSelf: 'center',
                        fontSize: 16,
                      },
                    ]}>
                    {item.Name}
                  </Text>
                  <Text
                    style={[
                      styles.Title,
                      utils.fontStyle.FontFamilyRegular,
                      {
                        width: vw(230),
                        marginLeft: 15,
                        alignSelf: 'center',
                        fontSize: 12,
                      },
                    ]}>
                    {item.LeaveName}
                  </Text>
                </View>
                <Image
                  source={item.Status}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
                {/* {item.Status == 'Approved' ? (
                  <Image
                    source={utils.icons.gted}
                    style={{alignSelf: 'center', marginRight: 10}}
                  />
                ) : (
                  <View>
                    {item.Status == 'Rejected' ? (
                      <Image
                        source={utils.icons.Rted}
                        style={{alignSelf: 'center', marginRight: 10}}
                      />
                    ) : (
                      <Image
                        source={utils.icons.Vectoyellooo}
                        style={{alignSelf: 'center', marginRight: 10}}
                      />
                    )}
                  </View>
                )} */}
                {item.Status == 'Approved' ? (
                  <Image
                    source={utils.icons.gted}
                    style={{alignSelf: 'center', marginRight: 10}}
                  />
                ) : (
                  <View>
                    {item.Status == 'Rejected' ? (
                      <Image
                        source={utils.icons.Rted}
                        style={{alignSelf: 'center', marginRight: 10}}
                      />
                    ) : (
                      <View style={{}}>
                        {item.Status == 'Cancel' ? (
                          <Image
                            source={utils.icons.Canle}
                            style={{
                              alignSelf: 'center',
                              marginRight: 10,
                              // tintColor: 'red',
                            }}
                          />
                        ) : (
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={utils.icons.Vectoyellooo}
                              style={{
                                alignSelf: 'center',
                                marginRight: 10,
                              }}
                            />
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
  renderItemLeave(item, index) {
    return (
      <View style={{height: 'auto', width: 'auto'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{height: 100, width: 100}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 65,
                width: 65,
                borderRadius: 50,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28,
                  color: utils.color.textColorheading,
                  fontWeight: 'bold',
                }}>
                {item.Approved}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 5,
              }}>
              {item.Type}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export const ApproveLeaves = withMyHook(approveLeaves);
const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    height: 'auto',
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inputstyleaddnotes: {
    width: '100%',
    borderColor: '#3C97FF',
    borderWidth: 1,
    borderRadius: normalize(10),
    paddingLeft: vw(15),
    backgroundColor: '#E9F0FBD4',
  },
});
