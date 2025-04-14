import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import { StackActions } from '@react-navigation/native';
import { getDeviceDetails } from '../../../Utils/constant';

export default class signInHelper {
  constructor(self) {
    this.self = self;
  }

  AuthCheck = async (signal) => {
    // console.log('CALLLED');
    if (signal?.aborted) return;
    let Active = await AsyncStorage.getItem('IsAuthenticated');
    // let Answer1 = await AsyncStorage.getItem('Answer1');
    // console.log('CALLLED--->', Active, Answer1);
    let Answer1 = '';
    if (signal?.aborted) return;

    if (Active == 'true' && Answer1 == '' && this.self.isMountedComponent) {
      // this.self.props.navigation.navigate('bottomTabBarr');
      this.self.props.navigation.dispatch(StackActions.replace('HomeStack'));
    }
    if (Active == 'true' && Answer1 == 'ejoin' && this.self.isMountedComponent) {
      // this.self.props.navigation.navigate('WEJoin');
      this.self.props.navigation.dispatch(StackActions.replace('EjoinStack'));
    }
  };
  signIN = async (signal) => {
    if (signal?.aborted) return;
    const info = await getDeviceDetails();
    // console.log( {
    //   username: this.self.state.email,
    //   password: this.self.state.password,
    //   IMEI: info.imei ?? '',
    //   DeviceId: info.deviceId ?? '',
    //   DomainName: 'MobileApplicationLogin',
    // },'loginn===');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.Login,
        {
          username: this.self.state.email,
          password: this.self.state.password,
          // username: 'rituparnaganguly@drdangslab.com',
          // password: 'Ritu@0808',
          IMEI: info.imei ?? '',
          DeviceId: info.deviceId ?? '',
          DomainName: 'MobileApplicationLogin',
          // grant_type: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // "Authorization":Token,
          },
          signal
        },
      )
      .then(async response => {

       
        // console.log(response.data,'mess===');
        if (signal?.aborted) return;



        // await AsyncStorage.setItem('Name', response?.data?.FirstName);
        // await AsyncStorage.setItem('LastName', response?.data?.LastName);
        // await AsyncStorage.setItem('Department', response?.data?.DesignationId);
        // await AsyncStorage.setItem('AuthToken', response?.data?.AuthToken);
        // await AsyncStorage.setItem('Answer1', response?.data?.Answer1);
        // await AsyncStorage.setItem('RoleName', response?.data?.RoleName);
        // await AsyncStorage.setItem('RoleId', response?.data?.RoleId?.toString());
        // await AsyncStorage.setItem(
        //   'ClientId',
        //   response?.data?.ClientId.toString(),
        // );
        // await AsyncStorage.setItem('EmpId', response?.data?.EmpId);
        // await AsyncStorage.setItem('UserId', response?.data?.UserId.toString());
        // await AsyncStorage.setItem(
        //   'IsAuthenticated',
        //   response?.data?.IsAuthenticated.toString(),
        // );
        // await AsyncStorage.setItem(
        //   'UserType',
        //   response?.data?.UserType.toString(),
        // );

        await AsyncStorage.multiSet([
          ['Name', response?.data?.FirstName || ''],
          ['LastName', response?.data?.LastName || ''],
          ['Department', response?.data?.DesignationId || ''],
          ['AuthToken', response?.data?.AuthToken || ''],
          ['Answer1', response?.data?.Answer1 || ''],
          ['RoleName', response?.data?.RoleName || ''],
          ['RoleId', response?.data?.RoleId?.toString() || ''],
          ['ClientId', response?.data?.ClientId?.toString() || ''],
          ['EmpId', response?.data?.EmpId || ''],
          ['UserId', response?.data?.UserId?.toString() || ''],
          ['IsAuthenticated', response?.data?.IsAuthenticated?.toString() || ''],
          ['UserType', response?.data?.UserType?.toString() || ''],
        ]);

        

        if (this.self.isMountedComponent) {
          this.self.setState({ message: response?.data?.Message });
        }

        // this.self.setState({isloading: false});
        this.self.getLocationUser();
        this.AuthCheck(signal);
        // setTimeout(() => {
        // }, 2000);
        // this.self.props.navigation.navigate('bottomTabBarr', {});

        // else {
        //     alert(response.data.message)
        // }
      })
      .catch(function (error) {
        if (axios.isCancel(error)) {
          console.log('Request was cancelled:', error.message);
        } else {
          console.log('Login error:', error);
        }
      });
  };

  registerDevice = async (signal) => {
    if (signal?.aborted) return;
    // console.log('Register device called ---->');
    let token = await AsyncStorage.getItem('NotiToken');
    let empid = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    // console.log('data of register--->', empid, token, 'and', jsonValueClientID);
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.RegisterDevice,
        {
          EmpId: empid,
          Clientid: JSON.parse(jsonValueClientID),
          DeviceToken: token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Clientid: JSON.parse(jsonValueClientID),
          },
          signal
        },
      )
      .then(async response => {
        if (signal?.aborted) return;
        // console.log('register device responce -------->', response);
      })
      .catch(function (error) {
        // console.log('Device not registered---->', error);
        if (axios.isCancel(error)) {
          console.log('Request was cancelled:', error.message);
        } else {
          console.log('Login error:', error);
        }
      });
  };


}
