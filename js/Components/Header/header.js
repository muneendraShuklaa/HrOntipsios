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
    return (
      <View>
        {Platform.OS === 'ios' ? (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={this.props.leftFunction}>
                <Image
                  // source={utils.icons.splashLogo}
                  source={this.props.lefticon}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              {/* <Text style={[utils.fontStyle.TextTitle,{justifyContent:'center',alignSelf:'center',textAlign:'justify',alignContent:'center'}]}>
                                {this.props.title}
                            </Text> */}
            </View>
            <Text
              style={[
                utils.fontStyle.TextTitle,
                {
                  marginTop: vh(0),
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  color: '#000',
                },
              ]}>
              {this.props.title}
            </Text>
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
                <Image source={this.props.lefticon} style={styles.backIcon} />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                utils.fontStyle.TextSemiBold,
                {
                  marginTop: vh(5),
                  textAlign: 'justify',
                  color: '#000',
                  fontSize: 18,
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
