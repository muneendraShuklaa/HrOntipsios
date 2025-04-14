import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Endpoint from "../../../Utils/Endpoint";

export default class RegularizationHelper{
    constructor(self){
        this.self=self
    }

    
    saveCommentForApproval = async () => {
// save button code comment
        this.self.setState({ isloading: true });
        const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');

        const AuthToken = await AsyncStorage.getItem('AuthToken');
        //format of AttendanceDate YYYY-MM-DD
        // format of time hh:mm:ss | hh:mm in 24 hours
        // console.log(this.self.state,'self---');
        
        await axios.post(
            Endpoint.baseUrl + Endpoint.ApproveRejectAttendanceRequest,
            {
                Id: this.self.state.Id,
                ClientId:clientid,
                Status:this.self.state.Status,
                Comment:this.self.state.comment,
                EmpId:this.self.state.EmpIdForApproval
            },
        ).then(
            async response => {
                // console.log(response, 'resp bindiata');

                // this.self.setState({

                // })
            }
        )
    }
    
  
    bindAttendanceGrip = async () => {
// save button code comment
        this.self.setState({ isloading: true });
        const EmpId = await AsyncStorage.getItem('EmpId');
        const clientid = await AsyncStorage.getItem('ClientId');

        const AuthToken = await AsyncStorage.getItem('AuthToken');
        // console.log(AuthToken,'AuthToken--');
        
        const jsonValueUserType = await AsyncStorage.getItem('UserType');
        //format of AttendanceDate YYYY-MM-DD
        // format of time hh:mm:ss | hh:mm in 24 hours
        await axios.post(
            Endpoint.baseUrl + Endpoint.BindApprovalAttendanceGrid_API,
            {
                "empId": EmpId,
                "clientId": clientid,
                "usertype": jsonValueUserType
            },
            {
                headers: {
                    "token": AuthToken,
                    "ClientId": clientid
                  }
            }
        ).then(
            async response => {
                this.self.setState({
                    regularizationData:response?.data?.Table
                })
            }
        )
    }





}