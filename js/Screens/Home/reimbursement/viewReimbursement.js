import React, { Component } from "react";
import ViewReimbursementHelper from "./helper";
import { withMyHook } from "../../../Utils/Dark";
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import Utils from "../../../Utils";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { vw } from "../../../Utils/dimentions";


class ViewReimbursement extends Component {
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
        this.helper = new ViewReimbursementHelper(this)
    }

    componentDidMount() {
        this._isMounted=true;
        setTimeout(() => {
            this.helper.getHrReimbursementData();
            this.helper.getEmployeeReimbursementData();
        }, 600);
    }

    componentWillUnmount(){
        this._isMounted=false;
    }


    render() {
        const { loading, error, reimbursements } = this.state;
        if (loading) return <ActivityIndicator />;
        if (error) return <Text style={{ color: 'red' }}>{error}</Text>;

        return (

            <SafeAreaView>
                <View style={{
                    flex: 1,
                    backgroundColor: this.props.themeColor.BackPagecolor
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            style={{ flexDirection: 'row', height: 60, width: '100%' }}
                            source={Utils.icons.buttonnBacl}>
                            <Image
                                source={Utils.icons.Back}
                                style={{
                                    alignSelf: 'center',
                                    marginRight: 10,
                                    marginLeft: 20,
                                    tintColor: '#fff',
                                }}
                            />
                            <Text
                                style={[
                                    Utils.fontStyle.FontFamilymachoB,
                                    { color: '#fff', fontSize: 20, alignSelf: 'center' },
                                ]}>
                                Reimbursement
                            </Text>
                            <TouchableOpacity 
                            style={{
                                alignSelf: 'center',
                                marginRight: vw(20),
                                position:'absolute',
                                right:0
                            }}
                            onPress={()=>{
                                // this.props.navigate('AddReimbursement')
                            }}>

                            <View >
                                <Icon name="plus" size={25} color="#fff" />
                            </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                {/* {reimbursements.map((item, index) => (
                    <Text key={index}>{item.description}</Text>
                ))} */}
            </SafeAreaView>

        );
    }
}

export default withMyHook(ViewReimbursement);