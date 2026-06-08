import { Platform, StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    commentHeaderalign:{
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    //   marginTop :10
    },
    commentsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:10
    },
    headerComments: {
        fontFamily: "Avenir-Black",
        fontWeight: "600",
        fontSize: 16,
        color: "#4E5052",
        margin: 5,
        // marginLeft: '40%'
    },
    commentHeadertext: {
        fontFamily: "Avenir-Black",
        fontSize: 20,
        color: "#4E5052",
        // marginRight: '40%'
    },

    txt: {
        fontWeight: 'bold'
    },
    time: {
        color: 'gray',
        fontSize: 12
    },
    commentAlignment: {
        width: '90%',
        marginLeft: 20,
        marginTop: 15
    },
    clock: {
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        backgroundColor: "#DCDCDC",
        width: '80%',
        maxHeight: '100%',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        fontFamily: 'Avenir-Roman',
        fontSize: 14,
        color: '#454545'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    imageAlignment: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    textField: {
        borderWidth: 1,
        width: '85%',
        marginLeft: 22,
        borderRadius: 10,
        paddingLeft: 12,
        display: 'flex',
        maxHeight: "100%",
        color: 'black',
        minHeight: Platform.OS === 'ios' ? '6%': 0
     },
     noData: {
        textAlign: "center", 
        color: "#242628",
        fontFamily: 'Avenir-Roman'
     }
})