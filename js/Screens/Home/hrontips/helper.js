
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
    // this.self.setState({isloading: true});
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
        // this.self.setState({isloading: false});
        // console.log('gdfgdfhdfhdf', response.data);
      })
      .catch(function (error) {
        // this.self.setState({isloading: false});
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
      // jsonValueClientID,
    //   jsonValue,
    //   'leave value',
    // );
 
    
    let formData = new FormData();
    formData.append('longtitude', this.self.state.longitude);
    formData.append('Comment', '');
    formData.append('lattitude', this.self.state.latitude); // this.self.state.avalavleType);
    formData.append('EmpId', EmpId);
    formData.append('UserId', JSON.parse(jsonValue));
    formData.append('IsAutoClockIn', true);
    formData.append('ClientId', JSON.parse(jsonValueClientID));
    formData.append('FileUrl', '');

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
        // console.log('ClockIn...........Details==== :', response.data);
      })
      .catch(function (error) {
        this.handleTokenExpiration?.(error)
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
    // formData.append('FileUrl', this.self.state.imageArray2, {
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
        // console.log('Clockout...........Details :', response?.data);
      })
      .catch(function (error) {
        this.handleTokenExpiration?.(error)
        // alert('Clockout Request Failed');
      });
  };


  track = async () => {
    // this.self.setState({ isloading: true });
    // console.log('Clocked In based on location');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');
  
    const payload = {
      EmpId: EmpId,
      Longitude: this.self.state.longitude, // ✅ fixed typo
      Latitude: this.self.state.latitude,   // ✅ fixed typo
      TrackDateTime: new Date().toISOString(),
      UserId: jsonValue,
      GPSStatus: 'abc',
      Battery: this.self.batteryLevel,
      ClientId: JSON.parse(jsonValueClientID),
    };
  
    console.log(payload, 'track payload');
    // this.self.setState({ isloading: false });
    await axios
      .post(Endpoint.baseUrl + Endpoint.track, payload, {
        headers: {
          token: AuthToken,
          ClientId: JSON.parse(jsonValueClientID),
        },
      })
      .then(async response => {
        this.self.toggleStopwatch();
        this.self.setState({ play: true });
        // this.self.setState({ isloading: false });
      })
      .catch(error => {
        // this.self.setState({ isloading: false });
        console.warn("guggsgggdsy", error);
        // alert(error?.response?.data?.message || "An error occurred");
      });
  };
  
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

      // alert("Error: " + (error?.response?.data?.message || "Unable to load time tracker."));
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



//   TimeTracker = async () => {
//   try {
//     const EmpId = await AsyncStorage.getItem('EmpId');
//     const jsonValueClientID = await AsyncStorage.getItem('ClientId');
//     const AuthToken = await AsyncStorage.getItem('AuthToken');

//     if (!EmpId || !jsonValueClientID || !AuthToken) {
//       console.warn('Missing required AsyncStorage values for TimeTracker');
//       return;
//     }

//     const clientIdParsed = JSON.parse(jsonValueClientID);

//     const response = await axios.post(
//       Endpoint.baseUrl + Endpoint.TimeTracker,
//       {
//         EmpId: EmpId,
//         BreakTypeId: '',
//         ActionType: '',
//         ClientId: clientIdParsed,
//       },
//       {
//         headers: {
//           token: AuthToken,
//           ClientId: clientIdParsed,
//         },
//       }
//     );

//     const data = response?.data;

//     if (Array.isArray(data) && data.length > 0) {
//       const firstRecord = data[0];
//       const startTime = firstRecord?.StartTime;

//       if (startTime) {
//         // Parse server UTC time safely
//         const serverStartUTC = moment.utc(String(startTime)).toDate();

//         if (isNaN(serverStartUTC.getTime())) {
//           console.warn('Invalid startTime format:', startTime);
//           return;
//         }

//         const nowLocal = new Date();
//         const elapsedMs = nowLocal.getTime() - serverStartUTC.getTime();
//         const safeElapsedMs = elapsedMs > 0 ? elapsedMs : 0;

//         this.setState({
//           play: true,
//           stopwatchStartTime: safeElapsedMs,
//           allreadyLogin: moment.utc(serverStartUTC).local().format('LT'),
//           StatusClockin: firstRecord?.StatusId,
//         });

//         this.toggleStopwatch();
//       }
//     } else {
//       console.warn('No TimeTracker data returned');
//     }
//   } catch (error) {
//     console.warn('TimeTracker error:', error);
//     // Optional alert:
//     // alert("Error: " + (error?.response?.data?.message || "Unable to load time tracker."));
//   }
// };


  // GetImageProfile = async () => {
  //   try {

  //     console.log('GetImageProfile called kapil -----');
  //     const EmpId = await AsyncStorage.getItem('EmpId');
  //     const AuthToken = await AsyncStorage.getItem('AuthToken');
  //     const ClientId = JSON.parse(await AsyncStorage.getItem('ClientId'));
  
  //     const response = await axios.post(
  //       Endpoint.baseUrlTask + Endpoint.GetImageProfile,
  //       { EmpId, ClientId },
  //       { headers: { token: AuthToken, ClientId } }
  //     );
  
  //     if (response && response.data) {
  //       const newImageUrl = response.data.DocumentUrlBase64;

  //       console.log('New Image URL kapil ---------:', newImageUrl);
  
  //       if (newImageUrl !== this.self.state.ImagePicUrl) {
  //         await AsyncStorage.setItem('ImagePicUrl', newImageUrl);


  //       console.log('New Image URL kapil ----3333-----:', newImageUrl);
  //         this.self.setState({
  //           ImagePicUrl: newImageUrl,
  //           count: response.data.Remarks?.Count,
  //           Birthday: response.data.Remarks?.Birthday,
  //           Anniversary: response.data.Remarks?.Anniversary,
  //           RemarkDate: response.data.remarks,
  //           Quote: response.data.Remarks?.MotivaltionalQuote,
  //         });
  //       }
  //     }
  //     console.log('GetImageProfile called kapil -----22222');

  //   } catch (error) {
  //     console.log('GetImageProfile error:', error);
  //   }
  // };
  

  registerAddress = async () => {

    console.log("kapil------hit--------")
    try {
      const AuthToken = await AsyncStorage.getItem('AuthToken');
      const jsonValueClientID = await AsyncStorage.getItem('ClientId');
 


      console.log(
        'registerAddress called with:',
        this.self.state.latitude,
        this.self.state.longitude,
        this.self.state.formattedAddress,
        AuthToken,
        JSON.parse(jsonValueClientID)
      );
      const response = await axios.post(
      
        Endpoint.baseUrl + Endpoint.RegisterAddress,
        {
          latitude: this.self.state.latitude,
          longitude: this.self.state.longitude,
          address: this.self.state.formattedAddress,
        },
        {
          headers: {
            token: AuthToken, // Make sure AuthToken is not null
            ClientId: JSON.parse(jsonValueClientID), // Ensure it's not null and is valid JSON
          },
        }
      );
  
      console.log('Address registered successfully:', response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.log('Address is not registered. Server error:', error.response.status);
        console.log('Error response data:', error.response.data);
      } else if (error.request) {
        // Request made but no response received
        console.log('No response received:', error.request);
      } else {
        // Something went wrong in setting up the request
        console.log('Error in request setup:', error.message);
      }
    }
  };
}


handleTokenExpiration = (error) => {
  
  
  if (error?.response?.status === 401) {
    AsyncStorage.setItem('IsAuthenticated', 'false');
    AsyncStorage.removeItem('AuthToken');

      navigate('AuthStack');
   
  }
};
