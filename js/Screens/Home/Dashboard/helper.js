import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';
import { StackActions } from '@react-navigation/native';

export default class homeHelper {
  constructor(self) {
    this.self = self;
  }

  ClockIn = async () => {
    console.warn('datasdasda', this.self.state.latitude);
    console.warn('oooooooo', this.self.state.longitude);
    // this.self.setState({ isloadingtime: true })
    // const jsonValue = await AsyncStorage.getItem('UserId')
    // const jsonValue = await AsyncStorage.getItem('UserId')
    // const Token = await AsyncStorage.getItem('AuthToken')
    // console.warn(UserId,"hbgbbb")
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.CloclInClockOut,
        {
          Id: '0',
          ClockIn_datetime: new Date().toISOString(),
          UserId: 124,
          CreatedBy: '0',
          Lattitude: this.self.state.latitude,
          Longtitude: this.self.state.longitude,
        },
        // {headers:  {

        //         "Token":Token,},
        // }
      )
      .then(async response => {
        console.log('get_data', response?.data);
        // console.log("get_data......aaa",Token)
        // console.warn("idddddddddddd", response.data.result.TimeKeeperClockInDetailsRequest.Lattitude)
        // let userType = await AsyncStorage.getItem('UserType')

        await AsyncStorage.setItem('InLat', this.self.state.latitude);
        await AsyncStorage.setItem('InLong', this.self.state.longitude);
        // await AsyncStorage.setItem('InTime', response.data.result.TimeKeeperClockInDetailsRequest.ClockIn_datetime)

        await AsyncStorage.setItem(
          'Id',
          JSON.stringify(
            response?.data?.result?.TimeKeeperClockInDetailsRequest?.Id,
          ),
        );
        if (response?.data?.isSuccess == true && response?.data?.status == 200) {
          this.self.setState({});
          // this.self.props.navigation.navigate("Today");
          // this.props.navigation.navigate("Today")
          this.self.setState({ play: true });
          {
            userType == 'Admin'
              ? null
              : this.self.props.navigation.navigate('Today');
          }
        } else {
          console.log(response.data.message,'200');
          
          // this.self.setState({ isloadingtime: false })
          // alert(response?.data?.message);
        }
      })
      .catch(function (error) {
        console.warn('gogoago', error);
        this.handleTokenExpiration(error)
      });
  };

  ClockOut = async () => {
    // console.log('datasdasda', this.self.state.email, this.self.state.password);
    // this.self.setState({ isloadingtime: true })
    const Token = await AsyncStorage.getItem('AuthToken');

    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValue1 = await AsyncStorage.getItem('Id');
    // const Id = await AsyncStorage.getItem('Id')
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.CloclInClockOut,
        {
          Id: JSON.parse(jsonValue1),
          ClockInId: 'string',
          ClockOut_datetime: new Date().toISOString(),
          UserId: 124,

          CreatedBy: '0',

          OutLattitude: this.self.state.latitude,
          OutLongtitude: this.self.state.longitude,
          // "OutImagePath": "string"
        },
        {
          headers: {
            // "Accept":'application/json',
            // 'Content-Type':'application/json',
            Token: Token,
          },
        },
      )
      .then(async response => {
        // console.log('get_token', Token);

        // console.warn(
        //   'get_data',
        //   response?.data?.result?.TimeKeeperClockInDetailsRequest?.TotalHours,
        // );
        // console.warn("hhhpooouurrrr", response.data.result.TimeKeeperClockInDetailsRequest.Lattitudee)
        await AsyncStorage.setItem(
          'HotalHours',
          response?.data?.result?.TimeKeeperClockInDetailsRequest?.TotalHours + '',
        );
        await AsyncStorage.setItem(
          'OutTime',
          response?.data?.result?.TimeKeeperClockInDetailsRequest
            .ClockOut_datetime,
        );
        await AsyncStorage.setItem(
          'OutLat',
          response?.data?.result?.TimeKeeperClockInDetailsRequest?.Lattitude,
        );
        await AsyncStorage.setItem(
          'OutLong',
          response?.data?.result?.TimeKeeperClockInDetailsRequest?.Longtitude,
        );
        if (response?.data?.isSuccess == true && response?.data?.status == 200) {
          // this.self.setState({ isloadingtime: false })
          // this.self.props.navigation.navigate("Today");
          // this.self.setState({ play: true })
          this.self.setState({ play: false });
        } else {
          // this.self.setState({ isloadingtime: false })
          alert(response?.data?.message);
        }
      })
      .catch(function (error) {
        console.warn('gogoago', error);

        this.handleTokenExpiration(error)
      });
  };

  handleTokenExpiration = (error) => {
    console.log(error,'reriri--');
    
    if (error.response?.status === 401) {
      AsyncStorage.setItem('IsAuthenticated', 'false');
      AsyncStorage.removeItem('AuthToken');
      this.self.props.navigation.dispatch(
        StackActions.replace('Login')
      );

    }
  };
}
