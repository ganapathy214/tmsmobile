import { React, useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, TouchableOpacity, Text, KeyboardAvoidingView, Linking, View, FlatList, Dimensions, LayoutAnimation, Animated, Platform, UIManager, PanResponder, TextInput, Image, Modal, Easing, ImageBackground } from 'react-native';
import { styles } from './orderDetailstyle';
import { commonStyle, primaryColor, secondaryColor, primaryIconColor } from "../../Common/Styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RemoveButton } from '../Uploadimage/utils';
import BottomSheet from './BottomSheet';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import StepIndicator from 'react-native-step-indicator';
import { Signature } from '../Signature/index';
import dummydata from "./data"
import { CurrentOrderedlists } from './Orders';
import Feather from 'react-native-vector-icons/AntDesign'
import Modals from '../../Common/Components/Modal'

import endpin from "../../../assets/Images/endPin.png"
import startpin from "../../../assets/Images/startPin.png"
import Geolocation from 'react-native-geolocation-service';
import EmptyItems from './EmptyItems';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateQuantity, Updatestatus, getPickupList, orderdetails, orderemptyItems, updatePickupTrack } from '../../services/Manifestsession/ManifestAction';
import { useFocusEffect } from '@react-navigation/native';
import { verticalScale } from '../../Common/Utils';
import Toast from 'react-native-simple-toast';
import reactotron from 'reactotron-react-native';



const requestLocationPermission = async () => {
    try {
        let granted = false
        if (Platform.OS === "ios") {
            Geolocation.requestAuthorization('whenInUse');
            const status = await Geolocation.requestAuthorization('always');
            if (status === 'granted') {
                return true;
            } else {
                return false
            }

        }
        if (Platform.OS === "android") {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
        }
        if (granted === 'granted') {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};


function DeliveryInstruction(props) {


    const [expandeddelivery, setDeliveryexpanded] = useState(false);
    const deliverytoggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDeliveryexpanded(!expandeddelivery);
    };
    return (
        <View style={[styles.card, { borderColor: "white", marginLeft: Platform.OS === 'ios' ? 2 : 0 }]}>
            <View style={[styles.centerAlignment, {}]}>
                <View style={[styles.marginAlignment, {}]}>
                    <Icon
                        name={'exclamation-circle'}
                        size={20}
                        color={primaryIconColor}
                        style={{ marginLeft: 2 }}
                    />
                    <Text style={{ ...styles.mapData, padding: 10, color: "black" }}>
                        Delivery Instructions
                    </Text>
                </View>
                <View style={[{ width: "13%", alignItems: "center", alignSelf: "center" }]}>
                    <TouchableOpacity style={styles.row} onPress={deliverytoggleExpand}>
                        <Icon
                            name={expandeddelivery ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color={primaryIconColor}
                            style={[styles.chevron, { alignItems: "center", alignSelf: "center" }]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[props.isDragging && styles.dragging]}>
                <View>
                    {expandeddelivery && (
                        <>
                            <View style={{ borderRadius: 5, width: "100%", height: 130, backgroundColor: "white", borderWidth: 1, bordercolor: primaryIconColor, }}>
                                <ScrollView nestedScrollEnabled={true} style={{ margin: 5, opacity: 0.5 }}>
                                    <Text style={[styles.mapData]}>{props?.orderDetaildata?.deliveryInstruction ?? "" ? props?.orderDetaildata?.deliveryInstruction : "There are no delivery instructions"}</Text>
                                </ScrollView>
                            </View >
                        </>)}
                </View>
            </View>
        </View>
    )
}

const CustomDecline = () => {
    const [changetext, setChangeText] = useState(false);
    const [todelete, setdelete] = useState(false);
    const [fordelete, setfordelete] = useState(false);
    const [mobiletext, setmobiletext] = useState("");

    const deleteItem = (item) => {
        if (todelete === false) {
            setChangeText(true);
            setfordelete(true)
            setmobiletext("Are you sure you want to decline this order?")
        } else if (todelete === true) {

        }
    }
    const Change = (value) => {
        setChangeText(!value);
    }
    const toDelete = () => {
        setdelete(false)
    }

    return (
        <TouchableOpacity style={{ backgroundColor: "#1bcfb4", borderColor: "#1bcfb4", borderWidth: 1, borderRadius: 10, marginTop: 1 }} onPress={() => deleteItem()}>
            <Modals parentCallback={changetext} Callback={Change} fordelete={toDelete} todelete={fordelete} errortext={mobiletext} />
            <View style={{ display: 'flex', flexDirection: 'row', padding: 3 }}>
                <Feather
                    name={'closecircleo'}
                    size={14}
                    color={'white'}
                    style={{ marginTop: 3, marginRight: 8 }}
                />
                <Text style={[{ color: "white" }]}>{"Decline"}</Text>
            </View>
        </TouchableOpacity>)
}



function OrderItems({ updateorderdeatils, orderId, ...props }) {
    const { params } = props.route;
    const fetchdata = params.fetchdata
    const type = params.type
    const renderitem = params.groupItem
    const orderCompleted = params.completed
    const [expanded, setexpanded] = useState(false)
    const [allItems, setAllItems] = useState([]);
    const [allQty, setQty] = useState([]);
    const [removeQty, setremoveQty] = useState([]);
    const [orderItems, setorderItems] = useState()
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const dispatch = useDispatch()
    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setexpanded(!expanded);
    };
    useEffect(() => {
        const updates = props?.orderDetaildata
        const orderItem = { updateorderItem: orderItems }
        const updateQunatity = orderItem?.updateorderItem?.map((data) => {
            if (data) {
                return { ...data, quantity: data.updatequantity, orderId: orderId, isDelete: false }
            }
        })
        const updatedQuantity = updateQunatity?.map(({ id, updatequantity, ...rest }) => { return ({ ...rest, unitPrice: Number(rest?.unitPrice?.replace("$", "")) }) })
        dispatch(UpdateQuantity(updatedQuantity))
    }, [orderItems])
    useEffect(() => {
        setorderItems(props?.orderDetaildata?.orderItems?.map((md, index) => ({ ...md, id: Number(Date.now() + index), updatequantity: md?.quantity })))
    }, [props?.orderDetaildata?.orderItems])
    const updateList = (label, item) => {
        if (label === "add") {
            let addedItem = orderItems.map((data) => {
                if (data.id === item.id && data.quantity > data?.updatequantity) {
                    return { ...data, updatequantity: Number(data?.updatequantity) + 1 }
                } else {
                    return data
                }
            })

            setorderItems(addedItem);

        } else if (label === "remove") {
            let removeItem = orderItems.map((data) => {
                if (data.id === item.id && data.updatequantity > 0) {
                    return { ...data, updatequantity: Number(data.updatequantity) - 1 }
                } else {
                    return data
                }
            });
            setorderItems(removeItem);
        }
    }
    const RenderList = ({ item, index }) => {

        return (
            <View style={styles.OrderListbottomSpace}>
                <View style={[styles.orderlists, { marginTop: 10 }]}>
                    <View style={styles.itemlists}>
                        <Text numberOfLines={1} style={{ color: "black" }}>{item.itemType}</Text>
                    </View>
                    <View style={[styles.itemqty, { alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end' }]}>
                        <Text numberOfLines={1} style={{ color: "black" }}>{item.quantity}</Text>
                    </View>
                    <View style={styles.itemtext}>
                        {selectormyprofile === 2 || fetchdata === 'completed' || type === "Pickup" || type === "Cancelled" || type === "Delivered" ? <Text style={{ width: "100%", textAlign: 'center', color: primaryIconColor }}>{item.updatequantity}</Text> :
                            <View style={[{ width: "38%", alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                <View style={{ flexDirection: "row", }}>
                                    <TouchableOpacity onPress={() => updateList("remove", item)} >
                                        <AntDesign
                                            name={'minussquareo'}
                                            size={20}
                                            color={primaryIconColor}
                                            style={{}}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ paddingHorizontal: 5, width: "100%", textAlign: "right", color: primaryIconColor }}>{item.updatequantity}</Text>
                                    <TouchableOpacity onPress={() => updateList("add", item)} >
                                        <AntDesign
                                            name={'plussquareo'}
                                            size={20}
                                            color={primaryIconColor}
                                            style={{}}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>}
                    </View>
                </View>
                <View style={[styles.horizontalLineGray]} />
            </View>
        )
    }

    const RenderOrderitem = ({ item }) => {
        let previousOrderId = null;
        return (
            <View>
                {item?.map((item, index) => (
                    <View key={index}>
                        {item.orderItems && item.orderItems.length > 0 ? (
                            item.orderItems.map((orderItem, itemIndex) => {
                                if (orderItem.orderId !== previousOrderId) {
                                    previousOrderId = orderItem.orderId;
                                    return (
                                        <>
                                            <View>
                                                <Text style={{ marginHorizontal: 12, color: "#4E5052", fontSize: 15, fontWeight: "700", ...commonStyle.AvanirLightOblique, marginTop: 8 }}>Order ID: #<Text style={{ color: "#4E5052", fontSize: 15, fontWeight: "700", ...commonStyle.AvanirLightOblique }}>{orderItem.orderId}</Text></Text>
                                                <View key={itemIndex} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                                                    <Text style={{ color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: "5%" }}>{orderItem.itemType}</Text>
                                                    <Text style={{ color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: '20%' }}>{orderItem.quantity}</Text>
                                                </View>
                                            </View>
                                        </>
                                    );
                                } else {
                                    return (
                                        <View key={itemIndex} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                                            <Text style={{ flex: 1, color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: "5%" }}>{orderItem.itemType}</Text>
                                            <Text style={{ color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: '20%' }}>{orderItem.quantity}</Text>
                                        </View>
                                    );
                                }
                            })
                        ) : (
                            <Text style={{ flex: 1, textAlign: 'center' }}>No order items available</Text>
                        )}
                    </View>
                ))}
            </View>
        );
    };
    return (
        <View style={[styles.card, { borderColor: "white", marginBottom: Platform.OS === 'ios' ? 9 : 0, marginLeft: Platform.OS === 'ios' ? 2 : 0 }]}>
            <View style={[styles.centerAlignment,]}>
                <View style={[styles.marginAlignment,]}>
                    <MaterialCommunityIcons
                        name={'truck-cargo-container'}
                        size={20}
                        color={primaryIconColor}
                        style={{ marginRight: 5, marginLeft: 1 }}
                    />
                    <Text style={{ ...styles.mapData, paddingHorizontal: 3, color: "black" }}>
                        Order Items
                    </Text>
                </View>
                <View style={[{ width: "13%", alignItems: "center", alignSelf: "center" }]}>
                    <TouchableOpacity style={styles.row} onPress={toggleExpand}>
                        <Icon
                            name={expanded ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color={primaryIconColor}
                            style={[styles.chevron, { alignItems: "center", alignSelf: "center" }]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={[props.isDragging && styles.dragging]}>
                <View>
                    {expanded && (
                        <>

                            {type === "Pickup" ? <>

                                <View style={{ marginVertical: 12, borderBottomWidth: 1, borderRightWidth: 1, borderRadius: 10, borderLeftWidth: 1 }}>
                                    <FlatList
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={{ backgroundColor: primaryColor, flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#BBBFC3", borderRightWidth: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                                    <View style={{ width: "50%", borderWidth: 0, borderColor: "#BBBFC3", borderLeftWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, alignItems: "center", display: 'flex', justifyContent: "center", minHeight: verticalScale(60), borderTopLeftRadius: 8 }}>
                                                        <Text style={[styles.tableContentHeader, { color: "white" }]}>
                                                            Item
                                                        </Text>
                                                    </ View>
                                                    <View style={{ width: "50%", borderWidth: 0, borderColor: "#BBBFC3", borderBottomWidth: 0, borderTopWidth: 0, alignItems: "center", display: 'flex', justifyContent: "center", minHeight: verticalScale(60), borderTopRightRadius: 10 }}>
                                                        <Text style={[styles.tableContentHeader, { color: "white" }]}>
                                                            Order Qty
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                        data={
                                            [[renderitem]]
                                        }
                                        renderItem={({ item, index }) => (
                                            <RenderOrderitem item={item} index={index} />
                                        )}
                                        ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                                    />
                                </View>
                            </> : <FlatList
                                ListHeaderComponent={() => {
                                    return (
                                        <View style={styles.headerAlign}>
                                            <View style={styles.headerItem}>
                                                <Text style={[styles.tableContentHeader,]}>
                                                    Item
                                                </Text>
                                            </ View>
                                            <View style={styles.headerQuantity}>
                                                <Text style={[styles.tableContentHeader]} numberOfLines={1}>
                                                    Order Qty
                                                </Text>
                                            </View>
                                            <View style={styles.headerStatus}>
                                                <Text style={[styles.tableContentHeader]} numberOfLines={1}>
                                                    Picked Qty
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }}
                                data={orderItems ?? []}
                                renderItem={RenderList}
                                ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                            />}
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}
function OrderStatus(props) {
    const screenWidth = Dimensions.get('window');
    const scrollViewRef = useRef(null);
    const [orderStatus, setorderStatus] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [scroll, setScroll] = useState(98);
    const [offsety, setOffsety] = useState(0);
    const [status, setstatus] = useState(false);
    const [modals, setmodal] = useState(false)
    const orderDetaildata = props?.orderDetaildata
    const tenantId = orderDetaildata?.tenantId
    const orderId = orderDetaildata?.orderId
    const stepindicatorStatus = orderDetaildata?.orderStatus


    useEffect(() => {
        // if (orderStatus) {

        if (stepindicatorStatus === "Picked Up") {
            setCurrentPosition(2);
            // scrollToPosition(2);
        }
        else if (stepindicatorStatus === "Towards Pick Up") {

            setCurrentPosition(1);
            // scrollToPosition(1);
        }
        else if (stepindicatorStatus === "In Progress") {

            setCurrentPosition(3);
            // scrollToPosition(3);
        }
        else if (stepindicatorStatus === "Delivered") {

        }


    }, [stepindicatorStatus])

    useEffect(() => {
        scrollToPosition(currentPosition)
    }, [currentPosition, orderStatus])


    const scrollToPosition = (position) => {
        if (scrollViewRef.current) {
            let scrollPosition = position * 95;
            if (position === 3 || position === 2 || position === 1 || position === 4) {
                scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
            }
        }
    };

    const dispatch = useDispatch()


    const ordertoggleExpand = () => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setorderStatus(!orderStatus);


    };
    const onClose = () => {
        setmodal(false)
    }
    const imageAlert = () => {
        setmodal(!modals)
        setstatus(!status)
    }

    const handleStepPress = (position) => {

        if (position === currentPosition + 1) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setCurrentPosition(position);
            if (position === 1) {
                dispatch(Updatestatus(5, tenantId, orderId))
            } else if (position === 2) {
                dispatch(Updatestatus(6, tenantId, orderId))
            } else if (position === 3) {
                dispatch(Updatestatus(7, tenantId, orderId))
            } else if (position === 4) {
                { !!props.orderDetaildata.signatureImage && !!props.orderDetaildata.deliveryItemImage ? dispatch(Updatestatus(1, tenantId, orderId)) : imageAlert() }

            }
        };
    }

    const AlertModals = (currentPosition) => {
        return (<Modal visible={modals} animationType="fade"
            transparent={true}  >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>

                    <Text style={{ color: 'black', fontFamily: 'Avenir-Roman', fontSize: 14, fontWeight: '800', marginTop: '3%' }}>Alert!</Text>

                    <View>
                        <Text style={{ color: 'black', fontFamily: 'Avenir-Roman', fontSize: 14, fontWeight: '700', marginHorizontal: 15, marginTop: '3%' }}>
                            {!!props.orderDetaildata.signatureImage ? "Image Need to Upload" : !!props.orderDetaildata.deliveryItemImage ? "Signature Need to Upload" : "Signature And Image Need to Upload"}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setmodal(!modals)
                        setstatus(!status)
                        setCurrentPosition(3);
                    }} style={[styles.imagealertdelivery, { backgroundColor: "#1bcfb4", marginTop: 10, }]}>
                        <Feather
                            name={'checkcircleo'}
                            size={14}
                            color={'white'}
                            style={{ marginRight: 5 }}
                        />
                        <Text style={[styles.deliveryText,]}>{"Ok"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }

    const RenderPage = ({ item, index }) => {

        const onPressLabel = () => {
            handleStepPress(index);
        };

        return (
            <View style={styles.rowItem}>
                <TouchableOpacity onPress={onPressLabel}>
                    <Text
                        style={{
                            color: index === currentPosition ? "#333333" : "grey",
                            fontWeight: "600",
                            fontFamily: "Avenir-Black",
                            fontSize: 15,
                            color: primaryIconColor,
                            marginLeft: -15,
                        }}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const icons = ["check", "truck", "truck", "spinner", "shopping-basket"];
    const customStyles = {
        stepIndicatorSize: 40,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 3,
        currentStepStrokeWidth: 5,
        stepStrokeCurrentColor: "#57ba4a",
        separatorFinishedColor: primaryColor,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#aaaaaa',
        stepIndicatorUnFinishedColor: 'gray',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 15,
        currentStepIndicatorLabelFontSize: 15,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: 15,
        currentStepLabelColor: '#36454F',
    }
    return (
        <View style={[styles.card, { borderColor: "white", marginLeft: Platform.OS === 'ios' ? 2 : 0 }]}>
            {status ? AlertModals(currentPosition) : null}
            <View style={[styles.centerAlignment,]}>
                <View style={[styles.marginAlignment]}>
                    <MaterialCommunityIcons
                        name={'list-status'}
                        size={20}
                        color={primaryIconColor}
                        style={{ marginLeft: 2 }}
                    />
                    <Text style={{ ...styles.mapData, padding: 10, color: "black" }}>
                        Status
                    </Text>
                </View>
                <View style={[{ width: "13%", alignItems: "center", alignSelf: "center" }]}>
                    <TouchableOpacity style={styles.row} onPress={ordertoggleExpand}>
                        <Icon
                            name={orderStatus ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color={primaryIconColor}
                            style={[styles.chevron, { alignItems: "center", alignSelf: "center" }]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[props.isDragging && styles.dragging]}>
                <View>
                    {orderStatus && (
                        <>
                            <View>
                                <ScrollView
                                    ref={scrollViewRef}
                                    nestedScrollEnabled={true}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}

                                >
                                    <View style={styles.indicators}>
                                        <View style={styles.stepIndicatorContainer}>
                                            <StepIndicator
                                                customStyles={customStyles}
                                                stepCount={dummydata.data.length}
                                                direction="horizontal"
                                                currentPosition={currentPosition}
                                                onPress={handleStepPress}
                                                renderStepIndicator={({ position, stepstatus }) => (
                                                    <>
                                                        <Icon name={icons[position]} size={18} color="#000000" />
                                                    </>
                                                )}
                                            />
                                        </View>
                                        <View>
                                            <FlatList
                                                data={dummydata.data}
                                                renderItem={RenderPage}
                                                horizontal
                                                pagingEnabled
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => index.toString()}
                                                contentContainerStyle={styles.flatListContentContainer}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </>)}
                </View>
            </View>
        </View>
    )
}
function OrderDetail(props) {
    const icons = ["check", "truck", "truck", "spinner", "shopping-basket"];
    const { height } = Dimensions.get('window');
    const screenHeight = height;
    const { params } = props.route;
    const orderCompleted = params.completed
    const manifestId = params.manifestId
    const fetchdata = params.fetchdata
    const type = params.type
    const orderId = params.orderId
    const conditionStatus = params?.updateStatus
    const pickupAddress = params.pickupAddress;

    const testData = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const scrollViewRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [orderStatus, setorderStatus] = useState(false)
    const [details, setorderDetaildata] = useState()
    const [quanity, setupdateQuantity] = useState()
    const [location, setLocation] = useState(null);



    const [modalshow, setmodalshow] = useState(false)
    const [expandeddelivery, setDeliveryexpanded] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isDragging, setisDragging] = useState(false)
    const dispatch = useDispatch();

    const getLocation = async () => {
        try {
            const granted = await requestLocationPermission();

            if (granted) {
                Geolocation.getCurrentPosition(
                    position => {
                        setLocation(position.coords);
                    },
                    err => {
                        setLocation(null);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            } else {
                setLocation(null);
            }
        } catch (error) {
            console.log("Error getting location:", error);
            setLocation(null);

        }
    };
    const Orderdetails = useSelector(state => state.Manifest.orderDetaildata);
    useEffect(() => {
        getLocation()
        dispatch(orderdetails(orderId))
        dispatch(orderemptyItems(orderId))
        if (type == "Pickup") {
            dispatch(getPickupList(manifestId))
        }
    }, [])
    useEffect(() => {
        fetchStoredImages();
        commentsOreder();
    }, [params])


    useEffect(() => {
        if (Object.keys(Orderdetails).length === 0) {
            setorderDetaildata()
        } else {
            if (!!Orderdetails?.data[0]) {
                setorderDetaildata(Orderdetails?.data[0])
            }
        }
    }, [Orderdetails])
    const commentsOreder = async () => {
        const localcomments = await AsyncStorage.getItem('comments_data')
        const commentslength = JSON.parse(localcomments).length
        setBatch(commentslength)
    }

    const [groupList, setGroupList] = useState(CurrentOrderedlists)
    const orderItems = (groupItem, item) => {
        props.navigation.navigate("orderItem", params);
    }
    const fetchStoredImages = async () => {
        try {
            const storedImages = await AsyncStorage.getItem('selected');
            if (storedImages) {
                const parsedImages = JSON.parse(storedImages);
                setSelectedImages(parsedImages);
            }
        } catch (error) {
        }
    };
    const ImageModal = ({ visible, onClose, images, onRemove }) => {
        const newData = images.filter(({ path }) => path !== null);
        return (
            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.buttonContainer}>
                            <View>
                                {newData.length === 0 ? <Text style={{}}>No images---</Text>
                                    : <></>}
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Icon name="times" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={commonStyle.alignTextCenter} >
                            <FlatList
                                keyExtractor={(item, index) => `key-${index}`}
                                data={newData}
                                renderItem={({ item, index }) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image source={{ uri: item.path }} style={styles.image} />
                                        <RemoveButton onPress={() => Remove(index)} />
                                    </View>
                                )}
                                numColumns={2}
                            />

                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const ref = useRef(null);
    ref?.current?.scrollTo(-503);




    const GOOGLE_API_KEY = "AIzaSyDUlxaj_7KvQej23TLqmq3oaWwmJBlcE1A";

    const Deliverlist = () => {
        props.navigation.navigate("deliverydata");
    }
    const [coordinates] = useState([
        {
            latitude: -34.781978425028704,
            longitude: 138.60935919892148,
        },
        {
            latitude: -34.87971264190019,
            longitude: 138.5342108503384,
        },
    ]);

    const declineList = () => {

    }

    const startPoint = () => {
        return (
            <View>
                <ImageBackground
                    source={startpin}
                    style={{ height: 25, width: 25 }} />
            </View>
        )
    }
    const endPoint = () => {
        return (
            <View>
                <ImageBackground
                    source={endpin}
                    style={{ height: 50, width: 50 }} />
            </View>
        )
    }

    const Floating = () => {
        const [changetext, setChangeText] = useState(false);
        const [todelete, setdelete] = useState(false);
        const [fordelete, setfordelete] = useState(false);
        const [mobiletext, setmobiletext] = useState("");

        const deleteItem = (item) => {
            if (todelete === false) {
                setChangeText(true);
                setfordelete(true)
                setmobiletext("Are you sure you want to decline this order?")
            } else if (todelete === true) {

            }
        }
        const Change = (value) => {
            setChangeText(!value);
        }
        const toDelete = () => {
            setdelete(false)
        }
        return (
            <View style={{ position: 'absolute', right: 1, zIndex: 10 }}>
                <View style={{ backgroundColor: 'white', borderWidth: 2, borderColor: "#1bcfb4", padding: 5, borderRadius: 50, width: 60, height: 60, margin: 10, display: "flex", justifyContent: 'center', alignItems: 'center', shadowOpacity: 20, elevation: 30 }}>
                    <Modals navigation={props} details={details} parentCallback={changetext} decline={"decline"} tenantId={details?.tenantId ?? ""} orderId={details?.orderId ?? ""} Callback={Change} fordelete={toDelete} todelete={fordelete} errortext={mobiletext} params={params} orderStatus={params?.orderStatus} />
                    <TouchableOpacity onPress={() => deleteItem()} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Feather
                                name={'closecircleo'}
                                size={20}
                                color={'#fe7c96'}
                            />
                            <Text style={{ color: primaryIconColor, fontWeight: "400", fontSize: 12 }} >{'Decline'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>)
    }

    const dialCall = () => {

        // let phoneNumber = '';

        // if (Platform.OS === 'android') {
        //     phoneNumber = `tel:${details?.deliveryPhoneNumber}`
        // }
        // else {

        //     phoneNumber = 'tel:119';
        // }

        Linking.openURL(details?.deliveryPhoneNumber);
    };
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)

    let coOrds = {}
    if (type == "Pickup") {
        coOrds = {
            latitude: parseFloat(params?.groupItem?.pickupLatitude ?? 0),
            longitude: parseFloat(params?.groupItem?.pickupLongitude ?? 0)
        }
    } else {
        coOrds = {
            latitude: parseFloat(params?.groupItem?.deliveryLatitude ?? 0),
            longitude: parseFloat(params?.groupItem?.deliveryLongitude ?? 0)
        }
    }

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={{ flex: 1, position: 'relative' }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        {location !== null && !!params ?
                            <MapView
                                // maxZoomLevel={10}
                                provider={PROVIDER_GOOGLE}
                                style={[styles.map]}
                                initialRegion={{
                                    latitude: params?.groupItem?.pickupLatitude === null ? location?.latitude : parseFloat(params?.groupItem?.pickupLatitude) ?? 0,
                                    longitude: params?.groupItem?.pickupLongitude === null ? location?.longitude : parseFloat(params?.groupItem?.pickupLongitude) ?? 0,
                                    latitudeDelta: 0.350,
                                    longitudeDelta: 0.121,
                                }}
                            >
                                <MapViewDirections
                                    showsUserLocation={true}
                                    origin={{
                                        latitude: location?.latitude,
                                        longitude: location?.longitude,
                                    }}
                                    destination={coOrds}
                                    apikey={GOOGLE_API_KEY}
                                    strokeWidth={4}
                                    strokeColor={primaryColor}
                                />
                                <Marker coordinate={{
                                    latitude: location?.latitude,
                                    longitude: location?.longitude,
                                }}>
                                    <View>
                                        <ImageBackground
                                            source={startpin}
                                            style={{ height: 25, width: 25 }} />
                                    </View>
                                </Marker>
                                <Marker coordinate={coOrds}>
                                    <View>
                                        <ImageBackground
                                            source={endpin}
                                            style={{ height: 50, width: 50 }} />
                                    </View>
                                </Marker>
                            </MapView> : null}

                        {selectormyprofile === 2 || fetchdata === 'completed' || type === 'Pickup' || type === "Cancelled" || type === "Delivered" ? null :
                            <View>

                                <Floating />
                            </View>

                        }
                        <BottomSheet ref={ref} params={params} quanity={quanity} orderdetails={details} navigation={props.navigation} storedImages={selectedImages}>
                            <ScrollView nestedScrollEnabled={true} style={[{}]}>

                                <View style={{ paddingLeft: 5 }}>
                                    <View style={[styles.card, { borderColor: "white" }]}>
                                        <View style={[styles.centerAlignment]}>
                                            <View style={[styles.marginAlignment, { width: "30%", justifyContent: "flex-start", alignItems: "center" }]}>
                                                <MaterialIcons
                                                    name={'category'}
                                                    size={20}
                                                    color={primaryIconColor}
                                                    style={{ marginRight: 5 }}
                                                />
                                                <Text style={[styles.mapData, { color: "black", alignItems: "center" }]}>
                                                    Type
                                                </Text>
                                            </View>
                                            <View style={[styles.marginAlignment, { width: "10%" }]}>
                                                <Text style={styles.mapData}>
                                                    :
                                                </Text>
                                            </View>
                                            <View style={[styles.marginAlignment, { width: "100%", justifyContent: "flex-start", alignItems: "center" }]}>
                                                <View style={[styles.uploadDownloadALign, styles.marginLeft25,
                                                { backgroundColor: type === "Pickup" ? "#4688fc" : "grey", }
                                                ]}>
                                                    {type === "Pickup" ? <Icon
                                                        name={'upload'}
                                                        size={14}
                                                        color={"white"}
                                                    /> : <Icon
                                                        name={'download'}
                                                        size={14}
                                                        color={"white"}
                                                    />}
                                                </View>
                                                <Text style={[styles.mapData,]}>
                                                    {type === "Pickup" ? "Pickup" : "Delivery"}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", }}>
                                            <View style={[styles.marginAlignment, { width: "30%", justifyContent: "flex-start", alignItems: "flex-start" }]}>
                                                <EntypoIcon
                                                    name={'location-pin'}
                                                    size={20}
                                                    color={primaryIconColor}
                                                    style={{ marginRight: 5 }}
                                                />
                                                <Text style={[styles.mapData, { color: "black" }]}>
                                                    Address
                                                </Text>
                                            </View>
                                            <View style={[styles.marginAlignment, { width: "10%", alignItems: "flex-start" }]}>
                                                <Text style={styles.mapData}>
                                                    :
                                                </Text>
                                            </View>
                                            <View style={[styles.marginAlignment, styles.marginLeft25, { flex: 1, flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }]}>
                                                <Text style={[styles.mapData, { color: primaryIconColor, width: "auto", height: "auto" }]}>
                                                    {type === "Pickup" ? `${pickupAddress}` : `${details?.deliveryAddress ?? ""}`}
                                                </Text>
                                                <Text style={[styles.mapData, { color: primaryIconColor, width: "auto", height: "auto" }]}>
                                                    {type === "Pickup" ? "" : `${details?.deliveryCity ?? ""}, ${details?.deliveryState ?? ""}`}
                                                </Text>
                                                <Text style={[styles.mapData, { color: primaryIconColor, width: "auto", height: "auto" }]}>
                                                    {type === "Pickup" ? "" : `${details?.deliveryCountry ?? ""}
                                                      `}
                                                </Text>
                                            </View>
                                        </View>
                                        {selectormyprofile === 2 || fetchdata === 'completed' ? null :
                                            details?.endCustomer !== null ? <View style={[styles.centerAlignment]}>
                                                <View style={[styles.marginAlignment, { width: "30%", justifyContent: "flex-start", alignItems: "center" }]}>
                                                    <MaterialIcons
                                                        name={'person'}
                                                        size={20}
                                                        color={primaryIconColor}
                                                        style={{ marginRight: 5 }}
                                                    />
                                                    <Text style={[styles.mapData, { color: "black" }]}>
                                                        Contact
                                                    </Text>
                                                </View>
                                                <View style={[styles.marginAlignment, { width: "10%" }]}>
                                                    <Text style={styles.mapData}>
                                                        :
                                                    </Text>
                                                </View>
                                                <View style={[styles.marginAlignment, styles.marginLeft25, { width: "100%", justifyContent: "flex-start", flex: 1, flexWrap: 'wrap' }]}>

                                                    <Text style={[styles.mapData]}>
                                                        {details?.endCustomer}
                                                    </Text>

                                                </View>
                                            </View> : null}

                                        {selectormyprofile === 2 || fetchdata === 'completed' ? null : <View style={[styles.centerAlignment]}>

                                            <View style={[styles.marginAlignment, { width: "30%", justifyContent: "flex-start", alignItems: "center" }]}>
                                                <EntypoIcon
                                                    name={'old-phone'}
                                                    size={20}
                                                    color={primaryIconColor}
                                                    style={{ marginRight: 5 }}
                                                />
                                                <Text style={[styles.mapData, { color: "black" }]}>
                                                    Phone
                                                </Text>
                                            </View>
                                            <View style={[styles.marginAlignment, { width: "10%" }]}>
                                                <Text style={styles.mapData}>
                                                    :
                                                </Text>
                                            </View>
                                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${details?.deliveryPhoneNumber}`)} style={[styles.marginAlignment, styles.marginLeft25, { width: "100%", justifyContent: "flex-start" }]}>

                                                <Text style={[styles.mapData, { textDecorationLine: "underline" }]}>{details?.deliveryPhoneNumber != null ? details?.deliveryPhoneNumber : "+61 412345678"}</Text>

                                            </TouchableOpacity>
                                        </View>}
                                    </View>
                                    {modalshow ? AlertModals(currentPosition) : null}
                                    <ScrollView nestedScrollEnabled={true}>
                                        {type === "Pickup" || type === "Cancelled" || type === "Delivered" || fetchdata === 'completed' || !!params?.swipescreenOrder?.startTime === false ? null : <OrderStatus isDragging={isDragging} orderDetaildata={details} params={params}  {...props} />}
                                        {type === "Pickup" || type === "Cancelled" || type === "Delivered" ? null : <DeliveryInstruction isDragging={isDragging} orderDetaildata={details} testData={testData} {...props} />}
                                        <OrderItems isDragging={isDragging} orderId={orderId} orderDetaildata={details} {...props} />
                                        {fetchdata === 'completed' || type === "Pickup" || type === "Cancelled" ? null : <EmptyItems orderDetaildata={details} isDragging={isDragging} {...props} />}
                                    </ScrollView>
                                </View>
                            </ScrollView>
                        </BottomSheet>
                    </GestureHandlerRootView>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}
export default OrderDetail;