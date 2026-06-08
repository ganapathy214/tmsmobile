import { StyleSheet } from 'react-native';
import { primaryColor } from '../../Common/Styles';
import { screenfontSize } from '../../Common/Utils/index';


export const styles = StyleSheet.create({
    updateButton: {
        width: "50%",
        height: 46,
        borderRadius: 25,
        backgroundColor: "#77e0b5",
        justifyContent: 'center',
        display: "flex",
        alignItems: 'center'
    },
    noteHeader:{
        fontSize: 14,
        alignContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontFamily: 'Avenir-Book',
        paddingBottom: 5
    },
    notes: {
        fontSize: 14,
        alignContent: 'center',
        alignItems: 'center',
        color: 'grey',
        fontFamily: 'Avenir-Book',

    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#FAFAFA"
    },
    content: {
        padding: 10,
        width: '90%',
    },
    fieldWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    leanearButton: {
        backgroundColor: primaryColor,
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
    height35: {
        height: 35
    }
})