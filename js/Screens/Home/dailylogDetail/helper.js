import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class DailyLogHelperr {
  constructor(self) {
    this.self = self;
  }
  dailylogdataData = async () => {
    // alert('logssggss');
    console.log('dailyloysffffcelender', this.self.state.Dateee);
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.LogDetails,
        {
          empid: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
          Absentdate: this.self.state.Dateee,
          // Absentdate: new Date(
          //   this.self.state.Dateee?.dateString,
          // ).toISOString(),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('LogDetails', response.data);
        // await AsyncStorage.setItem('RoleName', response.data.RoleName);
        let Duration = response.data.Table.map(val => {
          return val.Duration;
        });
        this.self.setState({
          LogDetails: response.data.Table,
          Data: Duration,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
