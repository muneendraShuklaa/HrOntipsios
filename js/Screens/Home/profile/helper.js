import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';
import { navigate } from '../../../Components/Common/NavigationService';

export default class ProfiledHelper {
  constructor(self) {
    this.self = self;
  }
  UserData = async (signal) => {
    if (signal?.aborted) return;
    this.self.setState({ isloading: true });
    // console.log('deviceihhhnfo');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.PersonalDetail,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
          signal
        },
      )
      .then(async response => {
        if (signal?.aborted) return;
        // console.log('userdata--', response?.data);

          this.self.setState({
            Mobile: response?.data?.Table[0]?.PhoneNo,
            Address1: response?.data?.Table[0]?.Address1,
            Maritalstatus: response?.data?.Table[0]?.Maritalstatus,
            DateofBirth: response?.data?.Table[0]?.DateofBirth,
            Aadhar: response?.data?.Table[0]?.Aadhar,
            PAN: response?.data?.Table[0]?.PAN,
            Address2: response?.data?.Table[0]?.Address2,
          });

      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")

        if (axios.isCancel(error)) {
          console.log('Request was cancelled:', error.message);
        } else {
          console.log('Login error:', error);
        }
      });
  };
  UserPersonalData = async (signal) => {
    if (signal?.aborted) return;
    // this.self.setState({ isloading: true })
    // console.log('okkkk');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.UserPersonalDetail,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
          signal
        },
      )
      .then(async response => {
//  console.log(response,'userpersonaldata===');
 
          if (signal?.aborted) return;
      
            this.self.setState({
              Department: response?.data?.Table[0]?.Department,
              Email: response?.data?.Table[0]?.Email,
              EmployeeName: response?.data?.Table[0]?.EmployeeName,
              JobTittle: response?.data?.Table[0]?.JobTittle,
              ManagerName: response?.data?.Table[0]?.ManagerName,
            });
 
        
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert('userpersonaldata');
        handleTokenExpiration(error);
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };

  Logout = async () => {
    // this.self.setState({ isloading: true })
    // console.log('okkkk');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(Endpoint.baseUrl + Endpoint.UserPersonalDetail, {
        EmpId: EmpId,
        ClientId: JSON.parse(jsonValueClientID),
      })
      .then(async response => {
        // console.log('logooooooo----->', response.data);
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  handleTokenExpiration = (error) => {
    if (error?.response?.status === 401) {
      AsyncStorage.setItem('IsAuthenticated', 'false');
      AsyncStorage.removeItem('AuthToken');
        navigate('AuthStack');
    }
  };
}
