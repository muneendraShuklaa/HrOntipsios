import React, { Component } from "react";
import {
    View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground, FlatList, ActivityIndicator,
    TouchableNativeFeedback, Alert, PermissionsAndroid, Platform
} from "react-native";
import Utils from "../../../Utils";
import { withMyHook } from "../../../Utils/Dark";
import { normalize, screenWidth, vh, vw } from "../../../Utils/dimentions";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../../Components/GlobalStyles/globalStyles";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AttendanceReportHelper from "./helper";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNHTMLtoPDF from "react-native-html-to-pdf";
// import RNFS from "react-native-fs";
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome5';


class attendanceReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            durationStatusList: [
                "Today",
                "By Date",
                "This Week",
                "Last Week",
                "This Month",
                "Last Month",
                "Date Range"
            ],
            attendStatusList: [
                "Status",
                "All",
                "Absent",
                "On Leave",
                "Present"
            ],
            currentPage: 1,
            pageSize: 15,
            isLoading: false,
            FromDate: moment().format("MM-DD-YYYY"),
            ToDate: moment().format("MM-DD-YYYY"),
            durationStatus: "Today",
            isVisible: false,
            Search: '',
            dateType: '',
            empAttendanceList: [],
            filteredList: [],
            approvedIndex: '-1',
            visibleData: [],
        };
        this.helper = new AttendanceReportHelper(this)
        this.isMountedComponent = false;
    }

    componentDidMount() {
        this.isMountedComponent = true;
        this.abortController = new AbortController();
        this.helper.GetEmployeeData(this.abortController.signal);

        if (this.isMountedComponent) {
            setTimeout(() => {
                this.setState({ filteredList: this.state.empAttendanceList });
            }, 500);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.empAttendanceList !== this.state.empAttendanceList) {
            if (this.isMountedComponent) {
                setTimeout(() => {
                    this.setState({ filteredList: this.state.empAttendanceList });
                }, 500);
            }
        }
    }


    componentWillUnmount() {
        this.isMountedComponent = false;
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    handleSearch = (text) => {
        const filteredList = this.state.empAttendanceList.filter((employee) => {
            return employee.Name.toLowerCase().includes(text.toLowerCase()) || employee.EmployeeId.toLowerCase().includes(text.toLowerCase());
        });
        this.setState({ Search: text, filteredList });
    };

    showPicker = (field) => {
        this.setState({ isVisible: true, dateType: field });
    };
    generatePDF = async (employeeData) => {
        try {
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { text-align: center; }
                            p { font-size: 16px; margin-bottom: 5px; }
                        </style>
                    </head>
                    <body>
                        <h1>Employee Details</h1>
                        <p><strong>Employee ID:</strong> ${employeeData.EmployeeId}</p>
                        <p><strong>Name:</strong> ${employeeData.Name}</p>
                        <p><strong>Total Minutes:</strong> ${employeeData.TotalMinute}</p>
                    </body>
                </html>
            `;

            const options = {
                html: htmlContent,
                fileName: "EmployeeDetails",
                directory: "Documents",
            };

            const file = await RNHTMLtoPDF.convert(options);
            const filePath = file.filePath;

            // Alert.alert("PDF Created", `Saved at: ${filePath}`);

            Share.open({
                url: `file://${filePath}`,
                type: "application/pdf",
                failOnCancel: false,
            });


            //   await Share.share({
            //     url: `file://${pdfPath}`,
            //     title: 'Download this PDF file!',

            //   });

        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not generate PDF");
        }
    };


    loadMoreData = () => {
        const { currentPage, pageSize, empAttendanceList, visibleData } = this.state;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        if (startIndex < empAttendanceList.length) {
            this.setState({
                visibleData: [...visibleData, ...empAttendanceList.slice(startIndex, endIndex)],
                currentPage: currentPage + 1,
            });
        }
    };

    handleConfirm = (date) => {
        // moment().format("MM-DD-YYYY")
        const formattedDate = moment(date).format("MM-DD-YYYY")
        if (this.state.durationStatus === 'By Date') {
            this.setState({
                FromDate: formattedDate,
                ToDate: formattedDate
            });
            this.helper.GetEmployeeData(this.abortController.signal);
            this.hidePicker()
            return
        }
        if (this.state.dateType === "from") {
            this.setState({
                FromDate: formattedDate
            })
        } else {
            this.setState({
                ToDate: formattedDate
            })
            this.helper.GetEmployeeData(this.abortController.signal);
        }
        this.hidePicker();
    };

    hidePicker = () => {
        this.setState({ isVisible: false });
    };

    renderItem = React.memo(({ item, index }) => {
        return (
            <TouchableNativeFeedback
                useForeground={true}
                background={TouchableNativeFeedback.Ripple('#ccc', false)}

            >
                <View
                    style={{
                        backgroundColor: this.props.isDark ? '#fff' : '#fff',
                        marginBottom: vw(10),
                        elevation: 6,
                        padding: vh(20),
                        borderRadius: vw(5)
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={[styles.Title,
                        Utils.fontStyle.TextSemiBold, { textAlign: 'center', color: '#000000' }]}>{item.Name}</Text>
                        <Text style={[styles.Title,
                        Utils.fontStyle.TextSemiBold, { textAlign: 'center', color: '#000000' }]}>{item.TotalMinute ? item.TotalMinute : 0}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={[styles.Title,
                        Utils.fontStyle.TextSemiBold, { textAlign: 'center', alignSelf: 'flex-end', color: 'grey' }]}>{item.EmployeeId}</Text>
                        <View style={{ marginTop: vh(10) }}>
                            <Text style={[styles.Title, Utils.fontStyle.TextSemiBold, {
                                textAlign: 'center',
                                color: '#000000'
                            }]}>
                                {item.TravelDistanceKM ? Number(item.TravelDistanceKM).toPrecision(2) : `0.0 Km`}
                            </Text>
                        </View>
                    </View>
                    <TouchableNativeFeedback
                        useForeground={true}
                        background={TouchableNativeFeedback.Ripple('#ccc', false)}
                        onPress={() => {
                            this.generatePDF(item)
                        }}
                    >
                        <View style={{
                            marginTop: vh(10),
                            alignItems: 'flex-start'
                        }}>
                            <Icon name="file-pdf" size={vh(25)} color="red" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </TouchableNativeFeedback>
        );
    });

    //  createPDF = async (employeeData) => {
    //     const isPermissionGranted = await this.requestStoragePermission();
    //     if (!isPermissionGranted) {
    //       Alert.alert("Permission Denied", "Storage permission is required to save the PDF.");
    //       return;
    //     }

    //     try {
    //       const pdfOptions = {
    //          htmlContent :`
    //         <html>
    //             <head>
    //                 <style>
    //                     body { font-family: Arial, sans-serif; padding: 20px; }
    //                     h1 { text-align: center; }
    //                     p { font-size: 16px; margin-bottom: 5px; }
    //                 </style>
    //             </head>
    //             <body>
    //                 <h1>Employee Details</h1>
    //                 <p><strong>Employee ID:</strong> ${employeeData.EmployeeId}</p>
    //                 <p><strong>Name:</strong> ${employeeData.Name}</p>
    //                 <p><strong>Total Minutes:</strong> ${employeeData.TotalMinute}</p>
    //             </body>
    //         </html>
    //     `,
    //         fileName: "Employee_Details",
    //         // dire
    //         directory: Platform.OS === "android" ? RNFS.DownloadDirectoryPath : "Documents",
    //       };

    //       const pdf = await RNHTMLtoPDF.convert(pdfOptions);
    //     //   setPdfPath(pdf.filePath);

    //       Alert.alert("Success", `PDF saved at: ${pdf.filePath}`);
    //     } catch (error) {
    //       console.error(error);
    //       Alert.alert("Error", "Failed to create PDF.");
    //     }
    //   };

    requestStoragePermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);

                return (
                    granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
                );
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };




    render() {
        const MemoizedRenderItem = React.memo(this.renderItem);
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Utils.color.HeaderColor
            }}>
                <View
                    style={{
                        flex: 1,
                        // backgroundColor: this.props.themeColor.Done,
                        backgroundColor: this.props.isDark ? '#000' : this.props.themeColor.BackPagecolor
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
                                Attendance Report
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={[globalStyles.headerDrpRow, {
                        backgroundColor: this.props.themeColor.theameColor,
                    }]}>
                        <SelectDropdown
                            data={this.state.durationStatusList}
                            defaultValue={'Dropdown'}
                            onSelect={(selectedItem, index) => {
                                this.setState({
                                    durationStatus: selectedItem == 'Today' ? "Current Date" : selectedItem,
                                    FromDate: selectedItem == "Date Range" ? moment().format("MM-DD-YYYY") : moment().format("MM-DD-YYYY")
                                });
                                this.helper.GetEmployeeData(this.abortController.signal);
                                // this.helper
                            }}
                            defaultButtonText="Today"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            buttonStyle={[globalStyles.drpbtnhalfcent, { width: '100%' }]}
                            renderDropdownIcon={isOpened => {
                                return (
                                    <FontAwesome
                                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                                        color={'#444'}
                                        size={18}
                                    />
                                )
                            }}
                            buttonTextStyle={globalStyles.drpbtnTxtStyle}
                            dropdownIconPosition="right"
                            dropdownStyle={globalStyles.drpStyle}
                            rowTextStyle={globalStyles.rowTxtStyle}
                        />
                        {/* <SelectDropdown
                            data={this.state.attendStatusList}
                            defaultValue={'Dropdown'}
                            onSelect={(selectedItem, index) => {
                                this.setState({
                                    Status: selectedItem
                                });
                                // this.helper
                            }}
                            defaultButtonText="Status"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            buttonStyle={globalStyles.drpbtnhalfcent}
                            renderDropdownIcon={isOpened => {
                                return (
                                    <FontAwesome
                                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                                        color={'#444'}
                                        size={18}
                                    />
                                )
                            }}
                            buttonTextStyle={globalStyles.drpbtnTxtStyle}
                            dropdownIconPosition="right"
                            dropdownStyle={globalStyles.drpStyle}
                            rowTextStyle={globalStyles.rowTxtStyle}
                        /> */}
                    </View>
                    {(this.state.durationStatus == 'By Date') ?
                        <View style={[globalStyles.calendarBtnView, {
                            backgroundColor: this.props.themeColor.theameColor,
                        }]}>

                            <TouchableOpacity
                                onPress={() => {
                                    this.showPicker('to')
                                }}
                                style={[globalStyles.calendarBtnStyle, {
                                    width: '100%',
                                    height: vh(65)
                                }]}>
                                <FontAwesomeIcon
                                    name="calendar"
                                    size={vw(22)}
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
                                    {this.state.ToDate ? moment(this.state.ToDate, "MM-DD-YYYY").format("MMMM, DD, YYYY") : "Select Date"}

                                </TextInput>
                            </TouchableOpacity>
                        </View>
                        : this.state.durationStatus == 'Date Range'
                            ?
                            <View style={[globalStyles.headerDrpRow, {
                                backgroundColor: this.props.themeColor.theameColor,
                            }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.showPicker("from")
                                    }}
                                    style={[globalStyles.calendarBtnStyle, {
                                        width: '48%',
                                        height: vh(65)
                                    }]}>
                                    <FontAwesomeIcon
                                        name="calendar"
                                        size={vw(22)}
                                        style={{
                                            color: '#3083EF',
                                        }}
                                    />

                                    <TextInput
                                        style={globalStyles.calendarBtnTxt}
                                        placeholder="From Date"
                                        placeholderTextColor="grey"
                                        editable={false}
                                    >
                                        {this.state.FromDate ? moment(this.state.FromDate, "MM-DD-YYYY").format("MMMM, DD, YYYY") : "From Date"}
                                    </TextInput>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.showPicker("to")

                                    }}
                                    style={[globalStyles.calendarBtnStyle, {
                                        width: '48%',
                                        height: vh(65)
                                    }]}>
                                    <FontAwesomeIcon
                                        name="calendar"
                                        size={vw(22)}
                                        style={{
                                            color: '#3083EF',
                                        }}
                                    />

                                    <TextInput
                                        style={globalStyles.calendarBtnTxt}
                                        placeholder="To Date"
                                        placeholderTextColor="grey"
                                        editable={false}
                                    >
                                        {this.state.ToDate ? moment(this.state.ToDate, "MM-DD-YYYY").format("MMMM, DD, YYYY") : "To Date"}
                                    </TextInput>
                                </TouchableOpacity>
                            </View> : null
                    }
                    <View style={[globalStyles.headerDrpRow, {
                        borderBottomWidth: 1,
                        borderColor: this.props.isDark ? '#fff' : 'grey',
                        backgroundColor: this.props.isDark ? '#000' : '#fff'
                        // backgroundColor: this.props.themeColor.theameColor,
                    }]}>
                        <Text style={[styles.Title,
                        Utils.fontStyle.TextSemiBold, {
                            textAlign: 'center',
                            color: this.props.isDark ? '#fff' : '#000'
                        }]}>Employees</Text>
                        <Text style={[styles.Title,
                        Utils.fontStyle.TextSemiBold, {
                            textAlign: 'center',
                            color: this.props.isDark ? '#fff' : '#000'
                        }]}>Hours/Km</Text>
                    </View>
                    <FlatList
                        extraData={this.state.approvedIndex}
                        style={{
                            margin: vh(10)
                        }}
                        contentContainerStyle={{
                            paddingBottom: vh(100)
                        }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.filteredList}
                        // data={this.state.empAttendanceList}
                        keyExxtractor={(item, index) => index.toString()}
                        // renderItem={({ item, index }) => this.renderItem(item, index, this.props.isDark)
                        // }
                        renderItem={({ item, index }) => <MemoizedRenderItem item={item} index={index} isDark={this.props.isDark} />}
                        ListFooterComponent={
                            this.state.visibleData?.length < this.state.empAttendanceList?.length ? (
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
                                        style={[styles.Title,
                                        Utils.fontStyle.TextSemiBold, {
                                            textAlign: 'center',
                                            color: this.props.isDark ? '#fff' : '#000'
                                        }]}>
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
                            // onChangeText={(txt) => {
                            //     this.setState({
                            //         Search: txt
                            //     })
                            //     this.helper.GetEmployeeData()
                            // }}
                            onChangeText={this.handleSearch}
                            placeholder="Search Employee"
                            placeholderTextColor="lightgrey"
                            editable={true}
                        >
                            {/* {this.state.selectedDate ? moment(this.state.selectedDate).format("MMM, DD, YYYY") : "Select Date"} */}
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ Search: '', filteredList: this.state.empAttendanceList })
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

            </SafeAreaView>
        )
    }

}
export const AttendanceReport = withMyHook(attendanceReport);
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