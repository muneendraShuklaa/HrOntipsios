import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Endpoint from "../../../Utils/Endpoint";
export default class RegularisationStatusHelper {
    constructor(self) {
        this.self = self;
    }

    BindData = async (signal) => {
        this.self.setState({ isloading: true });
        const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');
        const AuthToken = await AsyncStorage.getItem('AuthToken');
        // console.log(EmpId,clientid,'test--');

        // console.log(this.self.state,'selfstate====');


        await axios.post(
            Endpoint.baseUrl + Endpoint.BindRegularisationData,
            null,
            {
                params: {
                    EmpId: EmpId,
                    ClientId: JSON.parse(clientid)
                },
                signal,
            }
        ).then(
            async response => {
                // console.log(response, 'resp bindiata');
                if (this.self.isMountedComponent) {
                    this.self.setState({
                        regularizationStatusData: response?.data?.Table,

                    })
                }
            }
        )
    }


    SaveRegularReq = async () => {

        this.self.setState({ isloading: true });
        const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');

        const AuthToken = await AsyncStorage.getItem('AuthToken');
        // console.log(clientid,'clientid--');

        //format of AttendanceDate YYYY-MM-DD
        // format of time hh:mm:ss | hh:mm in 24 hours
        // console.log({
        //     "EmpId": EmpId,
        //     "AttendanceDate": this.self.state.selectedDate.dateString,
        //     "InAT": this.self.state.clockInTime,
        //     "OutAt": this.self.state.clockOutTime,
        //     "Reason": null,
        //     "Comment": this.self.state.comment
        // },'this--status--');
        // return


        await axios.post(
            Endpoint.baseUrl + Endpoint.SaveRegularisationReq,
            {
                "EmpId": EmpId,
                "AttendanceDate": this.self.state.selectedDate.dateString,
                "InAT": this.self.state.clockInTime,
                "OutAt": this.self.state.clockOutTime,
                "Comment": this.self.state.comment,
                "ClientId": JSON.parse(clientid)
            },

        ).then(
            async response => {
                // console.log(response, 'resp saveregular');

                // this.self.setState({

                // })
            }
        )
    }

}