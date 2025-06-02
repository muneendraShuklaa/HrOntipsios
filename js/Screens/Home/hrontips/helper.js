import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';
import { StackActions } from '@react-navigation/native';
import { navigate } from '../../../Components/Common/NavigationService';

export default class DashboardHelper {
  constructor(self) {
    this.self = self;
  }
  UserData = async () => {
    this.self.setState({ isloading: true });
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const EmpId = await AsyncStorage.getItem('EmpId');
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
        },
      )
      .then(async response => {
        // console.log('gdfgdfhdfhdf', response.data);
      })
      .catch(function (error) {
        // alert('Please Enter Valid Credentials');
        console.warn("guggsgggdsy", error);
      });
  };

  ClockInOut = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');
    // console.log(
    //   this.self.state.longitude,
    //   this.self.state.latitude,
    //   EmpId,
    //   jsonValueClientID,
    //   jsonValue,
    //   'leave value',
    // );
    // console.log('in---',AuthToken);

    let formData = new FormData();
    formData.append('longtitude', this.self.state.longitude);
    formData.append('Comment', '');
    formData.append('lattitude', this.self.state.latitude); // this.self.state.avalavleType);
    formData.append('EmpId', EmpId);
    formData.append('UserId', JSON.parse(jsonValue));
    formData.append('IsAutoClockIn', true);
    formData.append('ClientId', JSON.parse(jsonValueClientID));
    formData.append('FileUrl', '');
    console.log(formData,'formdata==');
    
    // console.log('out---',JSON.parse(jsonValueClientID));
    // formData.append('FileUrl', '', {
    //   uri: photo.uri,
    //   name: 'image.jpg',
    //   type: 'image/jpeg',
    // });
    return axios({
      url: Endpoint.baseUrl + Endpoint.ClockInOut,
      method: 'POST',
      data: formData,
      headers: {
        token: AuthToken,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ClientId: JSON.parse(jsonValueClientID),
      },
    })
      .then(function (response) {
        console.log('ClockIn...........Details==== :', response.data);
      })
      .catch(function (error) {
        console.log(error, 'coclin in error-----');
        
        this.handleTokenExpiration(error)
        // alert('ClockIn Request Failed');
      });
  };
  ClockOut = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    // console.log(
    //   this.self.state.longitude,
    //   this.self.state.latitude,
    //   EmpId,
    //   jsonValueClientID,
    //   jsonValue,
    //   'leave value',
    // );
    let formData = new FormData();
    formData.append('longtitude', this.self.state.longitude);
    formData.append('Comment', '');
    formData.append('lattitude', this.self.state.latitude); // this.self.state.avalavleType);
    formData.append('EmpId', EmpId);
    formData.append('UserId', JSON.parse(jsonValue));
    formData.append('IsAutoClockIn', false);
    formData.append('ClientId', JSON.parse(jsonValueClientID));
    formData.append('FileUrl', '');
    console.log(formData,'formdaa----dalogout');
    
    // formData.append('FileUrl', this.self.state.imageArray2, {
    //   uri: photo.uri,
    //   name: 'image.jpg',
    //   type: 'image/jpeg',
    // });
    console.log('url endp---',Endpoint.baseUrl + Endpoint.ClockInOut);
    
    return axios({
      url: Endpoint.baseUrl + Endpoint.ClockInOut,
      method: 'POST',
      data: formData,
      headers: {
        token: AuthToken,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ClientId: JSON.parse(jsonValueClientID),
      },
    })
      .then(function (response) {
        console.log('Clockout...........Details :', response?.data);
      })
      .catch(function (error) {
        console.log(error,'clocuout error----');
        this.handleTokenExpiration(error)
        // alert('Clockout Request Failed');
      });
  };

  track = async () => {
    // alert('hhhhhh');
    this.self.setState({ isloading: true });
    // console.log('clockkusing locationn');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.track,
        {
          EmpId: EmpId,
          longtitude: this.self.state.longtitude,
          lattitude: this.self.state.lattitude,
          TrackDateTime: new Date().toISOString(),
          UserId: jsonValue,
          GPSStatus: 'abc',
          Battery: this.self.batteryLevel,
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
        // console.log('tracking data  ==========>', response?.data);
        this.self.toggleStopwatch();
        this.self.setState({ play: true });
        // await AsyncStorage.setItem('Name', response.data.FirstName)
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response?.data?.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  // TimeTracker = async () => {
  //   // console.log('Clocking datata locationn');
  //   const EmpId = await AsyncStorage.getItem('EmpId');
  //   const jsonValueClientID = await AsyncStorage.getItem('ClientId');
  //   const jsonValue = await AsyncStorage.getItem('UserId');
  //   const AuthToken = await AsyncStorage.getItem('AuthToken');
  //   console.log('timetracker--');

  //   await axios
  //     .post(
  //       Endpoint.baseUrl + Endpoint.TimeTracker,
  //       {
  //         EmpId: EmpId,
  //         BreakTypeId: '',
  //         ActionType: '',
  //         ClientId: JSON.parse(jsonValueClientID),
  //       },

  //       {
  //         headers: {
  //           token: AuthToken,
  //           ClientId: JSON.parse(jsonValueClientID),
  //         },
  //       },
  //     )
  //     .then(async response => {
  //       console.log('ClockIn.allready data..', response?.data);
  //       // await AsyncStorage.setItem(
  //       //   'allreadyLogin',
  //       //   moment(String(response.data[0].StartTime)).unix().toString(),
  //       // );
  //       // console.log(moment().diff(
  //       //   moment.utc(String(response?.data[0]?.StartTime)),
  //       //   'milliseconds',
  //       // ),'startwa===');

   

  //       if (response?.data?.length > 0) {

  //         const starTime = response?.data?.[0]?.StartTime;
  //         if (starTime) {
  //           this.self.setState({
  //             play: true,
  //             stopwatchStartTime: moment().diff(
  //               moment.utc(String(response?.data[0]?.StartTime)),
  //               'milliseconds',
  //             ),
  //             // StatusClockin: 2
  //             // .subtract(50000, 'milliseconds')
  //           });
  //           this.self.toggleStopwatch();
  //           // this.self.setState({
  //           //   play: false,
  //           // });
  //         }
  //         this.self.setState({
  //           allreadyLogin: moment(String(response?.data[0]?.StartTime))
  //             .add(5, 'h')
  //             .add(30, 'm')
  //             .format('LT'),
  //           StatusClockin: response?.data[0]?.StatusId
  //         });
  //       }

  //       // const clockIn = moment(String(response.data[0].StartTime)).format(
  //       //   'LTS',
  //       // );
  //       // alert(clockIn);
  //       // format('LTS');



  //     })
  //     .catch(function (error) {
  //       // alert("Please Enter Valid Credentials")
  //       alert(response?.data?.message);
  //       // console.warn("guggsgggdsy", error);
  //     });
  // };



  TimeTracker = async () => {
    try {
      const EmpId = await AsyncStorage.getItem('EmpId');
      const jsonValueClientID = await AsyncStorage.getItem('ClientId');
      const AuthToken = await AsyncStorage.getItem('AuthToken');
  
      const response = await axios.post(
        Endpoint.baseUrl + Endpoint.TimeTracker,
        {
          EmpId: EmpId,
          BreakTypeId: '',
          ActionType: '',
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        }
      );
  
      console.log('ClockIn.already data:', response?.data);
  
      if (response?.data?.length > 0) {
        const startTime = response?.data[0]?.StartTime;
  
        if (startTime) {
          // Convert server UTC to JS Date
          const serverStartUTC = moment.utc(String(startTime)).toDate();
          // Get current local time
          const nowLocal = new Date();
          // Get elapsed time in ms
          const elapsedMs = nowLocal.getTime() - serverStartUTC.getTime();
  
          // Avoid negative stopwatch time (e.g., due to system time mismatch)
          const safeElapsedMs = elapsedMs > 0 ? elapsedMs : 0;
  
          this.self.setState({
            play: true,
            stopwatchStartTime: safeElapsedMs,
            allreadyLogin: moment.utc(serverStartUTC).local().format('LT'),
            StatusClockin: response?.data[0]?.StatusId,
          });
  
          this.self.toggleStopwatch();
        }
      }
    } catch (error) {
      console.warn("TimeTracker error:", error);
      alert("Error: " + (error?.response?.data?.message || "Unable to load time tracker."));
    }
  };
  


  
  GetImageProfile = async () => {
    // this.self.setState({isloading: true});
    // console.log('clockk');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    // const jsonValue = await AsyncStorage.getItem('UserId')

    await axios
      .post(
        Endpoint.baseUrlTask + Endpoint.GetImageProfile,
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
        // console.log('imagegegege..,gg.', response.data.DocumentUrlBase64);
        //  console.log('Remark date is ----->', response?.data);
        if (response) {

          await AsyncStorage.setItem(
            'ImagePicUrl',
            response?.data?.DocumentUrlBase64,
          );
          this.self.setState({
            ImagePicUrl: response?.data?.DocumentUrlBase64,
            count: response?.data?.Remarks?.Count,
            Birthday: response?.data?.Remarks?.Birthday,
            Anniversary: response?.data?.Remarks?.Anniversary,
            RemarkDate: response?.data?.remarks,
            Quote: response?.data?.Remarks?.MotivaltionalQuote,
          });
        }

      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response?.data?.message);
        console.log('Remarks date error=======>', error);
      });
  };

  registerAddress = async () => {
    // console.log('Register device called ---->');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    // console.log('reg data is --------->', this.self.state.latitude);
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.RegisterAddress,
        {
          latitude: this.self.state.latitude,
          longitude: this.self.state.longitude,
          address: this.self.state.formattedAddress,
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        // console.log(' address responce -------->', response?.data);
      })
      .catch(function (error) {
        console.log('Address is not registered----->', error);
      });
  };
}

handleTokenExpiration = (error) => {


  if (error?.response?.status === 401) {
    AsyncStorage.setItem('IsAuthenticated', 'false');
    AsyncStorage.removeItem('AuthToken');
    navigate('AuthStack');
  }
};
