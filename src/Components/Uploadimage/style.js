import { StyleSheet } from 'react-native';
import { commonStyle } from '../../Common/Styles';
import { getDynamicHeight, screenWidth } from '../../Common/Utils';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: "center",

    },
    deliveryText: {
        fontSize: 14,
        color: "grey",
        padding: 5,
        ...commonStyle.AvanirBlack,
        fontWeight: "600",
    },
    delivery: {
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#57ba4a",
    width: "35%",

},
    row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
},
    decline: {
    backgroundColor: "#fe7c96", width: "40%", borderRadius: 5
},


    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 20,
        margin: 10
    },
    noImagesContainer: {
        width: getDynamicHeight(140),
        height: getDynamicHeight(140),
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:10


    },
    noImagesText: {
        fontSize: 16,
        // fontWeight: 'bold',
        marginBottom: 10,
        ...commonStyle.AvanirBlack,

    },
    imagesContainer: {
        margin: 11,
        display:'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: getDynamicHeight(135),
        height: getDynamicHeight(135),
        borderRadius: 10,
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: '#4E5052'
    },
    buttonRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        margin: 'auto'
    },
    uploadButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        height: getDynamicHeight(120),
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40
    },
    modalContentText: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    modalText: {
        fontSize: 15,
        textAlign: 'center',
        color: "#4E5052",
        ...commonStyle.AvanirBlack,
    },
    horizontalLine: {
        marginVertical: 10,
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
    },
    addIconcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    centeraddIcon: {
        flex: 2,
    },
    addicon: {
        borderRadius: 50,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
});