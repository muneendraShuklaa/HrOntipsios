import React, { Component } from "react";
import { View, TouchableHighlight, TouchableOpacity, ImageBackground, Image, Text, TextInput, FlatList, TouchableNativeFeedback, Easing, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Utils from "../../../Utils";
import { withMyHook } from "../../../Utils/Dark";
import { normalize, screenWidth, vh, vw } from "../../../Utils/dimentions";
import {
    Calendar
} from 'react-native-calendars';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ManageAttendanceHelper from "./helper";
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyles from "../../../Components/GlobalStyles/globalStyles";

class ManageAttendance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            approvedIndex: '-1',
            isLoading: false,
            isVisible: false,
            leaveToggleIsVisible: false,
            attendStatusList: [
                "Status", "All", "Absent", "Present", "On Leave"
            ],
            LeaveTypeData: [],
            expandedItem: null,
            bindLeaveManagement: [],
            visibleData: [],
            currentPage: 1,
            pageSize: 15,
            EmpId: '',
            Status: 'All',
            Search: '',
            selectedDate: moment().format("YYYY-MM-DD"),
            // leaveCode: '',
            selectedLeave: "",
            leaveDuration: '',
            date: '',
            showClockIn: false,
            showClockout: false,
            showLeave: false,
            toggleInOut: false,
            userid: null

        }
        this.helper = new ManageAttendanceHelper(this);
        this.isMountedComponent = false;

    }
    componentDidMount() {
        this.isMountedComponent = true;
        this.abortController = new AbortController();
        this.helper.BindData(this.abortController.signal)
        this.loadMoreData();
    }

    componentWillUnmount() {
        this.isMountedComponent = false;
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    loadMoreData = () => {
        const { currentPage, pageSize, bindLeaveManagement, visibleData } = this.state;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        if (startIndex < bindLeaveManagement.length) {
            this.setState({
                visibleData: [...visibleData, ...bindLeaveManagement.slice(startIndex, endIndex)],
                currentPage: currentPage + 1,
            });
        }
    };
    // componentWillUnmount() {
    //     this.isMounted = false; 
    // }
    // validateManageAttendance=()={


    // }
    showPicker = (field) => {
        this.setState({ isVisible: true, selectedField: field });
    };

    hidePicker = () => {
        this.setState({ isVisible: false });
    };

    handleConfirm = (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        // const formattedTime = moment(date).format('hh:mm A');
        // console.log(formattedDate, 'forated--');

        this.setState({
            selectedDate: formattedDate
        });
        this.hidePicker();
    };


    toggleExpand = (id) => {
        this.setState((prevState) => ({
            expandedItem: prevState.expandedItem === id ? null : id,
        }));

        Easing.out(Easing.quad)
    };
    getButtonWithStatus = (statuss, workingtime, id, type, InAt, OutAt) => {
        let showClockIn;
        let showLeave;
        let showClockout;
        let workingtimes;

        // if (statuss == "Absent") {
        //     showClockIn = true;
        //     showLeave = true;
        // }

        // if (statuss == "Present" && workingtimes) {

        //     showLeave = false;
        //     showClockIn = true;

        // }
        if (statuss == 'Absent') {
            showLeave = true;
        }
        if (workingtime != null &&
            workingtime != "" &&
            InAt != null &&
            OutAt != null &&
            type == "Clock Out") {
            workingtimes = true;
            // showLeave=false;
        }
        if (type == "ClockIn") {
            showClockIn = false;
            showClockout = true;
        } else {

            // showLeave=true;
            showClockIn = true;
            showClockout = false;
        }





        // if (statuss == "Present" && !workingtimes) {
        //     showClockout = true;
        //     showLeave = false;
        // }

        // if (statuss == "On Leave") {
        //     showClockIn = true;
        //     showLeave = false;

        // }

        return { showClockout, showClockIn, showLeave, workingtimes }


    }
    // getButtonWithStatus = (statuss, workingtime = false, id) => {
    //     let showClockIn;
    //     let showLeave;
    //     let showClockout;
    //     let workingtimes = workingtime;

    //     if (statuss == "Absent") {
    //         showClockIn = true;
    //         showLeave = true;
    //     }

    //     if (statuss == "Present" && workingtimes) {

    //         showLeave = false;
    //         showClockIn = true;

    //     }


    //     if (this.state.toggleInOut=="ClockIn" && this.state.EmpId==id) {


    //         showClockIn = false;
    //         showClockout = true;
    //     }
    //     if (this.state.toggleInOut=="Clock Out" && this.state.EmpId==id) {

    //         showClockout = false;
    //         showClockIn = true;
    //     }

    //     if (statuss == "Present" && !workingtimes) {
    //         showClockout = true;
    //         showLeave = false;
    //     }

    //     if (statuss == "On Leave") {
    //         showClockIn = true;
    //         showLeave = false;

    //     }

    //     return { showClockout, showClockIn, showLeave }


    // }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Utils.color.HeaderColor
            }}>
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
                                Manage Attendance
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={[globalStyles.calendarBtnView, {
                        backgroundColor: this.props.themeColor.theameColor,
                    }]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.showPicker('inTime');
                            }}
                            style={globalStyles.calendarBtnStyle}>
                            <FontAwesomeIcon
                                name="calendar"
                                size={vw(20)}
                                style={{
                                    color: '#3083EF',
                                }}
                            />

                            <TextInput
                                style={globalStyles.calendarBtnTxt}
                                placeholder="Select Date"
                                placeholderTextColor="grey"
                                editable={false}
                            >
                                {this.state.selectedDate ? moment(this.state.selectedDate).format("MMM, DD, YYYY") : "Select Date"}
                            </TextInput>
                        </TouchableOpacity>
                        <SelectDropdown
                            data={this.state.attendStatusList}

                            defaultValue={'Dropdown'}

                            onSelect={(selectedItem, index) => {
                                this.setState({
                                    Status: selectedItem,

                                });
                                this.helper.BindData()
                            }}
                            defaultButtonText={'Leave Type'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={{
                                elevation: 5,
                                width: '48%',
                                // height: 50,
                                height: vh(55),
                                backgroundColor: '#FFF',
                                borderWidth: 1,
                                borderColor: Utils.color.bordercolor,
                                borderRadius: 8,
                            }}
                            renderDropdownIcon={isOpened => {
                                return (
                                    <FontAwesome
                                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                                        color={'#444'}
                                        size={18}
                                    />
                                );
                            }}
                            buttonTextStyle={{
                                color: '#444',
                                paddingLeft: 10,
                                textAlign: 'left',
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={{
                                marginTop: -25,
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,

                            }}
                            rowTextStyle={{
                                color: '#444',
                                textAlign: 'left',
                                marginLeft: vw(30),
                            }}
                        />
                    </View>
                    <FlatList
                        extraData={this.state.approvedIndex}
                        style={{ padding: vw(20), marginTop: vh(10), }}
                        contentContainerStyle={{
                            paddingBottom: vh(100)
                        }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.bindLeaveManagement}

                        // data={this.state.regularizationStatusData?.length > 0 ? this.state.regularizationStatusData : []}
                        keyExxtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            this.renderItem(item, index, this.props.isDark)
                        }
                        ListFooterComponent={
                            this.state.visibleData?.length < this.state.bindLeaveManagement?.length ? (
                                <TouchableOpacity onPress={this.loadMoreData} style={{ padding: 15, alignItems: 'center' }}>
                                    <Text style={{ color: 'blue', fontSize: 16 }}>Show More</Text>
                                </TouchableOpacity>
                            ) : null
                        }
                        ListEmptyComponent={
                            this.state.isLoading ? (
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <Text
                                        style={[
                                            Utils.fontStyle.TextSemiBold,
                                            { color: '#000', marginBottom: 10 },
                                        ]}>
                                        No Data Available
                                    </Text>
                                </View>
                            )
                        }
                    />
                    <DateTimePickerModal
                        isVisible={this.state.isVisible}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hidePicker}
                    />
                    <View style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        width: '95%',
                        bottom: vh(5),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderColor: '#3C97FF',
                        borderWidth: 1,

                        // paddingHorizontal: vw(15),
                        // paddingVertical: vh(15),
                        elevation: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        borderRadius: vw(30),
                        margin: vh(10)
                    }}>

                        <TextInput
                            style={{
                                flex: 1,
                                color: '#000',
                                // fontSize: 18,
                                // backgroundColor: '#fff',
                                marginLeft: 10,
                            }}
                            value={this.state.Search.toString()}
                            onChangeText={(txt) => {
                                this.setState({
                                    Search: txt
                                })
                                this.helper.BindData()
                            }}
                            placeholder="Search Employee"
                            placeholderTextColor="lightgrey"
                            editable={true}
                        >
                            {/* {this.state.selectedDate ? moment(this.state.selectedDate).format("MMM, DD, YYYY") : "Select Date"} */}
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ Search: '' })
                                this.helper.BindData();
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: screenWidth / 2,
                                width: vw(60),
                                height: vw(60),
                                backgroundColor: '#3C97FF'
                            }}>
                            <MaterialIcons name="close" size={vw(25)} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    isVisible={this.state.leaveToggleIsVisible}
                    transparent={true}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={500}
                    animationOutTiming={600}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={300}
                    useNativeDriver={true}
                    style={{ margin: vw(20) }}>
                    <View
                        style={{
                            height: 'auto',
                            width: '80%',
                            backgroundColor: '#fff',
                            borderRadius: 30,
                            alignSelf: 'center',
                            paddingVertical: vh(20)
                        }}>

                        <Text
                            style={[
                                Utils.fontStyle.FontFamilyExtraBold,
                                {
                                    color: '#000',
                                    marginBottom: vh(25),
                                    textAlign: 'center'
                                },
                            ]}>
                            Apply Leave
                        </Text>
                        <SelectDropdown
                            // data={this.state.LeaveTypeData.map(item => item?.LeaveName + ` (${item?.LeaveType})`)}
                            data={this.state.LeaveTypeData}

                            defaultValue={'Dropdown'}

                            onSelect={(selectedItem, index) => {
                                // console.log(selectedItem,'selectedteam-leaveCode-');

                                this.setState({
                                    // leaveCode: selectedItem
                                    selectedLeave: selectedItem
                                });
                                // this.helper.BindData()
                            }}
                            defaultButtonText={'Select Leave'}
                            buttonTextAfterSelection={(selectedItem, index) => selectedItem.LeaveName}
                            rowTextForSelection={(item, index) => item.LeaveName}
                            // buttonTextAfterSelection={(selectedItem, index) => {
                            //     return selectedItem;
                            // }}
                            // rowTextForSelection={(item, index) => {
                            //     return item;
                            // }}
                            buttonStyle={{
                                elevation: 5,
                                width: '80%',
                                height: vh(50),
                                backgroundColor: '#FFF',
                                borderWidth: 1,
                                borderColor: Utils.color.bordercolor,
                                borderRadius: 8,
                                alignSelf: 'center',
                                marginBottom: vh(10)
                            }}
                            renderDropdownIcon={isOpened => {
                                return (
                                    <FontAwesome
                                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                                        color={'#444'}
                                        size={18}
                                    />
                                );
                            }}
                            buttonTextStyle={{
                                color: '#444',
                                paddingLeft: 10,
                                textAlign: 'left',
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={{
                                marginTop: -25,
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,

                            }}

                            rowTextStyle={{
                                color: '#444',
                                textAlign: 'left',
                                marginLeft: vw(30),
                            }}
                        />
                        <SelectDropdown
                            data={[1, 2, 4, 6, 8]}
                            defaultValue={'Dropdown'}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, 'leaveduration--');

                                this.setState({
                                    leaveDuration: selectedItem
                                });
                                // this.helper.BindData()
                            }}
                            defaultButtonText={'Select Hours'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={{
                                elevation: 5,
                                width: '80%',
                                height: vh(50),
                                backgroundColor: '#FFF',
                                borderWidth: 1,
                                borderColor: Utils.color.bordercolor,
                                borderRadius: 8,
                                alignSelf: 'center'
                            }}
                            renderDropdownIcon={isOpened => {
                                return (
                                    <FontAwesome
                                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                                        color={'#444'}
                                        size={18}
                                    />
                                );
                            }}
                            buttonTextStyle={{
                                color: '#444',
                                paddingLeft: 10,
                                textAlign: 'left',
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={{
                                marginTop: -25,
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,

                            }}

                            rowTextStyle={{
                                color: '#444',
                                textAlign: 'left',
                                marginLeft: vw(30),
                            }}
                        />
                        <View style={{
                            flexDirection: 'row',
                            width: '90%',
                            justifyContent: 'space-between',
                            marginTop: vh(10),
                            padding: vh(20),
                            alignSelf: 'center'
                        }}>
                            <TouchableNativeFeedback
                                useForeground={true}
                                background={TouchableNativeFeedback.Ripple('#FF0000', false)}
                                onPress={() => {
                                    this.setState({
                                        leaveToggleIsVisible: false,
                                    })
                                }}
                            >
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#FF0000',
                                    width: vw(120),
                                    height: vw(33),
                                    backgroundColor: 'white',
                                    overflow: 'hidden',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    elevation: 5

                                }}>
                                    <Text style={
                                        [styles.Title,
                                        Utils.fontStyle.TextSemiBold, { textAlign: 'center', color: '#FF0000' }]}>Cancel</Text>

                                </View>
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback
                                useForeground={true}
                                background={TouchableNativeFeedback.Ripple('#3C97FF', false)}
                                onPress={() => {
                                    this.helper.InsertUpdateLeave()
                                    this.helper.BindData();
                                    this.setState({

                                        leaveToggleIsVisible: false
                                    })
                                }}
                            >
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#3C97FF',
                                    width: vw(120),
                                    height: vw(33),
                                    backgroundColor: '#3C97FF',
                                    overflow: 'hidden',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    elevation: 5

                                }}>
                                    <Text style={
                                        [styles.Title,
                                        Utils.fontStyle.TextSemiBold, { textAlign: 'center', color: '#fff' }]}>Save</Text>

                                </View>
                            </TouchableNativeFeedback>

                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }

    renderRowElement = ({ title, subTitle, value = '', subValue = ' ' }) => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: vh(10),
                //   width:'80%'
            }}>
                <View style={{
                    width: '60%'
                }}>
                    <Text style={
                        [styles.Title,
                        Utils.fontStyle.TextSemiBold, { color: '#3C97FF' }]}>{title}</Text>
                    <Text style={
                        [styles.Title,
                        Utils.fontStyle.FontFamilyRegular]}>{value}</Text>
                </View>
                <View style={{
                    width: '40%'
                }}>
                    <Text style={
                        [styles.Title,
                        Utils.fontStyle.TextSemiBold, { color: '#3C97FF' }]}>{subTitle}</Text>
                    <Text style={
                        [styles.Title,
                        Utils.fontStyle.FontFamilyRegular]}>{subValue}</Text>
                </View>
            </View>
        )
    }

    renderItem = (item, index, isDark) => {
        const { showClockIn, showClockout, showLeave, workingtimes } = this.getButtonWithStatus(item.Status,
            item.TotalTime,
            item.EmpId, item.Type, item.InAt, item.OutAt);
        return (
            <View style={{
                height: 'auto',
                width: '100%',
                borderColor: isDark ? '#fff' : '#000',
                borderTopStartRadius: 5,
                borderTopEndRadius: 5,
                borderBottomStartRadius: 5, borderBottomEndRadius: 5,
                padding: vw(10),
                marginBottom: 10,
                elevation: 2,
                backgroundColor: Utils.color.themeBackground
            }}>
                <TouchableNativeFeedback
                    useForeground={true}
                    background={TouchableNativeFeedback.Ripple('#ccc', false)}
                    onPress={() => {
                        this.toggleExpand(item.EmpId)
                    }} style={{
                        height: 'auto',
                        width: '100%',
                        paddingBottom: vh(5)
                    }}>

                    <View style={{
                        flexDirection: "row",
                        width: '90%',
                        //  justifyContent: "space-around",
                        alignItems: "center"
                    }}>
                        {this.renderRowElement({
                            title: "Emp Name",
                            subTitle: "Manager",
                            value: item.EmpName ?? '--',
                            subValue: item.manager ?? '--'
                        })}
                        <Icon
                            name={this.state.expandedItem === item.EmpId ?
                                "chevron-up" : "chevron-down"}
                            size={vw(24)} color="#3C97FF" />
                    </View>
                </TouchableNativeFeedback>
                {this.state.expandedItem === item.EmpId && (
                    <View style={{
                        width: '90%',
                        justifyContent: 'space-around'
                    }}>
                        {this.renderRowElement({
                            title: "Emp ID",
                            subTitle: "Department",
                            value: item.EmpId ?? '--',
                            subValue: item.Department ?? '--'
                        })}
                        {this.renderRowElement({
                            title: "Location",
                            subTitle: "Status",
                            value: item.Location ?? '--',
                            subValue: item.Status ?? '--'
                        })}
                        <Text>
                            {workingtimes ?
                                (this.renderRowElement({
                                    title: "Working Time",
                                    subTitle: "",
                                    value: item?.TotalTime ?? '',
                                    subValue: ''
                                })) : ''}

                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            width: '90%',
                            // justifyContent: item.Status == "Absent"  ?'flex-end':'space-between',
                            justifyContent: 'space-between',
                            marginTop: vh(10),
                        }}>
                            {showLeave && <TouchableNativeFeedback
                                useForeground={true}
                                background={TouchableNativeFeedback.Ripple('#FF0000', false)}
                                onPress={() => {
                                    this.setState({
                                        leaveToggleIsVisible: true,
                                        EmpId: item.EmpId
                                    })
                                    this.helper.InsertUpdateLeave()
                                }}
                            >
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#FF0000',
                                    backgroundColor: 'white',
                                    width: vw(120),
                                    height: vw(33),
                                    overflow: 'hidden',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    elevation: 5

                                }}>
                                    <Text style={
                                        [styles.Title,
                                        Utils.fontStyle.TextSemiBold, { textAlign: 'center', color: '#FF0000' }]}>Leave</Text>
                                    {/* <Text style={{ textAlign: 'center',color:'#FF0000' }}>Leave</Text> */}
                                </View>
                            </TouchableNativeFeedback>}

                            {showClockIn && <TouchableNativeFeedback
                                useForeground={true}
                                background={TouchableNativeFeedback.Ripple('#3C97FF', false)}
                                onPress={() => {
                                    this.helper.UpdateInAndOut()
                                    this.setState({
                                        EmpId: item.EmpId,
                                        toggleInOut: item.Type
                                    })
                                    setTimeout(() => {
                                        this.helper.BindData();
                                    }, 100);
                                    // this.getButtonWithStatus(item.Status, item.workTotalTime, item.EmpId)
                                }}
                            >
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#3C97FF',
                                    width: vw(120),
                                    height: vw(33),
                                    backgroundColor: '#3C97FF',
                                    overflow: 'hidden',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    elevation: 5

                                }}>
                                    <Text style={
                                        [styles.Title,
                                        Utils.fontStyle.TextSemiBold, {
                                            textAlign: 'center',
                                            // color: item.Status === "Absent" || item.Status === "On Leave" ? '#fff' : 'red'
                                            color: "#fff"
                                        }]}>
                                        Clock In
                                        {/* {item.Status === "Absent" 
                                        ? 'Clock In' :
                                        ((item.Status === "Present") && item.inAt && item.OutAt)  ?'Clock Out' :
                                            "On Leave"} */}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>}
                            {showClockout && <TouchableNativeFeedback
                                useForeground={true}
                                background={TouchableNativeFeedback.Ripple('#3C97FF', false)}
                                onPress={() => {
                                    this.setState({
                                        EmpId: item.EmpId,
                                        toggleInOut: item.Type
                                    })
                                    this.helper.UpdateInAndOut()
                                    setTimeout(() => {
                                        this.helper.BindData();
                                    }, 100);
                                }}
                            >
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#FF0000',
                                    backgroundColor: 'white',
                                    width: vw(120),
                                    height: vw(33),
                                    overflow: 'hidden',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    elevation: 5

                                }}>
                                    <Text style={
                                        [styles.Title,
                                        Utils.fontStyle.TextSemiBold, {
                                            textAlign: 'center',
                                            // color: item.Status === "Absent" || item.Status === "On Leave" ? '#fff' : 'red'
                                            color: '#FF0000'
                                        }]}>Clock Out
                                        {/* {item.Status === "Absent" 
                                        ? 'Clock In' :
                                        ((item.Status === "Present") && item.inAt && item.OutAt)  ?'Clock Out' :
                                            "On Leave"} */}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>}

                        </View>
                    </View>
                )}
            </View>
        );
    }


}

export default withMyHook(ManageAttendance);
const styles = StyleSheet.create({
    Title: {
        color: '#000',
        textAlign: 'left'
    },
    inputstyleaddnotes: {
        width: '100%',
        borderColor: '#3C97FF',
        borderWidth: 1,
        borderRadius: normalize(10),
        // paddingLeft: vw(15),
        backgroundColor: '#E9F0FBD4',
    },
})
