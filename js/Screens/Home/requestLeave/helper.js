import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';
import {Alert} from 'react-native';
import {StackActions} from '@react-navigation/native';
import { localNotificationService } from '../../../notification/localNotification';

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
        // console.log('get_data...vendor======>>>>>>>', response.data.Table);
        let tmpArr = response?.data?.Table?.map(val => {
          return val?.LeaveName;
        });
        this.self.setState({
          DropdownVendorList: tmpArr,
          LeaveSplit: response?.data?.Table,
          validation: response?.data?.Table[1]?.MaxLeaveAllowed,
          // validation: 2,
        });
      })
      .catch(function (error) {
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  LeaveBalance = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

 
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
        // console.log('get_data...vendor========>', response.data.Table);
        let tmpArr = response?.data?.Table?.map(val => {
          return val.Balance;
        });
        this.self.setState({
          Balance: tmpArr,
        });
      })
      .catch(function (error) {
        alert(response?.data?.message);
        // console.log('responce', 'ooooomgghggg');
      });
  };
uploadLeaveDoc = async () => {


  console.log('uploadLeaveDoc called', this.self.state.imageArray2);
  try {
    // console.log('uploadLeaveDoc called', this.state.imageArray2);

    if (!this.self.state.imageArray2) {
      Alert.alert('No Document Selected', 'Please select a document to upload.');
      return;
    }

    let photo = this.self.state.imageArray2;
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    let formData = new FormData();
    formData.append('LeaveType', this.self.state.Leavevalue);
    formData.append(
      'FromDate',
      new Date(this.self.state.selectedDate?.dateString).toISOString()
    );
    formData.append(
      'ToDate',
      this.state.Full === 'half'
        ? new Date(this.self.state.selectedDate?.dateString).toISOString()
        : new Date(this.self.state.selectedEndDate?.dateString).toISOString()
    );
    formData.append('LeaveDuration', this.self.state.Full === 'half' ? 0 : 1);
    formData.append('Hours', this.self.state.Full === 'half' ? this.self.state.Hours : '');
    formData.append('Comments', this.self.state.notesadd);
    formData.append('Availability', this.self.state.avalavleType);
    formData.append('EmpId', EmpId);
    formData.append('ClientId', JSON.parse(jsonValueClientID));

    if (photo && photo.path) {
      formData.append('FileName', {
        uri: photo.path,
        name: 'image.jpg',
        type: photo.mime || 'image/jpeg',
      });
    }

    console.log('formData-------------', formData);

    const response = await axios({
      url: Endpoint.baseUrl + Endpoint.ApplyLeave,
      method: 'POST',
      data: formData,
      headers: {
        token: AuthToken,
        'Content-Type': 'multipart/form-data',
        clientid: JSON.parse(jsonValueClientID).toString(),
      },
    });

    console.log('apply leave response----->', response.data);
    this.props.navigation?.dispatch(StackActions.replace('HomeStack'));
  } catch (error) {
    console.warn('apply leave error----->', error);

    if (error.response) {
      console.warn('Server responded with:', error.response.status, error.response.data);
    } else if (error.request) {
      console.warn('No response received:', error.request);
    } else {
      console.warn('Request error:', error.message);
    }

    Alert.alert('Leave Request Failed', 'Something went wrong while submitting your leave request.');
  }
};

  // uploadLeaveDoc = async () => {
  //   let photo = this.self.state.imageArray2;
  //   const jsonValueClientID = await AsyncStorage.getItem('ClientId');
  //   const EmpId = await AsyncStorage.getItem('EmpId');
  //   const AuthToken = await AsyncStorage.getItem('AuthToken');
  //   console.log(this.self.state.imageArray2, photo, 'leavehh value......');
  //   let formData = new FormData();
  //   formData.append('LeaveType', this.self.state.Leavevalue);
  //   formData.append(
  //     'FromDate',
  //     new Date(this.self.state.selectedDate?.dateString).toISOString(),
  //   );
  //   formData.append(
  //     'ToDate',
  //     new Date(this.self.state.selectedEndDate?.dateString).toISOString(),
  //   );
  //   formData.append('Comments', this.self.state.notesadd);
  //   formData.append('Availability', this.self.state.avalavleType);
  //   formData.append('EmpId', EmpId);
  //   formData.append('LeaveDuration', '1');
  //   formData.append('Hours', '');
  //   formData.append('ClientId', JSON.parse(jsonValueClientID));
  //   {
  //     photo == ''
  //       ? null
  //       : formData.append('FileName', {
  //           uri: photo.path,
  //           name: 'image.jpg',
  //           type: photo.mime || 'image/jpeg',
  //         });
  //   }
  //   return axios({
  //     url: Endpoint.baseUrl + Endpoint.ApplyLeave,
  //     method: 'POST',
  //     data: formData,
  //     headers: {
  //       token: AuthToken,
  //       'Content-Type': 'multipart/form-data',
  //       clientid: JSON.parse(jsonValueClientID).toString(),
  //     },
  //   })
  //     .then(async response => {
     
  //       this.self.props.navigation.dispatch(StackActions.replace('HomeStack'));
  //       // const options = {
  //       //   soundName: 'default',
  //       //   playSound: true,
  //       //   largeIcon: 'ic_launcher',
  //       //   smallIcon: 'ic_launcher',
  //       // };
      
  //       // localNotificationService.showNotification(
  //       //   0,
  //       //   'Leave Applied',
  //       //   'Your leave application was submitted successfully.',
  //       //   {},
  //       //   options,
  //       // );
        
  //     })
  //     .catch(function (error) {
      
  //       console.warn('apply leave error----->', error);
  //     });
  // };
}
