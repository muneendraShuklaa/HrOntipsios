import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';
import {Alert} from 'react-native';
import {StackActions} from '@react-navigation/native';

export default class RequestHelper {
  constructor(self) {
    this.self = self;
  }

  GetLeaveType = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    // console.log('LeaveApprovall');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.GetLeaveType,
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
        console.log('get_data...vendor======>>>>>>>', response.data);
        let tmpArr = response.data.Table.map(val => {
          return val.LeaveName;
        });
        this.self.setState({
          DropdownVendorList: tmpArr,
          LeaveSplit: response.data.Table,
          validation: response.data.Table[1].MaxLeaveAllowed,
          // validation: 2,
        });
      })
      .catch(function (error) {
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  LeaveBalance = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    console.log('Leave Approval');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.LeaveBalance,
        {
          LeaveType: this.self.state.Leavevalue,
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
        console.log('get_data...vendor========>', response.data.Table);
        let tmpArr = response.data.Table.map(val => {
          return val.Balance;
        });
        this.self.setState({
          Balance: tmpArr,
        });
      })
      .catch(function (error) {
        alert(response.data.message);
        // console.log('responce', 'ooooomgghggg');
      });
  };
  uploadLeaveDoc = async () => {
    let photo = this.self.state.imageArray2;
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log(this.self.state.imageArray2, photo, 'leavehh value......');
    let formData = new FormData();
    formData.append('LeaveType', this.self.state.Leavevalue);
    formData.append(
      'FromDate',
      new Date(this.self.state.selectedDate?.dateString).toISOString(),
    );
    formData.append(
      'ToDate',
      new Date(this.self.state.selectedEndDate?.dateString).toISOString(),
    );
    formData.append('Comments', this.self.state.notesadd);
    formData.append('Availability', this.self.state.avalavleType);
    formData.append('EmpId', EmpId);
    formData.append('LeaveDuration', '1');
    formData.append('Hours', '');
    formData.append('ClientId', JSON.parse(jsonValueClientID));
    {
      photo == ''
        ? null
        : formData.append('FileName', {
            uri: photo.path,
            name: 'image.jpg',
            type: photo.mime || 'image/jpeg',
          });
    }
    return axios({
      url: Endpoint.baseUrl + Endpoint.ApplyLeave,
      method: 'POST',
      data: formData,
      headers: {
        token: AuthToken,
        'Content-Type': 'multipart/form-data',
        clientid: JSON.parse(jsonValueClientID).toString(),
      },
    })
      .then(async response => {
        console.log('Leave apply res====>', response);
        this.self.props.navigation.dispatch(StackActions.replace('HomeStack'));
      })
      .catch(function (error) {
        alert(response.data.message);
        console.warn('guggsgggdsy', error);
      });
  };
}
