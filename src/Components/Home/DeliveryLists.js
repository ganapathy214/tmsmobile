import { React, useEffect, useMemo, useState } from "react";
import { Text, ScrollView, View, TouchableOpacity, FlatList, Linking, LayoutAnimation, Animated, RefreshControl, ActivityIndicator } from 'react-native';
import { commonStyle, primaryColor, primaryIconColor, secondaryColor, greenColor } from "../../Common/Styles";
import { styles } from './styles';
import Entypo from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modals from '../../Common/Components/Modal'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SwipeButton from 'rn-swipe-button';
import { ManfiestDateformats, height, screenWidth, verticalScale } from "../../Common/Utils";
import Profilelogo from "../../../assets/Images/rightArrowbig.svg";
import Feather from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Stop from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { Manifests, ManifestsAcceptStatus, ManifestsDeclineStatus, adminTrackingCall, cancelledmanifestslists, completedManifestsLists, orderItemstable, ordetailswipeResume, ordetailswipeScreen, ordetailswiperesumeScreen, ordetaiswipelPause, ordetaiswipelStop, recentManifests } from "../../services/Manifestsession/ManifestAction";
import { orderItems } from './Orders';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import { ordetailTimeUpdate } from "../../services/Manifestsession/ManifestAction";
import Toast from "react-native-simple-toast"
import reactotron from "reactotron-react-native";

const Home = (props) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const [expandeditems, setExpandeditems] = useState([]);
    const [changetext, setChangeText] = useState(false);
    const [todelete, setdelete] = useState(false);
    const [fordelete, setfordelete] = useState(false);
    const [mobiletext, setmobiletext] = useState("");
    const [accepted, setAccepted] = useState(true)
    const [pause, setPause] = useState("")
    const [resume, setResume] = useState(true)
    const [recentdata, setrecentfetcheddata] = useState()
    const defaultStatusMessage = 'swipe status appears here';
    const [handle, setHandle] = useState(false);
    const [swipeStatusMessage, setSwipeStatusMessage] = useState(
        defaultStatusMessage,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [disableCBButton, setDisableCBButton] = useState(false)
    const [selectedManifestId, setSelectedManifestId] = useState(null);
    const updateSwipeStatusMessage = (message) => setSwipeStatusMessage(message);
    const [groupedData, setGroupedData] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [footerBackgroundColor, setFooterBackgroundColor] = useState('#FFFFFF');
    const [show, setshow] = useState(true)
    const [starttime, setstarttime] = useState();
    const [breaktime, setbreaktime] = useState();
    const [endtime, setendtime] = useState();
    const [start, setstart] = useState()
    const [breakstart, setbreak] = useState()
    const [breakend, setbreakend] = useState()
    const [end, setend] = useState()
    const [time, settime] = useState()
    const [driverendtime, setdriverendtime] = useState();
    const [Status, setStatus] = useState("")
    const [updateStatus, setUpdatestatus] = useState()
    const recentfetcheddata = useSelector(state => state.Manifest.recentfetcheddata);
    const compeletedfetcheddata = useSelector(state => state.Manifest.compeletedfetcheddata);
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const currentSwipeData = useSelector(state => state.Manifest.swipescreenOrder);
    const Manifested = useSelector(state => state.Manifest.ManifestData?.data ?? []);
    const { params } = props.route;
    const orderStatus = params?.orderStatus;
    const isSwipeEnable = params?.isSwipeEnable ?? false;
    const param = orderItems
    const Flag = params?.flag
    const completed = params?.completed
    const fetchdata = params?.fetchdata
    const manifestId = params?.manifestId
    const orderId = params
    const manifestCode = params?.name
    const vehicleRegistrationNumber = params?.vehicleRegistrationNumber
    const paramData = recentfetcheddata.data
    const userdetails = useSelector(state => state.session.userDetails.data ?? {});
    const identyOrder = recentdata?.data?.map((item) => item.orderId)

    const statusColorCode = {
        "Towards Pick Up": "#ffbd2e",
        "Picked Up": "#ffbd2e",
        "In Progress": "#ffbd2e",
        "Delivered": "#57ba4a",
        "Cancelled": "#fe7c96",
        "Pending": "#ffbd2e",
    }
    useEffect(() => {
        if (isFocused) {
            dispatch(recentManifests(manifestId))
                .then(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                });
        }
    }, [params.manifestId, isFocused])


    useEffect(() => {
        if (isFocused) {
            dispatch(recentManifests(manifestId))
                .then(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                });

        }
    }, [fetchdata, isFocused]);

    useEffect(() => {
        dispatch(ordetailTimeUpdate(manifestId))
        if (userdetails?.roleId === 2) {
            dispatch(adminTrackingCall(manifestId))
        }
    }, [])

    const swipescreenOrder = useMemo(() => {
        let currentOrder = currentSwipeData?.data?.filter((data) => data.manifestId === manifestId) ?? []
        if (currentOrder.length > 0) {
            return currentOrder[0]
        } else {
            return ""
        }
    }, [manifestId, currentSwipeData]);

    useEffect(() => {

        if (!!swipescreenOrder) {
            const swipe = swipescreenOrder
            const options = { hour: 'numeric', minute: 'numeric', hour12: true, };
            const formattedEndTime = new Date(swipe?.breakEndTime ?? "").toLocaleTimeString('en-US', options);
            setbreakend(swipe?.breakEndTime ?? "");
            setendtime(swipe?.breakEndTime ? formattedEndTime : "");

            if (!!swipe?.startTime) {
                const options = { hour: 'numeric', minute: 'numeric', hour12: true, };
                const formattedStartTime = new Date(swipe?.startTime).toLocaleTimeString('en-US', options);
                setstart(swipe?.startTime)
                setstarttime(formattedStartTime)
            }
            if (!!swipe?.breakStartTime) {
                const options = { hour: 'numeric', minute: 'numeric', hour12: true, };
                const formattedBreakTime = new Date(swipe?.breakStartTime).toLocaleTimeString('en-US', options);
                setbreak(swipe?.breakStartTime)
                setbreaktime(formattedBreakTime)
            } if (!!swipe?.breakEndTime) {
                const options = { hour: 'numeric', minute: 'numeric', hour12: true, };
                const formattedEndTime = new Date(swipe?.breakEndTime).toLocaleTimeString('en-US', options);
                setbreakend(swipe?.breakEndTime)
                setendtime(formattedEndTime)
            } if (!!swipe?.endTime) {
                const options = { hour: 'numeric', minute: 'numeric', hour12: true, };
                const formatteddriverEndTime = new Date(swipe?.endTime).toLocaleTimeString('en-US', options);
                setend(swipe?.endTime)
                setdriverendtime(formatteddriverEndTime)
            }
        } else {
            setstarttime("")
            setdriverendtime("")
            setendtime("")
        }
    }, [swipescreenOrder])

    useEffect(() => {
        if (!!recentfetcheddata.data) {
            let sortbyPosition = {
                ...recentfetcheddata, data: recentfetcheddata?.data?.sort(function (a, b) {
                    var x = a.sortPosition; var y = b.sortPosition;
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }) ?? []
            }


            setrecentfetcheddata(sortbyPosition)
        }

    }, [recentfetcheddata])

    useEffect(() => {
        const groupedvalues = _.groupBy(recentdata?.data, (item) => (item.pickupAddress.replaceAll(" ", "").toLowerCase()))
        const groupedorderitems = _.groupBy(
            Object.values(groupedvalues).flat().map((pickup) => {
                return pickup.orderItems?.map((item) => {
                    return {
                        ...item,
                        orderId: pickup.orderId,
                        pickupAddress: pickup.pickupAddress
                    }
                })

            }).flat(),
            (item) => (item?.pickupAddress.replaceAll(" ", "").toLowerCase()))
        setGroupedData(
            Object.keys(groupedvalues).map((key) => {
                return {
                    ...groupedvalues[key][0],
                    orderItems: groupedorderitems[key]
                }
            })
        )
    }, [recentdata])

    const navigate = (groupItem, type, nextData = undefined, orderNumber) => {
        const orderId = groupItem.orderId
        const pickupAddress = groupItem.pickupAddress;
        let params = { manifestId, orderId, fetchdata, type, groupItem, orderStatus: orderStatus, swipescreenOrder, updateStatus: updateStatus, orderNumber: orderNumber, manifestCode: manifestCode, vehicleRegistrationNumber: vehicleRegistrationNumber }
        if (!!nextData) {
            params = { ...params, nextOrder: { ...nextData } }
        }

        props.navigation.navigate("orderDetail", { ...params, pickupAddress })
    }


    const Mapping = () => {
        props.navigation.navigate("Map", { paramData })
    }

    const onRefresh = () => {
        setRefreshing(true);

        setRefreshing(false);
    }

    const toggleExpand = (index, item) => {
        if (expandeditems.includes(index)) {
            let removeIndex = expandeditems.filter(fd => fd !== index)
            setExpandeditems(removeIndex)
        } else {
            let addIndex = [...expandeditems, index]
            setExpandeditems(addIndex)
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

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
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(3, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    const manifeststarted = useMemo(() => {
        let returningData = Manifested.filter(data => (data.orderStatus === "Manifest Started"));
        return returningData;
    }, [Manifested])

    const triggerTracker = () => {

    }

    const handleSwipeSuccess = async () => {
        const name = manifeststarted[0]?.name
        const manifestName = name?.split("_")

        if (!isSwipeEnable) {
            dispatch(ordetailswipeScreen(formattedDate, manifestId, triggerTracker));
            Pause();
            setHandle(true);
        } else {
            Toast.show(`Already you started this  # ${manifestName[manifestName?.length - 1]} Manifest`);
            setAccepted(false)
        }
    };
    const accept = async (selectedManifestId, index) => {
        try {
            const response = await dispatch(ManifestsAcceptStatus(selectedManifestId, setHandle));
            if (response.status === 200) {
                setAccepted(false)
                setPause(true)
            } else {

            }
        } catch (error) {
            console.log("Accept API error:", error);
        }
    }

    const Pause = () => {
        setPause(false)
        setHandle(false)
    }

    const goStart = () => {
        if (breakstart !== undefined || start !== undefined) {

            dispatch(ordetailswipeResume(formattedDate, breakstart, start, manifestId));
            // 
            setResume(true)
        }
    }

    const Resume = () => {
        dispatch(ordetaiswipelPause(formattedDate, start, manifestId));
        setResume(false)
    }



    const handleStop = async () => {
        const name = manifeststarted[0]?.name
        const manifestName = name?.split("_")
        let isEnable = recentdata?.data?.filter(fd => (fd.orderStatus === "Cancelled" || fd.orderStatus === "Delivered"))
        isEnable = (recentdata?.data.length === isEnable.length)
        if (isEnable) {
            dispatch(ordetaiswipelStop(formattedDate, breakstart, start, breakend, manifestId));
        } else {
            Toast.show(`The order status of  # ${manifestName[manifestName?.length - 1]} is not Delivered or Cancelled. Kindly check.`);
        }
    }

    const ImageComponent = () => {
        return (
            <Profilelogo height={20} width={100} />
        )
    }

    const RenderList = ({ item, index }) => {
        const formattedDeliveryDate = ManfiestDateformats(item.deliveryDate);
        const endDate = ManfiestDateformats(item.endDate);
        const manifesIDStaus = item.manifestId
        const items = item.orderStatus
        setUpdatestatus(item.orderStatus)
        setSelectedManifestId(manifesIDStaus)
        return <View style={{ width: "100%" }}>
            <TouchableOpacity onPress={() => navigate(item, item?.orderStatus, recentdata.data[index + 1], item?.orderNumber)} style={[styles.newCard, styles.bottomSpace, {
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 30,
            }]}>
                <View style={[commonStyle.flexRow, commonStyle.display,]}>
                    <View style={[{ width: "100%" }]}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={[styles.orderdetails]}> {`Order #: ${item?.orderNumber}`}</Text>
                            <View style={[styles.statusColor, { backgroundColor: statusColorCode[item.orderStatus] }]}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                                    <View style={[styles.upload]}>
                                        {item?.orderStatus === "Picked Up" ?
                                            <Entypo
                                                name={'upload'}
                                                size={13}
                                                color={"white"}
                                            /> : <Entypo
                                                name={'download'}
                                                size={14}
                                                color={"white"}
                                            />}
                                    </View>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: 12, alignItems: "center", marginHorizontal: '3%' }} numberOfLines={1} >{item.orderStatus}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.place]}>
                            <View style={styles.deliveryplace}>
                                <Icon
                                    name={'map-marker-alt'}
                                    size={20}
                                    color={'#4E5052'}
                                    style={[styles.iconstyle]}
                                />
                                <Text style={[styles.placeCatText, { flex: 1, flexWrap: 'wrap' }]}>{item?.deliveryAddress ?? ""}</Text>
                            </View>
                            <View style={[styles.deliveredCity]}>
                                <FontAwesome
                                    name={"clock-o"}
                                    size={20}
                                    color={'#4E5052'}
                                    style={[styles.iconstyle]}
                                />
                                <Text style={[styles.dateStyle, { marginRight: 5 }]}><Text style={[styles.dateStyles]}> {formattedDeliveryDate}</Text></Text>
                                <Text style={styles.deliveryHyphen}>{item?.endDate === null ? "" : "-"}</Text>
                                <Text style={[styles.dateStyle]}><Text style={[styles.dateStyles]}> {item?.endDate === null ? "" : endDate}</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>
                {selectormyprofile === 2 || fetchdata === "completed" ? null :
                    <View style={[styles.itemStatus]}>
                        <View style={[styles.phoneIcon, { width: "50%", marginRight: 8, alignItems: "flex-start", justifyContent: "flex-start" }]}>
                            <MaterialIcons
                                name={'person'}
                                size={20}
                                color={primaryIconColor}
                            />
                            <Text style={{ color: '#4E5052', marginLeft: 5 }} numberOfLines={1}>{item.firstName}</Text>

                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${item?.deliveryPhoneNumber}`)} style={{ alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end' }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <EntypoIcon
                                    name={'old-phone'}
                                    size={20}
                                    color={primaryIconColor}
                                    style={{ marginRight: 3, marginTop: '2%' }}
                                />
                                <Text style={[styles.mapData, { textDecorationLine: "underline" }]}>{item?.deliveryPhoneNumber}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
                <View
                    style={[props.isDragging && styles.dragging]}>
                    <View>
                        {expandeditems.includes(index) && (
                            <>
                                <View style={{ marginVertical: 12 }}>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    }

    const RenderOrderlist = ({ item, index }) => {
        const shouldRenderOrderlist = item.orderItems && item.orderItems.length > 0;

        if (shouldRenderOrderlist) {
            const formattedDeliveryDate = ManfiestDateformats(item.deliveryDate);
            const endDate = ManfiestDateformats(item.endDate);
            const manifesIDStaus = item.manifestId
            setSelectedManifestId(manifesIDStaus)

            return (
                <>{selectormyprofile === 2 ? null :
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity onPress={() => navigate(item, "Pickup")} style={[styles.newCard, styles.bottomSpace, {
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 30,

                        }]}>
                            <View>
                                <View style={[commonStyle.flexRow, commonStyle.display,]}>
                                    <View style={[{ width: "100%" }]}>
                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={[styles.orderdetails]}> {`Pickup #`}</Text>
                                        </View>
                                        <View style={[styles.place]}>
                                            <View style={styles.deliveryplace}>
                                                <Icon
                                                    name={'map-marker-alt'}
                                                    size={20}
                                                    color={'#4E5052'}
                                                    style={[styles.iconstyle]}
                                                />
                                                <Text style={[styles.placeCatText, { flex: 1, flexWrap: 'wrap' }]}>{item.pickupAddress}</Text>
                                            </View>
                                            <View style={[styles.deliveredCity]}>
                                                <FontAwesome
                                                    name={"clock-o"}
                                                    size={20}
                                                    color={'#4E5052'}
                                                    style={[styles.iconstyle]}
                                                />
                                                <Text style={[styles.dateStyle, { marginRight: 5 }]}><Text style={[styles.dateStyles]}> {formattedDeliveryDate}</Text></Text>
                                                <Text style={styles.deliveryHyphen}>{item?.endDate === null ? "" : "-"}</Text>
                                                <Text style={[styles.dateStyle]}><Text style={[styles.dateStyles]}> {item?.endDate === null ? "" : endDate}</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {selectormyprofile === 2 || fetchdata === "completed" ? null :
                                    <View style={[styles.itemStatus]}>
                                        <View style={[styles.phoneIcon, { width: "50%", marginRight: 8, alignItems: "flex-start", justifyContent: "flex-start" }]}>
                                            <MaterialIcons
                                                name={'person'}
                                                size={20}
                                                color={primaryIconColor}
                                            />
                                            <Text style={{ color: '#4E5052', marginLeft: 5 }} numberOfLines={1}>{item.firstName}</Text>

                                        </View>
                                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.pickupPhoneNumber}`)} style={{ alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <EntypoIcon
                                                    name={'old-phone'}
                                                    size={20}
                                                    color={primaryIconColor}
                                                    style={{ marginRight: 3, marginTop: '2%' }}
                                                />
                                                <Text style={[styles.mapData, { textDecorationLine: "underline" }]}>{item.pickupPhoneNumber}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>}
                                {item.orderStatus && item.orderItems ? (
                                    <TouchableOpacity onPress={() => toggleExpand(`${index}`, item.order)}>
                                        <View style={[styles.orderAlign]}>
                                            <MaterialCommunityIcons
                                                name={'truck-cargo-container'}
                                                size={20}
                                                color={primaryIconColor}
                                                style={{ marginRight: 5 }}
                                            />
                                            <Text style={{ paddingHorizontal: 1, color: "black" }}>
                                                Order Items
                                            </Text>
                                            <View style={[{ width: "10%", alignItems: "center", alignSelf: "center" }]}>
                                                <Icon1
                                                    name={expandeditems.includes(index) ? 'chevron-up' : 'chevron-down'}
                                                    size={12}
                                                    color='#4E5052'
                                                    style={{ marginRight: 5, padding: 3, alignItems: "center", alignSelf: "center" }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ) : null}
                                <View
                                    style={[props.isDragging && styles.dragging]}>
                                    <View>
                                        {expandeditems.includes(`${index}`) && (
                                            <>
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
                                                            [[item]]
                                                        }
                                                        renderItem={({ item, index }) => (
                                                            <RenderOrderitem item={item} index={index} />

                                                        )}
                                                        ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                                                    />
                                                </View>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                }</>
            )
        } else {

            return null;
        }

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
                                            <View >
                                                <Text style={{ marginHorizontal: 12, color: "#4E5052", fontSize: 15, fontWeight: "700", ...commonStyle.AvanirLightOblique, marginTop: 8 }}>Order ID: #<Text style={{ color: "#4E5052", fontSize: 15, fontWeight: "700", ...commonStyle.AvanirLightOblique }}>{orderItem.orderId}</Text></Text>
                                                <View key={itemIndex} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                                                    <Text style={{ color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: '5%' }}>{orderItem.itemType}</Text>
                                                    <Text style={{ color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: '20%' }}>{orderItem.quantity}</Text>
                                                </View>
                                            </View>
                                        </>
                                    );
                                } else {
                                    return (
                                        <View key={itemIndex} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                                            <Text style={{ color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: '5%' }}>{orderItem.itemType}</Text>
                                            <Text style={{ color: "#4E5052", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "600", marginHorizontal: '20%' }}>{orderItem.quantity}</Text>
                                        </View>
                                    );
                                }
                            })
                        ) : (
                            <Text style={{ flex: 1, textAlign: 'center', color: "#242628" }}>No order items available</Text>
                        )}
                    </View>
                ))}
            </View>
        );
    };

    const [isCollapsed, setIsCollapsed] = useState(false);
    const height = new Animated.Value(isCollapsed ? 0 : 120);

    const handleToggleCollapse = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsCollapsed(!isCollapsed);
        Animated.timing(height, {
            toValue: isCollapsed ? 200 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <>
            <View>
                <View style={styles.headcontainer1}>
                    <Modals manifestId={manifestId} navigation={props} parentCallback={changetext} Callback={Change} fordelete={toDelete} todelete={fordelete} errortext={mobiletext} />
                    <>
                        <View style={[{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", width: '100%' }]}>
                            <View style={[styles.vehicleNo, { width: '60%', alignSelf: 'center' }]} >
                                <Icons
                                    name={'truck-cargo-container'}
                                    size={20}
                                    color={'#4E5052'}
                                />
                                <Text style={[styles.headertext1, { marginLeft: 5 }]}>Vehicle #: </Text>
                                <Text style={[styles.headerNo, { flex: 1 }]}>{params?.vehicleRegistrationNumber}</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'flex-end', marginLeft: 5, alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => Mapping()} style={[styles.mapView]} >
                                    <Text style={[styles.mapText]}>{`View Routes `}</Text>
                                    <EntypoIcon
                                        name={'map'}
                                        size={20}
                                        color={'#4E5052'}
                                        style={[styles.mapIcon]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                    {selectormyprofile === 2 || fetchdata === "completed" ? null :
                        <View>
                            <Animated.View style={{ height }}>
                                <View style={[styles.deliveredCity, { gap: 10, }]}>
                                    <Icons
                                        name={'map-marker-account-outline'}
                                        size={20}
                                        color={'#4E5052'}
                                    />
                                    <Text style={styles.colors}>Start Time : </Text>
                                    <Text style={[styles.dateStyle, { marginRight: 5 }]}><Text style={[styles.dateStyles]}>{starttime ?? ""}</Text></Text>
                                </View>
                                <View style={[styles.deliveredCity, { gap: 10, }]}>
                                    <Icons
                                        name={'map-marker-alert-outline'}
                                        size={20}
                                        color={'#4E5052'}
                                    />
                                    <Text style={styles.colors}>Last Break Time : </Text>
                                    <Text style={[styles.dateStyle, { marginRight: 5 }]}><Text style={[styles.dateStyles]}>{endtime !== '' ? `${breaktime} ${'-'} ${endtime}` : ""}</Text></Text>
                                </View>
                                <View style={[styles.deliveredCity, { gap: 10, }]}>
                                    <Icons
                                        name={'map-marker-check-outline'}
                                        size={20}
                                        color={'#4E5052'}
                                    />
                                    <Text style={styles.colors}>End Time : </Text>
                                    <Text style={[styles.dateStyle, { marginRight: 5 }]}><Text style={[styles.dateStyles]}>{driverendtime ?? ""}</Text></Text>
                                </View>
                            </Animated.View>

                            <TouchableOpacity onPress={handleToggleCollapse} style={[{ display: 'flex', flexDirection: 'row', justifyContent: "center" }]}>
                                {isCollapsed ? (
                                    <Icon name="angle-down" size={15} color="black" />
                                ) : (
                                    <Icon name="angle-up" size={15} color="black" />
                                )}

                            </TouchableOpacity>
                        </View>}
                </View>
            </View>

            {isLoading ?
                <ActivityIndicator size="large" color="black" />
                : <ScrollView>
                    <View style={[styles.p32]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>
                                <View>
                                    <View style={[styles.cardContainer]}>
                                        <View style={[styles.cardContent]}>
                                            <FlatList
                                                keyExtractor={(item, index) => `key-${index}`}
                                                data={
                                                    fetchdata === "completed" ? null :
                                                        groupedData
                                                }
                                                renderItem={RenderOrderlist}
                                                refreshControl={
                                                    <RefreshControl
                                                        onRefresh={onRefresh}
                                                        refreshing={refreshing}
                                                    />
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[{ alignItems: "center", alignSelf: "center", alignContent: "center", marginTop: 2, marginBottom: '20%' }]}>
                                <FlatList
                                    keyExtractor={(item, index) => `key-${index}`}
                                    data={recentdata?.data}
                                    renderItem={RenderList}
                                    refreshControl={
                                        <RefreshControl
                                            onRefresh={onRefresh}
                                            refreshing={refreshing}
                                        />
                                    }
                                    ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>}

            {(selectormyprofile === 2 || fetchdata === "completed" || (!!swipescreenOrder?.startTime && !!swipescreenOrder?.endTime)) ? null :
                <View style={{ ...styles.footer }}>
                    <View style={{ position: "relative", width: "100%" }}>
                        {((orderStatus === 'Accept' || orderStatus === 'Manifest Started') || handle) ?
                            (<>
                                {(!!swipescreenOrder.startTime === false || !!swipescreenOrder?.endTime === true) ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '3%' }}>
                                        <SwipeButton
                                            height={35}
                                            width={'96%'}
                                            title={'Swipe to start the Manifest'}
                                            swipeSuccessThreshold={50}
                                            titleColor={primaryIconColor}
                                            onSwipeSuccess={() => handleSwipeSuccess()}
                                            railBackgroundColor='white'
                                            thumbIconComponent={ImageComponent}
                                            shouldResetAfterSuccess={(orderStatus !== "Manifest Started")}
                                            thumbIconBackgroundColor={greenColor}
                                            railBorderColor={greenColor}
                                            railStyles={{
                                                backgroundColor: greenColor,
                                                opacity: 0.5,
                                                borderColor: greenColor,
                                            }}
                                        />
                                    </View>
                                    : <View style={{ width: "100%", flexDirection: "row", justifyContent: 'space-evenly', alignSelf: 'center' }}>
                                        <View style={{ width: "50%", alignItems: "center" }}>
                                            {
                                                <View>
                                                    <TouchableOpacity onPress={() => handleStop()} style={[styles.deliveryCard1, { justifyContent: 'center', width: "90%", backgroundColor: '#FFCCCB' }]}>
                                                        <View style={{ width: '100%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                            <Stop
                                                                name={"stop-circle-outline"}
                                                                size={32}
                                                                color={'#fe7c96'}
                                                                style={{ alignContent: "flex-start", alignItems: "flex-start", alignSelf: "flex-start" }}
                                                            />
                                                            <Text style={{ color: "black", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "700", flexWrap: "wrap" }}>{"End Trip"}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                        {((!!swipescreenOrder?.breakEndTime == false && !!swipescreenOrder?.breakStartTime)) ? <>
                                            <View style={{ width: "50%", alignItems: "center" }}>
                                                <View >

                                                    <TouchableOpacity onPress={() => goStart()} style={[styles.resumecard, { justifyContent: 'center', width: "90%", backgroundColor: '#e6ffe6' }]}>
                                                        <View style={{ width: '100%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                            <MaterialCommunityIcons
                                                                name={'step-forward'}
                                                                size={30}
                                                                color={greenColor}
                                                                style={{ alignContent: "center", alignItems: "center", alignSelf: "center" }}
                                                            />
                                                            <Text style={{ color: "black", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "700", flexWrap: "wrap" }}>{"Resume Trip"}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </> : <>
                                            <View style={{ width: "50%", alignItems: "center" }}>
                                                <View >
                                                    <TouchableOpacity onPress={() => Resume()} style={[styles.resumecard, { justifyContent: 'center', width: "90%", backgroundColor: '#e6ffe6' }]}>
                                                        <View style={{ width: '100%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                            <AntDesign
                                                                name={'pausecircleo'}
                                                                size={30}
                                                                color={greenColor}
                                                            />
                                                            <Text style={{ color: "black", fontSize: 14, fontFamily: "Avenir-Roman", fontWeight: "700", flexWrap: "wrap" }}>{"Pause Trip"}</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </>
                                        }

                                    </View>}
                            </>)
                            : <View style={{ ...styles.deliverybtns }}>
                                <TouchableOpacity onPress={() => deleteItem(manifestId)} style={[styles.delivery, styles.decline, { backgroundColor: "white", borderColor: "#1bcfb4", borderWidth: 1 }]}>
                                    <Feather
                                        name={'closecircleo'}
                                        size={14}
                                        color={greenColor}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text style={[styles.deliveryText, { color: "#4E5052" }]}>{"Decline"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => accept(selectedManifestId)} style={[styles.delivery, { backgroundColor: "#1bcfb4" }]}>
                                    <Feather
                                        name={'checkcircleo'}
                                        size={14}
                                        color={'white'}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text style={[styles.deliveryText,]}>{"Accept"}</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                </View>}
        </>)
}
export default Home