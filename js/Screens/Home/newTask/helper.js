import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';

export default class taskdata {
  constructor(self) {
    this.self = self;
  }
  UpdateTask = async () => {
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    var formdata = new FormData();
    console.log(
      'savetask' + jsonValue,
      JSON.parse(jsonValueClientID).toString(),
      this.self.state.Task,
      this.self.state.AssignCode,
      this.self.state.projectpriority,
      this.self.state.projectCategoryCodeid,
      new Date(this.self.state.selectedDate?.dateString).toISOString(),
      this.self.state.discribe,
    );
    formdata.append('taskId', this.self.state.TaskIdd);
    formdata.append('Status', this.self.state.Status);
    formdata.append('userid', jsonValue);

    formdata.append('clientid', JSON.parse(jsonValueClientID).toString());
    formdata.append('taskName', this.self.state.Task);
    formdata.append('AssigntoId', this.self.state.AssignCode);
    formdata.append('priority', this.self.state.projectpriority);
    formdata.append('category', this.self.state.projectCategoryCodeid);
    // formdata.append('result', '');

    formdata.append(
      'Duedate',
      new Date(this.self.state.selectedDate?.dateString).toISOString(),
    );
    // formdata.append('DocName', '');
    formdata.append('FileName', '');
    formdata.append('taskdetails', this.self.state.discribe);

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
    fetch(Endpoint.baseUrl + Endpoint.UpdateTask, requestOptions)
      .then(response => response?.text())
      //   .then(result => console.log(result,"...."))
      .then(result => {
        console.log('get Add data...adddtata', result);
        this.self.setState({ Success: true });
        this.self.props.navigation.navigate('MyTask');
        // this.self.props.route.params.refetch();
      })
      .catch(error => console.log('error', error));
  };
  // AddrrrrTask = async () => {
  //   let photo = this.self.state.imageArray2;
  //   const jsonValue = await AsyncStorage.getItem('UserId');
  //   const jsonValueClientID = await AsyncStorage.getItem('ClientId');
  //   const AuthToken = await AsyncStorage.getItem('AuthToken');
  //   console.log(this.self.state.imageArray2, ' add tasskk......');

  //   var formdata = new FormData();
  //   console.log(
  //     'savetask' + jsonValue,
  //     JSON.parse(jsonValueClientID).toString(),
  //     this.self.state.Task,
  //     this.self.state.AssignCode,
  //     this.self.state.projectpriority,
  //     this.self.state.projectCategoryCodeid,
  //     new Date(this.self.state.selectedDate?.dateString).toISOString(),
  //     this.self.state.discribe,
  //     // this.self.state.imageArray2,
  //   );
  //   formdata.append('userid', jsonValue);
  //   formdata.append('clientid', JSON.parse(jsonValueClientID).toString());
  //   formdata.append('taskName', this.self.state.Task);
  //   formdata.append('AssigntoId', this.self.state.AssignCode);
  //   formdata.append('priority', this.self.state.projectpriority);
  //   formdata.append('category', this.self.state.projectCategoryCodeid);
  //   // formdata.append('result', '');

  //   formdata.append(
  //     'Duedate',
  //     new Date(this.self.state.selectedDate?.dateString).toISOString(),
  //   );
  //   formdata.append('startdate', new Date().toISOString());
  //   // formdata.append('DocName', '');
  //   formdata.append('FileName', {
  //     uri: photo.path,
  //     name: 'image.jpg',
  //     type: photo.mime || 'image/jpeg',
  //   }),
  //     formdata.append('taskdetails', this.self.state.discribe);

  //   // formdata.append("receiptName", this.self.state.imageArray2 ? { uri: photo.uri, name: 'image.jpg', type: 'image/jpeg' }
  //   //     : { uri: PPDf.uri, name: 'abcd.pdf', type: 'application/pdf' })

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       token: AuthToken,
  //       clientid: JSON.parse(jsonValueClientID).toString(),
  //     },
  //     body: formdata,
  //   };
  //   fetch(Endpoint.baseUrl + Endpoint.SaveTask, requestOptions)
  //     .then(response => response.text())
  //     //   .then(result => console.log(result,"...."))
  //     .then(result => {
  //       console.log('get Add data...adddtata', result);
  //       // this.self.setState({Success: true});
  //       this.self.props.navigation.navigate('MyTask');
  //       // this.self.props.route.params.refetch();
  //     })
  //     .catch(error => console.log('error', error));
  // };

  AddTask = async () => {
    let photo = this.self.state.imageArray2;
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log(this.self.state.imageArray2, ' add tasskk......');
    let formData = new FormData();
    formData.append('userid', jsonValue);
    formData.append('clientid', JSON.parse(jsonValueClientID).toString());
    formData.append('taskName', this.self.state.Task);
    formData.append('AssigntoId', this.self.state.AssignCode);
    formData.append('priority', this.self.state.projectpriority);
    formData.append('category', this.self.state.projectCategoryCodeid);
    formData.append(
      'Duedate',
      new Date(this.self.state.selectedDate?.dateString).toISOString(),
    );
    formData.append('startdate', new Date().toISOString());
    // formdata.append('DocName', '');
    formData.append(
      'FileName',
      '',
      // {
      //   uri: photo.path,
      //   name: 'image.jpg',
      //   type: photo.mime || 'image/jpeg',
      // }
    ),
      formData.append('taskdetails', this.self.state.discribe);
    return axios({
      url: Endpoint.baseUrl + Endpoint.SaveTask,
      method: 'POST',
      data: formData,
      headers: {
        token: AuthToken,
        'Content-Type': 'multipart/form-data',
        clientid: JSON.parse(jsonValueClientID).toString(),
      },
    })
      .then(async response => {
        console.log('ClockIn...', response);
        this.self.props.navigation.navigate('MyTask');
      })
      .catch(function (error) {
        // alert(response.data.message);
        console.warn('guggsgggdsy', error);
      });
  };
  AssignUser = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log('DSR', AuthToken, JSON.parse(jsonValueClientID));

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.AssignUser,
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
        let Name = response?.data?.Table?.map(val => {
          return val.Name;
        });

        this.self.setState({
          //   Dropdowntaskcate: response.data.Table,
          assignUsername: Name,
          Dropdownproject: response?.data?.Table,
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(response?.data?.message);
        // console.warn("guggsgggdsy", error);
      });
  };
  category = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)

    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log('cate', AuthToken, JSON.parse(jsonValueClientID));

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.Category,
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
        // console.log('cate', response?.data);

        // let Category = response?.data?.map(val => {
        //   return val.Category;
        // });


        // this.self.setState({
        //   //   Dropdowntaskcate: response.data.Table,
        //   Category: Category,
        //   dropcategoryData: response?.data
        // });




        if (Array.isArray(response?.data)) {
          let Category = response.data.map(val => val?.Category);
        
          this.self.setState({
            Category,
            dropcategoryData: response.data
          }, () => {
            console.log('Set state completed');
          });
        } else {
          console.warn('Expected response.data to be an array, got:', response?.data);
        }

      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        alert(error);
        // console.warn("guggsgggdsy", error);
      });
  };

  // AddffffImage = async () => {
  //   let photo = {uri: this.self.state.imageArray2};

  //   const jsonValue = await AsyncStorage.getItem('UserId');
  //   const jsonValueClientID = await AsyncStorage.getItem('ClientId');
  //   const AuthToken = await AsyncStorage.getItem('AuthToken');
  //   var formdata = new FormData();
  //   console.log(
  //     'savetask' + jsonValue,
  //     JSON.parse(jsonValueClientID).toString(),
  //     this.self.state.Task,
  //     this.self.state.AssignCode,
  //     this.self.state.projectpriority,
  //     this.self.state.projectCategoryCodeid,
  //     new Date(this.self.state.selectedDate?.dateString).toISOString(),
  //     this.self.state.discribe,
  //     {
  //       uri: photo.uri,
  //       name: 'image.jpg',
  //       type: 'image/jpeg',
  //     },
  //   );
  //   formdata.append('userid', jsonValue);
  //   formdata.append('clientid', JSON.parse(jsonValueClientID).toString());
  //   formdata.append('taskName', this.self.state.Task);
  //   formdata.append('AssigntoId', this.self.state.AssignCode);
  //   formdata.append('priority', this.self.state.projectpriority);
  //   formdata.append('category', this.self.state.projectCategoryCodeid);
  //   // formdata.append('result', '');

  //   formdata.append(
  //     'Duedate',
  //     new Date(this.self.state.selectedDate?.dateString).toISOString(),
  //   );
  //   formdata.append('startdate', new Date().toISOString());
  //   formdata.append('DocName', 'mayanktest.jpg');
  //   formdata.append('Docpath', {
  //     uri: photo.uri,
  //     name: 'image.jpg',
  //     type: 'image/jpeg',
  //   }),
  //     formdata.append('taskdetails', this.self.state.discribe);

  //   // formdata.append("receiptName", this.self.state.imageArray2 ? { uri: photo.uri, name: 'image.jpg', type: 'image/jpeg' }
  //   //     : { uri: PPDf.uri, name: 'abcd.pdf', type: 'application/pdf' })

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       token: AuthToken,
  //       clientid: JSON.parse(jsonValueClientID).toString(),
  //     },
  //     body: formdata,
  //   };
  //   fetch(Endpoint.baseUrl + Endpoint.SaveImageOnTask, requestOptions)
  //     .then(response => response.text())
  //     //   .then(result => console.log(result,"...."))
  //     .then(result => {
  //       console.log('addimage', result);
  //       // this.self.setState({Success: true});
  //       alert('image added success');
  //       // this.self.props.navigation.navigate('MyTask');
  //       // this.self.props.route.params.refetch();
  //     })
  //     .catch(error => console.log('error', error));
  // };
  AddImage = async () => {
    let photo = this.self.state.imageArray2;
    const jsonValue = await AsyncStorage.getItem('UserId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    console.log(this.self.state.imageArray2, ' add tasskk......');
    let formData = new FormData();
    formData.append('userid', jsonValue);
    formData.append('clientid', JSON.parse(jsonValueClientID).toString());
    formData.append('taskName', this.self.state.Task);
    formData.append('AssigntoId', this.self.state.AssignCode);
    formData.append('priority', this.self.state.projectpriority);
    formData.append('category', this.self.state.projectCategoryCodeid);
    // formdata.append('result', '');

    formData.append(
      'Duedate',
      new Date(this.self.state.selectedDate?.dateString).toISOString(),
    );
    formData.append('startdate', new Date().toISOString());
    formData.append('DocName', 'mayanktest.jpg');
    formData.append(
      'Docpath',
      // '',
      {
        uri: photo.path,
        name: 'image.jpg',
        type: photo.mime || 'image/jpeg',
      },
    ),
      formData.append('taskdetails', this.self.state.discribe);
    return axios({
      url: Endpoint.baseUrl + Endpoint.SaveImageOnTask,
      method: 'POST',
      data: formData,
      headers: {
        token: AuthToken,
        'Content-Type': 'multipart/form-data',
        clientid: JSON.parse(jsonValueClientID).toString(),
      },
    })
      .then(async response => {
        console.log('ClockIn...', response);
        this.self.props.navigation.navigate('MyTask');
      })
      .catch(function (error) {
        // alert(response.data.message);
        console.warn('guggsgggdsy', error);
      });
  };
}
