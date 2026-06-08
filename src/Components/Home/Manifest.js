import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { CurrentOrderedlists, Completelists } from './Orders';
import { commonStyle, primaryColor, primaryIconColor } from "../../Common/Styles";
import { styles } from './styles';
import Feather from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Fontisto';
import { Manifests, ManifestsDeclineStatus, recentManifests } from "../../services/Manifestsession/ManifestAction";
import { useDispatch, useSelector } from "react-redux";
import { ManfiestDateformat } from "../../Common/Utils/index";
import Modals from '../../Common/Components/Modal';
import { ManifestsAcceptStatus } from "../../services/Manifestsession/ManifestAction";
import reactotron from "reactotron-react-native";

const Manifest = (props, HomeManifest) => {
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [current, setCurrent] = useState(true);
    const [accepted, setAccepted] = useState([]);
    const [accepteddata, setAcceptedData] = useState([0]);
    const [changetext, setChangeText] = useState(false);
    const [groupList, setGroupList] = useState(CurrentOrderedlists);
    const [todelete, setdelete] = useState(false);
    const [fordelete, setfordelete] = useState(false);
    const [mobiletext, setmobiletext] = useState("");
    const [inProgress, setInProgress] = useState(true);
    const [delivered, setDelivered] = useState(true);
    const [index, setIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [ManifestData, setManifestData] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [currentMID, setMID] = useState("");


    const onRefresh = () => {
        setRefreshing(true);

        setRefreshing(false);
    }

    const pageSize = 10;

    // useEffect(() => {
    //     loadManifestData();
    //     dispatch(Manifests());
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000);
    // }, []);

    const Manifested = useSelector(state => state.Manifest.ManifestData?.data ?? []);
    const loading = useSelector(state => state.Manifest.loading);

    const orderStatus = Manifested?.map((item) => item.orderStatus)
    // const pendingStatus =   "Pending"

    const loadManifestData = async () => {
        setIsLoadingMore(true);
        try {
            const response = await dispatch(Manifests(currentPage, pageSize));
            const newManifestData = response.data.data;
            setManifestData(prevData => [...prevData, ...newManifestData]);
            dispatch({
                type: types.MANIFEST.SUCCESS,
                payload: ManifestData
            });
            setCurrentPage(currentPage + 1);
        } catch (error) {
            console.log("Error fetching manifests:", error);
            Toast.show('Error in fetching manifests');
        } finally {
            setIsLoadingMore(false);
        }
    };

    const navigate = (groupItem, manifestName, manifestId, orderStatus, vehicleRegistrationNumber, isAccepted) => {

        const alldata = groupList;
        props.navigation.navigate("deliverylists", {
            manifestId: manifestId,
            fetchdata: "recents",
            orderStatus, name: manifestName,
            isSwipeEnable: Manifested.some(data => (data.orderStatus === "Manifest Started")),
            vehicleRegistrationNumber: vehicleRegistrationNumber
        });
    };


    const updateDay = (item) => {
        if (item === "current") {
            setCurrent(true);
            setGroupList(CurrentOrderedlists);
        } else if (item === "tommorow") {
            setGroupList(Completelists);
            setCurrent(false);
        }
    }
    const Change = (value) => {
        setChangeText(!value);
    }

    const toDelete = () => {
        setdelete(false);
    }

    // const deleteItem = (manifestId) => {
    //     dispatch(ManifestsDeclineStatus(manifestId))
    //     if (todelete === false) {
    //         setChangeText(true);
    //         setfordelete(true);
    //         setmobiletext("Are you sure you want to decline this manifest?");
    //     } else if (todelete === true) {

    //     }
    // }


    const accept = async (manifestId, index) => {
        try {
            const response = await dispatch(ManifestsAcceptStatus(manifestId));
            if (response.status === 200) {
                // dispatch(Manifests(manifestId))
                setAcceptedData([...accepteddata, index]);
            } else {

            }
        } catch (error) {
            console.log("Accept API error:", error);

        }
    }

    const deleteItem = (itemid) => {
        if (todelete === false) {
            setChangeText(true);
            setfordelete(true)
            setMID(itemid)
            setmobiletext("Are you sure you want to decline this order?")
        } else if (todelete === true) {

        }
    }

    const RenderList = ({ item, index }) => {
        const manifestName = item?.name?.split("_")
        const driverName = `${item.firstName} ${item.lastName}`
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const { formattedStartDate, formattedEndDate } = ManfiestDateformat(startDate, endDate);
        const isAccepted = accepteddata.includes(index);

        return (
            <View
                style={[
                    styles.card,
                    styles.bottomSpace,
                    {
                        position: "relative",
                        borderColor: (item.orderStatus === "Manifest Started") ? 'orange' : (item.orderStatus === 'Manifest Started' || item.orderStatus === 'Accept') ? '#4688fc' : primaryColor,
                        borderBottomColor: (item.orderStatus === "Manifest Started") ? 'orange' : (item.orderStatus === 'Manifest Started' || item.orderStatus === 'Accept') ? '#4688fc' : primaryColor,
                        borderTopColor: (item.orderStatus === "Manifest Started") ? 'orange' : (item.orderStatus === 'Manifest Started' || item.orderStatus === 'Accept') ? '#4688fc' : primaryColor,
                        borderRightColor: (item.orderStatus === "Manifest Started") ? 'orange' : (item.orderStatus === 'Manifest Started' || item.orderStatus === 'Accept') ? '#4688fc' : primaryColor,
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={() => navigate(item.lists, item.name, item.maniFestId, item.orderStatus, item.vehicleRegistrationNumber, isAccepted)}
                >
                    <View style={[commonStyle.flexRow, commonStyle.display]}>
                        <View style={{ width: "100%" }}>
                            <View style={styles.manifestOrders}>
                                <Text style={[styles.orderdetails]}>{`# ${manifestName[manifestName.length - 1]}`}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Icons
                                        name={'truck-cargo-container'}
                                        size={20}
                                        color={'#4E5052'}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text style={styles.listOrders}>{item?.ordersCount} {item?.ordersCount > 1 ? 'orders' : 'order'} </Text>
                                </View>
                            </View>
                            <View style={[styles.orderedDate]}>
                                <Icons
                                    name={'calendar'}
                                    size={20}
                                    color={'#4E5052'}
                                    style={[styles.iconCalendar]}
                                />
                                <Text style={[styles.dateStyle]}>
                                    <Text style={[styles.dateStyles]}> {formattedStartDate}</Text>
                                </Text>
                                <Text style={[styles.hyphen]}>{item?.endDate === null ? "" : "-"} </Text>
                                <Text style={[styles.dateStyle]}>
                                    <Text style={[styles.dateStyles]}>{item?.endDate === null ? "" : formattedEndDate} </Text>
                                </Text>
                            </View>
                            <View style={[styles.orderedSource, { marginBottom: item?.endCity ?? 0 ? accepteddata?.includes(index) ? 0 : 0 : (item.orderStatus === 'Manifest Started' || item.orderStatus === 'Accept') ? selectormyprofile === 2 ? 10 : 0 : selectormyprofile === 2 ? 10 : 20 }]}>
                                <MaterialIcons
                                    name={'my-location'}
                                    size={20}
                                    color={'#4E5052'}
                                    style={[styles.iconSD]}
                                />
                                <Text style={[styles.dateStyles]}>{item.city}</Text>
                            </View>
                            {item?.endCity ?? 0 ?
                                <View>
                                    <View style={{ overflow: 'hidden' }}>
                                        <View style={{ height: 15, borderLeftWidth: 1, borderColor: "#4E5052", borderStyle: Platform.OS === 'ios' ? "solid" : 'dotted', marginLeft: 9 }} />
                                    </View>
                                    <View style={[styles.orderedSource, { marginLeft: 2, marginBottom: (item.orderStatus === 'Manifest Started' || item.orderStatus === 'Accept') ? selectormyprofile === 2 ? 10 : 0 : selectormyprofile === 2 ? 10 : 20 }]}>
                                        <Icon
                                            name={'map-marker-alt'}
                                            size={20}
                                            color={'#4E5052'}
                                            style={[styles.iconSD]}
                                        />
                                        <Text style={[styles.dateStyles]}>{item?.endCity}</Text>
                                    </View>
                                </View>
                                : null}
                            {selectormyprofile === 2 ?
                                <View>
                                    {item.firstName ?? 0 ?
                                        <View style={[styles.driverIcon]}>
                                            <Icons
                                                name={"steering"}
                                                size={20}
                                                color={'#4E5052'}
                                                style={[styles.iconSD]}
                                            />
                                            <Text style={[styles.dateStyles]}>{item.firstName ?? 0 ? driverName : null}</Text>
                                        </View> : null}
                                </View> : null}

                            {(selectormyprofile === 2 ? null :
                                <View style={[styles.approve]}>
                                    {(item.orderStatus == "Pending") ? (
                                        <>
                                            <TouchableOpacity onPress={() => deleteItem(item.maniFestId, index)} style={[styles.deliveryCard, styles.decline]}>
                                                <Feather
                                                    name={'closecircleo'}
                                                    size={14}
                                                    color={'#1bcfb4'}
                                                    style={{ marginRight: 5 }}
                                                />
                                                <Text style={[styles.deliveryText, { color: '#4E5052' }]}>{"Decline"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => accept(item.maniFestId, index)} style={[styles.deliveryCard]}>
                                                <Feather
                                                    name={'checkcircleo'}
                                                    size={14}
                                                    color={'white'}
                                                    style={{ marginRight: 5 }}
                                                />
                                                <Text style={[styles.deliveryText]}>{"Accept"}</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : null}
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={primaryColor} />
                </View>
            ) : (
                <>
                    <Modals manifestId={currentMID} navigation={props} parentCallback={changetext} Callback={Change} fordelete={toDelete} todelete={fordelete} errortext={mobiletext} />
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={[styles.p32]}>
                                <ScrollView showsVerticalScrollIndicator={false} >
                                    <View style={[{ alignItems: "center", alignSelf: "center", alignContent: "center", marginBottom: '50%' }]}>
                                        <FlatList
                                            keyExtractor={(item, index) => `key-${index}`}
                                            data={Manifested}
                                            renderItem={RenderList}
                                            ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                                            onEndReachedThreshold={0.1}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                </>
            )}
        </>
    );
};

export default Manifest;