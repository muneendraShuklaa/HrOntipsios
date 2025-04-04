import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class ApproveLeaveHelper {
  constructor(self) {
    this.self = self;
  }

  LeaveApprove = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValueUserType = await AsyncStorage.getItem('UserType');

    // console.log('LeaveApprovall');

    // console.log('userType----->', jsonValueClientID );

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.LeaveApproval,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
          Usertype: JSON.parse(jsonValueUserType),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {

         console.log(JSON.stringify(response?.data?.Table, null, 2));
        this.self.setState({
          LeaveRecord: response?.data?.Table,
          Pending: response?.data?.Table1[0]?.ApprovalPending,
          Reject: response?.data?.Table1[0]?.Reject,
          Approved: response?.data?.Table1[0]?.Approved,
          leaveduration:response?.data?.Table
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response?.data?.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  AddComments = async TransId => {
    // this.self.setState({ isloading: true })
    // alert(TransId);
    // alert('hhh');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValueUserType = await AsyncStorage.getItem('UserType');
    // console.log(
    //   'Apppprovved',
    //   // EmpId,
    //   // jsonValueClientID,
    //   // AuthToken,
    //   this.self.state.TTransid,
    // );
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.statusLeave,
        {
          EmpId: EmpId,
          Status: 'A',
          TransId: this.self.state.TTransid,
          Comments: this.self.state.notesadd,
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        },
      )
      // console.log("Leave",EmpId,AuthToken,TransId)

      .then(async response => {
        // console.log(
        //   'dataapproved',
        //   EmpId,
        //   jsonValueClientID,
        //   AuthToken,
        //   TransId,
        //   Comments,
        // );

      //  console.log('leave startsu', response.data);
      })
      .catch(function (error) {
        // alert('worng data');
      });
  };
  AddCommentsReject = async TransId => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValueUserType = await AsyncStorage.getItem('UserType');
    // console.log(
    //   'rejectedd',
    //   EmpId,
    //   jsonValueClientID,
    //   AuthToken,
    //   this.self.state.RejectTransid,
    // );
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.statusLeave,
        {
          EmpId: EmpId,
          Status: 'R',
          TransId: this.self.state.RejectTransid,
          Comments: this.self.state.rejetnotesadd,
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
        // console.log(
        //   'LeaveApprovall',
        //   EmpId,
        //   jsonValueClientID,
        //   AuthToken,
        //   TransId,
        //   Comments,
        // );

        // console.log(
        //   'hhghghghghghgh',
        //   EmpId,
        //   TransId,
        //   ClientId,
        //   Status,
        //   Comments,
        // );
      })
      .catch(function (error) {
        // alert(response.data.message)
      });
  };
}
