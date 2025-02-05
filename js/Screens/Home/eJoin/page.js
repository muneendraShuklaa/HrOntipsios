import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
  PermissionsAndroid,
  ScrollViewBase,
} from 'react-native';
import React, {Component} from 'react';
import utils from '../../../Utils';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withMyHook} from '../../../Utils/Dark';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import SignatureCanvas from 'react-native-signature-canvas';
import {EjoinPageHelper} from './helper';
import moment from 'moment';
// import RNFetchBlob from 'react-native-fetch-blob';
// const base64 = RNFetchBlob.base64;

const handleClear = () => {
  console.log('clear success!');
};

export default class eJoin extends Component {
  constructor(props) {
    super(props);
    this.signatureRef = React.createRef();

    this.state = {
      TaskName: 'Hr policy',
      sideModalImageDoc: false,
      uploadDocInfo: null,
      Docdata: [],
      sign: false,
      cardDownload: [
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
      ],
      cardDeatils: [
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
        {
          date: 'Apr 22, 2023',
          title: 'Document.Pdf',
        },
      ],
      AddSign: false,
      Logout: false,
      // selectedDocument: '',
      // DocumentPicker: '',
    };
    this.helper = new EjoinPageHelper(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps?.taskData?.TaskId !== this?.props?.taskData?.TaskId) {
      console.log('first');
      this.helper.DocUploadDownload(this.props.taskData);
    }
  }

  saveSignature = async () => {
    if (this.signatureRef) {
      const base64Data = this.signatureRef.current.getData();
      console.log('base64Data', base64Data);
      this.setState({signature: base64Data});
    }
    // console.log(base64Data, 'ggggg');
    console.log(this.signatureRef.current.getData, 'ggggg');
  };
  //   };
  takeScreenshot = () => {
    ImagePicker.openPicker({
      width: vw(300),
      height: vh(400),
      // multiple: true,
      // cropping: true,
      // includeBase64: true
    })
      .then(imageUrl => {
        // let tmpArr = this.state.imageArray2
        // tmpArr.push(imageUrl.path)
        console.warn(imageUrl.path);
        // this.setState({ imageArray2: tmpArr })
        // this.setState({imageArray2: imageUrl.path});
        this.img_ipdate({
          uri: imageUrl.path,
          type: imageUrl.mime,
          name: imageUrl?.path?.split('/').at(-1),
        });
        // console.warn(this.state.imageArray.path)
      })
      .catch(e => {
        console.log(e);
        // Alert.alert(e.message ? e.message : e);
      });
  };

  img_ipdate(uploadDoc) {
    this.helper
      .uploadSingleDoc(this.props.taskData, this.state.uploadDocInfo, uploadDoc)
      .then(_ => {
        setTimeout(() => {
          this.props.refreshData();
          this.helper.DocUploadDownload(this.props.taskData);
        }, 1000);
      });
  }
  pickSingleWithCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      // includeBase64: true
    })
      .then(imageUrl => {
        this.setState({imageArray2: imageUrl.path});
        this.img_ipdate({
          uri: imageUrl.path,
          type: imageUrl.mime,
          name: imageUrl?.path?.split('/').at(-1),
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }
  handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      console.log('result', result);
      this.img_ipdate({
        uri: result[0].uri,
        type: result[0].type,
        name: result[0]?.name,
      });
      // this.setState({selectedDocument: result[0].uri});
      // alert(' Document File  Added Succesfully');

      // Do something with the picked document, e.g., upload it or display its contents.
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        throw err;
      }
    }
  };
  actualDownload = item => {
    // const {dirs} = RNFetchBlob.fs;
    // RNFetchBlob.config({
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     mediaScannable: true,
    //     title: `HronTips.pdf`,
    //     path: `${dirs.DownloadDir}/test.pdf`,
    //   },
    // })
    //   .fetch('GET', DocumentBase64, base64.encode('foo'), 'base64')
    //   .then(res => {
    //     console.log('The file saved to ', res.path());
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

    let pdfLocation = RNFetchBlob.fs.dirs.DownloadDir + '/' + item.Document;
    console.log('pdfLocation', item);
    RNFetchBlob.fs
      .writeFile(pdfLocation, item.DocumentBase64, 'base64')
      .then(_ => {
        alert('File Downloaded successfully.');
        console.log('DOWNLOAD', _);
        console.log(_);
      })
      .catch(console.log);
  };
  //DocumentBase64
  permissionFunc = async item => {
    if (Platform.OS == 'ios') {
      this.actualDownload(item);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.actualDownload(item);
        } else {
          // showSnackbar('You need to give storage permission to download the file');
          Alert.alert(
            'You need to give storage permission to download the file',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  renderItemdownload(item, index) {
    if (item.DocumentType == 'D') {
      return (
        <View
          style={{
            height: 60,
            width: '98%',
            marginBottom: vh(10),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View style={styles.shadowView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  height: 60,
                  marginLeft: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={utils.icons.ring}
                  style={{alignSelf: 'center'}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 20,
                  }}>
                  <Text
                    style={[
                      styles.Title,
                      utils.fontStyle.TextSemiBold,
                      {fontSize: 16, color: utils.color.textColor},
                    ]}>
                    {item.DocumentName}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  this.permissionFunc(item);
                  // alert('In progress');
                }}>
                <Image
                  source={utils.icons.Download}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  renderItemUpload(item, index) {
    if (item.DocumentType == 'U') {
      return (
        <View
          style={{
            height: 60,
            width: '100%',
            marginBottom: vh(10),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View style={styles.shadowView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  height: 60,
                  marginLeft: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                {item.DocumentBase64 == '' ? (
                  <Image
                    source={utils.icons.ring}
                    style={{alignSelf: 'center'}}
                  />
                ) : (
                  <Image
                    source={utils.icons.Tick}
                    style={{alignSelf: 'center'}}
                  />
                )}

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 20,
                  }}>
                  <Text
                    style={[
                      styles.Title,
                      utils.fontStyle.TextSemiBold,
                      {fontSize: 16, color: utils.color.textColor},
                    ]}>
                    {item.DocumentName}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  this.setState({
                    sideModalImageDoc: true,
                    uploadDocInfo: item,
                  });
                }}>
                <Image
                  source={utils.icons.uploadd}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
  // Done() {
  //   navigation.navigate('Done');
  // }
  renderWidget(key, value, keyy) {
    if (key == 'TaskName') {
      return (
        <View>
          <Text
            style={[
              styles.Title,
              utils.fontStyle.TextSemiBold,
              {fontSize: 22, color: '#3083EF', marginBottom: 10},
            ]}>
            {value}
          </Text>
        </View>
      );
    }

    if (key == 'TaskDesc') {
      return (
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: 10,
          }}>
          <Text
            style={[
              styles.Title,
              utils.fontStyle.FontFamilyRegular,
              {padding: 20, color: '#000'},
            ]}>
            {value}
          </Text>
        </View>
      );
    }
    if (key == 'ViewDocument' && value == true) {
      return (
        <View style={{marginTop: 20}}>
          <Text
            style={[
              styles.Title,
              utils.fontStyle.TextSemiBold,
              {fontSize: 20, color: '#3083EF'},
            ]}>
            Key Company Policies and Agreements
          </Text>
          <View
            style={{
              marginTop: 20,
              borderRadius: 15,
            }}>
            {this.state?.Docdata?.map?.((doc, index) => {
              return (
                <View key={index.toString()}>
                  {this.renderItemdownload(doc, index)}
                </View>
              );
            })}
          </View>
        </View>
      );
    }
    if (key == 'EmployeeUpload' && value == true) {
      const {taskData} = this.props;

      return (
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={[
              styles.Title,
              utils.fontStyle.TextSemiBold,
              {fontSize: 20, color: '#3083EF'},
            ]}>
            Upload Required Documents
          </Text>
          <View
            style={{
              // backgroundColor: '#fff',
              marginTop: 20,
              borderRadius: 15,
            }}>
            {this.state.Docdata?.map((doc, index) => {
              return (
                <View key={index.toString()}>
                  {this.renderItemUpload(doc, index)}
                </View>
              );
            })}
          </View>
        </View>
      );
    }

    if (key == 'eSign' && value == true) {
      return (
        <View>
          <TouchableOpacity
            style={{marginBottom: 200}}
            onPress={() => {
              this.setState({AddSign: true, uploadDocInfo: null});
            }}>
            <Image
              source={utils.icons.sign}
              style={{
                alignSelf: 'center',
                marginTop: 30,
                height: 42,
                width: 360,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    }
    if (key == 'SignDate' && value !== null) {
      return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#AFAFAF',
              height: 80,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              width: '98.5%',
              marginBottom: 100,
              marginTop: 20,
            }}
            onPress={() => {
              // this.setState({AddSign: true});
            }}>
            <Text
              style={[
                utils.fontStyle.TextSemiBold,
                {color: '#000'},
                {textAlign: 'center', fontSize: 22},
              ]}>
              Signed On
            </Text>
            <Text
              style={[
                utils.fontStyle.TextSemiBold,
                {color: '#000'},
                {textAlign: 'center', fontSize: 16},
              ]}>
              {moment(value).add(5, 'h').add(30, 'm').format('lll')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    const {taskData} = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            gap: 20,
          }}>
          {Object.keys(taskData)
            .sort((a, b) => {
              const indexA = mapOrder.indexOf(a);
              const indexB = mapOrder.indexOf(b);
              return indexA - indexB;
            })
            .map(key => {
              return (
                <View key={key}>{this.renderWidget(key, taskData[key])}</View>
              );
            })}
        </ScrollView>
        <Modal key={'ESigin'} isVisible={this.state.AddSign}>
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
                source={utils.icons.Group}
                style={{alignSelf: 'center', marginTop: 20}}
              />
            </View>
            <View style={{margin: 15}}>
              <Text
                style={[
                  utils.fontStyle.FontFamilyExtraBold,
                  {color: '#000', marginBottom: 10},
                ]}>
                Signature
              </Text>
              <View style={{borderWidth: 1, height: 300}}>
                <SignatureCanvas
                  ref={this.signatureRef}
                  onClear={handleClear}
                  // onOK={this.saveSignature}
                  // onOK={this.saveSignature}
                  onOK={data => {
                    this.helper
                      .uploadSingleDoc(taskData, null, data)
                      .then(() => {
                        this.props.refreshData();
                      });
                  }}
                  // You can customize the canvas size and other options here
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.signatureRef.current.readSignature();
                    this.setState({AddSign: false, sign: true});
                  }}
                  style={[styles.ButtonView, {marginTop: 20, width: '47%'}]}>
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
                      Save
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.signatureRef.current.clearSignature();
                    // this.setState({AddSign: false});
                  }}
                  style={[styles.ButtonView, {marginTop: 20, width: '47%'}]}>
                  <ImageBackground
                    imageStyle={{borderRadius: 5, tintColor: '#afafaf'}}
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
                      Clear
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.Logout}>
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
                    color: '#000',
                    marginBottom: 10,
                    fontSize: 30,
                  },
                ]}>
                Are you sure want to logout?...
              </Text>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.removeItem('Answer1');
                  AsyncStorage.removeItem('IsAuthenticated');
                  setTimeout(() => {
                    this.props.navigation.navigate('Login'),
                      this.setState({Logout: false});
                  }, 100);
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

        <Modal
          isVisible={this.state.sideModalImageDoc}
          animationIn="zoomInDown"
          animationOut="bounceOutDown"
          onDismiss={() => {
            this.setState({
              sideModalImageDoc: false,
            });
          }}
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
                borderColor: '#fff',
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
                        color: '#000',
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
                    this.handlePickDocument(),
                      this.setState({sideModalImageDoc: false});
                  }}>
                  <Icon
                    name="file-pdf-o"
                    size={30}
                    color="#3C97FF"
                    style={{alignSelf: 'center', marginLeft: '5%'}}
                  />
                  <Text
                    style={[
                      utils.fontStyle.FontFamilyBold,
                      {
                        color: '#000',
                        marginBottom: 10,
                        alignSelf: 'center',
                      },
                    ]}>
                    Pdf
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
                        color: '#000',
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
                    color="#3C97FF"
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
                        color: '#000',
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
      </View>
    );
  }
}

const mapOrder = [
  'TaskName',
  'TaskDesc',
  'ViewDocument',
  'EmployeeUpload',
  'eSign',
  'SignDate',
];

const styles = StyleSheet.create({
  Title: {
    color: '#000',
  },
  shadowView: {
    height: vh(70),
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F2FAFF',
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
