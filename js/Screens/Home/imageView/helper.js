import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';
import moment from 'moment';

export default class ImageHelper {
  constructor(self) {
    this.self = self;
  }

  Imagegeg = async () => {
    // this.self.setState({ isloading: true })
    // console.log("Leave",EmpId,AuthToken)
    const AuthToken = await AsyncStorage.getItem('AuthToken');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');

    console.log('LeaveApprovall', this.self.state.SupportDocument);

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.imageView + this.self.state.SupportDocument,
        {
          //   EmpId: EmpId,
          ClientId: JSON.parse(jsonValueClientID),
          //   Usertype: JSON.parse(jsonValueUserType),
        },
        {
          headers: {
            token: AuthToken,
            ClientId: JSON.parse(jsonValueClientID),
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('gdfgdfhdfhdf');
        console.log(JSON.stringify(response.data));
        this.self.setState({
          Imagee: JSON.stringify(response.data),
        });
      })
      .catch(function (error) {
        // alert("Please Enter Valid Credentials")
        // alert(response.data.message);
        // console.warn("guggsgggdsy", error);
      });
  };
}
