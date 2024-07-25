//
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class CommentHelper {
  constructor(self) {
    this.self = self;
  }
  CommentData = async () => {
    console.log('Comment');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.getComment,
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
        console.log('gdfgdfhdfhdf', response.data);
        this.self.setState({
          Comment: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  AddComment = async () => {
    console.log('Comment');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.addcomment,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          taskid: this.self.state.TaskId,
          comments: this.self.state.CommentText,
          Status: 'open',
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response.data);
        this.self.setState({
          Comment: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  deletecomment = async () => {
    console.log('remndr', this.self.state.Commentid);
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DeleteComment,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          CId: this.self.state.Commentid,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response.data);
        this.self.setState({
          Comment: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
