import React,{
    Component
} from "react";
import Utils from "../../../Utils";
import { vw } from "../../../Utils/dimentions";
import { withMyHook } from "../../../Utils/Dark";
import AddReimbursementHelper from "./helper";
import { SafeAreaView } from "react-native-safe-area-context";
class AddReimbursement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvedIndex: '-1',
            loading: false,
            error: null,
            reimbursements: [],
            hrReimbursements: [],
        };
        this._isMounted=false;
        this.helper = new AddReimbursementHelper(this)
    }
    render(){
        return(<SafeAreaView>

        </SafeAreaView>)
    }

}
export default withMyHook(AddReimbursement)