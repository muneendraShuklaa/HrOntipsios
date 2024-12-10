import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class DashboardHelper {
  constructor(self) {
    this.self = self;
  }
  UserData = async () => {
    this.self.setState({isloading: true});
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
        alert('Please Enter Valid Credentials');
        // console.warn("guggsgggdsy", error);
      });
  };

  ClockInOut = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');
    console.log(
      this.self.state.longitude,
      this.self.state.latitude,
      EmpId,
      jsonValueClientID,
      jsonValue,
      'leave value',
    );
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
        console.log('ClockIn...........Details :', response);
      })
      .catch(function (error) {
        alert('ClockIn Request Failed');
      });
  };
  ClockOut = async () => {
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    console.log(
      this.self.state.longitude,
      this.self.state.latitude,
      EmpId,
      jsonValueClientID,
      jsonValue,
      'leave value',
    );
    let formData = new FormData();
    formData.append('longtitude', this.self.state.longitude);
    formData.append('Comment', 'test mayank clockout using hrontips 2.0');
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
        console.log('Clockout...........Details :', response.data);
      })
      .catch(function (error) {
        alert('Clockout Request Failed');
      });
  };

  track = async () => {
    // alert('hhhhhh');
    this.self.setState({isloading: true});
    console.log('clockkusing locationn');
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
        console.log('ClockIn location base data ==========>', response.data);
        this.self.toggleStopwatch();
        this.self.setState({play: true});
        // await AsyncStorage.setItem('Name', response.data.FirstName)
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  TimeTracker = async () => {
    console.log('Clocking datata locationn');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    await axios
      .post(
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
        },
      )
      .then(async response => {
        // console.log('ClockIn.allready data..', response.data);
        // await AsyncStorage.setItem(
        //   'allreadyLogin',
        //   moment(String(response.data[0].StartTime)).unix().toString(),
        // );

        const starTime = response?.data?.[0]?.StartTime;
        if (starTime) {
          this.self.setState({
            play: true,
            stopwatchStartTime: moment().diff(
              moment.utc(String(response.data[0].StartTime)),
              'milliseconds',
            ),
            // .subtract(50000, 'milliseconds')
          });
          this.self.toggleStopwatch();
          // this.self.setState({
          //   play: false,
          // });
        }
        // const clockIn = moment(String(response.data[0].StartTime)).format(
        //   'LTS',
        // );
        // alert(clockIn);
        // format('LTS');
        this.self.setState({
          allreadyLogin: moment(String(response.data[0].StartTime))
            .add(5, 'h')
            .add(30, 'm')
            .format('LT'),

          StatusClockin: response.data[0].StatusId,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
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
        // console.log('Remark date is ----->', response.data);
        await AsyncStorage.setItem(
          'ImagePicUrl',
          response.data.DocumentUrlBase64,
        );

        this.self.setState({
          ImagePicUrl: response.data.DocumentUrlBase64,
          count: response.data.Remarks.Count,
          Birthday: response.data.Remarks.Birthday,
          Anniversary: response.data.Remarks.Anniversary,
          RemarkDate: response.data.remarks,
          Quote: response.data.Remarks.MotivaltionalQuote,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response.data.message);
        console.log('Remarks date error=======>', error);
      });
  };
}
