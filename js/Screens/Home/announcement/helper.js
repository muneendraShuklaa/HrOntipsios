//
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class AnnouncementHelper {
  constructor(self) {
    this.self = self;
  }
  AnnouncementData = async () => {
    console.log('Comment');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const RoleId = await AsyncStorage.getItem('RoleId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    console.log('Role id is ======>', RoleId);
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.Announcement,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
          RoleId: RoleId,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        // console.log('Announcement------->>', response.data);
        this.self.setState({
          Announcement: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  PostAnnoucement = async () => {
    console.log('Button is clicked ---------');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const EmpId = await AsyncStorage.getItem('EmpId');
    const RoleId = await AsyncStorage.getItem('RoleId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const jsonValue = await AsyncStorage.getItem('UserId');

    var formdata = new FormData();
    // console.log('Comments--------->', this.self.state.Comments);
    formdata.append('CurrentUserId', jsonValue);
    formdata.append('ClientId', JSON.parse(jsonValueClientID).toString());
    formdata.append('RoleId', JSON.parse(RoleId).toString());
    formdata.append('Heading', this.self.state.subject);
    formdata.append('Message', this.self.state.Comments);
    formdata.append('Type', this.self.state.Type);
    formdata.append('FromTime', this.self.state.Date);
    formdata.append('ToTime', this.self.state.Date);

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        token: AuthToken,
        clientid: JSON.parse(jsonValueClientID).toString(),
      },
      body: formdata,
    };
    fetch(Endpoint.baseUrl + Endpoint.AddAnnoucement, requestOptions)
      .then(response => response.text())
      //   .then(result => console.log(result,"...."))
      .then(result => {
        // console.log('Annoucement Responce=======>', result);
        this.self.setState({modalVisible: false});
      })
      .catch(error => console.log('error', error));
  };

  AnnoucementType = async () => {
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.AnnoucementType,
        {
          EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        // console.log('Announcement Type ------->>', response.data);
        let ClientDescription2 = response.data.Table.map(val => {
          return val.Fieldvalue;
        });
        // console.log('Announcement Type ------->>', ClientDescription2);

        this.self.setState({
          Announcementtype: ClientDescription2,
        });
      })
      .catch(function (error) {
        // console.warn("guggsgggdsy", error);
      });
  };
}
