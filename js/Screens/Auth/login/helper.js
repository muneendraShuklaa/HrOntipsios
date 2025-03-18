import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import {StackActions} from '@react-navigation/native';

export default class signInHelper {
  constructor(self) {
    this.self = self;
  }

  AuthCheck = async () => {
    // console.log('CALLLED');
    let Active = await AsyncStorage.getItem('IsAuthenticated');
    // let Answer1 = await AsyncStorage.getItem('Answer1');
    // console.log('CALLLED--->', Active, Answer1);
    let Answer1 = '';

    if (Active == 'true' && Answer1 == '') {
      // this.self.props.navigation.navigate('bottomTabBarr');
      this.self.props.navigation.dispatch(StackActions.replace('HomeStack'));
    }
    if (Active == 'true' && Answer1 == 'ejoin') {
      // this.self.props.navigation.navigate('WEJoin');
      this.self.props.navigation.dispatch(StackActions.replace('EjoinStack'));
    }
  };
  signIN = async () => {
    // this.self.setState({isloading: true});
    // console.log('deviceihhhnfo');

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.Login,
        {
          username: this.self.state.email,
          password: this.self.state.password,
          // username: 'rituparnaganguly@drdangslab.com',
          // password: 'Ritu@0808',
          // IMEI: '',
          // DeviceId: '',
          DomainName: 'MobileApplicationLogin',
          // grant_type: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // "Authorization":Token,
          },
        },
      )

      .then(async response => {
        console.log('Login responce =======>', response?.data);
        console.log('loginTokennnnn', response?.data?.AuthToken);
        this.self.setState({message: response?.data?.Message});

        await AsyncStorage.setItem('Name', response?.data?.FirstName);
        await AsyncStorage.setItem('LastName', response?.data?.LastName);
        await AsyncStorage.setItem('Department', response?.data?.DesignationId);
        await AsyncStorage.setItem('AuthToken', response?.data?.AuthToken);
        await AsyncStorage.setItem('Answer1', response?.data?.Answer1);
        await AsyncStorage.setItem('RoleName', response?.data?.RoleName);
        await AsyncStorage.setItem('RoleId', response?.data?.RoleId?.toString());

        await AsyncStorage.setItem(
          'ClientId',
          response.data.ClientId.toString(),
        );
        await AsyncStorage.setItem('EmpId', response.data.EmpId);
        await AsyncStorage.setItem('UserId', response.data.UserId.toString());
        await AsyncStorage.setItem(
          'IsAuthenticated',
          response.data.IsAuthenticated.toString(),
        );
        await AsyncStorage.setItem(
          'UserType',
          response.data.UserType.toString(),
        );

        // this.self.setState({isloading: false});
        this.self.getLocationUser();
        this.AuthCheck();
        // setTimeout(() => {
        // }, 2000);
        // this.self.props.navigation.navigate('bottomTabBarr', {});

        // else {
        //     alert(response.data.message)
        // }
      })
      .catch(function (error) {
        console.log('error is =====>', error);
        // alert('Please Enter Valid Credentials');
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };

  registerDevice = async () => {
    console.log('Register device called ---->');
    let token = await AsyncStorage.getItem('NotiToken');
    let empid = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    console.log('data of register--->', empid, token, 'and', jsonValueClientID);
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
        },
      )
      .then(async response => {
        console.log('register device responce -------->', response);
      })
      .catch(function (error) {
        console.log('Device not registered---->', error);
      });
  };
}
