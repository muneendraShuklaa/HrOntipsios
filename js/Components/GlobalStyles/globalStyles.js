import { StyleSheet } from "react-native";
import { vh, vw } from "../../Utils/dimentions";
import Utils from "../../Utils";

export default globalStyles = StyleSheet.create({

    headerDrpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: vw(15),
        rowGap: 20,
        paddingVertical: vh(15),
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    drpbtnhalfcent: {
        elevation: 5,
        width: '48%',
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Utils.color.bordercolor,
        borderRadius: 8
    },
    drpStyle: {
        marginTop: -25,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    rowTxtStyle: {
        color: '#444',
        textAlign: 'left',
        marginLeft: vw(30),
    },
    drpbtnTxtStyle: {
        color: '#444',
        paddingLeft: 10,
        textAlign: 'left',
    },
    calendarBtnStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: vh(60),
        borderWidth: 1,
        borderColor: '#3C97FF',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: vw(10),
        width: '50%',
        paddingHorizontal: vw(10),
    },
    calendarBtnTxt: {
        flex: 1,
        color: '#000',
        fontSize: 18,
        backgroundColor: '#fff',
        marginLeft: 10,
    },
    calendarBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: vw(15),
        rowGap: 20,
        paddingVertical: vh(15),
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center'
    }

});