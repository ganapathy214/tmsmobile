import { StyleSheet, Dimensions, Platform } from 'react-native';
import { commonStyle, primaryColor, primaryIconColor } from '../../Common/Styles/index'
const { height } = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;
const screenHeight = height;

export const styles = StyleSheet.create({
    orderAlign: {
        marginTop: 5, flexDirection: "row"
    },
    deliveryHyphen: {
        color: primaryIconColor,
    },
    truckimg: {
       
    },
    mapIcon: {
        marginHorizontal: 5
    },
    headerNo: {
        fontFamily: "Avenir-Black",
        fontWeight: "600",
        fontSize: 16,
        color: "#4E5052",
        // height: 30,
        // paddingHorizontal: 5,
        // marginTop:5
    },
    footer: {
        paddingHorizontal: 5,
        position: 'absolute',
        flex: 0.1,
        bottom: -1,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 20,
        shadowRadius: 8,
        elevation: 30,


    },
    hyphen: {
        marginLeft: 5,
        color: '#4E5052',
        // fontWeight: '600'
    },
    vehicleNo: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: "center"
    },
    headcontainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 30,
        shadowRadius: 8,
        elevation: 40,
        borderColor: 'white',
        // maxWidth: '87%',
        // width:screenWidth, 
        width: Dimensions.get("screen").width - 50,
        // width: '87%',
        marginHorizontal: 26,
        marginVertical: 10
    },
    headcontainer1: {
        backgroundColor: 'white',
        borderRadius: Platform.OS === 'ios' ? 20 : 10,
        shadowColor:  Platform.OS === 'ios' ? 'white' : 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 30,
        shadowRadius: 8,
        elevation:  Platform.OS === 'ios' ? 50 : 40,
        borderColor: 'lightgrey',
        borderWidth: 1,
        width: '87%',
        marginHorizontal: 28,
        marginVertical: 16,
        padding: 5
    },
    headertext: {
        fontFamily: "Avenir-Black",
        fontSize: 25,
        color: "#4E5052",
        height: 38,
        paddingHorizontal: 30,
        marginVertical: 5,
        paddingVertical: 5,
    },
    manifesttext: {
        fontFamily: "Avenir-Black",
        fontSize: 20,
        color: "#4E5052",
        height: 38,
        paddingHorizontal: 30,
        marginVertical: 5,
        paddingVertical: 5,
    },
    headertext1: {
        fontFamily: "Avenir-Black",
        fontSize: 16,
        color: "#4E5052",
        height: 30,
        // paddingHorizontal: 5,
        // marginVertical: 4,
        marginTop: 5,
    },
    deliveryplace: {
        flexDirection: "row", alignItems: "center"
    },
    footerIcon: {
        width: "75%", display: "flex", flexDirection: "row"
    },
    mapping: { width: "20%", display: "flex", flexDirection: "row" },
    // mappingButton: { display: "flex", flexDirection: "row", alignItems: "flex-end", alignContent: "flex-end", justifyContent: "space-between" },
    mapView: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'flex-end',
        // justifyContent: 'center'
    },
    align: {
        marginRight: 5, marginTop: 2
    },
    footerCommon: {
        backgroundColor: primaryColor, marginLeft: 10
    },
    mapcontainer: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
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
        paddingTop: 20,
        paddingBottom: 98,
        marginLeft: 5,
        backgroundColor: 'white',
    },
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
        shadowColor: "white",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        elevation: 30,
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 10,
        borderColor: primaryColor,
        borderBottomColor: "lightgrey",
        borderTopColor: "lightgrey",
        borderBottomWidth: 1,
        borderRightWidth: 5,
        borderRightColor: "lightgrey",
        borderTopLeftColor: "#64BD79",
        borderTopWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    newCard: {
        height: undefined,
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        justifyContent: 'space-between',
        padding: 13,
        borderWidth: 1,
        borderColor: "lightgrey",
        borderBottomColor: Platform.OS === 'ios' ? "lightgrey" : "white",
        borderTopColor: Platform.OS === 'ios' ? "lightgrey" : "white",
    },
    deliveryflatCard: {

        height: undefined,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 30,
        shadowRadius: 8,
        elevation: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: "lightgrey",
        borderTopColor: "lightgrey",
        borderBottomWidth: 1,
        borderRightColor: "lightgrey",
        borderTopLeftColor: "ligthgrey",
        borderTopRightColor: "ligthgrey",
        borderLeftColor: "lightgrey",
        paddingLeft: 2,
        marginLeft: 4,
        paddingHorizontal: 7,
        paddingVertical: 5,
        width: '100%',
        marginBottom: 35
    },
    flatCard: {

        height: undefined,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 30,
        shadowRadius: 8,
        // elevation: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: "lightgrey",
        borderTopColor: "lightgrey",
        borderBottomWidth: 1,
        borderRightColor: "lightgrey",
        borderTopLeftColor: "ligthgrey",
        borderTopRightColor: "ligthgrey",
        borderLeftColor: "lightgrey",
        paddingLeft: 2,
        marginHorizontal: 24,
        marginTop: 13,
        paddingHorizontal: 7,
        paddingVertical: 5,
        width: Dimensions.get("screen").width - 53,
        marginBottom: '50%',
    },
    cancelFlatCard: {
        height: undefined,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 30,
        shadowRadius: 8,
        elevation: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: "lightgrey",
        borderTopColor: "lightgrey",
        borderBottomWidth: 1,
        borderRightColor: "lightgrey",
        borderTopLeftColor: "ligthgrey",
        borderTopRightColor: "ligthgrey",
        borderLeftColor: "lightgrey",
        paddingLeft: 2,
        marginLeft: 4,
        marginTop: 10,
        paddingHorizontal: 7,
        paddingVertical: 5,
        width: '100%',
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
        alignItems: "center",
        borderColor: "lightgrey", borderWidth: 1,
        backgroundColor: 'white'
    },

    selectedText: {
        ...commonStyle.AvanirBlack,

        fontSize: 14,
        color: "white"
    },
    NonSelectedText: {
        ...commonStyle.AvanirBlack,
        color: primaryIconColor,
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
        borderRadius: 5,
        height: 40,
        backgroundColor: primaryColor,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 9,
        width: "120%",
        ...commonStyle.display,
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
    chevron: {
        marginRight: 5, marginTop: 2, padding: 3
    },
    flatListAlign: {
        padding: 15, width: "100%", marginBottom: 150

    },
    headerAlign: {
        flexDirection: "row", borderTopWidth: 0, borderBottomWidth: 1, borderColor: "lightgrey", backgroundColor: "#f5f7f7", width: "90%"
    },
    tableContentHeader: {
        color: "black",
    },
    headerItem: {
        width: "60%", borderColor: "#BBBFC3", borderBottomWidth: 0, borderTopWidth: 0, alignItems: "center", display: 'flex', justifyContent: "center", height: 50,
    },
    headerQuantity: {
        width: "30%", borderColor: "#BBBFC3", borderLeftWidth: 0, borderBottomWidth: 0, borderTopWidth: 0, alignItems: "center", display: 'flex', justifyContent: "center", height: 50
    },
    headerStatus: {
        width: "50%", borderColor: "#BBBFC3", borderLeftWidth: 0, borderBottomWidth: 0, borderTopWidth: 0, alignItems: "center", display: 'flex', justifyContent: "center", height: 50
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
        display: "flex", flexDirection: "row", width: "auto"
    },
    OrderListbottomSpace: {
        height: 80
    },
    orderlists: { padding: 5, display: "flex", flexDirection: "row", width: "100%" },
    itemlists: {
        width: "55%", alignItems: "center", alignContent: "center", alignSelf: "center",
    },
    itemqty: {
        width: "30%", alignItems: "center", alignContent: "center", alignSelf: "center"
    },
    itemtext: {
        width: "50%", height: 39, alignItems: "center"
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
        color: "#4E5052",
        fontFamily: "Avenir-Roman",
        marginRight: 3,
        // width: '100%',
        // maxWidth: '100%'
    },
    placeCatText: {
        fontSize: 16,
        marginLeft: 6,
        color: "#4E5052",
        width: '100%',
        fontFamily: "Avenir-Roman"
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
    // upload: {
    //     width: 25, height: 25, borderRadius: 12.5, alignItems: "center", justifyContent: "center", display: "flex"
    // },
    upload: {
        width: 20, height: 20, borderRadius: 12.5, alignItems: "center", justifyContent: "center", display: "flex"
    },
    delivery: {
        height: 45,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#57ba4a", width: "45%"

    },

    startDelivery: {
        height: 45,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        // display: "flex",
        // flexDirection: "row",
        marginLeft: '26%',
        backgroundColor: "#57ba4a", width: "45%"
    },
    startDelivery1: {
        height: 45,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 5,
        // display: "flex",
        // flexDirection: "row",
        // marginLeft: '35%',
        backgroundColor: "#57ba4a", width: "30%"
    },
    pauseCard: {
        height: 35,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1bcfb4", width: "45%",


    },
    deliveryCard: {
        height: 35,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1bcfb4", width: "45%"
    },
    deliveryCard1: {
        height: 40, borderRadius: 0,
        alignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 5,     
        display: "flex",
        flexDirection: "row",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: "white",
        borderColor: "#fe7c96",
        borderWidth: 1
    },
    resumecard: {
        height: 40,
        borderRadius: 0,
        alignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 5,   
        display: "flex",
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        flexDirection: "row",
        backgroundColor: "white",
        borderColor: "#1bcfb4",
        borderWidth: 1
    },
    deliverystatusIcons: {
        height: 35,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",

    },
    decline: {
        backgroundColor: 'white', borderWidth: 1, borderColor: "#1bcfb4", width: "45%", borderRadius: 5
    },
    deliveryText: {
        fontSize: 14,
        color: "white",
        alignContent: "center", alignItems: "center", alignSelf: "center",
        padding: 5,
        fontWeight: "600",
    },
    mapText: {
        fontSize: 16,
        fontWeight: "600",
        // alignContent: "flex-end", alignItems: "flex-end", alignSelf: "flex-end",
        textDecorationLine: "underline",
        fontFamily: "Avenir-Roman",
        // paddingHorizontal: 2,
        // marginBottom: 7,
        color: primaryIconColor
    },
    iconstyle: {
        alignContent: "center", alignItems: "center", alignSelf: "center",
    },
    iconSD: {
        marginRight: 7
    },
    icondesign: {

    },
    Mapicon: {
        alignContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 10, marginLeft: 1
    },
    iconCalendar: {
        alignContent: "center", alignItems: "center", alignSelf: "center", marginHorizontal: 0, marginBottom: 0
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
        fontSize: 13, color: "black", fontWeight: "600", color: "#4E5052", padding: 5,
    },
    orderdetails:
    {
        color: "#4E5052", fontSize: 15, fontWeight: "700",
        ...commonStyle.AvanirLightOblique,
        flex: 1, flexWrap: 'wrap'
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
        display: "flex", alignItems: "flex-end", flexDirection: "row", display: "flex", flexDirection: "column", justifyContent: "space-between",
    },
    accept: {
        display: "flex", flexDirection: "row", width: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between"
    },
    phoneIcon: { flexDirection: "row", },
    itemStatus: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5,
    },
    // statusColor: {
    //     padding: 5, borderRadius: 25,
    //     paddingHorizontal: 12

    // },
    statusColor: {
        borderRadius: 25,
        height: 30,
        padding: 2

    },

    width75: {
        width: "70%"
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
        paddingHorizontal: 0, alignSelf: 'flex-start', marginBottom: 5, borderRadius: 10, justifyContent: "center", flexDirection: "row", alignItems: "center", paddingVertical: 3
    },
    orderedSource: {
        paddingHorizontal: 0, alignSelf: 'flex-start', borderRadius: 10, justifyContent: "center", flexDirection: "row", alignItems: "center",
    },
    deliveredCity: {
        alignSelf: 'flex-start', marginBottom: 5, borderRadius: 10, justifyContent: "center", marginTop: 8, marginLeft: 0, flexDirection: "row", alignItems: "center", marginRight: 29, fontFamily: "Avenir-Roman"
    },
    listOrders: {
        fontSize: 14, color: "#4E5052", marginLeft: 9, fontWeight: "600"
    },
    dateStyle: {
        color: "black", fontSize: 15, ...commonStyle.TitilliumWebSemiBoldItalic
    },
    cityStyle: {
        color: "black", fontSize: 15, ...commonStyle.TitilliumWebSemiBoldItalic, marginLeft: 7
    },
    labelStlye: {
        color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600",
    },
    approve: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 5, position: "absolute", bottom: -30, alignItems: "center", marginLeft: '8%'
    },
    deliverybtns: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 2, alignItems: "center", marginHorizontal: 24
    },
    dateStyles: {
        color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600"
    },
    deliveryManifest: {
        display: "flex", flexDirection: "row", width: "100%",
    },
    clockIcon: {
        color: "black", fontSize: 15, ...commonStyle.TitilliumWebSemiBoldItalic
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
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
        fontSize: 15,
        color: '#333333',
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





    arrowicon: {
        marginVertical: 30,
        marginHorizontal: 25,
        marginRight: "40%"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // margin: 10
        marginVertical: 10,

    },
    headermessage: {
        flexDirection: 'row',
        alignItems: 'center',

        // marginVertical: 15,
        // marginHorizontal: 10,
    },
    Notificationcard: {

        height: undefined,
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: Platform.OS === 'ios' ? 0 : 0.9,
        elevation: 10,
        justifyContent: 'space-between',
        padding: 13,
        borderColor: "#64BD79",
        borderWidth: 1,
        borderStyle: "solid",
        marginHorizontal: 13,
        // marginVertical: 14,
        marginTop: 15
    },
    font: {
        fontSize: 20,
        color: "#4E5052",
        fontFamily: "Avenir-Roman",
        fontWeight: "600",
    },
    messageNotifiaction: {
        marginVertical: "1%",
    },
    textContent: {
        flex: 1, flexDirection: 'row', width: "auto",
    },
    txtColor: {
        color: '#4E5052'
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colors: {
        color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600"
    },
    clock: {
        display: 'flex', flexDirection: 'row', marginHorizontal: 15
    },
    time: {
        color: 'gray', fontSize: 12,
    },
    driver: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    driverIcon: {
        flexDirection: 'row',
    }


})
