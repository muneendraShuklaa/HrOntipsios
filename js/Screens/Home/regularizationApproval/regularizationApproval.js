import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, TextInput, ImageBackground, StyleSheet, FlatList, Image, TouchableHighlight,
  TouchableNativeFeedback,
  Easing
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withMyHook } from '../../../Utils/Dark';
import Utils from '../../../Utils';
import Modal from 'react-native-modal';
import { Header } from '../../../Components/Header';
import RegularizationHelper from './helper';
import moment from 'moment';
import { normalize, vh, vw } from '../../../Utils/dimentions';
import Icon from 'react-native-vector-icons/MaterialIcons';

class RegularizationApproval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textInputCommentRef: null,
      Status: '',
      Id: '',
      approvedIndex: '-1',
      isloading: false,
      visibleData: [],
      currentPage: 1,
      regularizationData: [],
      pageSize: 15,
      expandedItem: null,
      Approvalbutton: false,
      comment: '',
      EmpIdForApproval: '',
      role: ''
    }
    this.helper = new RegularizationHelper(this)
  }
  validateRegularizationApproval = () => {
    if (this.state.comment == '') {
      alert('Please select comment.');
    } else {
      this.helper.saveCommentForApproval();
      setTimeout(async () => {
        this.setState({ Approvalbutton: false });
        this.helper.bindAttendanceGrip();
      }, 700);
    }
  };

  componentDidMount() {
    this.helper.bindAttendanceGrip()
    this.loadMoreData();
    const { route } = this.props;
    const { role } = route.params;
    this.setState((prevState) => ({
      role: role
    }));
    // console.log(role,'role--');
  }
  loadMoreData = () => {
    const { currentPage, pageSize, regularizationData, visibleData } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    if (startIndex < regularizationData.length) {
      this.setState({
        visibleData: [...visibleData, ...regularizationData.slice(startIndex, endIndex)],
        currentPage: currentPage + 1,
      });
    }
  };
  toggleExpand = (id) => {
    this.setState((prevState) => ({
      expandedItem: prevState.expandedItem === id ? null : id,
    }));
    Easing.out(Easing.quad)
  };

  render() {
    console.log(this.state.regularizationData, 'reg data--');
    return (
      <>
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: Utils.color.HeaderColor
        }}>

          <View style={{
            flex: 1,
            backgroundColor: this.props.themeColor.BackPagecolor
          }}>
            {/* <Header
              title="Regularization Approval"
              lefticon={Utils.icons.Back}
              leftFunction={() => {
                this.props.navigation.goBack();
              }}
            /> */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ flexDirection: 'row' }}>
              <ImageBackground
                style={{ flexDirection: 'row', height: 60, width: '100%' }}
                source={Utils.icons.buttonnBacl}>
                <Image
                  source={Utils.icons.Back}
                  style={{
                    alignSelf: 'center',
                    marginRight: 10,
                    marginLeft: 20,
                    tintColor: '#fff',
                  }}
                />
                <Text
                  style={[
                    Utils.fontStyle.FontFamilymachoB,
                    { color: '#fff', fontSize: 20, alignSelf: 'center' },
                  ]}>
                  Regularization Approval
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <FlatList
              extraData={this.state.approvedIndex}
              style={{ padding: 20, marginTop: 30, }}
              contentContainerStyle={{
                paddingBottom: vh(35)
              }}
              showsHorizontalScrollIndicator={false}
              data={this.state.regularizationData?.length > 0 ? this.state.regularizationData : []}
              keyExxtractor={(item, index) => index.toString}
              renderItem={({ item, index }) =>
                this.renderItem(item, index, this.props.isDark)
              }
              ListFooterComponent={
                this.state.visibleData?.length < this.state.regularizationData?.length ? (
                  <TouchableOpacity onPress={this.loadMoreData} style={{ padding: 15, alignItems: 'center' }}>
                    <Text style={{ color: 'blue', fontSize: 16 }}>Show More</Text>
                  </TouchableOpacity>
                ) : null
              }
              ListEmptyComponent={
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text
                    style={[
                      Utils.fontStyle.TextSemiBold,
                      {
                        color: this.props.isDark ? '#fff' : '#000',
                        marginBottom: 10
                      },
                    ]}>
                    No Data Available
                  </Text>
                </View>
              }
            />

          </View>
        </SafeAreaView>
        <Modal
          isVisible={this.state.Approvalbutton}
          transparent={true}
          style={{ margin: vw(20) }}>
          <View
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 30,
            }}>
            <View
              style={{
                height: vw(100),
                width: vw(100),
                borderRadius: 100,
                backgroundColor: '#fff',
                marginTop: -50,
                alignSelf: 'center',
              }}>
              <Image
                source={Utils.icons.Page}
                style={{ alignSelf: 'center', marginTop: 20 }}
              />
            </View>
            <View style={{ margin: 15 }}>
              <Text
                style={[
                  Utils.fontStyle.FontFamilyExtraBold,
                  { color: '#000', marginBottom: 10 },
                ]}>
                Comments
              </Text>

              <TextInput
                ref={input => (this.textInputCommentRef = input)}
                onSubmitEditing={() => {
                  this.textInputCommentRef.blur();
                }
                }
                placeholder="Please add your comments"
                placeholderTextColor="grey"
                returnKeyType="done"
                keyboardType="email-address"
                // value={this.state.notesadd}
                // type={'custom'}
                allowFontScaling={false}
                onChangeText={text => {
                  this.setState({ comment: text });
                }}
                multiline={true}
                maxLength={330}
                style={[
                  styles.inputstyleaddnotes,
                  Utils.fontStyle.FontFamilyRegular,
                  {
                    height: 150,
                    color: '#000',
                    textAlignVertical: 'top',
                    paddingRight: 10,
                  },
                ]}></TextInput>
              <TouchableOpacity
                style={[styles.ButtonView, { marginTop: 20 }]}
                onPress={async () => {
                  this.validateRegularizationApproval()
                }}>
                <ImageBackground
                  imageStyle={{ borderRadius: 5 }}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={Utils.icons.buttonn}>
                  <Text
                    style={[
                      Utils.fontStyle.TextSemiBold,
                      { color: '#fff' },
                      { textAlign: 'center' },
                    ]}>
                    {this.state.Status == "Present" ? 'Approve' : 'Reject'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ Approvalbutton: false });
                }}
                style={[styles.ButtonView, {}]}>
                <ImageBackground
                  imageStyle={{ tintColor: '#A3A3A3', borderRadius: 5 }}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  source={Utils.icons.buttonn}>
                  <Text
                    style={[
                      Utils.fontStyle.TextSemiBold,
                      { color: '#fff' },
                      { textAlign: 'center' },
                    ]}>
                    Cancel
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    )
  }
  renderItem = (item, index, isDark) => (
    <View style={{
      height: 'auto',
      width: '100%',
      // borderWidth: isDark ? 1 : 0.5,
      borderColor: isDark ? '#fff' : '#000',
      borderTopStartRadius: 5,
      borderTopEndRadius: 5,
      borderBottomStartRadius: 5, borderBottomEndRadius: 5,
      padding: vw(10),
      marginBottom: 10,
      elevation: 2,
      backgroundColor: Utils.color.themeBackground
    }}>
      <TouchableHighlight
        underlayColor="#ccc"
        // useForeground={true}
        // background={TouchableNativeFeedback.Ripple('#ccc', false)}
        onPress={() => this.toggleExpand(item.Id)}
        style={{
          height: 'auto',
          width: '100%',
          paddingBottom: vh(5)
          // padding: vw(4)
        }}>
        <>
          <Text style={[styles.Title, { fontWeight: 'bold', color: this.state.expandedItem === item.Id ? "#00BFFF" : "#000" }]}>{moment(item.AttendanceDate, "MM/DD/YYYY").format("MMM D, YYYY")}</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 6
          }}>
            <View>
              <Text style={[styles.Title, { color: this.state.expandedItem === item.Id ? "#00BFFF" : "#000" }]}>{item.Name}</Text>
              <Text style={[styles.Title, {
                color: this.state.expandedItem === item.Id ? "#00BFFF" : "#000"
              }]}>[{item.EmpId}]</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',

            }}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    Approvalbutton: true,
                    Status: "Present",
                    Id: item.Id,
                    EmpIdForApproval: item.EmpId
                  });
                }}
                underlayColor="#CCFFCC"
                style={{
                  borderRadius: vw(50),
                  backgroundColor: 'green',
                  width: vw(30),
                  height: vw(30),
                  marginRight: vw(6),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Icon name="check" size={vw(25)} color="white" />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    Approvalbutton: true,
                    Status: "",
                    Id: item.Id,
                    EmpIdForApproval: item.EmpId
                  });
                }}
                underlayColor="#FFCCCC"
                style={{
                  borderRadius: vw(50),
                  backgroundColor: 'red',
                  width: vw(30),
                  height: vw(30),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>

                <Icon name="close" size={vw(25)} color="white" />
              </TouchableHighlight>
            </View>

          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={[styles.Title, {
              color: this.state.expandedItem === item.Id ? "#00BFFF" : "#000"
            }]}>In : {item.ClockIntime} Out: {item.ClockOuttime}</Text>
            <View style={{
              marginLeft: vw(100)
            }}>

              <Icon name="keyboard-arrow-down" size={vw(25)} color="black" />
            </View>
          </View>
        </>
      </TouchableHighlight>
      {this.state.expandedItem === item.Id && (
        <View style={{ borderTopWidth: 1, borderColor: '#E0E0E0', paddingVertical: vh(3) }}>
          <Text style={
            [styles.Title,
            Utils.fontStyle.TextSemiBold]
          }>Employee Comment :</Text>
          <Text style={
            [styles.Title,
            Utils.fontStyle.FontFamilyRegular]
            // }>{item.ManagerComment}</Text>
          }>{item.ManagerComment && item.ManagerComment.trim() !== ""
            ? item.ManagerComment
            : item.EmployeeComment}</Text>
        </View>
      )}
    </View>
  );
  //  renderItem(item, index, isDark) {
  //     return (
  //       <View
  //         style={{
  //           height: 'auto',
  //           width: '98%',
  //           // paddingBottom: vh(10),
  //           marginBottom: vh(20),
  //           justifyContent: 'center',
  //           alignSelf: 'center',
  //         }}>
  //         <View
  //           style={[
  //             styles.shadowView,
  //             {
  //               backgroundColor: isDark ? 'lightgrey' : '#fff',
  //             },
  //           ]}>
  //           {this.state.approvedIndex == index ? (
  //             <View>
  //               <TouchableOpacity
  //                 style={{}}
  //                 onPress={() => {
  //                   this.setState({ ViewCard: false, approvedIndex: index });
  //                 }}>
  //                 <View
  //                   style={{
  //                     flexDirection: 'row',
  //                     marginTop: 10,
  //                     paddingBottom: 10,
  //                   }}>
  //                   <View style={{ alignSelf: 'center' }}>
  //                     <Text
  //                       style={[
  //                         styles.Title,
  //                         Utils.fontStyle.TextSemiBold,
  //                         {
  //                           width: vw(230),
  //                           marginLeft: 15,
  //                           alignSelf: 'center',
  //                           fontSize: 16,
  //                         },
  //                       ]}>
  //                       {item.Name}
  //                     </Text>
  //                     <Text
  //                       style={[
  //                         styles.Title,
  //                         Utils.fontStyle.FontFamilyRegular,
  //                         {
  //                           width: vw(230),
  //                           marginLeft: 15,
  //                           alignSelf: 'center',
  //                           fontSize: 12,
  //                         },
  //                       ]}>
  //                       {item.LeaveName}
  //                     </Text>
  //                   </View>
  //                   {/* {item?.Status && <Image
  //                     source={item?.Status }
  //                     style={{ alignSelf: 'center', marginRight: 10 }}
  //                   />} */}
  //                   {item.Status == 'Approved' ? (
  //                     <Image
  //                       source={Utils.icons.gted}
  //                       style={{ alignSelf: 'center', marginRight: 10 }}
  //                     />
  //                   ) : (
  //                     <View>
  //                       {item.Status == 'Rejected' ? (
  //                         <Image
  //                           source={Utils.icons.Rted}
  //                           style={{
  //                             alignSelf: 'center',
  //                             marginRight: 10,
  //                           }}
  //                         />
  //                       ) : (
  //                         <View style={{}}>
  //                           {item?.Status == 'Cancel' ? (
  //                             <Image
  //                               source={Utils.icons.Canle}
  //                               style={{
  //                                 alignSelf: 'center',
  //                                 marginRight: 10,
  //                                 // tintColor: 'red',
  //                               }}
  //                             />
  //                           ) : (
  //                             <View style={{ flexDirection: 'row' }}>
  //                               <Image
  //                                 source={Utils.icons.Vectoyellooo}
  //                                 style={{
  //                                   alignSelf: 'center',
  //                                   marginRight: 10,
  //                                 }}
  //                               />
  //                             </View>
  //                           )}
  //                         </View>
  //                       )}
  //                     </View>
  //                   )}
  //                 </View>
  //               </TouchableOpacity>

  //               <View style={{ height: 'auto' }}>
  //                 <View
  //                   style={{
  //                     borderTopWidth: 1,
  //                     borderTopColor: isDark ? '#000' : '#cacaca',
  //                     flexDirection: 'row',
  //                   }}>
  //                   <Image
  //                     source={Utils.icons.watch}
  //                     style={{
  //                       alignSelf: 'center',
  //                       marginRight: 10,
  //                       marginLeft: 15,
  //                       marginTop: 10,
  //                     }}
  //                   />
  //                   <Text
  //                     style={[
  //                       styles.Title,
  //                       Utils.fontStyle.TextSemiBold,
  //                       { width: vw(230), fontSize: 14, marginTop: 10 },
  //                     ]}>
  //                     {moment(item.FromDate).format('ll')}-
  //                     {moment(item.ToDate).format('ll')}
  //                   </Text>
  //                 </View>
  //                 <Text
  //                   multiline={true}
  //                   style={[
  //                     styles.Title,
  //                     Utils.fontStyle.FontFamilyRegular,
  //                     {
  //                       // width: '60%',
  //                       height: 'auto',
  //                       marginLeft: 15,
  //                       fontSize: 12,
  //                       marginTop: 10,
  //                       marginBottom: 10,
  //                       fontWeight: "bold"
  //                     },
  //                   ]}>
  //                   Reason: {item.Comments}
  //                 </Text>

  //                 {/* {item.Support_Document == '' ? null : (
  //                   <TouchableOpacity
  //                     onPress={() => {
  //                       this.props.navigation.navigate('ImageView', {
  //                         Support_Document: item.Support_Document,
  //                       });
  //                     }}>
  //                     <Text
  //                       style={[
  //                         styles.Title,
  //                         Utils.fontStyle.TextSemiBold,
  //                         {
  //                           color: Utils.color.HeaderColor,
  //                           alignSelf: 'flex-end',
  //                           marginRight: 15,
  //                           fontSize: 12,
  //                           marginTop: 10,
  //                           marginBottom: 10,
  //                         },
  //                       ]}>
  //                       View Document
  //                     </Text>
  //                   </TouchableOpacity>
  //                 )} */}
  //               </View>
  //               {item.Status !== 'Rejected' &&
  //                 item.Status !== 'Approved' &&
  //                 item.Status !== 'Cancel' ? (
  //                 <View
  //                   style={{
  //                     marginTop: 10,
  //                     marginBottom: 10,
  //                     flexDirection: 'row',
  //                   }}>
  //                   <TouchableOpacity
  //                     onPress={() =>
  //                       this.setState({
  //                         sideModalcomment: true,
  //                         RejectTransid: item.TransId,
  //                       })
  //                     }>
  //                     <Image
  //                       source={Utils.icons.Reject}
  //                       style={{ marginLeft: 10 }}
  //                     />
  //                   </TouchableOpacity>
  //                   <TouchableOpacity
  //                     onPress={() => {
  //                       this.setState({
  //                         Approvalbutton: true,
  //                         TTransid: item.TransId,
  //                       });
  //                       // alert(item.TransId);
  //                     }}>
  //                     <Image source={Utils.icons.Approvedd} style={{}} />
  //                   </TouchableOpacity>
  //                 </View>
  //               ) : null}
  //             </View>
  //           ) : (
  //             <TouchableOpacity
  //               style={{ alignSelf: 'center' }}
  //               onPress={() => {
  //                 this.setState({ ViewCard: true, 
  //                   approvedIndex: index });
  //               }}>
  //               <View
  //                 style={{
  //                   flexDirection: 'row',
  //                   justifyContent: 'space-between',
  //                   marginTop: 10,
  //                   paddingBottom: 10,
  //                 }}>

  //                 <View style={{ alignSelf: 'center' }}>
  //                   <Text
  //                     style={[
  //                       styles.Title,
  //                       Utils.fontStyle.TextSemiBold,
  //                       {
  //                         width: vw(230),
  //                         marginLeft: 15,
  //                         alignSelf: 'center',
  //                         fontSize: 16,
  //                       },
  //                     ]}>
  //                     {moment(item.AttendanceDate, "MM/DD/YYYY").format("MMM D, YYYY")}
  //                   </Text>
  //                   <Text
  //                     style={[
  //                       styles.Title,
  //                       Utils.fontStyle.TextSemiBold,
  //                       {
  //                         width: vw(230),
  //                         marginLeft: 15,
  //                         alignSelf: 'center',
  //                         fontSize: 16,
  //                       },
  //                     ]}>
  //                     {item.Name}
  //                   </Text>
  //                   <View style={{ alignSelf: "center", marginLeft: 12 }}>
  //                     <Text
  //                       style={[
  //                         styles.Title,
  //                         Utils.fontStyle.TextSemiBold,
  //                         { width: vw(230), fontSize: 12, marginTop: 10 },
  //                       ]}>
  //                       {moment(item.FromDate).format('ll')}-
  //                       {moment(item.ToDate).format('ll')}
  //                     </Text>
  //                   </View>
  //                   <Text
  //                     style={[
  //                       styles.Title,
  //                       Utils.fontStyle.FontFamilyRegular,
  //                       {
  //                         width: vw(230),
  //                         marginLeft: 15,
  //                         alignSelf: 'center',
  //                         fontSize: 12,
  //                       },
  //                     ]}>
  //                     {item.LeaveName}
  //                   </Text>
  //                 </View>
  //                 {/* <Image
  //                   source={""}
  //                   style={{ alignSelf: 'center', marginRight: 10 }}
  //                 /> */}
  //                 {/* {item.Status == 'Approved' ? (
  //                   <Image
  //                     source={Utils.icons.gted}
  //                     style={{alignSelf: 'center', marginRight: 10}}
  //                   />
  //                 ) : (
  //                   <View>
  //                     {item.Status == 'Rejected' ? (
  //                       <Image
  //                         source={Utils.icons.Rted}
  //                         style={{alignSelf: 'center', marginRight: 10}}
  //                       />
  //                     ) : (
  //                       <Image
  //                         source={Utils.icons.Vectoyellooo}
  //                         style={{alignSelf: 'center', marginRight: 10}}
  //                       />
  //                     )}
  //                   </View>
  //                 )} */}
  //                 {item.Status == 'Approved' ? (
  //                   <Image
  //                     source={Utils.icons.gted}
  //                     style={{ alignSelf: 'center', marginRight: 10 }}
  //                   />
  //                 ) : (
  //                   <View>
  //                     {item.Status == 'Rejected' ? (
  //                       <Image
  //                         source={Utils.icons.Rted}
  //                         style={{ alignSelf: 'center', marginRight: 10 }}
  //                       />
  //                     ) : (
  //                       <View style={{}}>
  //                         {item.Status == 'Cancel' ? (
  //                           <Image
  //                             source={Utils.icons.Canle}
  //                             style={{
  //                               alignSelf: 'center',
  //                               marginRight: 10,
  //                               // tintColor: 'red',
  //                             }}
  //                           />
  //                         ) : (
  //                           <View style={{ flexDirection: 'row' }}>
  //                             <Image
  //                               source={Utils.icons.Vectoyellooo}
  //                               style={{
  //                                 alignSelf: 'center',
  //                                 marginRight: 10,
  //                               }}
  //                             />
  //                           </View>
  //                         )}
  //                       </View>
  //                     )}
  //                   </View>
  //                 )}
  //               </View>
  //             </TouchableOpacity>
  //           )}
  //         </View>
  //       </View>
  //     );
  //   }
}



export default withMyHook(RegularizationApproval);
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
