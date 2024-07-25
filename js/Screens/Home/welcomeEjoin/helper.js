import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class EjoinHelper {
  constructor(self) {
    this.self = self;
  }
  EjoinBalance = async () => {
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
        console.log('leavvevevevevev', response.data);
        this.self.setState({
          data: response.data.Table,
          // TaskName:response.data.Table[0].TaskName,
          // EmployeeUpload:response.data.Table[0].EmployeeUpload,
          // ViewDocument:response.data.Table[0].ViewDocument,
          // eSign:response.data.Table[0].eSign,
          // TaskName:response.data.Table[0].DocumentName,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
