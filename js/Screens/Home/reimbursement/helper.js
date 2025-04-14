import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Endpoint from "../../../Utils/Endpoint";
import moment from "moment";
import ApiService from "../../../Utils/apiService";

export default class ViewReinmbursementHelper {
    constructor(self) {
        this.self = self;
    }

    async getEmployeeReimbursementData() {
        this.self.setState({ loading: true, error: null });
        try {

            const EmpId = await AsyncStorage.getItem('EmpId');
            const ClientId = await AsyncStorage.getItem('ClientId');
            const Token = await AsyncStorage.getItem('AuthToken');


            const data = await ApiService.request({
                method: 'post',
                url: Endpoint.EmpReimbursement,
                params: {},
                data: {
                    Empid: EmpId,
                    ClientId: ClientId.toString(),
                },
                headers: {
                    token: Token?.toString(),
                    ClientId: ClientId?.toString(),
                },
                useCache: true
            })
// console.log(data,'data---');

            if (this.self._isMounted) {
                this.self.setState({
                    reimbursements: data,
                    loading: false
                })
            }
        } catch (error) {
            console.log(error,'error--');
            
            if (this.self._isMounted) {
                this.self.setState({ error: error.message, loading: false })
            }
        }

    }

    async getHrReimbursementData(){
        this.self.setState({ loading: true, error: null });
       try {
        const EmpId = await AsyncStorage.getItem('EmpId');
        const ClientId = await AsyncStorage.getItem('ClientId');
        const Token = await AsyncStorage.getItem('AuthToken');

        const data=await ApiService.request({
            method:'post',
            url:Endpoint.HrReimbursement,
            params:{},
            data:{
                EmpId:EmpId,
                ClientId:ClientId.toString()
            },
            headers: {
                token: Token?.toString(),
                ClientId: ClientId?.toString(),
            },
            useCache: true
        })
        console.log(data,'data hr---');
        if (this.self._isMounted) {
            this.self.setState({
                hrReimbursements: data,
                loading: false
            })
        }
       } catch (error) {
        console.log(error,'error--');      
        if (this.self._isMounted) {
            this.self.setState({ error: error.message, loading: false })
        }
       }
    }
}