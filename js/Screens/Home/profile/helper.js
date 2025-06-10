

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import { navigate } from '../../../Components/Common/NavigationService';

export default class ProfiledHelper {
  constructor(self) {
    this.self = self;
  }

  // handleTokenExpiration = async (error) => {
  //   if (error?.response?.status === 401) {
  //     await AsyncStorage.setItem('IsAuthenticated', 'false');
  //     await AsyncStorage.removeItem('AuthToken');
  //     navigate('AuthStack');
  //   }
  // };

  // handleTokenExpiration = async (error) => {
  //   const status = error?.response?.status;
  
  //   if (status === 401) {
  //     await AsyncStorage.setItem('IsAuthenticated', 'false');
  //     await AsyncStorage.removeItem('AuthToken');
  //     navigate('AuthStack');
  //   } else {
  //     console.log('Non-authentication error:', error.message);
  //   }
  // };
  handleTokenExpiration = async (error) => {
    const status = error?.response?.status;
    console.log('handleTokenExpiration status:', status);
  
    if (status === 401) {
      // Prevent multiple logouts
      if (this.logoutHandled) return;
  
      this.logoutHandled = true;
      console.warn('Token expired or unauthorized. Logging out.');
  
      await AsyncStorage.setItem('IsAuthenticated', 'false');
      await AsyncStorage.removeItem('AuthToken');
  
      navigate('AuthStack');
    } else {
      console.log('Non-auth error:', error.message);
    }
  };
  

  
  UserData = async (signal) => {
    if (signal?.aborted) return;
    this.self.setState({ isloading: true });

    try {
      const EmpId = await AsyncStorage.getItem('EmpId');
      const jsonValueClientID = await AsyncStorage.getItem('ClientId');
      const AuthToken = await AsyncStorage.getItem('AuthToken');

      if (!EmpId || !jsonValueClientID || !AuthToken) {
        throw new Error('Missing credentials');
      }

      const ClientId = JSON.parse(jsonValueClientID);



      console.log('user ----->>>>>>>>>>>>', 
        
        
      "usersignal",  signal?.aborted,
      "Empid-", EmpId,
      "Clientid-", ClientId,
      "Token-", AuthToken);
      const response = await axios.post(
        Endpoint.baseUrl + Endpoint.PersonalDetail,
        {
          EmpId,
          ClientId,
        },
        {
          headers: {
            token: AuthToken,
            ClientId,
          },
          signal,
        }
      );

      if (signal?.aborted) return;

      const data = response?.data?.Table?.[0];
      if (data) {
        this.self.setState({
          Mobile: data.PhoneNo,
          Address1: data.Address1,
          Maritalstatus: data.Maritalstatus,
          DateofBirth: data.DateofBirth,
          Aadhar: data.Aadhar,
          PAN: data.PAN,
          Address2: data.Address2,
        });
      }

    } catch (error) {
      // if (axios.isCancel(error)) {
      //   console.log('Request was cancelled:', error.message);
      // } else if (error?.response?.status === 401) {
      //   console.warn('UserData: Token expired, but not logging out here   usedata----------');
      //   // optionally show alert here
      // } else {
        await this.handleTokenExpiration(error); // only for other errors
      
    }
  };

  UserPersonalData = async (signal) => {
    console.log('userpersonaldata===  0  check ----one', signal?.aborted);

    if (signal?.aborted) return;

    try {
      const EmpId = await AsyncStorage.getItem('EmpId');
      const jsonValueClientID = await AsyncStorage.getItem('ClientId');
      const AuthToken = await AsyncStorage.getItem('AuthToken');

      if (!EmpId || !jsonValueClientID || !AuthToken) {
        throw new Error('Missing credentials');
      }

      const ClientId = JSON.parse(jsonValueClientID);
      console.log('user ----->>>>>>>0000000000>>>>>', signal?.aborted, EmpId, ClientId, AuthToken);
      const response = await axios.post(
        Endpoint.baseUrl + Endpoint.UserPersonalDetail,
        {
          EmpId,
          ClientId,
        },
        {
          headers: {
            token: AuthToken,
            ClientId,
          },
          signal,
        }
      );

      console.log(response, 'userpersonaldata===    check ----one');
      if (signal?.aborted) return;

      const data = response?.data?.Table?.[0];
      if (data) {
        this.self.setState({
          Department: data.Department,
          Email: data.Email,
          EmployeeName: data.EmployeeName,
          JobTittle: data.JobTittle,
          ManagerName: data.ManagerName,
        });
      }

    }catch (error) {
      console.log('UserPersonalData error:', error);
      // if (error?.response?.status === 401) {
      //   console.warn('Token expired in UserPersonalData-------------- — but skipping logout.');
      // } else {
        await this.handleTokenExpiration(error); // Handle all other errors
      
    }
    
  };

  // Logout = async () => {
  //   try {
  //     const EmpId = await AsyncStorage.getItem('EmpId');
  //     const jsonValueClientID = await AsyncStorage.getItem('ClientId');
  //     const AuthToken = await AsyncStorage.getItem('AuthToken');

  //     if (!EmpId || !jsonValueClientID) {
  //       throw new Error('Missing credentials');
  //     }

  //     const ClientId = JSON.parse(jsonValueClientID);

  //     await axios.post(
  //       Endpoint.baseUrl + Endpoint.UserPersonalDetail, // Possibly this should be a Logout endpoint?
  //       {
  //         EmpId,
  //         ClientId,
  //       },
  //       {
  //         headers: {
  //           token: AuthToken,
  //           ClientId,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log('Logout error:', error);
  //   }
  // };

  Logout = async () => {
    try {
      const EmpId = await AsyncStorage.getItem('EmpId');
      const jsonValueClientID = await AsyncStorage.getItem('ClientId');
      const AuthToken = await AsyncStorage.getItem('AuthToken');
  
      if (!EmpId || !jsonValueClientID || !AuthToken) {
        throw new Error('Missing credentials');
      }
  
      const ClientId = JSON.parse(jsonValueClientID);
  
      // Use actual logout endpoint if available
      await axios.post(
        Endpoint.baseUrl + Endpoint.Logout, // <-- changed here
        {
          EmpId,
          ClientId,
        },
        {
          headers: {
            token: AuthToken,
            ClientId,
          },
        }
      );
    } catch (error) {
      console.log('Logout error:', error);
    }
  };
  
}
