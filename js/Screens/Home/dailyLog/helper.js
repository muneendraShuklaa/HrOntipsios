//
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class DailyLogHelper {
  constructor(self) {
    this.self = self;
  }
  dailylogData = async () => {
    console.log('dailyloyscelender');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DailyLog,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        },
      )

      .then(async response => {
        console.log('dailylogs', response.data);
        let tmpArr = response.data.Table.map(val => {
          return val.Status;
        });

        const dateMarkedDates = {};
        let Datee = response.data.Table.map(val => {
          dateMarkedDates[val.Date] = {};
          // Add your config here
          if (val.Status == 'Absent' || val.HoliDayName != '') {
            dateMarkedDates[val.Date] = {
              marked: true,
              selected: false,
              dotColor: val.HoliDayName == '' ? 'red' : 'yellow',
              showSelectionText:
                val.Status == 'Absent' ? 'Absent' : val.HoliDayName,
            };
          } else if (val.Status == 'Present') {
            dateMarkedDates[val.Date] = {
              marked: true,
              selected: false,
              dotColor: 'green',
              showSelectionText: 'Present',
            };
          }
          return val.Date;
        });

        console.log('VAL DATE', dateMarkedDates);
        this.self.setState({
          Status: tmpArr, //emp absent or present record
          Datee: Datee, //emp dates
          DateMarkedDates: dateMarkedDates, // date list
          DailyLog: response.data.Table, //emp all data
        });
      })

      .catch(function (error) {
        alert(response.data.ewe);
      });
  };
}
