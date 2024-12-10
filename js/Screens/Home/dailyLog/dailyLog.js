import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {WebView} from 'react-native-webview';
import utils from '../../../Utils';
import {Header} from '../../../Components/Header';
import {withMyHook} from '../../../Utils/Dark';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import {vh, vw, normalize} from '../../../Utils/dimentions';
import DailyLogHelper from './helper';

import {SafeAreaView} from 'react-native-safe-area-context';
const ActivityIndicatorElement = () => {
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.activityIndicatorStyle}
    />
  );
};
class dailylog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DailyLog: [],
      Status: '',
      Datee: '',
      DateTotall: '',
      DateMarkedDates: {},
      selectedDate: '',
    };
    this.helper = new DailyLogHelper(this);
  }
  componentDidMount() {
    this.helper.dailylogData();
  }

  render() {
    const selectedDateConfig =
      this.state?.DateMarkedDates?.[this.state?.selectedDate];
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{flexDirection: 'row'}}>
            <ImageBackground
              style={{flexDirection: 'row', height: 60, width: '100%'}}
              source={utils.icons.buttonnBacl}>
              <Image
                source={utils.icons.Back}
                style={{
                  alignSelf: 'center',
                  marginRight: 10,
                  marginLeft: 20,
                  tintColor: '#fff',
                }}
              />
              <Text
                style={[
                  utils.fontStyle.FontFamilymachoB,
                  {color: '#fff', fontSize: normalize(26), alignSelf: 'center'},
                ]}>
                Daily Logs
              </Text>
            </ImageBackground>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 30,
              backgroundColor: this.props.isDark ? 'lightgrey' : '#fff',
              margin: 20,
              borderRadius: 30,
              padding: 10,
            }}>
            {!!selectedDateConfig?.showSelectionText && (
              <Text style={{backgroundColor: 'green', color: '#000'}}>
                {selectedDateConfig?.showSelectionText}
              </Text>
            )}
            <Calendar
              markingType={'custom'}
              markedDates={this.state.DateMarkedDates}
              theme={{
                header: {height: 0},
                backgroundColor: '#00adf5',
                calendarBackground: this.props.themeColor.DarkBackground,
                textSectionTitleColor: this.props.isDark ? 'black' : 'grey',
                textSectionTitleDisabledColor: '#d9e1e8',
                // selectedDayBackgroundColor: 'red',
                // selectedDayBackgroundColor: '#00adf5',
                // selectedDayTextColor: 'blue',
                todayTextColor: '#fff',
                todayBackgroundColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: 'grey',
                dotColor: '#00adf5',
                // selectedDotColor: 'red',
                arrowColor: utils.color.ButtonAll,
                disabledArrowColor: '#d9e1e8',
                monthTextColor: '#00adf5',
                indicatorColor: 'blue',
                textColor: this.props.themeColor.blackTitle,
                // textDayStyle:{color:this.props.themeColor.blackTitle},
                textDayFontWeight: '300',
                textMonthFontWeight: '300',
                textDayHeaderFontWeight: 'bold',
                textDayFontSize: 16,
                textDayFontWeight: 'bold',
                textMonthFontSize: 20,
                textDayHeaderFontSize: 16,
              }}
              // maxDate={'2099-09-22'}
              onDayPress={day => {
                console.log('selected day', day);
                // console.log("nnnnnnnnn", this, this.helper)
                // alert(day);
                // this.helper.FilterTask()
                this.setState({
                  selectedDate: day,
                });
                setTimeout(() => {
                  this.props.navigation.navigate('DailylogDetail', {
                    Dateee: this.state.selectedDate?.dateString,
                    TotalTime: this.state.TotalTime,
                  });
                }, 1000);
              }}
              onDayLongPress={day => {
                // console.log('selected day', day);
                // this.setState({
                //   selectedDate: day.dateString,
                // });
                // const temp = this.state.DateMarkedDates;
                // temp[day.dateString].selected = true;
                // this.setState({
                //   DateMarkedDates: temp,
                // });
                // this.props.navigation.navigate('DailylogDetail');
              }}
              monthFormat={'MMM yyyy'}
              // markingType='custom'
              onMonthChange={month => {
                console.log('month changed', month);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 'auto',
                width: '30%',
                backgroundColor: this.props.isDark ? 'lightgrey' : '#fff',
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  marginLeft: 10,
                  borderRadius: 5,
                  backgroundColor: 'green',
                }}></View>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {alignSelf: 'center', color: '#000', margin: 10},
                ]}>
                Present{' '}
              </Text>
            </View>
            <View
              style={{
                height: 'auto',
                width: '30%',
                // marginTop: 10,
                backgroundColor: this.props.isDark ? 'lightgrey' : '#fff',
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  alignSelf: 'center',
                  borderRadius: 5,
                  backgroundColor: 'red',
                }}></View>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {alignSelf: 'center', color: '#000', margin: 10},
                ]}>
                Absent{' '}
              </Text>
            </View>
            <View
              style={{
                height: 'auto',
                width: '30%',
                // marginTop: 10,
                backgroundColor: this.props.isDark ? 'lightgrey' : '#fff',
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  alignSelf: 'center',
                  borderRadius: 5,
                  backgroundColor: 'yellow',
                }}></View>
              <Text
                style={[
                  utils.fontStyle.TextSemiBold,
                  {alignSelf: 'center', color: '#000', margin: 10},
                ]}>
                Holiday{' '}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export const DailyLogs = withMyHook(dailylog);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
