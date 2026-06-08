import { React, useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, KeyboardAvoidingView, Linking, View, FlatList, Dimensions, LayoutAnimation, Animated, Platform, UIManager, PanResponder, TextInput, Image, Modal, Easing, ImageBackground, ToastAndroid } from 'react-native';
import { styles } from './orderDetailstyle';
import { commonStyle, primaryColor, secondaryColor, primaryIconColor } from "../../Common/Styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import * as types from '../../services/Manifestsession/ManifestActionType';
import endpin from "../../../assets/Images/endPin.png"
import startpin from "../../../assets/Images/startPin.png"
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { emptystyles } from './emptystyle';
import reactotron from 'reactotron-react-native';

function EmptyItems(props) {
    const [expanded, setexpanded] = useState(false)
    const [emptyItem, setemptyItem] = useState('')
    const [emptyId, setemptyId] = useState('')
    const dispatch = useDispatch();
    const [datas, setdata] = useState();
    const [value, setValue] = useState(null);
    const [emptyNumber, setemptyNumber] = useState(1)
    const [allItems, setAllItems] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const EmptyListsItems = useSelector(state => state.Manifest.updateemptylistsitems);
    const type = props?.route?.params?.type
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const EmptyListsQuantity = useSelector(state => state.Manifest.updateemptyquantity);
    const { params } = props.route;
    const flatListRef = useRef(null);
    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setexpanded(!expanded);
    };
    useEffect(() => {
        if (props?.orderDetaildata?.returnOrderItems === null || props?.orderDetaildata?.returnOrderItems === undefined) {
            const lectures = EmptyListsItems?.data?.map(data => { return ({ label: data.type, value: data.orderItemTypeId, id: data.orderItemTypeId }) })
            setdata(lectures)

        } else {
            const lectures = EmptyListsItems?.data?.map(data => { return ({ label: data.type, value: data.orderItemTypeId, id: data.orderItemTypeId }) })
            const updatedEmpty = props?.orderDetaildata?.returnOrderItems?.map(data => { return ({ label: data.itemType, quantity: data.quantity, value: data.itemTypeId, id: data.itemTypeId }) })

            setdata(lectures)
            setAllItems(updatedEmpty)
        }

    }, [EmptyListsItems])
    useEffect(() => {
        console.log("KIEMPTY 1", allItems)

        const updateempty = allItems?.map(({ quantity, value, ...rest }) => ({ isPickup: true, itemTypeId: value, quantity: quantity }))
        dispatch({ type: types.UPDATEEMPTYQUANTITY.SUCCESS, payload: updateempty });
    }, [allItems])
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };
    const setdropdata = () => {
        const lectures = EmptyListsItems?.data?.map(data => { return ({ label: data.type, value: data.orderItemTypeId }) })
        setdata(lectures)
    }

    const AddItem = () => {

        if (emptyItem === "" || emptyNumber === "") {
            Toast.show("please add an item")
        } else {
            if (allItems?.length === 0) {
                let allData = [...allItems, { label: emptyItem, quantity: emptyNumber, id: emptyId, value: value }]

                setAllItems(allData)
                setValue()
                setIsFocus(false)
                setemptyItem("");
                setemptyNumber("1")
            } else {

                let exist = allItems?.filter(data => data.label === emptyItem)
                let updatedEmpty = [];
                if (exist?.length > 0) {
                    updatedEmpty = allItems?.map((data) => {
                        if (data.label === emptyItem) {
                            return { id: emptyId, label: emptyItem, quantity: Number(data.quantity) + Number(emptyNumber), value: value }

                        }
                        else return data
                    })
                } else {
                    console.log("118")
                    updatedEmpty = [...allItems, { label: emptyItem, quantity: emptyNumber, id: emptyId, value: value }]
                }

                setAllItems(updatedEmpty)
                setValue()
                setIsFocus(false)
                setemptyItem("");
                setemptyNumber("1")
                setTimeout(() => {
                    flatListRef.current.scrollToEnd({ animated: true });
                }, 0);
            }

            const updateempty = allItems?.map(({ quantity, value, ...rest }) => ({ isPickup: true, itemTypeId: value, quantity: quantity }))
            dispatch({ type: types.UPDATEEMPTYQUANTITY.SUCCESS, payload: updateempty });
        }

    };


    const updateList = (label, item) => {

        if (label === "add") {
            if (props?.orderDetaildata?.returnOrderItems === null || props?.orderDetaildata?.returnOrderItems === undefined) {

                let addedItem = allItems?.map((data) => {
                    if (data.id === item.id) {
                        return { ...data, quantity: Number(data.quantity) + 1, value: data.value }
                    } else {
                        return data
                    }
                })
                setAllItems(addedItem);

            } else {
                let addedItem = allItems?.map((data) => {
                    if (data.id === item.id) {
                        return { ...data, quantity: Number(data.quantity) + 1, value: data.value }
                    } else {
                        return data
                    }
                })
                setAllItems(addedItem);
            }
        } else if (label === "remove") {
            if (props?.orderDetaildata?.returnOrderItems === null || props?.orderDetaildata?.returnOrderItems === undefined) {
                let removeItem = allItems?.map((data) => {
                    if (data.id === item.id) {
                        return { ...data, quantity: Number(data.quantity) - 1, value: data.value }
                    } else {
                        return data
                    }
                }).filter(fd => fd.quantity !== 0);
                console.log("value ....ONEEEEE 11", removeItem)
                setAllItems(removeItem);

            } else {
                let removeItem = allItems?.map((data) => {
                    if (data.id === item.id) {
                        return { ...data, quantity: Number(data.quantity) - 1, value: data.value }
                    } else {
                        return data
                    }
                }).filter(fd => fd.quantity !== 0);
                console.log("value ....TWOOOO 22", removeItem)
                setAllItems(removeItem);
            }

        }
        console.log("KIEMPTY 3", allItems)
        const updateempty = allItems?.map(({ quantity, value, ...rest }) => ({ isPickup: true, itemTypeId: value, quantity: quantity }))

        dispatch({ type: types.UPDATEEMPTYQUANTITY.SUCCESS, payload: updateempty });
    }

    const RenderList = ({ item }) => {
        return (
            <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <View style={[styles.centerAlignment,]}>
                    <View style={[{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }]}>
                        <View style={{ width: "70%" }}>
                            <Text style={[styles.tableContentHeader,]}>
                                {item.label}
                            </Text>
                        </View>
                    </View>
                    <View style={[{ width: "30%", alignItems: "flex-end", alignSelf: "flex-end", }]}>
                        <View style={{ flexDirection: "row", }}>
                            {selectormyprofile === 2 || type === "Delivered" ? null :
                                <View>
                                    <TouchableOpacity onPress={() => updateList("remove", item)} >
                                        <AntDesign
                                            name={'minussquareo'}
                                            size={20}
                                            color={primaryIconColor}
                                            style={{}}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                            <Text style={{ paddingHorizontal: 5, width: "35%", textAlign: selectormyprofile === 2 || type === "Delivered" ? 'left' : "right", color: primaryIconColor }}>{item.quantity}</Text>
                            {selectormyprofile === 2 || type === "Delivered" ? null :
                                <View>
                                    <TouchableOpacity onPress={() => updateList("add", item)} >
                                        <AntDesign
                                            name={'plussquareo'}
                                            size={20}
                                            color={primaryIconColor}
                                            style={{}}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>
                    </View>
                </View>
                <View>
                </View>
            </View>
        )
    }



    return (
        <>
            <View style={[styles.card, { borderColor: "white", marginBottom: Platform.OS === 'ios' ? 9 : 0, marginLeft: Platform.OS === 'ios' ? 2 : 0 }]}>

                <View style={[styles.centerAlignment,]}>
                    <View style={[styles.marginAlignment,]}>
                        <MaterialCommunityIcons
                            name={'delete-empty-outline'}
                            size={20}
                            color={primaryIconColor}
                            style={{ marginRight: 5, marginLeft: 1 }}
                        />
                        <Text style={{ ...styles.mapData, paddingHorizontal: 3, color: "black" }}>
                            Empty Items
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
                        {expanded && (<>

                            <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                                <View style={[styles.centerAlignment,]}>
                                    <View style={[{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }]}>
                                        <Text style={[styles.tableContentHeader,]}>
                                            Add Empty Items
                                        </Text>
                                    </View>
                                    {selectormyprofile === 2 || type === "Delivered" ? null :
                                        <View style={[{ width: "10%", alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                            <TouchableOpacity style={styles.row} onPress={() => AddItem()}>
                                                <MaterialCommunityIcons
                                                    name={'plus-circle-outline'}
                                                    size={20}
                                                    color={primaryIconColor}
                                                    style={[styles.chevron, { alignItems: "center", alignSelf: "center" }]}
                                                />
                                            </TouchableOpacity>
                                        </View>}
                                </View>

                                <View>


                                </View>

                            </View>

                            <View style={[{ display: "flex", flexDirection: "row", width: "100%", marginTop: 10 }]}>
                                <Dropdown
                                    style={[emptystyles.dropdown]}
                                    placeholderStyle={emptystyles.placeholderStyle}
                                    selectedTextStyle={emptystyles.selectedTextStyle}
                                    iconStyle={emptystyles.iconStyle}
                                    itemTextStyle={{ color: 'gray' }}
                                    data={datas}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={'Select item'}
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setValue(item.value);
                                        setIsFocus(true);
                                        setemptyItem(item.label);
                                        setemptyId(item.id)
                                    }}
                                />
                                <View style={{ width: "10%", alignItems: "center", alignContent: "center", alignSelf: "center" }}>
                                    <Text style={{ width: "10%", }}>:</Text>
                                </View>
                                <View style={{
                                    width: "30%", alignItems: "flex-end", alignContent: "flex-end", alignSelf: "flex-end"
                                }}>
                                    <TextInput style={[{
                                        fontSize: 14,
                                        borderWidth: 1,
                                        borderColor: "grey",
                                        borderRadius: 5,
                                        color: "black",
                                        backgroundColor: "white",
                                        fontFamily: 'Avenir-Book',
                                        width: "50%", textAlign: "center",
                                        height: Platform.OS === 'ios' ? 47 : 47
                                    }]}
                                        onChangeText={text => setemptyNumber(text)}
                                        placeholderTextColor='grey'
                                        selectionColor="black"
                                        inputMode={'numeric'}
                                        placeholder='1'
                                        value={emptyNumber}
                                    />
                                </View>
                            </View>
                        </>



                        )}
                        {expanded && allItems?.length > 0 && (
                            <>
                                <FlatList
                                    ref={flatListRef}

                                    data={allItems}
                                    renderItem={RenderList}
                                    ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
                                    onContentSizeChange={() => {
                                        flatListRef.current.scrollToEnd({ animated: true });
                                    }}
                                />
                            </>)}

                    </View>
                </View>
            </View>
        </>

    )
}

export default EmptyItems