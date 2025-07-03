import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class LeavedHelper {
  constructor(self) {
    this.self = self;
  }

 
  LeaveStatus = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log('Leave -----', EmpId, AuthToken, JSON.parse(jsonValueClientID));

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.leaveStatus,
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
        console.log('leaavevevdatata', response?.data);
        this.self.setState({
          LeaveRecord: response?.data?.Table,
        });
      })
    .catch(function (error) {
  if (error.response?.data?.message) {
    // alert(error.response.data.message);
  } else {
    // alert("Something went wrong");
    console.warn("Error:", error);
  }
});
  };

 GetLeaveBalance = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    console.log('Leave -----', EmpId, AuthToken, JSON.parse(jsonValueClientID));

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.GetLeaveBalance,
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
        console.log('leave avaialable <------------>>>', response?.data);
        this.self.setState({
          LeaveDeatilsss: response?.data?.Table1,
        });
        console.log("kapil-----",response?.data?.Table1)
      })
   .catch(function (error) {
  if (error.response?.data?.message) {
    // alert(error.response.data.message);
  } else {
    // alert("Something went wrong");
    console.warn("Error ---- kapil:", error);
  }
});
  };

 CancelLeave = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log(
      'cancellleavelll',
      EmpId,
      jsonValueClientID,
      AuthToken,
      this.self.state.TransIdd,
    );
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.CancelLeave,
        {
          Status: 'Cancel',
          TransId: this.self.state.TransIdd,
          Comments: '',
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async response => {
        // console.log(
        //   'cancelleavestatus',
        //   EmpId,
        //   jsonValueClientID,
        //   AuthToken,
        //   TransId,
        //   Comments,
        // );
        console.log('leave startsu', response);
      })
   .catch(function (error) {
  if (error.response?.data?.message) {
    // alert(error.response.data.message);
  } else {
    // alert("Something went wrong");
    console.warn("Error-----:", error);
  }
});
  };
}
