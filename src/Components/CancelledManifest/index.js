import { React, useState, useEffect } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { CurrentOrderedlists, Completelists } from '../Home/Orders';
import { styles } from '../Home/styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { commonStyle, primaryColor, primaryIconColor } from '../../Common/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Fontisto';
// import { LinearGradientTitle } from '../../Common/Components/LineargradientTitle';
import { cancelManifest, cancelledmanifestslists } from '../../services/Manifestsession/ManifestAction';
import { useDispatch, useSelector } from 'react-redux';
import { ManfiestDateformat } from '../../Common/Utils';
import reactotron from 'reactotron-react-native';

const DeclinedManifest = (props) => {
    const itemValue = props.route
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const dispatch = useDispatch()
    const [groupList, setGroupList] = useState(CurrentOrderedlists)


    const navigate = (groupItem, item, manifestId) => {
        const alldata = groupList;
        // props.navigation.navigate("deliverylists", {
        //     manifestId: manifestId, fetchdata: "cancelleds"
        // });
    };

    const DeclineData = useSelector(state => state.Manifest.DECLINEDATA);
    const loading = useSelector(state => state.Manifest.loading);

    // useEffect(() => {
    //     loadManifestData();
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000);

    // }, []);
    const loadManifestData = async () => {
        setIsLoadingMore(true);
        try {
            const response = await dispatch(cancelManifest(currentPage, pageSize));
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


    const RenderList = ({ item, index }) => {
        const manifestName = item?.name?.split("_")
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const canceldate = new Date(item.createdDate);
        const currentDate = canceldate;
        const year = currentDate.getUTCFullYear();
        const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getUTCDate()).padStart(2, '0');

        const ausTime = (data = currentDate) => new Date(data).toLocaleString("en-US", { hour: "numeric", minute: '2-digit', timeZone: "Australia/Sydney" });
        const ausday = (data = currentDate) => new Date(data).toLocaleString("en-US", { timeZone: "Australia/Sydney", day: '2-digit' });
        const ausdate = (data = currentDate) => new Date(data).toLocaleString("en-US", { timeZone: "Australia/Sydney", month: 'short', year: 'numeric' });
     
        const formattedDate = `${year}-${month}-${day}`
        const { formattedStartDate, formattedEndDate } = ManfiestDateformat(startDate, endDate);
        return <View>
            <View style={[styles.card, styles.bottomSpace,
            { borderColor: "#fe7c96", borderBottomColor: "#fe7c96", borderTopColor: "#fe7c96", borderRightColor: "#fe7c96" }
            ]}>
                <TouchableOpacity
                    onPress={() => navigate(item.lists, item.maniFestId, item.maniFestId)}>
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
                                    <Text style={styles.listOrders}>{item?.ordersCount} {item?.ordersCount > 1 ? 'orders'  : 'order'} </Text>
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
                            {/* <View style={{backgroundColor:"red"}}>  */}
                            <View style={[styles.orderedSource,]}>
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
                                    <View style={{ height: 15, borderLeftWidth: 1, borderColor: "#4E5052", borderStyle: Platform.OS === 'ios' ? "solid" : 'dotted', marginLeft: 9 }} />
                                    <View style={[styles.orderedSource, { marginLeft: 2, }]}>
                                        <Icon
                                            name={'map-marker-alt'}
                                            size={20}
                                            color={'#4E5052'}
                                            style={[styles.iconSD]}
                                        />
                                        <Text style={[styles.dateStyles]}>{item?.endCity}</Text>
                                    </View>
                                </View> : null}
                            {/* </View> */}
                            <View style={[styles.orderedDate]}>
                                <Icons
                                    name={'calendar'}
                                    size={20}
                                    color={'#fe7c96'}
                                    style={[styles.iconCalendar]}
                                />
                                <Text style={[styles.dateStyle]}><Text style={[styles.dateStyles, { fontWeight: '700' }]}> {'Cancelled On'}</Text></Text>
                                <Text style={[styles.hyphen]}>-</Text>
                                <Text style={[styles.dateStyle]}><Text style={[styles.dateStyles]}> {`${ausday()} ${ausdate()} `}</Text></Text>
                            </View>

                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        </View>
    }
    return (<>



        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={primaryColor} />
            </View>
        ) : (
            <>
                <View style={[styles.p32]}>
                    <ScrollView style={[styles.topSpace]} showsVerticalScrollIndicator={false}>
                        <View style={[{ alignItems: "center", alignSelf: "center", alignContent: "center", marginBottom: '50%' }]}>

                            <FlatList
                                keyExtractor={(item, index) => `key-${index}`}
                                data={DeclineData}
                                renderItem={RenderList}
                                ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                            // onEndReached={loadManifestData}
                            // onEndReachedThreshold={0.1}
                            />
                        </View>
                    </ScrollView>
                </View>

            </>
        )}
    </>)
}
export default DeclinedManifest