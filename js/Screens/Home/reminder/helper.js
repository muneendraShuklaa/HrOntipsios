//
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class remiderHelper {
  constructor(self) {
    this.self = self;
  }

  Savereminder = async () => {
    console.log('remndrsave', this.self.state.ReminderText);
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.SaveReminder,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          ReminderText: this.self.state.ReminderText,
          Taskid: this.self.state.TaskId,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response?.data);
        this.self.setState({
          Comment: response?.data?.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  reminderList = async () => {
    console.log('Comment');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.reminderList,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          taskid: this.self.state.TaskId,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response?.data);
        this.self.setState({
          reminder: response?.data?.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  deletereminder = async () => {
    console.log('remndr', this.self.state.Deleteremid);
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DeleteReminder,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          reminderid: this.self.state.Deleteremid,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response?.data);
        this.self.setState({
          Comment: response?.data?.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
