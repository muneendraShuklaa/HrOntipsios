//
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';
// import(alert);
export default class DSRHelper {
  constructor(self) {
    this.self = self;
  }
  dsrData = async () => {
    console.log('tasklistt');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.TaskList,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          keyId: this.self.state.list,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response.data.Table);
        this.self.setState({
          DSR: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };

  ImageDataData = async () => {
    console.log('tasklistt');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.GetTaskImages,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          taskId: this.self.state.TaskIdd,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response.data.Table);
        let doc = response.data.map(val => {
          return val.doc;
        });
        this.self.setState({
          TaskPic: response.data,
          doc: doc,
        });
      })
      .catch(function (error) {});
  };

  deletetask = async () => {
    console.log('tasklistt');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.DeleteTask,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          taskid: this.self.state.TaskIdd,
        },
        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )
      .then(async response => {
        console.log('gdfgdfhdfhdf', response.data.Table);

        this.self.setState({
          DSR: response.data.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  // ;
  UpdatePriority = async () => {
    console.log(
      'tasklisttklkkklklkl' + this.self.state.PriorityTypee,
      this.self.state.TaskIdd,
    );
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.UpdatePriority,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          taskId: this.self.state.TaskIdd,
          Priority: this.self.state.PriorityTypee,
        },

        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )

      .then(async response => {
        console.log(
          'tasklisttklkkklklkl' + this.self.state.PriorityTypee,
          this.self.state.TaskIdd,
        );
        this.self.setState({});
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  UpdateTasksStatus = async () => {
    console.log(
      'tasklisttklkkklklkl' + this.self.state.Status,
      this.self.state.TaskIdd,
    );
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    await axios
      .post(
        Endpoint.baseUrl + Endpoint.UpdateTasksStatus,
        {
          UserId: JSON.parse(jsonValue),
          ClientId: JSON.parse(jsonValueClientID),
          taskId: this.self.state.TaskIdd,
          Status: this.self.state.Status,
        },

        {
          headers: {
            token: AuthToken,
            clientid: JSON.parse(jsonValueClientID),
          },
        },
      )

      .then(async response => {
        console.log(
          'tasklisttklkkklklkl' + this.self.state.PriorityTypee,
          this.self.state.TaskIdd,
        );
        this.self.setState({});
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };

  AddImageOnTasklll = async () => {
    // alert('hghgshag');
    let photo = {uri: this.self.state.imageArray2};
    // let PPDf = {uri: this.self.state.selectedDocument};
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    var formdata = new FormData();
    console.log(
      'addimage' + JSON.parse(jsonValue).toString(),
      this.self.state.TaskIdd,
      this.self.state.imageArray2,
      JSON.parse(jsonValueClientID).toString(),
    );
    formdata.append('taskId', this.self.state.TaskIdd);
    formdata.append('UserId', jsonValue);
    formdata.append('ClientId', JSON.parse(jsonValueClientID));
    formdata.append(
      'DocPath',
      this.self.state.imageArray2,
      // {
      //   uri: photo.uri,
      //   name: 'image.jpg',
      //   type: 'image/jpeg',
      // },
    );

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        token: AuthToken,
        clientid: JSON.parse(jsonValueClientID),
      },
      body: formdata,
    };
    fetch(Endpoint.baseUrl + Endpoint.AddimageInTAsk, requestOptions)
      .then(response => response.text())
      //   .then(result => console.log(result,"...."))
      .then(result => {
        console.log('ad000imageee', result);
        this.self.setState({Success: true, imageselect: false});
        alert('Task Image Added Succesfully');
      })
      .catch(error => console.log('error', error));
  };
  AddImageOnTask = async () => {
    let photo = this.self.state.imageArray2;
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log(this.self.state.imageArray2, ' add tasskk......');
    let formData = new FormData();
    formData.append('taskId', this.self.state.TaskIdd);
    formData.append('UserId', jsonValue);
    formData.append('ClientId', JSON.parse(jsonValueClientID));
    formData.append(
      'DocPath',
      // '',
      {
        uri: photo.path,
        name: 'image.jpg',
        type: photo.mime || 'image/jpeg',
      },
    );
    return axios({
      url: Endpoint.baseUrl + Endpoint.AddimageInTAsk,
      method: 'POST',
      data: formData,
      headers: {
        token: AuthToken,
        'Content-Type': 'multipart/form-data',
        clientid: JSON.parse(jsonValueClientID).toString(),
      },
    })
      .then(async response => {
        console.log('image addeddd', response);
        // this.self.props.navigation.navigate('MyTask');
      })
      .catch(function (error) {
        // alert(response.data.message);
        console.warn('guggsgggdsy', error);
      });
  };
}
