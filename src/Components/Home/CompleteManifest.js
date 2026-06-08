import { React, useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { CurrentOrderedlists, Completelists } from './Orders'
import { commonStyle, primaryColor } from "../../Common/Styles";
import { styles } from './styles'
import Feather from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Modals from '../../Common/Components/Modal'
import Icon from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from "react-redux";
import { completedManifests, completedManifestsLists, completedManifestsLsits } from "../../services/Manifestsession/ManifestAction";
import { ManfiestDateformat } from "../../Common/Utils/index";
import reactotron from "reactotron-react-native";


const CompleteHome = (props) => {

    const dispatch = useDispatch()
    const [current, setCurrent] = useState(true)
    const [accepted, setAccepted] = useState([])
    const [accepteddata, setAcceptedData] = useState([0])
    const [changetext, setChangeText] = useState(false);
    const [groupList, setGroupList] = useState(CurrentOrderedlists)
    const [todelete, setdelete] = useState(false);
    const [fordelete, setfordelete] = useState(false);
    const [mobiletext, setmobiletext] = useState("");
    const [inProgress, setInProgress] = useState(true);
    const [delivered, setDelivered] = useState(true)
    const [index, setIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [ManifestData, setManifestData] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    const navigate = (groupItem, manifestName, manifestId, vehicleRegistrationNumber) => {
        const alldata = groupList;
        props.navigation.navigate("deliverylists", {
            name: manifestName,
            manifestId: manifestId,
            fetchdata: "completed",
            vehicleRegistrationNumber: vehicleRegistrationNumber
        });
    };


    const completedData = useSelector(state => state.Manifest.COMPLETEDDATA);
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const loading = useSelector(state => state.Manifest.loading);


    useEffect(() => {
        dispatch(completedManifests());
    }, []);


    const loadManifestData = async () => {
        setIsLoadingMore(true);
        try {
            const response = await dispatch(completedManifests(currentPage, pageSize));
            const newManifestData = response.data.data;
            setManifestData(prevData => [...prevData, ...newManifestData]);
            dispatch({
                type: types.MANIFEST.SUCCESS,
                payload: ManifestData
            });
            setCurrentPage(currentPage + 1);
        } catch (error) {
            Toast.show('Error in fetching manifests');
        } finally {
            setIsLoadingMore(false);
        }
    };

    const updateDay = (item) => {
        if (item === "current") {
            setCurrent(true);
            setGroupList(CurrentOrderedlists)
        }
        else if (item === "tommorow") {
            setGroupList(Completelists)
            setCurrent(false);
        }
    }
    const Change = (value) => {
        setChangeText(!value);
    }

    const toDelete = () => {
        setdelete(false)
    }

    const deleteItem = () => {
        if (todelete === false) {
            setChangeText(true);
            setfordelete(true)
            setmobiletext("Are you sure you want to decline this manifest?")
        } else if (todelete === true) {

        }
    }
    const accept = (index) => {
        setAcceptedData([...accepteddata, index])
        dispatch(ManifestsAcceptStatus(Manifested))
    }



    const RenderList = ({ item, index }) => {
        const manifestName = item?.name?.split("_")
        const driverName = `${item.firstName} ${item.lastName}`
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const { formattedStartDate, formattedEndDate } = ManfiestDateformat(startDate, endDate);
        return <View style={[styles.card, styles.bottomSpace,
        { borderColor: "#1bcfb4", borderBottomColor: "#1bcfb4", borderTopColor: "#1bcfb4", borderRightColor: "#1bcfb4" }
        ]
        }>

            <TouchableOpacity
                onPress={() => navigate(item.lists, item.name, item.maniFestId, item.vehicleRegistrationNumber)}>
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
                            <Text style={[styles.dateStyle]}><Text style={[styles.dateStyles]}> {formattedStartDate}</Text></Text>
                            <Text style={[styles.hyphen]}>{item?.endDate === null ? "" : "-"}</Text>
                            <Text style={[styles.dateStyle]}><Text style={[styles.dateStyles]}>{item?.endDate === null ? "" : formattedEndDate}</Text></Text>
                        </View>
                        <View style={[styles.orderedSource, { marginBottom: item?.endCity ?? 0 ? 0 : 6 }]}>
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
                                <View style={{ height: 15, borderLeftWidth: 1, borderColor: "#4E5052", borderStyle: Platform.OS === 'ios' ? "solid" : 'dashed', marginLeft: 9 }} />
                                <View style={[styles.orderedSource, { marginLeft: 2, marginBottom: 6 }]}>
                                    <Icon
                                        name={'map-marker-alt'}
                                        size={20}
                                        color={'#4E5052'}
                                        style={[styles.iconSD]}
                                    />
                                    <Text style={[styles.dateStyles]}>{item?.endCity}</Text>
                                </View>
                            </View> : null}
                        {selectormyprofile === 2 ?
                            <View >
                                {item.firstName ?? 0 ?
                                    <View style={[styles.driverIcon]}>
                                        <Icons
                                            name={"steering"}
                                            size={20}
                                            color={'#4E5052'}
                                            style={[styles.iconSD]}
                                        />
                                        <Text style={[styles.dateStyles]}>{driverName}</Text>
                                    </View> : null}
                            </View> : null}
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    }
    return (<>

        <Modals parentCallback={changetext} Callback={Change} fordelete={toDelete} todelete={fordelete} errortext={mobiletext} />
        {
            loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={primaryColor} />
                </View>
                :
                <View style={{ marginTop: '1%' }}>
                    <ScrollView>
                        <View style={[styles.p32]}>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <View style={[{ alignItems: "center", alignSelf: "center", alignContent: "center", marginBottom: '50%' }]}>
                                    <FlatList
                                        keyExtractor={(item, index) => `key-${index}`}
                                        data={completedData}
                                        renderItem={RenderList}
                                        ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>}
    </>)
}

export default CompleteHome
