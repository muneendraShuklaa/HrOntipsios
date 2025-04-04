import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Endpoint from "../../../Utils/Endpoint";

export default class ManageAttendanceHelper {
    constructor(self) {
        this.self = self;

    }
    BindData = async (signal) => {

        this.self.setState({ isLoading: true });
        const userId = await AsyncStorage.getItem('UserId');
        // const userId = await AsyncStorage.setItem('UserId', response?.data?.UserId.toString());
        const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');
        const AuthToken = await AsyncStorage.getItem('AuthToken');
        const jsonValueUserType = await AsyncStorage.getItem('UserType');

        //   console.log(this.self.state,'self state---');
// console.log(  {
//     "RoleId": jsonValueUserType,
//     "UserId": userId,
//     "ClientId": clientid,
//     "EmpId": EmpId,
//     "Date": this.self.state.selectedDate,
//     "Search": this.self.state.Search,
//     "SortBy": this.self.state.Status ? this.self.state.Status : "all",
//     "Page": "1",
//     "PageSize": "100",
// },'liveda---');
// console.log({
//     "token": AuthToken,
//     "ClientId": clientid
// },'toclcie---');


        await axios.post(
            Endpoint.baseUrl + Endpoint.BindManageAttend,
            {
                "RoleId": jsonValueUserType,
                "UserId": userId,
                "ClientId": clientid,
                "EmpId": EmpId,
                "Date": this.self.state.selectedDate,
                "Search": this.self.state.Search,
                "SortBy": this.self.state.Status ? this.self.state.Status : "all",
                "Page": "1",
                "PageSize": "100",
            },
            {
                headers: {
                    "token": AuthToken,
                    "ClientId": clientid
                },
                signal,
            }
        ).then(
            async response => {
                // console.log(response, 'resp bind manage attend--');
                if (this.self.isMountedComponent) {
                this.self.setState({
                    bindLeaveManagement: response?.data?.Table,
                    LeaveTypeData: response?.data?.Table2,
                    isLoading: false
                })
            }
            }
        ).catch((error)=>{
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else {
                console.error("Error fetching data:", error);
            }
        })
    }
    InsertUpdateLeave = async () => {

        this.self.setState({ isLoading: true });
        const userId = await AsyncStorage.getItem('UserId');
        // const userId = await AsyncStorage.setItem('UserId', response?.data?.UserId.toString());
        // const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');
        const AuthToken = await AsyncStorage.getItem('AuthToken');
        const jsonValueUserType = await AsyncStorage.getItem('UserType');

 

// console.log({
//     "UserId": userId,
//     "ClientId": clientid,
//     "EmpId": this.self.state.EmpId,
//     "date": this.self.state.selectedDate,
//     "LeaveCode": this.self.state.selectedLeave.LeaveType,
//     "LeaveDuration": this.self.state.leaveDuration
   
// },'InsertUpdateLeave--');

// console.log({
//     "token": AuthToken,
//     "ClientId": clientid
// },'toek');



        await axios.post(
            Endpoint.baseUrl + Endpoint.insertUpdateLeave,
            {
                "UserId": userId,
                "ClientId": clientid,
                "EmpId": this.self.state.EmpId,
                // "EmpId": EmpId,
                "Date": this.self.state.selectedDate,
                "LeaveCode": this.self.state.selectedLeave.LeaveType,
                "LeaveDuration": this.self.state.leaveDuration,
                // "LeaveDurationType": "H",
               
            },
            {
                headers: {
                    "token": AuthToken,
                    "ClientId": clientid
                }
            }
        ).then(
            async response => {
                // console.log(response.data, 'insert leave resp--');

                this.self.setState({
                    // bindLeaveManagement: response?.data?.Table,
                    // LeaveTypeData: response?.data?.Table2,
                    isLoading: false
                })
            }
        )
    }
    UpdateInAndOut = async () => {

        this.self.setState({ isLoading: true });
        const userId = await AsyncStorage.getItem('UserId');
        // const userId = await AsyncStorage.setItem('UserId', response?.data?.UserId.toString());
        // const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');
        const AuthToken = await AsyncStorage.getItem('AuthToken');
        const jsonValueUserType = await AsyncStorage.getItem('UserType');

 
// console.log({
//     "UserId": userId,
//     "ClientId": clientid,
//     "EmpId": EmpId,
//     "date": this.self.state.selectedDate
// });



        await axios.post(
            Endpoint.baseUrl + Endpoint.insertUpdateInAndOut,
            {
                "UserId": userId,
                "ClientId": clientid,
                "EmpId": this.self.state.EmpId,
                "date": this.self.state.selectedDate
            },
            {
                headers: {
                    "token": AuthToken,
                    "ClientId": clientid
                }
            }
        ).then(
            async response => {
                // console.log(response, 'manage clockinout----');

                // this.self.setState({
                //     bindLeaveManagement: response.data.Table,
                //     LeaveTypeData: response.data.Table2,
                //     isLoading: false
                // })
            }
        )
    }
}