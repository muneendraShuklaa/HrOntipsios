import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../../../Utils/Endpoint';

export default class EmpListHelper {
  constructor(self) {
    this.self = self;
  }
  EmpList = async text => {
    this.self.setState({isloading: true});
    const EmpId = await AsyncStorage.getItem('EmpId');
    const jsonValueClientID = await AsyncStorage.getItem('ClientId');
    const AuthToken = await AsyncStorage.getItem('AuthToken');

    await axios
      .post(
        Endpoint.baseUrl + Endpoint.MyTeam,
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
        console.warn('get_data', response?.data);
        console.warn('iiiiiiiiiiiiii', response?.data?.Table);
        this.self.setState({
          TeamTrack: response?.data?.Table,
          markers: response?.data?.Table?.map(marker => {
            return {
              title: marker['FirstName'],
              coordinates: {
                latitude: parseFloat(marker['Latitude']),
                longitude: parseFloat(marker['Longitude']),
              },
            };
          }),
          // TeamTrackLat: response.data.result.teamTrackerResponse.Latitude,
          // TeamTrackLong: response.data.result.teamTrackerResponse.Longitude
        });
      })
      .catch(function (error) {
        console.warn('gogoago', error);
      });
  };
}
