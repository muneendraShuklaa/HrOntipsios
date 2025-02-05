import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
// import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';

export default class EjoinHelper {
  constructor(self) {
    this.self = self;
  }
  EjoinBalance = async (hardRefresh = false) => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    // const AuthToken = await AsyncStorage.getItem('AuthToken')
    // console.log("Leave",EmpId,AuthToken,JSON.parse(jsonValueClientID))

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.EjoinData,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
        },
        //     {
        //         headers:  {
        //         "token":AuthToken,

        //     },
        // }
      )
      .then(async response => {
        this.self.setState({
          data: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        console.log('guggsgggdsy', error);
      });
  };
}

export class EjoinPageHelper {
  constructor(self) {
    this.self = self;
  }

  DocUploadDownload = async taskData => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    // const AuthToken = await AsyncStorage.getItem('AuthToken')
    // console.log("Leave",EmpId,AuthToken,JSON.parse(jsonValueClientID))

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DocList,
        {
          EmpId: EmpId,
          Taskid: taskData.TaskId,
          ClientId: JSON.parse(jsonValueClientID),
        },
        //     {
        //         headers:  {
        //         "token":AuthToken,

        //     },
        // }
      )
      .then(async response => {
        console.log('Download doc', response);
        this.self.setState({
          Docdata: response.data,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  uploadSingleDoc = async (taskData, uploadDocInfo, uploadDoc) => {
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const EmpId = await AsyncStorage.getItem('EmpId');

    let formData = new FormData();
    formData.append('EmpId', EmpId);
    formData.append('ClientId', jsonValueClientID);
    formData.append('Taskid', taskData.TaskId);
    formData.append('Docid', uploadDocInfo?.Docid || 0);
    if (uploadDocInfo?.Docid) {
      formData.append('document', uploadDoc);
    } else {
      console.log('uploadSIGNATURE Upload', uploadDoc);
      formData.append('documentSignature', uploadDoc);
    }

    return axios({
      url: Endpoint.baseUrl + Endpoint.UploadDoc,
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response :', response);
        Alert.alert('Uploaded successfully');
      })
      .catch(function (error) {
        Alert.alert('Uploaded Failed', error.message || JSON.stringify(error));
      });
  };
}
