import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import Page from './page';
import {withMyHook} from '../../../Utils/Dark';
import EjoinHelper from './helper';
import utils from '../../../Utils';
import Modal from 'react-native-modal';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';/ 
import {StackActions} from '@react-navigation/native';
class eJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logout: false,
      data: [],
      pageIndex: 0,
    };
    this.helper = new EjoinHelper(this);
  }
  componentDidMount() {
    this.helper.EjoinBalance();
  }

  render() {
    console.log('Rendering', this.state.data);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: this.props.themeColor.theameColorEjoin,
        }}>
        <View style={{flexDirection: 'row'}}>
          <ImageBackground
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              height: 60,
              width: '100%',
            }}
            source={utils.icons.buttonn}>
            <Image
              source={utils.icons.hrontips}
              style={{alignSelf: 'center', marginLeft: 20}}
            />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                this.setState({Logout: true});
              }}>
              <Image
                source={utils.icons.Grouplogout}
                style={{alignSelf: 'center', marginRight: 20}}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {!!this.state?.data?.length &&
          !!this.state.data?.[this.state.pageIndex] && (
            <Page
              taskData={this.state.data[this.state.pageIndex]}
              refreshData={this.helper.EjoinBalance}
            />
          )}

        <TouchableOpacity
          onPress={() => {
            const lastIndex = this.state.data.length - 1;
            if (this.state.pageIndex === lastIndex) {
              this.props.navigation.navigate('Done');
              return;
            }
            if (this.state.pageIndex < lastIndex) {
              this.setState({
                pageIndex: this.state.pageIndex + 1,
              });
            }
          }}
          style={{
            position: 'absolute',
            bottom: 30,

            right: 10,
          }}>
          <Image
            source={utils.icons.arrow}
            style={{
              alignSelf: 'flex-end',
              //   backgroundColor: 'white',
            }}
          />
        </TouchableOpacity>
        <Modal isVisible={this.state.Logout}>
          <View
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: this.props.themeColor.theameColor,
              borderColor: '#fff',
              borderWidth: 2,
              borderRadius: 30,
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                backgroundColor: this.props.themeColor.theameColor,
                borderColor: '#fff',
                borderWidth: 2,
                marginTop: -50,
                alignSelf: 'center',
              }}>
              <Image
                source={utils.icons.Groupllot}
                style={{alignSelf: 'center', marginTop: 20}}
              />
            </View>
            <View style={{margin: 15}}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {
                    textAlign: 'center',
                    color: this.props.themeColor.textColor,
                    marginBottom: 10,
                    fontSize: 30,
                  },
                ]}>
                Are you sure want to logout?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.removeItem('Answer1');
                  AsyncStorage.removeItem('IsAuthenticated');
                  setTimeout(() => {
                    this.props.navigation.dispatch(
                      StackActions.replace('AuthStack'),
                    );
                    this.setState({Logout: false});
                  }, 200);
                }}
                style={[styles.ButtonView, {marginTop: 20}]}>
                <ImageBackground
                  imageStyle={{borderRadius: 5}}
                  style={{
                    height: 37,
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}
                  source={utils.icons.buttonn}>
                  <Text
                    style={[
                      utils.fontStyle.TextSemiBold,
                      {color: '#fff'},
                      {textAlign: 'center', fontSize: 20},
                    ]}>
                    LogOut
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({Logout: false});
                }}
                style={[styles.ButtonView, {marginTop: 10}]}>
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
                      {textAlign: 'center', fontSize: 20},
                    ]}>
                    Cancel
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export const EJoin = withMyHook(eJoin);
const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    height: vh(70),
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#e9efff',
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
const mockData = [
  {
    TaskId: 1,
    EmpId: 'JHT020',
    Seq: 1,
    EmpTask: 'Task1',
    EmployeeUpload: true,
    ViewDocument: false,
    eSign: true,
    SignDate: '2023-11-15T12:30:43.753',
    TaskName: 'Tasks1',
    TaskDesc: 'Tasks1',
  },
  {
    TaskId: 2,
    EmpId: 'JHT020',
    Seq: 2,
    EmpTask: 'Jsimple',
    EmployeeUpload: true,
    ViewDocument: false,
    eSign: true,
    SignDate: null,
    TaskName: 'Jsimple Policy',
    TaskDesc: 'Jsimple Policy Description',
  },
  {
    TaskId: 3,
    EmpId: 'JHT020',
    Seq: 3,
    EmpTask: 'Hrontips',
    EmployeeUpload: true,
    ViewDocument: true,
    eSign: false,
    SignDate: null,
    TaskName: 'Hrontips Policy 2',
    TaskDesc: 'Hrontips Policy 2 Documents',
  },
  {
    TaskId: 4,
    EmpId: 'JHT020',
    Seq: 4,
    EmpTask: 'Hrontips Tasks',
    EmployeeUpload: true,
    ViewDocument: true,
    eSign: false,
    SignDate: null,
    TaskName: 'Hrontips Tasks',
    TaskDesc: 'Hrontips Tasks',
  },
];
// onOK={data => {
//     console.log('MAIN DATA', data);
//   }}

// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Button,
//   ImageBackground,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {WebView} from 'react-native-webview';
// import utils from '../../../Utils';
// import {Header} from '../../../Components/Header';
// import {withMyHook} from '../../../Utils/Dark';
// import {vh, vw, normalize} from '../../../Utils/dimentions';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-crop-picker';
// import DocumentPicker from 'react-native-document-picker';
// import SignatureCanvas from 'react-native-signature-canvas';
// import EjoinHelper from './helper';
// import {SafeAreaView} from 'react-native-safe-area-context';

// class ejoin extends Component {
//   constructor(props) {
//     super(props);
//     this.signatureRef = React.createRef();

//     this.state = {
//       AddSign: false,
//       Logout: false,
//       imageArray2: '',
//       sideModalImageDoc: false,
//       DocumentPicker: '',
//       signature: '',

//       cardDeatils: [
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//       ],
//       cardDownload: [
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//       ],
//       TaskName: '',
//       ViewDocument: '',
//       EmployeeUpload: '',
//       eSign: '',
//     };
//     // this.signatureRef = null;
//     this.helper = new EjoinHelper(this);
//   }
//   saveSignature = async base64Data => {
//     this.setState({signature: base64Data});
//   };
//   takeScreenshot = () => {
//     ImagePicker.openPicker({
//       width: vw(300),
//       height: vh(400),
//       // multiple: true,
//       // cropping: true,
//       // includeBase64: true
//     })
//       .then(imageUrl => {
//         // let tmpArr = this.state.imageArray2
//         // tmpArr.push(imageUrl.path)
//         console.warn(imageUrl.path);
//         // this.setState({ imageArray2: tmpArr })
//         this.setState({imageArray2: imageUrl.path});
//         // this.img_ipdate()
//         // console.warn(this.state.imageArray.path)
//       })
//       .catch(e => {
//         console.log(e);
//         // Alert.alert(e.message ? e.message : e);
//       });
//   };
//   pickSingleWithCamera() {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       // cropping: true,
//       // includeBase64: true
//     })
//       .then(imageUrl => {
//         // let tmpArr = this.state.imageArray2
//         // tmpArr.push(imageUrl.path)
//         // console.warn(imageUrl.path)
//         this.setState({imageArray2: imageUrl.path});
//         // this.img_ipdate()
//       })
//       .catch(e => {
//         console.log(e);
//         Alert.alert(e.message ? e.message : e);
//       });
//   }
//   handlePickDocument = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         // type: [DocumentPicker.types.allFiles],
//         type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//       });
//       this.setState({selectedDocument: result[0].uri});
//       alert('Transaction Pdf Added Succesfully');
//       console.log(
//         result[0].uri,
//         result[0].type, // mime type
//         result[0].name,
//         result[0].size,
//       );

//       // Do something with the picked document, e.g., upload it or display its contents.
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User canceled the document picker
//       } else {
//         throw err;
//       }
//     }
//   };
//   componentDidMount() {
//     this.helper.EjoinBalance();
//   }
//   render() {
//     return (
//       <SafeAreaView style={{flex: 1, backgroundColor: '#E4F5FF'}}>
//         <ScrollView>
//           <View style={{flex: 1, backgroundColor: '#fff'}}>
//             <TouchableOpacity style={{flexDirection: 'row'}}>
//               <ImageBackground
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   height: 60,
//                   width: '100%',
//                 }}
//                 source={utils.icons.buttonn}>
//                 <Image
//                   source={utils.icons.hrontips}
//                   style={{alignSelf: 'center', marginLeft: 20}}
//                 />
//                 <TouchableOpacity
//                   style={{alignSelf: 'center'}}
//                   onPress={() => {
//                     this.setState({Logout: true});
//                   }}>
//                   <Image
//                     source={utils.icons.Grouplogout}
//                     style={{alignSelf: 'center', marginRight: 20}}
//                   />
//                 </TouchableOpacity>
//               </ImageBackground>
//               {/* <Image
//             source={{ uri: `data:image/png;base64,${this.state.signature}` }}
//             style={{ width: 200, height: 100 ,backgroundColor:'red'}}
//           /> */}
//             </TouchableOpacity>

//             <View
//               style={{
//                 height: '100%',
//                 width: '100%',
//                 backgroundColor: '#E4F5FF',
//                 padding: 20,
//               }}>
//               <Text
//                 style={[
//                   styles.Title,
//                   utils.fontStyle.TextSemiBold,
//                   {fontSize: 22, color: '#003982', marginBottom: 10},
//                 ]}>
//                 {this.state.TaskName}
//               </Text>

//               <View
//                 style={{
//                   backgroundColor: '#fff',
//                   height: 'auto',
//                   width: '100%',
//                   borderRadius: 5,
//                 }}>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.FontFamilyRegular,
//                     {padding: 20, color: '#000'},
//                   ]}>
//                   We understand the importance of maintaining a healthy
//                   work-life balance and recognize that employees may require
//                   time off for various personal and professional reasons. This
//                   Leave Policy is designed to provide guidelines and procedures
//                   for requesting and taking leaves.
//                 </Text>
//               </View>
//               {this.state.ViewDocument == true ? (
//                 <View>
//                   <Text
//                     style={[
//                       styles.Title,
//                       utils.fontStyle.TextSemiBold,
//                       {fontSize: 20, color: '#003982', marginTop: 10},
//                     ]}>
//                     Download HR Policy
//                   </Text>
//                   <View
//                     style={{
//                       backgroundColor: '#fff',
//                       height: 'auto',
//                       width: '100%',
//                       marginTop: 20,
//                       borderRadius: 5,
//                     }}>
//                     <FlatList
//                       style={{marginTop: vh(10), padding: 20}}
//                       showsHorizontalScrollIndicator={false}
//                       data={this.state.cardDeatils}
//                       keyExxtractor={(item, index) => index.toString}
//                       renderItem={({item, index}) =>
//                         this.renderItem(item, index)
//                       }
//                     />
//                   </View>
//                 </View>
//               ) : null}
//               {this.state.EmployeeUpload == true ? (
//                 <View>
//                   <Text
//                     style={[
//                       styles.Title,
//                       utils.fontStyle.TextSemiBold,
//                       {fontSize: 20, color: '#003982', marginTop: 20},
//                     ]}>
//                     Upload Documents
//                   </Text>
//                   <View
//                     style={{
//                       backgroundColor: '#fff',
//                       height: 'auto',
//                       width: '100%',
//                       marginTop: 20,
//                       borderRadius: 5,
//                     }}>
//                     <FlatList
//                       style={{marginTop: vh(10), padding: 20}}
//                       showsHorizontalScrollIndicator={false}
//                       data={this.state.cardDownload}
//                       keyExxtractor={(item, index) => index.toString}
//                       renderItem={({item, index}) =>
//                         this.renderItemdownload(item, index)
//                       }
//                     />
//                   </View>
//                 </View>
//               ) : null}
//               {this.state.eSign == true ? (
//                 <TouchableOpacity
//                   onPress={() => {
//                     this.setState({AddSign: true});
//                   }}>
//                   <Image
//                     source={utils.icons.sign}
//                     style={{
//                       alignSelf: 'center',
//                       marginTop: 30,
//                       height: 42,
//                       width: 360,
//                     }}
//                   />
//                 </TouchableOpacity>
//               ) : null}
//               <TouchableOpacity
//                 onPress={() => {
//                   this.props.navigation.navigate('Done');
//                 }}>
//                 <Image
//                   source={utils.icons.arrow}
//                   style={{alignSelf: 'flex-end', marginTop: 20}}
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* <FlatList
//                                 style={{ marginTop: vh(10), height:"100%" ,paddingLeft:20,paddingRight:20}}
//                                 showsHorizontalScrollIndicator={false}
//                                 data={this.state.cardDeatils}
//                                 keyExxtractor={(item, index) => index.toString}
//                                 renderItem={({ item, index }) => this.renderItem(item, index)}
//                             /> */}

//             <Modal isVisible={this.state.AddSign}>
//               <View
//                 style={{
//                   height: 'auto',
//                   width: '100%',
//                   backgroundColor: '#fff',
//                   borderRadius: 30,
//                 }}>
//                 <View
//                   style={{
//                     height: 100,
//                     width: 100,
//                     borderRadius: 100,
//                     backgroundColor: '#fff',
//                     marginTop: -50,
//                     alignSelf: 'center',
//                   }}>
//                   <Image
//                     source={utils.icons.Group}
//                     style={{alignSelf: 'center', marginTop: 20}}
//                   />
//                 </View>
//                 <View style={{margin: 15}}>
//                   <Text
//                     style={[
//                       utils.fontStyle.FontFamilyExtraBold,
//                       {color: '#000', marginBottom: 10},
//                     ]}>
//                     Signature
//                   </Text>
//                   <View style={{borderWidth: 1, height: 300}}>
//                     <SignatureCanvas
//                       ref={this.signatureRef}
//                       // onOK={this.saveSignature}
//                       onOK={this.saveSignature}
//                       // You can customize the canvas size and other options here
//                     />
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.signatureRef.current.readSignature();
//                     }}
//                     style={[styles.ButtonView, {marginTop: 20}]}>
//                     <ImageBackground
//                       imageStyle={{borderRadius: 5}}
//                       style={{
//                         height: 37,
//                         width: '100%',
//                         justifyContent: 'center',
//                         marginBottom: 20,
//                       }}
//                       source={utils.icons.buttonn}>
//                       <Text
//                         style={[
//                           utils.fontStyle.TextSemiBold,
//                           {color: '#fff'},
//                           {textAlign: 'center'},
//                         ]}>
//                         Save
//                       </Text>
//                     </ImageBackground>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//             <Modal isVisible={this.state.Logout}>
//               <View
//                 style={{
//                   height: 'auto',
//                   width: '100%',
//                   backgroundColor: '#fff',
//                   borderRadius: 30,
//                 }}>
//                 <View
//                   style={{
//                     height: 100,
//                     width: 100,
//                     borderRadius: 100,
//                     backgroundColor: '#fff',
//                     marginTop: -50,
//                     alignSelf: 'center',
//                   }}>
//                   <Image
//                     source={utils.icons.Group}
//                     style={{alignSelf: 'center', marginTop: 20}}
//                   />
//                 </View>
//                 <View style={{margin: 15}}>
//                   <Text
//                     style={[
//                       utils.fontStyle.FontFamilyExtraBold,
//                       {
//                         textAlign: 'center',
//                         color: '#000',
//                         marginBottom: 10,
//                         fontSize: 32,
//                       },
//                     ]}>
//                     Are you sure want to logout?
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => {
//                       this.props.navigation.navigate('Login'),
//                         this.setState({Logout: false});
//                     }}
//                     style={[styles.ButtonView, {marginTop: 20}]}>
//                     <ImageBackground
//                       imageStyle={{borderRadius: 5}}
//                       style={{
//                         height: 37,
//                         width: '100%',
//                         justifyContent: 'center',
//                         marginBottom: 20,
//                       }}
//                       source={utils.icons.buttonn}>
//                       <Text
//                         style={[
//                           utils.fontStyle.TextSemiBold,
//                           {color: '#fff'},
//                           {textAlign: 'center', fontSize: 20},
//                         ]}>
//                         LogOut
//                       </Text>
//                     </ImageBackground>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.setState({Logout: false});
//                     }}
//                     style={[styles.ButtonView, {marginTop: 10}]}>
//                     <ImageBackground
//                       imageStyle={{tintColor: '#A3A3A3', borderRadius: 5}}
//                       style={{
//                         height: 37,
//                         width: '100%',
//                         justifyContent: 'center',
//                         marginBottom: 20,
//                       }}
//                       source={utils.icons.buttonn}>
//                       <Text
//                         style={[
//                           utils.fontStyle.TextSemiBold,
//                           {color: '#fff'},
//                           {textAlign: 'center', fontSize: 20},
//                         ]}>
//                         Cancel
//                       </Text>
//                     </ImageBackground>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//             <Modal
//               isVisible={this.state.sideModalImageDoc}
//               animationIn="zoomInDown"
//               animationOut="bounceOutDown"
//               style={{}}>
//               <View
//                 style={{
//                   flex: 1,
//                   backgroundColor: utils.color.lightBackgroundGrey,
//                   justifyContent: 'flex-end',
//                 }}>
//                 <View
//                   style={{
//                     height: vh(180),
//                     width: '100%',
//                     borderWidth: 1,
//                     borderColor: this.props.themeColor.border,
//                     backgroundColor: '#fff',
//                     borderTopRightRadius: 30,
//                     borderTopLeftRadius: 30,
//                   }}>
//                   <Text
//                     style={[
//                       utils.fontStyle.FontFamilyBold,
//                       {
//                         color: '#000',
//                         marginTop: 10,
//                         textAlign: 'center',
//                         color: '#3C97FF',
//                       },
//                     ]}>
//                     Upload Document
//                   </Text>
//                   <View
//                     style={{
//                       marginTop: 5,
//                       flexDirection: 'row',
//                       paddingLeft: 30,
//                       paddingRight: 30,
//                       justifyContent: 'space-between',
//                     }}>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.pickSingleWithCamera(),
//                           this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="camera"
//                         size={30}
//                         color="#3C97FF"
//                         style={{alignSelf: 'center', marginLeft: '5%'}}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Camera
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.handlePickDocument(),
//                           this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="file-pdf-o"
//                         size={30}
//                         color="#3C97FF"
//                         style={{alignSelf: 'center', marginLeft: '5%'}}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Pdf
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.takeScreenshot(),
//                           this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="file-image-o"
//                         size={30}
//                         color="#3C97FF"
//                         style={{alignSelf: 'center', marginLeft: '5%'}}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Gallery
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="times-circle-o"
//                         size={30}
//                         color="#3C97FF"
//                         style={{
//                           alignSelf: 'center',
//                           marginLeft: '5%',
//                           color: 'grey',
//                         }}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Cancel
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
//   renderItem(item, index) {
//     return (
//       <View
//         style={{
//           height: 60,
//           width: '98%',
//           marginBottom: vh(10),
//           justifyContent: 'center',
//           alignSelf: 'center',
//         }}>
//         <View style={styles.shadowView}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <View
//               style={{
//                 height: 60,
//                 marginLeft: 10,
//                 justifyContent: 'center',
//                 flexDirection: 'row',
//               }}>
//               <Image source={utils.icons.ring} style={{alignSelf: 'center'}} />
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   marginLeft: 20,
//                 }}>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.TextSemiBold,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.title}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.FontFamilyRegular,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.date}
//                 </Text>
//               </View>
//             </View>
//             <Image
//               source={utils.icons.Download}
//               style={{alignSelf: 'center', marginRight: 10}}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
//   renderItemdownload(item, index) {
//     return (
//       <View
//         style={{
//           height: 60,
//           width: '98%',
//           marginBottom: vh(10),
//           justifyContent: 'center',
//           alignSelf: 'center',
//         }}>
//         <View style={styles.shadowView}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <View
//               style={{
//                 height: 60,
//                 marginLeft: 10,
//                 justifyContent: 'center',
//                 flexDirection: 'row',
//               }}>
//               <Image source={utils.icons.ring} style={{alignSelf: 'center'}} />
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   marginLeft: 20,
//                 }}>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.TextSemiBold,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.title}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.FontFamilyRegular,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.date}
//                 </Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               style={{alignSelf: 'center'}}
//               onPress={() => {
//                 this.setState({sideModalImageDoc: true});
//               }}>
//               <Image
//                 source={utils.icons.uploadd}
//                 style={{alignSelf: 'center', marginRight: 10}}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// export const EJoin = withMyHook(ejoin);
// const styles = StyleSheet.create({
//   Title: {
//     color: '#000',
//   },
//   shadowView: {
//     height: vh(70),
//     width: '100%',
//     borderRadius: 10,
//     backgroundColor: '#F2FAFF',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 4,
//   },
// });

// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Button,
//   ImageBackground,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {WebView} from 'react-native-webview';
// import utils from '../../../Utils';
// import {Header} from '../../../Components/Header';
// import {withMyHook} from '../../../Utils/Dark';
// import {vh, vw, normalize} from '../../../Utils/dimentions';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-crop-picker';
// import DocumentPicker from 'react-native-document-picker';
// import SignatureCanvas from 'react-native-signature-canvas';
// import EjoinHelper from './helper';
// import {SafeAreaView} from 'react-native-safe-area-context';

// class ejoin extends Component {
//   constructor(props) {
//     super(props);
//     this.signatureRef = React.createRef();

//     this.state = {
//       AddSign: false,
//       Logout: false,
//       imageArray2: '',
//       sideModalImageDoc: false,
//       DocumentPicker: '',
//       signature: '',

//       cardDeatils: [
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//       ],
//       cardDownload: [
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//         {
//           date: 'Apr 22, 2023',
//           title: 'Document.Pdf',
//         },
//       ],
//       TaskName: '',
//       ViewDocument: '',
//       EmployeeUpload: '',
//       eSign: '',
//     };
//     // this.signatureRef = null;
//     this.helper = new EjoinHelper(this);
//   }
//   saveSignature = async () => {
//     if (this.signatureRef) {
//       const base64Data = this.signatureRef.current.readSignature();
//       console.log('base64Data', base64Data);
//       this.setState({signature: base64Data});
//     }
//     console.log(this.state.signature, 'ggggg');
//     console.log(this.signatureRef, 'ggggg');
//   };
//   takeScreenshot = () => {
//     ImagePicker.openPicker({
//       width: vw(300),
//       height: vh(400),
//       // multiple: true,
//       // cropping: true,
//       // includeBase64: true
//     })
//       .then(imageUrl => {
//         // let tmpArr = this.state.imageArray2
//         // tmpArr.push(imageUrl.path)
//         console.warn(imageUrl.path);
//         // this.setState({ imageArray2: tmpArr })
//         this.setState({imageArray2: imageUrl.path});
//         // this.img_ipdate()
//         // console.warn(this.state.imageArray.path)
//       })
//       .catch(e => {
//         console.log(e);
//         // Alert.alert(e.message ? e.message : e);
//       });
//   };
//   pickSingleWithCamera() {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       // cropping: true,
//       // includeBase64: true
//     })
//       .then(imageUrl => {
//         // let tmpArr = this.state.imageArray2
//         // tmpArr.push(imageUrl.path)
//         // console.warn(imageUrl.path)
//         this.setState({imageArray2: imageUrl.path});
//         // this.img_ipdate()
//       })
//       .catch(e => {
//         console.log(e);
//         Alert.alert(e.message ? e.message : e);
//       });
//   }
//   handlePickDocument = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         // type: [DocumentPicker.types.allFiles],
//         type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//       });
//       this.setState({selectedDocument: result[0].uri});
//       alert('Transaction Pdf Added Succesfully');
//       console.log(
//         result[0].uri,
//         result[0].type, // mime type
//         result[0].name,
//         result[0].size,
//       );

//       // Do something with the picked document, e.g., upload it or display its contents.
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User canceled the document picker
//       } else {
//         throw err;
//       }
//     }
//   };
//   componentDidMount() {
//     this.helper.EjoinBalance();
//   }
//   render() {
//     return (
//       <SafeAreaView style={{flex: 1, backgroundColor: '#E4F5FF'}}>
//         <ScrollView>
//           <View style={{flex: 1, backgroundColor: '#fff'}}>
//             <TouchableOpacity style={{flexDirection: 'row'}}>
//               <ImageBackground
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   height: 60,
//                   width: '100%',
//                 }}
//                 source={utils.icons.buttonn}>
//                 <Image
//                   source={utils.icons.hrontips}
//                   style={{alignSelf: 'center', marginLeft: 20}}
//                 />
//                 <TouchableOpacity
//                   style={{alignSelf: 'center'}}
//                   onPress={() => {
//                     this.setState({Logout: true});
//                   }}>
//                   <Image
//                     source={utils.icons.Grouplogout}
//                     style={{alignSelf: 'center', marginRight: 20}}
//                   />
//                 </TouchableOpacity>
//               </ImageBackground>
//               {/* <Image
//             source={{ uri: `data:image/png;base64,${this.state.signature}` }}
//             style={{ width: 200, height: 100 ,backgroundColor:'red'}}
//           /> */}
//             </TouchableOpacity>

//             <View
//               style={{
//                 height: '100%',
//                 width: '100%',
//                 backgroundColor: '#E4F5FF',
//                 padding: 20,
//               }}>
//               <Text
//                 style={[
//                   styles.Title,
//                   utils.fontStyle.TextSemiBold,
//                   {fontSize: 22, color: '#003982', marginBottom: 10},
//                 ]}>
//                 {this.state.TaskName}
//               </Text>

//               <View
//                 style={{
//                   backgroundColor: '#fff',
//                   height: 'auto',
//                   width: '100%',
//                   borderRadius: 5,
//                 }}>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.FontFamilyRegular,
//                     {padding: 20, color: '#000'},
//                   ]}>
//                   We understand the importance of maintaining a healthy
//                   work-life balance and recognize that employees may require
//                   time off for various personal and professional reasons. This
//                   Leave Policy is designed to provide guidelines and procedures
//                   for requesting and taking leaves.
//                 </Text>
//               </View>
//               {this.state.ViewDocument == true ? (
//                 <View>
//                   <Text
//                     style={[
//                       styles.Title,
//                       utils.fontStyle.TextSemiBold,
//                       {fontSize: 20, color: '#003982', marginTop: 10},
//                     ]}>
//                     Download HR Policy
//                   </Text>
//                   <View
//                     style={{
//                       backgroundColor: '#fff',
//                       height: 'auto',
//                       width: '100%',
//                       marginTop: 20,
//                       borderRadius: 5,
//                     }}>
//                     <FlatList
//                       style={{marginTop: vh(10), padding: 20}}
//                       showsHorizontalScrollIndicator={false}
//                       data={this.state.cardDeatils}
//                       keyExxtractor={(item, index) => index.toString}
//                       renderItem={({item, index}) =>
//                         this.renderItem(item, index)
//                       }
//                     />
//                   </View>
//                 </View>
//               ) : null}
//               {
//                 this.state.EmployeeUpload == true ? (
//                   <View>
//                     <Text
//                       style={[
//                         styles.Title,
//                         utils.fontStyle.TextSemiBold,
//                         {fontSize: 20, color: '#003982', marginTop: 20},
//                       ]}>
//                       Upload Documents
//                     </Text>
//                     <View
//                       style={{
//                         backgroundColor: '#fff',
//                         height: 'auto',
//                         width: '100%',
//                         marginTop: 20,
//                         borderRadius: 5,
//                       }}>
//                       <FlatList
//                         style={{marginTop: vh(10), padding: 20}}
//                         showsHorizontalScrollIndicator={false}
//                         data={this.state.cardDownload}
//                         keyExxtractor={(item, index) => index.toString}
//                         renderItem={({item, index}) =>
//                           this.renderItemdownload(item, index)
//                         }
//                       />
//                     </View>
//                   </View>
//                 ) : null
//                 //   <Text>gggg</Text>
//               }
//               {this.state.eSign == true ? (
//                 <TouchableOpacity
//                   onPress={() => {
//                     this.setState({AddSign: true});
//                   }}>
//                   <Image
//                     source={utils.icons.sign}
//                     style={{
//                       alignSelf: 'center',
//                       marginTop: 30,
//                       height: 42,
//                       width: 360,
//                     }}
//                   />
//                 </TouchableOpacity>
//               ) : null}
//               <TouchableOpacity
//                 onPress={() => {
//                   this.props.navigation.navigate('Done');
//                 }}>
//                 <Image
//                   source={utils.icons.arrow}
//                   style={{alignSelf: 'flex-end', marginTop: 20}}
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* <FlatList
//                                 style={{ marginTop: vh(10), height:"100%" ,paddingLeft:20,paddingRight:20}}
//                                 showsHorizontalScrollIndicator={false}
//                                 data={this.state.cardDeatils}
//                                 keyExxtractor={(item, index) => index.toString}
//                                 renderItem={({ item, index }) => this.renderItem(item, index)}
//                             /> */}

//             <Modal isVisible={this.state.AddSign}>
//               <View
//                 style={{
//                   height: 'auto',
//                   width: '100%',
//                   backgroundColor: '#fff',
//                   borderRadius: 30,
//                 }}>
//                 <View
//                   style={{
//                     height: 100,
//                     width: 100,
//                     borderRadius: 100,
//                     backgroundColor: '#fff',
//                     marginTop: -50,
//                     alignSelf: 'center',
//                   }}>
//                   <Image
//                     source={utils.icons.Group}
//                     style={{alignSelf: 'center', marginTop: 20}}
//                   />
//                 </View>
//                 <View style={{margin: 15}}>
//                   <Text
//                     style={[
//                       utils.fontStyle.FontFamilyExtraBold,
//                       {color: '#000', marginBottom: 10},
//                     ]}>
//                     Signature
//                   </Text>
//                   <View style={{borderWidth: 1, height: 300}}>
//                     <SignatureCanvas
//                       ref={this.signatureRef}
//                       onOK={this.saveSignature}
//                       onGetData={data => {
//                         console.log('MAIN DATA', data);
//                       }}
//                       // onOk={data => {
//                       //          console.log('MAIN DATA', data);}
//                       // You can customize the canvas size and other options here
//                     />
//                     <Text>Signature Base64: {this.state.signature}</Text>
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.saveSignature();
//                       // this.setState({ AddSign: false })
//                     }}
//                     style={[styles.ButtonView, {marginTop: 20}]}>
//                     <ImageBackground
//                       imageStyle={{borderRadius: 5}}
//                       style={{
//                         height: 37,
//                         width: '100%',
//                         justifyContent: 'center',
//                         marginBottom: 20,
//                       }}
//                       source={utils.icons.buttonn}>
//                       <Text
//                         style={[
//                           utils.fontStyle.TextSemiBold,
//                           {color: '#fff'},
//                           {textAlign: 'center'},
//                         ]}>
//                         Save
//                       </Text>
//                     </ImageBackground>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//             <Modal isVisible={this.state.Logout}>
//               <View
//                 style={{
//                   height: 'auto',
//                   width: '100%',
//                   backgroundColor: '#fff',
//                   borderRadius: 30,
//                 }}>
//                 <View
//                   style={{
//                     height: 100,
//                     width: 100,
//                     borderRadius: 100,
//                     backgroundColor: '#fff',
//                     marginTop: -50,
//                     alignSelf: 'center',
//                   }}>
//                   <Image
//                     source={utils.icons.Group}
//                     style={{alignSelf: 'center', marginTop: 20}}
//                   />
//                 </View>
//                 <View style={{margin: 15}}>
//                   <Text
//                     style={[
//                       utils.fontStyle.FontFamilyExtraBold,
//                       {
//                         textAlign: 'center',
//                         color: '#000',
//                         marginBottom: 10,
//                         fontSize: 32,
//                       },
//                     ]}>
//                     Are you sure want to logout?
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => {
//                       this.props.navigation.navigate('Login'),
//                         this.setState({Logout: false});
//                     }}
//                     style={[styles.ButtonView, {marginTop: 20}]}>
//                     <ImageBackground
//                       imageStyle={{borderRadius: 5}}
//                       style={{
//                         height: 37,
//                         width: '100%',
//                         justifyContent: 'center',
//                         marginBottom: 20,
//                       }}
//                       source={utils.icons.buttonn}>
//                       <Text
//                         style={[
//                           utils.fontStyle.TextSemiBold,
//                           {color: '#fff'},
//                           {textAlign: 'center', fontSize: 20},
//                         ]}>
//                         LogOut
//                       </Text>
//                     </ImageBackground>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.setState({Logout: false});
//                     }}
//                     style={[styles.ButtonView, {marginTop: 10}]}>
//                     <ImageBackground
//                       imageStyle={{tintColor: '#A3A3A3', borderRadius: 5}}
//                       style={{
//                         height: 37,
//                         width: '100%',
//                         justifyContent: 'center',
//                         marginBottom: 20,
//                       }}
//                       source={utils.icons.buttonn}>
//                       <Text
//                         style={[
//                           utils.fontStyle.TextSemiBold,
//                           {color: '#fff'},
//                           {textAlign: 'center', fontSize: 20},
//                         ]}>
//                         Cancel
//                       </Text>
//                     </ImageBackground>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//             <Modal
//               isVisible={this.state.sideModalImageDoc}
//               animationIn="zoomInDown"
//               animationOut="bounceOutDown"
//               style={{}}>
//               <View
//                 style={{
//                   flex: 1,
//                   backgroundColor: utils.color.lightBackgroundGrey,
//                   justifyContent: 'flex-end',
//                 }}>
//                 <View
//                   style={{
//                     height: vh(180),
//                     width: '100%',
//                     borderWidth: 1,
//                     borderColor: this.props.themeColor.border,
//                     backgroundColor: '#fff',
//                     borderTopRightRadius: 30,
//                     borderTopLeftRadius: 30,
//                   }}>
//                   <Text
//                     style={[
//                       utils.fontStyle.FontFamilyBold,
//                       {
//                         color: '#000',
//                         marginTop: 10,
//                         textAlign: 'center',
//                         color: '#3C97FF',
//                       },
//                     ]}>
//                     Upload Document
//                   </Text>
//                   <View
//                     style={{
//                       marginTop: 5,
//                       flexDirection: 'row',
//                       paddingLeft: 30,
//                       paddingRight: 30,
//                       justifyContent: 'space-between',
//                     }}>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.pickSingleWithCamera(),
//                           this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="camera"
//                         size={30}
//                         color="#3C97FF"
//                         style={{alignSelf: 'center', marginLeft: '5%'}}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Camera
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.handlePickDocument(),
//                           this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="file-pdf-o"
//                         size={30}
//                         color="#3C97FF"
//                         style={{alignSelf: 'center', marginLeft: '5%'}}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Pdf
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.takeScreenshot(),
//                           this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="file-image-o"
//                         size={30}
//                         color="#3C97FF"
//                         style={{alignSelf: 'center', marginLeft: '5%'}}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Gallery
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={{flexDirection: 'column', marginTop: 15}}
//                       onPress={() => {
//                         this.setState({sideModalImageDoc: false});
//                       }}>
//                       <Icon
//                         name="times-circle-o"
//                         size={30}
//                         color="#3C97FF"
//                         style={{
//                           alignSelf: 'center',
//                           marginLeft: '5%',
//                           color: 'grey',
//                         }}
//                       />
//                       <Text
//                         style={[
//                           utils.fontStyle.FontFamilyBold,
//                           {
//                             color: this.props.themeColor.blackTitle,
//                             marginBottom: 10,
//                             alignSelf: 'center',
//                           },
//                         ]}>
//                         Cancel
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
//   renderItem(item, index) {
//     return (
//       <View
//         style={{
//           height: 60,
//           width: '98%',
//           marginBottom: vh(10),
//           justifyContent: 'center',
//           alignSelf: 'center',
//         }}>
//         <View style={styles.shadowView}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <View
//               style={{
//                 height: 60,
//                 marginLeft: 10,
//                 justifyContent: 'center',
//                 flexDirection: 'row',
//               }}>
//               <Image source={utils.icons.ring} style={{alignSelf: 'center'}} />
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   marginLeft: 20,
//                 }}>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.TextSemiBold,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.title}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.FontFamilyRegular,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.date}
//                 </Text>
//               </View>
//             </View>
//             <Image
//               source={utils.icons.Download}
//               style={{alignSelf: 'center', marginRight: 10}}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
//   renderItemdownload(item, index) {
//     return (
//       <View
//         style={{
//           height: 60,
//           width: '98%',
//           marginBottom: vh(10),
//           justifyContent: 'center',
//           alignSelf: 'center',
//         }}>
//         <View style={styles.shadowView}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <View
//               style={{
//                 height: 60,
//                 marginLeft: 10,
//                 justifyContent: 'center',
//                 flexDirection: 'row',
//               }}>
//               <Image source={utils.icons.ring} style={{alignSelf: 'center'}} />
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   marginLeft: 20,
//                 }}>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.TextSemiBold,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.title}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.Title,
//                     utils.fontStyle.FontFamilyRegular,
//                     {fontSize: 16, color: utils.color.textColor},
//                   ]}>
//                   {item.date}
//                 </Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               style={{alignSelf: 'center'}}
//               onPress={() => {
//                 this.setState({sideModalImageDoc: true});
//               }}>
//               <Image
//                 source={utils.icons.uploadd}
//                 style={{alignSelf: 'center', marginRight: 10}}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }
// export const EJoin = withMyHook(ejoin);
// const styles = StyleSheet.create({
//   Title: {
//     color: '#000',
//   },
//   shadowView: {
//     height: vh(70),
//     width: '100%',
//     borderRadius: 10,
//     backgroundColor: '#F2FAFF',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 4,
//   },
// });
