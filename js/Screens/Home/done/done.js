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
import {StackActions} from '@react-navigation/native';
// import EjoinHelper from './helper';
import {SafeAreaView} from 'react-native-safe-area-context';
class done extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.helper.EjoinBalance()
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: utils.color.HeaderColor}}>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{
              height: '40%',
              backgroundColor: this.props.themeColor.Done,

              justifyContent: 'center',
            }}>
            <Image source={utils.icons.Done} style={{alignSelf: 'center'}} />
          </View>
          <View
            style={{
              height: '60%',
              backgroundColor: this.props.themeColor.BackPagecolor,
            }}>
            <Text
              style={[
                styles.Title,
                utils.fontStyle.FontFamilyExtraBold,
                {
                  alignSelf: 'center',
                  fontSize: 36,
                  color: '#3083EF',
                  marginTop: 30,
                },
              ]}>
              Thank You
            </Text>
            <Text
              style={[
                styles.Title,
                utils.fontStyle.TextSemiBold,
                {
                  alignSelf: 'center',
                  fontSize: 18,
                  color: this.props.themeColor.textColor,
                },
              ]}>
              Congratulations!
            </Text>
            <Text
              style={[
                styles.Title,
                utils.fontStyle.FontFamilyRegular,
                {
                  alignSelf: 'center',
                  fontSize: 16,
                  marginTop: 20,
                  color: this.props.themeColor.textColor,
                },
              ]}>
              HR will reach out to you soon
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  StackActions.replace('AuthStack'),
                );
              }}
              style={{
                backgroundColor: '#3083EF',
                borderRadius: 20,
                marginTop: 30,
                height: 'auto',
                width: 200,
                alignSelf: 'center',
                // justifyContent,
              }}>
              <Text
                style={[
                  styles.Title,
                  utils.fontStyle.TextSemiBold,
                  {
                    alignSelf: 'center',
                    fontSize: 23,
                    padding: 10,
                    color: '#fff',
                  },
                ]}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export const Done = withMyHook(done);
const styles = StyleSheet.create({});
