//
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class DSRHelper {
  constructor(self) {
    this.self = self;
  }
  dsrData = async () => {
    // console.log('DDDSSSRR');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');

    console.log('Authtoken is ---->', AuthToken);
    console.log('client id is ------>', jsonValueClientID);

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DSRList,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        // console.log('gdfgdfhdfhdf=====>', response.data);
        this.self.setState({
          DSR: response?.data?.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        console.log('error of  DSR', error);
      });
  };
}
