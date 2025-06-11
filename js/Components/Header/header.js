import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import utils from '../../Utils';
import {normalize, vh, vw} from '../../Utils/dimentions';
import styles from './styles';

class header extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('Props value is --------->', this.props);
    return (
      <View>
        {Platform.OS === 'ios' ? (
          <View
            style={[
              styles.container,
              {
                backgroundColor: this.props.isDark
                  ? '#000'
                  : utils.color.BackPagecolor,
              },
            ]}>
            <View style={[styles.titleContainer, {backgroundColor: 'transparent'}]}>
              <TouchableOpacity onPress={this.props.leftFunction}>
                <Image
                  // source={utils.icons.splashLogo}
                  source={this.props.lefticon}
                  style={[
                    styles.backIcon,
                    {tintColor: this.props.isDark ? '#FFF' : '#000'},
                  ]}
                />
              </TouchableOpacity>
              {/* <Text style={[utils.fontStyle.TextTitle,{justifyContent:'center',alignSelf:'center',textAlign:'justify',alignContent:'center'}]}>
                                {this.props.title}
                            </Text> */}
                               <Text
              style={[
                utils.fontStyle.TextTitle,
                {
                  marginTop: vh(0),
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  // color: this.props.isDark ? '#FFF' : '#000',
                },
              ]}>
              {this.props.title}
            </Text>
            </View>
         
            <View style={{flexDirection: 'row', marginLeft: '20%'}}>
              <TouchableOpacity
                onPress={this.props.rightFunctionality}
                style={{marginTop: vh(2)}}>
                <Image
                  source={this.props.rightIcon}
                  style={[styles.rightIcon, {}]}
                />
              </TouchableOpacity>
            </View>

          </View>
        ) : (
          <View style={[styles.container, {height: vh(60)}]}>
            <View style={[styles.titleContainer, {marginTop: 0}]}>
              <TouchableOpacity onPress={this.props.leftFunction}>
                <Image
                  source={this.props.lefticon}
                  style={[
                    styles.backIcon,
                    {tintColor: this.props.isDark ? '#fff' : 'grey'},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                utils.fontStyle.TextSemiBold,
                {
                  marginTop: vh(5),
                  textAlign: 'justify',
                  // color: '#000',
                  fontSize: 18,
                  color: this.props.isDark ? '#ffff' : '#000',
                },
              ]}>
              {this.props.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '25%',
                // backgroundColor: 'red',
                // justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={this.props.rightFunctionality}
                style={{marginTop: vh(5), marginLeft: vw(20)}}>
                <Image
                  source={this.props.rightIcon}
                  style={[styles.rightIcon, {tintColor: '#707070'}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export const Header = header;
