//
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class AnnouncementHelper {
  constructor(self) {
    this.self = self;
  }
  AnnouncementData = async () => {
    console.log('Comment');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const RoleId = await AsyncStorage.getItem('RoleId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.Announcement,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
          RoleId: RoleId,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('Announcement', response.data);
        this.self.setState({
          Announcement: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
