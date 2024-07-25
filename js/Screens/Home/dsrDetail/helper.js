import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class DSRHelper {
  constructor(self) {
    this.self = self;
  }

  DSRDetail = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log('DSR', AuthToken, JSON.parse(jsonValueClientID));

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DSRDetail,
        {
          UserId: jsonValue,
          ClientId: JSON.parse(jsonValueClientID),
          DSRDate: this.self.state.date,
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('DDSSRR', response.data);
        this.self.setState({
          Comments: response.data.Table[0].Comments,
          ProjectDescription: response.data.Table[0].ProjectDescription,
          DSRDate: response.data.Table[0].DSRDate,
          DsrStatus: response.data.Table[0].DsrStatus,
          ProjectId: response.data.Table[0].ProjectId,
          ProjectModuleId: response.data.Table[0].ProjectModuleId,
          ProjectCategoryId: response.data.Table[0].ProjectCategoryId,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  DSRSubmit = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log('DSR', AuthToken, JSON.parse(jsonValueClientID));

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DSRSubmit,
        {
          UserId: jsonValue,
          ClientId: JSON.parse(jsonValueClientID),
          DSRDate: this.self.state.date,
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('subbmitt', response.data);
        // alert(response.data.Table[0].Code.toString());
        this.self.setState({
          DSREmpDataId: response.data.Table[0].DSREmpDataId.toString(),
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
