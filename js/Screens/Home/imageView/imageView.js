import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import utils from '../../../Utils';
import {withMyHook} from '../../../Utils/Dark';
import {vh, vw, normalize} from '../../../Utils/dimentions';

import ImageHelper from './helper';
import {SafeAreaView} from 'react-native-safe-area-context';
class imageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SupportDocument: this.props.route.params.Support_Document,
      Imagee: '',
    };
    this.helper = new ImageHelper(this);
  }

  componentDidMount() {
    this.helper.Imagegeg();
    setTimeout(() => {
      // alert("Task Image Added Succesfully")
      this.setState({SupportDocument: 'test'});
    }, 4000);
    // alert(this.state.SupportDocument);
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: utils.color.HeaderColor,
            height: vh(55),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={utils.icons.Back}
              style={{alignSelf: 'center', tintColor: '#fff', marginLeft: 20}}
            />
            {/* <Icon name="long-arrow-left" size={20} color="#fff" style={{ alignSelf: 'center', marginLeft: 20, }} /> */}
            <Text
              style={[
                utils.fontStyle.TextTitleBold,
                {
                  color: '#fff',
                  alignSelf: 'center',
                  textAlign: 'left',
                  marginLeft: 20,
                },
              ]}>
              Uploaded Document{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          {/* <Image source={{ uri: this.state.imageArray2 }} style={{height: vh(57), width: vw(67),}} /> */}

          {/* {this.state.Imagee == '' ? (
            <Text
              style={[
                utils.fontStyle.FontFamilyExtraBold,
                {
                  color: '#3083EF',
                  alignSelf: 'center',
                },
              ]}>
              Document not available
            </Text>
          ) : ( */}
          <Image
            // source={utils.icons.imagebackGround1}
            source={{
              uri: `data:image/jpg;base64,${this.state.Imagee}`,
            }}
            style={{
              height: vh(703),
              width: vw(397),
              borderRadius: 7,
              // marginLeft: -8,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
          {/* )} */}
        </View>
      </SafeAreaView>
    );
  }
}
export const ImageView = withMyHook(imageView);
const styles = StyleSheet.create({});
