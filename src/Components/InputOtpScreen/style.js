import { StyleSheet } from 'react-native';
import { primaryColor } from '../../Common/Styles';
import { getDynamicHeight, screenfontSize, screenWidth } from '../../Common/Utils';

export const styles = StyleSheet.create({
    textBold: {
        marginVertical: 15,
        fontSize: screenfontSize(0.05),
        fontFamily: 'Avenir-Roman',
        fontWeight: "400",
        textAlign: "center",
        color: "black"
    },
    otppasswordError: {
        textAlign: "center",
        paddingVertical: 15,
        fontFamily: 'Manrope-Regular',
        fontSize: 14,
        color: '#C82222',
    },

    loginBtnLayout: {
        alignItems: "center",
        position: "absolute",
        right: 0,
        marginEnd: '5%',
    },

    notesWrapper: {
        paddingHorizontal: 20,
        width: screenWidth * 0.8
    },

    fieldWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
        width: screenWidth * 0.8
    },
    leanearButton: {
        backgroundColor: "#77e0b5",
        paddingVertical: 10,
        padding: 20,
        borderRadius: 25,
        width: "50%",
    },
    btnText: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        marginBottom: "5%",
    },

    buttonview: {
        backgroundColor: primaryColor,
        padding: 10,
        marginTop: "2%",
    },
    loginbutton: {
        paddingVertical: 10,
        width: "50%",
        height: 46,
        borderRadius: 25,
        backgroundColor: "#77e0b5",
        justifyContent: 'center',
        display: "flex",
        alignItems: 'center',
        marginTop: "4%",
    },
    pinCodeCell: {
        borderWidth: 1,
        borderColor: '#777777',
        borderRadius: 5,
        margin: 5,
        width: 40,
        height: 40,
        margin: "2%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    pinCodeCellFocused: {
        borderColor: '#000000'
    },
    pinCodeText: {
        fontSize: 16,
        color: '#000000'
    },

    errorMessage: {
        color: 'red',
        marginTop: 5,
        fontSize: 12
    },
    pinStyle: {
        marginVertical: '5%',
    },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, }, touchableSpace: { marginRight: 20, }
})