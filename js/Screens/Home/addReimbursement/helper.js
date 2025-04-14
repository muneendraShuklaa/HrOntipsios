import AsyncStorage from "@react-native-async-storage/async-storage";
import Endpoint from "../../../Utils/Endpoint";

export default class AddReimbursementHelper {

    constructor(self) {
        this.self = self
    }

    async ApplyReimbursement() {
        this.self.setState({ loading: true, error: null });
        try {
            const EmpId = await AsyncStorage.getItem('EmpId');
            const ClientId = await AsyncStorage.getItem('ClientId');
            const Token = await AsyncStorage.getItem('AuthToken');
            const data = await ApiService.request({
                method: 'post',
                url: Endpoint.ApplyWithoutImgReimbursement,
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
            });

            if (this.self._isMounted) {
                this.self.setState({
                    reimbursements: data,
                    loading: false
                })
            }
        } catch (error) {
            if (this.self._isMounted) {
                this.self.setState({ error: error.message, loading: false })
            }
        }
    }

}