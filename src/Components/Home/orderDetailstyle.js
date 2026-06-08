import { StyleSheet, Dimensions } from 'react-native';
import { commonStyle, primaryColor } from '../../Common/Styles/index'
const { height } = Dimensions.get('window');
const screenHeight = height;

export const styles = StyleSheet.create({
    // orderCard: {
    //     height: 35,
    //     borderRadius: 5,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingHorizontal: 5,
    //     display: "flex",
    //     flexDirection: "row",
    //     backgroundColor: "#1bcfb4", width: "45%"
    // },
    deliveryplace: {
        flexDirection: "row", alignItems: "center"
    },
    footerIcon: {
         display: "flex", flexDirection: "row"
    },
    mapping: { width: "20%", display: "flex", flexDirection: "row" },
    mappingButton: { display: "flex", flexDirection: "row", alignItems: "flex-end", alignContent: "flex-end", alignSelf: "flex-end" },
    align: {
        marginRight: 5, marginTop: 2
    },
    footerCommon: {
        backgroundColor: primaryColor, marginLeft: 10
    },
    mapcontainer: {
        ...StyleSheet.absoluteFillObject,
        height: 700,
        width: 600,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    accordian: {

        height: 100,
        width: "90%",
        backgroundColor: "lightgray",
        marginLeft: 10,
        marginRight: 10

    },

    orderDetailFooterContainer: {
        flexDirection: 'row',
        // paddingTop: 20,
        // marginLeft: 9,
        justifyContent:"space-between",
        alignItems:"center"
    },
    // orderDetailFooterContentButton: {
    //     marginLeft: 5,
    //     display: "flex",
    //     flexDirection: 'row',
    // },
    orderDetailFooterIconView: {
        backgroundColor: "lightgrey",
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chevron: {
        marginRight: 5, marginTop: 2, padding: 3
    },


    dragging: {
        opacity: 0.7,
        height: screenHeight / 2.5, backgroundColor: "white",
        backgroundColor: "white", width: "100%"
    },
    container: {
        backgroundColor: "white"
    },
    welcomeNote: {
        fontFamily: "Avenir-Black",
        fontSize: 20,
        marginLeft: 15,
        marginTop: 10,
        color: "black"
    },
    welcomeContainer: {
        marginHorizontal: 0,
        marginVertical: 5,
        flex: 1,
        backgroundColor: "white",
        width: "100%"

    },
    welcomeContainer1: {
        marginHorizontal: 0,
        marginVertical: 1,
        height: 60
    },
    searchstyle: {
        height: 60, marginTop: 8, width: 50,
    },
    plusstyle: {
        height: 45, marginTop: 15, marginLeft: 30, width: 45
    },
    plusstyles: {
        height: 25, marginTop: 15, marginLeft: 10, width: 25
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },


    day: {
        fontFamily: "Avenir-Heavy",
        color: "#515C67",
        fontSize: 14
    },
    dateTime: {
        fontFamily: "Avenir-Book",
        color: "#515C67",
        fontSize: 14
    },
    p32: {
        paddingHorizontal: 25
    },
    text_input: {
        height: 46,
        borderWidth: 2,
        borderColor: "#ECECEC",
        borderRadius: 25,
        color: "#000000",
        backgroundColor: "#FFFFFF",
        fontFamily: 'Avenir-Book',
    },
    typo: {
        color: "black",
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        letterSpacing: 1
    },
    lectureTitleSmalls: {
        fontWeight: "300",
        fontSize: 10,
        color: "black"
    },
    overdueBadge: {
        backgroundColor: "#FFDDD6",
        padding: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5
    },
    upcomingBadge: {
        backgroundColor: "#D3F0E0",
        padding: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5
    },
    upcommingText: {
        fontSize: 10,
        color: "#1DC86B"
    },
    overdueText: {
        fontSize: 10,
        color: "#FF6411"
    },
    card: {
        height: undefined,
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        // elevation: 30,
        justifyContent: 'space-between',
        padding: 13,
        borderWidth: 10,
        borderColor: primaryColor,
        borderBottomColor: "white",
        borderTopColor: "white",
        borderBottomWidth: 1,
        borderRightWidth: 5,
        borderRightColor: "white",
        borderTopLeftColor: "#64BD79",
        borderTopWidth: 1,
        marginTop: 10, marginRight: 5
    },
    statusCard: {
        marginVertical: 10,
        flexDirection: 'row',
        width: '100%',
        height: 65,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        borderColor: "#F5F5F5",
        border: 2,
        borderWidth: 1,
        color: "#FFFFFF",
        shadowOpacity: 0.5,
        paddingHorizontal: 10
    },
    lucturesContainer: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    layout: {
        borderRadius: 5,
        width: Dimensions.get("screen").width - 50,
        paddingHorizontal: 5,
        height: 50,
        marginTop: 10,
        alignItems: "center",
        borderColor: "lightgrey", borderWidth: 1
    },

    selectedText: {
        fontSize: 14,
    color: "grey",
    padding: 5,
    ...commonStyle.AvanirBlack,
    fontWeight: "600",
    },
    NonSelectedText: {
        ...commonStyle.AvanirBlack,
        color: "black",
        fontSize: 14,
    },

    topSpace: {
        marginTop: 10
    },
    selectedButtons: {
        width: "50%",
        borderRadius: 5,
        height: 40,
        backgroundColor: primaryColor,
        justifyContent: "center",
        alignItems: "center",
        ...commonStyle.display,
    },
    updateButtons: {
        height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#57ba4a", 
    // width:150,
    },
    NonSelectedButtons: {
        width: "50%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        ...commonStyle.display,
    },
    title: {
        ...commonStyle.display,
        ...commonStyle.flexRow,
        ...commonStyle.alignCenter,
        justifyContent: "space-between"
    },

    flatListAlign: {
        padding: 15, width: "100%", marginBottom: 150

    },
    headerAlign: {
        flexDirection: "row", borderTopWidth: 0, borderBottomWidth: 1, borderColor: "lightgrey", backgroundColor: "#f5f7f7", width: "100%"
    },
    tableContentHeader: {
        color: "black"
    },
    headerItem: {
        width: "50%", borderColor: "#BBBFC3", borderBottomWidth: 0, borderTopWidth: 0, alignItems: "flex-start", display: 'flex', justifyContent: "center", height: 50,paddingLeft:5
    },
    headerQuantity: {
        width: "20%", borderColor: "#BBBFC3", borderLeftWidth: 0, borderBottomWidth: 0, borderTopWidth: 0, alignItems: "center", display: 'flex', justifyContent: "center", height: 50
    },
    headerStatus: {
        width: "30%", borderColor: "#BBBFC3", borderLeftWidth: 0, borderBottomWidth: 0, borderTopWidth: 0, alignItems: "center", display: 'flex', justifyContent: "center", height: 50
    },
    titleText: {
        fontWeight: "500",
        fontSize: 14,
        color: "black"
    },
    horizontalLine: {
        marginVertical: 10,
        height: 3,
        ...commonStyle.primaryBackGround,
        borderRadius: 3
    },
    horizontalLineGray: {
        marginVertical: 10,
        height: 9,
        borderRadius: 3,
        backgroundColor: "blue"
    },
    lectureTitle: {
        fontWeight: "400",
        fontSize: 14,
        color: "black"
    },
    lectureTitleSmall: {
        fontWeight: "300",
        fontSize: 10,
        color: "black"
    },
    courseBadge: {
        backgroundColor: "#FDF4D6",
        padding: 5,
        borderRadius: 5
    },
    viewMore: {
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 15,
        textDecorationLine: 'underline',
        color: "black",
        marginLeft: 10
    },
    bottomSpace: {
        marginBottom: 20
    },
    orderlists: {
        display: "flex", flexDirection: "row", width: "auto",
    },
    OrderListbottomSpace: {
        height: 80
    },
    orderlists: { padding: 5, display: "flex", flexDirection: "row", width: "100%" },
    itemlists: {
        width: "42%", alignItems: "flex-start", alignContent: "flex-start", alignSelf: "flex-start"
    },
    itemqty: {
        width: "22%",height: 35, alignItems: "center", alignContent: "center", alignSelf: "center"
    },
    itemtext: {
        width: "35%", height: 35, alignItems: "center"
    },
    
    quantityInput: {
        fontSize: 14,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        color: "black",
        backgroundColor: "white",
        fontFamily: 'Avenir-Book',
        width: "30%",
    },
    catText: {
        fontSize: 16,
        marginHorizontal: 5,
        color: "#4E5052"
    },
    catValue: {
        fontSize: 16,
        fontWeight: "900",
        color: "#4E5052"
    },
    place: {
        marginTop: 8,

    },
    person: {
        marginTop: 8, display: "flex", flexDirection: "row", width: "100%"
    },
    upload: {
        width: 25, height: 25, borderRadius: 12.5, alignItems: "center", justifyContent: "center", display: "flex"
    },
    delivery: {
        height: 35,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#57ba4a", width: "45%", borderRadius: 5

    },
    imagealertdelivery: {
        height: 35,
        borderRadius: 19,
        backgroundColor:"red",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#57ba4a", width: "45%", borderRadius: 5

    },
    decline: {
        backgroundColor: "#fe7c96", width: "45%", borderRadius: 5
    },
    deliveryText: {
        fontSize: 14,
        color: "white",
        alignContent: "center", alignItems: "center", alignSelf: "center",
        padding: 5,
        fontWeight: "600",
    },
    mapText: {
        fontSize: 13,
        color: "black",
        alignContent: "flex-end", alignItems: "flex-end", alignSelf: "flex-end",
        textDecorationLine: "underline",
        fontFamily: "Cabin-BoldItalic",
        marginBottom: 8
    },
    iconstyle: {
        alignContent: "center", alignItems: "center", alignSelf: "center", marginHorizontal: 0, marginBottom: 6
    },
    mapCard: {
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 8,
        borderWidth: 2,
        borderColor: "#F5F5F5",
        paddingRight: 20,
    },
    mapcardAlign: {
        padding: 5, paddingRight: 20,
    },
    orderdetailsCard: {
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 10,
        width: "95%",
        borderWidth: 1,
        borderColor: primaryColor,
        marginHorizontal: 10
    },
    horizontalLineGray: {
        marginVertical: 5,
        borderRadius: 3,
        backgroundColor: "lightgrey"
    },
    mapData: {
        fontSize: 16, color: "black", fontWeight: "600", color: "#4E5052", padding: 5,
        ...commonStyle.AvanirRoman,
    },
    orderdetails:
    {
        color: "#4E5052", fontSize: 15, fontWeight: "700", ...commonStyle.AvanirLightOblique
    },
    manifestOrders: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between"
    },
    mapaddress: {
        color: "#4E5052", fontSize: 15, ...commonStyle.AvanirLightOblique

    },
    addressview:
    {
        paddingHorizontal: 0, alignSelf: 'flex-start', marginBottom: 5, borderRadius: 10, justifyContent: "center", marginTop: 10
    },
    deliveryview: {
        display: "flex", alignItems: "flex-end", flexDirection: "row", width: "25%", display: "flex", flexDirection: "column", justifyContent: "space-between",
    },
    accept: {
        display: "flex", flexDirection: "row", width: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between"
    },
    phoneIcon: { flexDirection: "row", },
    itemStatus: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5,
    },
    statusColor: {
        padding: 5, borderRadius: 10
    },
    width75: {
        width: "75%"
    },
    width80: {
        width: "70%"
    },
    width20: {
        width: "30%"
    },
    noData: {
        textAlign: "center", textAlign: "center", color: "#242628"
    },
    centerAlignment: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    orderedDate: {
        paddingHorizontal: 0, alignSelf: 'flex-start', marginBottom: 5, borderRadius: 10, justifyContent: "center", marginTop: 10, display: 'flex', flexDirection: "row", alignItems: "center"
    },
    orderedCity: {
        paddingHorizontal: 6, alignSelf: 'flex-start', marginBottom: 5, borderRadius: 10, justifyContent: "center", flexDirection: "row", alignItems: "center"
    },
    deliveredCity: {
        paddingHorizontal: 0, alignSelf: 'flex-start', marginBottom: 5, borderRadius: 10, justifyContent: "center", marginTop: 5, marginLeft: 2, flexDirection: "row", alignItems: "center"
    },
    listOrders: {
        fontSize: 14, color: "#4E5052", marginLeft: 9, fontWeight: "600"
    },
    dateStyle: {
        color: "black", fontSize: 15, ...commonStyle.TitilliumWebSemiBoldItalic
    },
    approve: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 5, position: "absolute", bottom: -30, alignItems: "center", marginLeft: 30
    },
    dateStyles: {
        color: "#4E5052", fontSize: 14, ...commonStyle.AvanirRoman
    },
    deliveryManifest: {
        display: "flex", flexDirection: "row", width: "100%",
    },
    marginAlignment:
    {
        marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "center"
    },
    uploadDownloadALign: {
        marginHorizontal: 5, width: 25, height: 25, borderRadius: 12.5, alignItems: "center", justifyContent: "center", display: "flex"
    },
    marginLeft25: {
        marginLeft: 25
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: primaryColor,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        border:10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headertext1: {
        fontFamily: "Avenir-Black",
        fontSize: 20,
        color: "#4E5052",
        height: 30,
        paddingHorizontal: 10,
        marginVertical: 4,
        // backgroundColor: 'red'
        // position: 'absolute'
    },
    imageContainer: {
        margin: 18,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    removeButton: {
        padding: 5,
    },
    stepIndicatorcontainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        paddingHorizontal: 30,

    },
    rowItem: {
        flex: 3,
        paddingVertical: 20,
    },
    title: {
        flex: 1,
        fontSize: 12,
        color: 'grey',
        paddingVertical: 16,
        fontWeight: '600',
    },
    body: {
        flex: 1,
        fontSize: 15,
        color: '#606060',
        lineHeight: 24,
        marginRight: 8,
    },
    FlatList: {
        flexGrow: 1,
        fontSize: "medium"
    },





    container: {
        flex: 1,

    },
    indicatorcontainer: {
        flex: 1,

    },
    indicators: {
        padding: 10,

    },
    stepIndicatorContainer: {
        marginBottom: 5,
        // borderRightWidth:1,
        marginLeft: -35,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 15,
        color: '#333333',
        fontWeight: '600',
    },
    body: {
        fontSize: 14,
        color: '#333333',
        lineHeight: 24,
    },
    flatListContentContainer: {
        flexGrow: 1,
    },
    orderFlat: {
        height: undefined,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        // elevation: 30,
        justifyContent: 'space-between',
        padding: 13,
        borderWidth: 10,
        borderColor: 'lightgray',
        borderBottomColor: "lightgray",
        borderTopColor: "lightgray",
        borderBottomWidth: 1,
        borderRightWidth: 5,
        borderRightColor: "lightgray",
        borderTopLeftColor: "lightgray",
        borderTopWidth: 1,
        // marginTop: 10, marginRight: 5
    },
    startDelivery1: {
        height: 45,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: '35%',
        backgroundColor: "#57ba4a", width: "30%"
    },
centeredView : {
        flex: 1,
        alignItems: "center",
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(100,100,100, 0.8)',
        padding: 20,
    },
    modalView: {
        margin: 25,
        width: '82%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // height: '50%'
    },

})