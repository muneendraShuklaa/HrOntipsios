import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, ImageBackground, StyleSheet, FlatList, Image, TouchableHighlight, Easing, TouchableNativeFeedback, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withMyHook } from '../../../Utils/Dark';
import Utils from '../../../Utils';

import { Header } from '../../../Components/Header';
import RegularisationStatusHelper from './helper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import moment from 'moment';
import { normalize, vh, vw } from '../../../Utils/dimentions';
import {
    Calendar
} from 'react-native-calendars';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';



class RegularizationStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            approvedIndex: '-1',
            isloading: false,
            regularizationStatusData: [],
            expandedItem: null,
            Approvalbutton: false,
            // Comment: '',
            isVisible: false,
            selectedTime: '',
            selectedField: '',
            clockInTime: '',
            clockOutTime: '',
            comment: '',
            selectedDate: ''
        }
        this.helper = new RegularisationStatusHelper(this)
        this.isMountedComponent = false;
    }
    componentDidMount() {
        this.isMountedComponent = true;
        this.abortController = new AbortController();
        this.helper.BindData(this.abortController.signal)
    }
    componentWillUnmount() {
        this.isMountedComponent = false;
        if (this.abortController) {
            this.abortController.abort();
        }
    }
    toggleExpand = (id) => {
        this.setState((prevState) => ({
            expandedItem: prevState.expandedItem === id ? null : id,
        }));
        Easing.out(Easing.quad)
    };
    validateRegularizationStatus = () => {
        if (this.state.selectedDate == '') {
            alert('Please select date.');
        } else {
            if (this.state.clockInTime == '') {
                alert('Please select clockin.');
            } else {
                if (this.state.clockOutTime == '') {
                    alert('Please enter clockOutTime');
                } else {
                    if (this.state.comment == '') {
                        alert('Please enter your Comments.');
                    } else {
                        this.helper.SaveRegularReq();
                        setTimeout(() => {
                            this.helper.BindData();
                            this.setState({ Approvalbutton: false });
                        }, 900);

                    }
                }
            }
        }
    };
    getStatusColor(status) {
        const colors = {
            Pending: "#FACC15",
            Rejected: "#DC2626",
            Approved: "#16A34A"
        };
        return colors[status] || "#16A34A";
    }
    showPicker = (field) => {
        this.setState({ isVisible: true, selectedField: field });
    };

    hidePicker = () => {
        this.setState({ isVisible: false });
    };
    validateTime = () => {
        const { clockInTime, clockOutTime } = this.state;


        if (clockInTime && clockOutTime) {
            const inMoment = moment(clockInTime, 'hh:mm A');
            const outMoment = moment(clockOutTime, 'hh:mm A');

            if (outMoment.isBefore(inMoment) || outMoment.isSame(inMoment)) {
                Alert.alert('Invalid Time', 'Clock-Out must be greater than Clock-In.');
                this.setState({ clockOutTime: '' });
            }
        }
    };
    handleConfirm = (date) => {
        const formattedTime = moment(date).format('hh:mm A');

        if (this.state.selectedField === 'inTime') {
            this.setState({ clockInTime: formattedTime }, () => {
                if (this.state.clockInTime) this.validateTime();
            });
        } else if (this.state.selectedField === 'outTime') {
            this.setState({ clockOutTime: formattedTime }, () => {
                this.validateTime();
            });
        }
        this.hidePicker();
    };

    render() {
        return (
            <>
                <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: Utils.color.HeaderColor
                }}>

                    <View style={{
                        flex: 1,
                        backgroundColor: this.props.themeColor.BackPagecolor
                    }}>
                        {/* <Header
                            title="Reguarlization Status"
                            lefticon={Utils.icons.Back}
                            leftFunction={() => {
                                this.props.navigation.goBack();
                            }}
                        /> */}
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
                                    Regularization Status
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <FlatList
                            extraData={this.state.approvedIndex}
                            style={{ padding: 20, marginTop: 30, }}
                            contentContainerStyle={{
                                paddingBottom: vh(35)
                            }}
                            showsHorizontalScrollIndicator={false}
                            data={this.state.regularizationStatusData?.length > 0 ? this.state.regularizationStatusData : []}

                            keyExxtractor={(item, index) => index.toString}
                            renderItem={({ item, index }) =>
                                this.renderItem(item, index, this.props.isDark)
                            }
                            ListEmptyComponent={
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <Text
                                        style={[
                                            Utils.fontStyle.TextSemiBold,
                                            {
                                                color: this.props.isDark ? '#fff' : '#000',
                                                marginBottom: 10
                                            },
                                        ]}>
                                        No Data Available
                                    </Text>
                                </View>
                            }
                        />
                    </View>
                </SafeAreaView>

                <Modal
                    isVisible={this.state.Approvalbutton}
                    transparent={true}
                    style={{ margin: vw(20) }}>
                    <View
                        style={{
                            height: 'auto',
                            width: '100%',
                            backgroundColor: '#fff',
                            borderRadius: 30,
                        }}>
                        <View
                            style={{
                                height: vw(100),
                                width: vw(100),
                                borderRadius: 100,
                                backgroundColor: '#fff',
                                marginTop: -50,
                                alignSelf: 'center',
                            }}>
                            <Image
                                source={Utils.icons.Page}
                                style={{ alignSelf: 'center', marginTop: 20 }}
                            />
                        </View>
                        <View style={{ margin: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.RBSheet.open();
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', // Ensure items are aligned properly
                                    height: 50,
                                    borderWidth: 1,
                                    borderColor: '#3C97FF',
                                    backgroundColor: '#fff',
                                    // color: this.props.isDark ? '#fff' : '#000',
                                    borderRadius: 10,
                                    width: '100%',
                                    paddingHorizontal: 10,
                                    marginBottom: vw(10),
                                }}>
                                <FontAwesomeIcon
                                    name="calendar"
                                    size={20}
                                    style={{
                                        color: '#3083EF',
                                    }}
                                />

                                <TextInput
                                    style={{
                                        flex: 1,
                                        color: '#000',
                                        fontSize: 18,
                                        backgroundColor: '#fff',
                                        marginLeft: 10,
                                    }}
                                    placeholder="Select Date"
                                    placeholderTextColor="grey"
                                    editable={false}

                                >
                                    {this.state.selectedDate?.dateString}
                                </TextInput>
                            </TouchableOpacity>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: vw(10)
                            }}>
                                <TouchableOpacity
                                    onPress={() => this.showPicker('inTime')}
                                    style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        height: 50,
                                        borderWidth: 1,
                                        borderColor: '#3C97FF',
                                        // color: this.props.isDark ? '#fff' : '#000',
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                        width: '50%',
                                    }}>


                                    <TextInput
                                        style={[
                                            Utils.fontStyle.FontFamilyRegular,
                                            {
                                                color: '#000',
                                                textAlign: 'center',
                                                backgroundColor: '#fff',
                                                width: '80%',
                                                fontSize: 18,
                                                borderRadius: 10,
                                            },
                                        ]}
                                        placeholder="In Time"
                                        placeholderTextColor="grey"
                                        editable={false}>
                                        {this.state.clockInTime}
                                    </TextInput>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.showPicker('outTime')}
                                    style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        height: 50,
                                        borderWidth: 1,

                                        borderColor: '#3C97FF',
                                        // color: this.props.isDark ? '#fff' : '#000',
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                        width: '48%',
                                    }}>


                                    <TextInput
                                        style={[
                                            Utils.fontStyle.FontFamilyRegular,
                                            {
                                                color: '#000',
                                                textAlign: 'center',
                                                backgroundColor: '#fff',
                                                width: '80%',
                                                fontSize: 18,
                                                borderRadius: 10,
                                            },
                                        ]}
                                        placeholder="Out Time"
                                        placeholderTextColor="grey"
                                        editable={false}>
                                        {this.state.clockOutTime}
                                    </TextInput>
                                </TouchableOpacity>
                            </View>
                            {/* <View
                                style={{
                                    height: 140,
                                    borderWidth: 0.4,
                                    color: this.props.isDark ? '#fff' : '#000',
                                  
                                    backgroundColor: this.props.isDark ? '#000' : '#fff',
                                    borderWidth: 1,

                                    borderRadius: 10,
                                 
                                }}> */}
                            <TextInput
                                placeholder="Comment"
                                allowFontScaling={false}
                                onChangeText={text => {
                                    this.setState({ comment: text });
                                }}
                                multiline={true}
                                value={this.state.comment}
                                maxLength={500}
                                placeholderTextColor={this.props.isDark ? '#fff' : 'grey'}
                                style={[
                                    styles.inputstyleaddnotes,
                                    Utils.fontStyle.FontFamilyRegular,
                                    {
                                        height: 150,
                                        color: '#000',
                                        textAlignVertical: 'top',
                                        paddingRight: 10,
                                    },
                                ]}></TextInput>
                            {/* </View> */}
                            <TouchableOpacity
                                style={[styles.ButtonView, { marginTop: 20 }]}
                                onPress={() => {
                                    this.validateRegularizationStatus();
                                }}
                            // onPress={async () => {
                            //     //   await this.helper.saveCommentForApproval();
                            //     setTimeout(async () => {
                            //         this.setState({ Approvalbutton: false });
                            //         this.helper.BindData();
                            //     }, 1000);

                            // }}
                            >
                                <ImageBackground
                                    imageStyle={{ borderRadius: 5 }}
                                    style={{
                                        height: 37,
                                        width: '100%',
                                        justifyContent: 'center',
                                        marginBottom: 20,
                                    }}
                                    source={Utils.icons.buttonn}>
                                    <Text
                                        style={[
                                            Utils.fontStyle.TextSemiBold,
                                            { color: '#fff' },
                                            { textAlign: 'center' },
                                        ]}>
                                        Save
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ Approvalbutton: false });
                                }}
                                style={[styles.ButtonView, {}]}>
                                <ImageBackground
                                    imageStyle={{ tintColor: '#A3A3A3', borderRadius: 5 }}
                                    style={{
                                        height: 37,
                                        width: '100%',
                                        justifyContent: 'center',
                                        marginBottom: 20,
                                    }}
                                    source={Utils.icons.buttonn}>
                                    <Text
                                        style={[
                                            Utils.fontStyle.TextSemiBold,
                                            { color: '#fff' },
                                            { textAlign: 'center' },
                                        ]}>
                                        Cancel
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={vh(550)}
                    width={'100%'}
                    minClosingHeight={20}
                    openDuration={250}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: normalize(26),
                            borderTopRightRadius: normalize(26),
                        },
                    }}>
                    <View
                        style={{
                            borderTopLeftRadius: normalize(25),
                            borderTopRightRadius: normalize(25),
                        }}>
                        <View
                            style={{
                                height: vh(75),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: 20,
                                paddingRight: 20,
                                justifyContent: 'space-between',
                                width: '100%',
                                borderBottomColor: Utils.color.grey,
                                borderBottomWidth: vh(1),
                            }}>
                            <Text
                                style={[
                                    Utils.fontStyle.FontFamilyExtraBold,
                                    {
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        color: Utils.color.blackText,
                                        fontSize: 16,
                                    },
                                ]}>
                                Select date
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.RBSheet.close();
                                }}>
                                <FontAwesomeIcon
                                    name="times-circle"
                                    size={30}
                                    color="#000"
                                    style={{ alignSelf: 'center', marginRight: 10 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Calendar
                            style={{
                                backgroundColor: 'transparent',
                                overflow: 'hidden',
                            }}
                            theme={{
                                header: { height: 0 },
                                backgroundColor: '#2d5986',
                                calendarBackground: 'transparent',
                                textSectionTitleColor: '#b6c1cd',
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: 'red',
                                selectedDayBackgroundColor: '#2d5986',
                                todayTextColor: '#2d5986',
                                dayTextColor: '#2d4150',
                                textDisabledColor: 'lightgrey',
                                dotColor: '#2d5986',
                                arrowColor: '#2d5986',
                                disabledArrowColor: '#d9e1e8',
                                indicatorColor: 'blue',
                                textDayFontWeight: '300',
                                monthTextColor: '#2d5986',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: 'bold',
                                textDayFontSize: 16,
                                textMonthFontSize: 22,
                                textDayHeaderFontSize: 16,
                            }}
                            // minDate={new Date()}
                            maxDate={'2099-09-22'}
                            onDayPress={day => {
                                this.setState({
                                    selectedDate: day,
                                });
                                this.RBSheet.close();
                            }}
                            onDayLongPress={day => {
                                console.log('selected day', day);
                            }}
                            monthFormat={'MMM yyyy'}
                            markingType={'period'}
                        />


                    </View>
                </RBSheet>
                <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hidePicker}
                />
                <View style={styles.viewBtn}>
                    <TouchableHighlight
                        style={styles.btn}
                        underlayColor={'#A9D1FF'}
                        onPress={() => { this.setState({ Approvalbutton: true }); }}
                    >

                        <Icon name="add" size={vw(30)} color="white" />
                    </TouchableHighlight>
                </View>

            </>
        )
    }
    renderItem = (item, index, isDark) => (
        <View style={{
            height: 'auto',
            width: '100%',
            borderColor: isDark ? '#fff' : '#000',
            borderTopStartRadius: 5,
            borderTopEndRadius: 5,
            borderBottomStartRadius: 5,
            borderBottomEndRadius: 5,
            padding: vw(10),
            marginBottom: 10,
            elevation: 2,
            backgroundColor: Utils.color.themeBackground
        }}>
            <TouchableNativeFeedback
                useForeground={true}
                background={TouchableNativeFeedback.Ripple('#ccc', false)}
                // underlayColor="#ADD8E6"
                onPress={() => {
                    this.toggleExpand(item.ID)
                }} style={{
                    height: 'auto',
                    width: '100%',
                    paddingBottom: vh(5)
                    // padding: vw(4)
                }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text style={[styles.Title, { fontWeight: 'bold' }]}>{item.CreatedOn}</Text>
                        <Text style={styles.Title}>In : {item.ClockIntime} Out: {item.ClockOuttime}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.Title, {
                            color: this.getStatusColor(item.Status)
                        }]}>{item.Status}</Text>
                        <Icon name="keyboard-arrow-down" size={vw(25)} color="black" />
                    </View>
                </View>
            </TouchableNativeFeedback>
            {this.state.expandedItem === item.ID && (
                <>
                    <View style={{ borderTopWidth: 1, borderColor: '#E0E0E0', paddingVertical: vh(3) }}>
                        <Text style={
                            [styles.Title,
                            Utils.fontStyle.TextSemiBold]
                        }>Employee Comment :</Text>
                        <Text style={
                            [styles.Title,
                            Utils.fontStyle.FontFamilyRegular]
                        }>{item.EmployeeComment}</Text>
                    </View>
                    <View style={{ paddingVertical: vh(0) }}>
                        <Text style={
                            [styles.Title,
                            Utils.fontStyle.TextSemiBold]
                        }>Comment :</Text>
                        <Text style={
                            [styles.Title,
                            Utils.fontStyle.FontFamilyRegular]
                        }>{item.Comment}</Text>
                    </View>
                </>
            )}
        </View>
    );
}



export default withMyHook(RegularizationStatus);
const styles = StyleSheet.create({
    viewBtn: {
        position: 'absolute',
        // flexDirection: 'row',
        bottom: 30,
        height: 0,
        width: '100%',
        marginBottom: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    btn: {
        height: vw(55),
        flexDirection: 'row',
        width: vw(55),
        backgroundColor: '#3083EF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    txtBtn: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    Title: {
        color: '#000',
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