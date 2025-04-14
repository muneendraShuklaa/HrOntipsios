import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class DSREditHelper {
  constructor(self) {
    this.self = self;
  }

  EditttDsr = async () => {
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log(
      this.self.state.DSRDate,
      jsonValue,
      JSON.parse(jsonValueClientID).toString(),
      this.self.state.projectCategoryCodeid,
      this.self.state.ProjectId,
      this.self.state.projectCategory,
      this.self.state.editcomment,
      this.self.state.DsrStatus,
      this.self.state.hour,
      'editttt',
    );
    var formdata = new FormData();
    formdata.append('UserId', jsonValue);
    formdata.append('ClientId', JSON.parse(jsonValueClientID).toString());
    formdata.append('ProjectModuleId', this.self.state.ProjectModuleId);
    formdata.append('CategoryCode', this.self.state.projectCategory);
    formdata.append('ProjectId', this.self.state.ProjectId);
    formdata.append('ProjectCategoryId', this.self.state.projectCategoryCodeid);
    formdata.append(
      'Comments',
      this.self.state.editcomment || this.self.state.Comments,
    );
    formdata.append('DSRDate', this.self.state.DSRDate);
    formdata.append('Type', 'T');
    formdata.append(
      'Hours',
      this.self.state.hour || this.self.state.TotalHours,
    );
    formdata.append('receiptName', '');
    // formdata.append("receiptName", this.self.state.imageArray2 ? { uri: photo.uri, name: 'image.jpg', type: 'image/jpeg' }
    //     : { uri: PPDf.uri, name: 'abcd.pdf', type: 'application/pdf' })

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        token: AuthToken,
        clientid: JSON.parse(jsonValueClientID).toString(),
      },
      body: formdata,
    };
    fetch(Endpoint.baseUrl + Endpoint.AddDsr, requestOptions)
      .then(response => response?.text())
      //   .then(result => console.log(result,"...."))

      .then(result => {
        console.log('get Add data...adddtata', result);
        this.self.setState({Success: true});
        this.self.props.navigation.navigate('bottomTabBarr');
      })
      .catch(error => console.log('error', error));
  };
  Dropdowntaskcate = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log('DSR', AuthToken, JSON.parse(jsonValueClientID));

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.Dropdowntaskcate,
        {
          UserId: jsonValue,
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
        console.log('Dropdowntaskcate', response?.data);
        let category = response?.data.map(val => {
          return val.Category;
        });

        this.self.setState({
          //   Dropdowntaskcate: response.data.Table,
          dropcategory: category,
          dropcategoryData: response?.data,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response?.data?.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
