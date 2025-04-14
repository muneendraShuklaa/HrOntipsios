import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Endpoint from "../../../Utils/Endpoint";
import moment from "moment";

export default class AttendanceReportHelper {
    constructor(self) {
        this.self = self;
    }

    GetEmployeeData = async (signal) => {

        this.self.setState({ isLoading: true })
        const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');
        const AuthToken = await AsyncStorage.getItem('AuthToken');

        await axios.post(Endpoint.baseUrl + Endpoint.EmpAttendance,
            {
                "EmpId": EmpId,
                "FromDate": this.self.state.FromDate,
                "ToDate": this.self.state.ToDate,
                "FilterType": this.self.state.durationStatus == "Today" ? "Current Date" : this.self.state.durationStatus,
                "ClientId": clientid
            },
            {
                headers: {
                    "token": AuthToken,
                    "ClientId": clientid
                },
                signal,
            }
        ).then(async response => {
            if (this.self.isMountedComponent) {
                this.self.setState({
                    isLoading: false,
                    empAttendanceList:response.data.Table
                })
            }
        }).catch((error) => {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else {
                console.error("Error fetching data:", error);
            }
        })
    }


}