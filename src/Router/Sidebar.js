import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './sidebarStyle'
import profilelogo from "../../assets/Images/driving.jpg";
import { primaryColor, primaryIconColor } from "../Common/Styles";
import { setAuthenticate } from '../services/session/sessionAction';
import reactotron from "reactotron-react-native";
import { setEmptymanifest } from "../services/Manifestsession/ManifestAction";
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import DeviceInfo from 'react-native-device-info';
import { baseURL } from "../Common/Utils";
import { profileData } from "../services/Manifestsession/ManifestAction";


const SideDrawer = (props) => {
    const [selectedItem, setItem] = useState("manifest")
    const driverName = useSelector(state => state.session.userDetails.data)
    const selectormyprofile = useSelector(state => state.Manifest.profileUsers)
    const routes = useRoute();
    const dispatch = useDispatch();
    const versionNumber = DeviceInfo.getVersion()

    const _hubConnection = new HubConnectionBuilder()
        .withUrl("http://192.168.1.106:1003/dataUpdatesHub",
            {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
        .configureLogging(LogLevel.None).build();

    const signalR = useSelector(state => state?.Manifest?.swipescreenOrder?.data)
    const eta = useSelector(state => state?.Manifest?.etacall?.data?.[0] ?? "")
    const MyProfile = () => {
        props.navigation.navigate("profile");
        setItem("profile")
    };
    const roleID = useSelector(state => state?.session?.userDetails?.data?.roleId)

    useEffect(() => {
        dispatch(profileData(roleID));

    }, [])


    const logout = async (item) => {
        if (item.value === 'logout') {
            dispatch(setEmptymanifest());
            AsyncStorage.removeItem("isLoggedIn");
            AsyncStorage.setItem("userLoggedData", "");
            setTimeout(() => {
                dispatch(setAuthenticate(false));
                props.navigation.navigate("login");
            }, 500)
        } else {
            setItem(item.value);
            props.navigation.navigate(item.value);
            props.navigation.closeDrawer();
        }
    };

    const screens = [
        { label: "Manifest", value: "manifest", icon: (data) => <Icon name="home-outline" size={20} color={primaryColor} /> },
        { label: "Change Password", value: "changePassword", icon: (data) => <AntDesign name="unlock" size={data === selectedItem ? 23 : 15} color={primaryColor} /> },
        { label: "Logout", value: "logout", icon: (data) => <AntDesign name="logout" size={20} color={primaryColor} /> }
    ]

    const list = ({ item, styles }) => {
        return (<View style={{ marginVertical: 10, width: item.label === 'Change Password' ? '65%' : '35%', marginHorizontal: 10 }}>
            <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => { logout(item) }}>
                {item.icon(item.value)}
                <Text style={{
                    fontFamily: 'Avenir-Roman',
                    fontSize: 16,
                    color: item.value === selectedItem ? primaryColor : primaryIconColor,
                    marginHorizontal: 10,
                    fontWeight: item.value === selectedItem ? "800" : "300"
                }}>{item.label}</Text>
            </TouchableOpacity>
        </View>)
    }
    return (
        <View style={{ backgroundColor: "white", borderRightRadius: 5, height: "100%" }}>
            <View style={{ ...styles.center, marginVertical: 10 }}>
                <TouchableOpacity onPress={() => MyProfile()}>
                    <View style={{ ...styles.card }}>
                        {
                            !!selectormyprofile?.image ?
                                <Image style={styles.img1} source={{ uri: `${baseURL}${selectormyprofile?.image?.replace(/\\/g, "/")}?time=${new Date()}` }} />
                                : <Image style={styles.img1} source={profilelogo} />
                        }
                    </View>
                </TouchableOpacity>
                <Text style={{
                    textAlign: "center", fontSize: 16, marginTop: 10, fontFamily: "Avenir-Roman", color: '#4E5052'
                }}>{driverName?.userName?.charAt(0).toUpperCase() + driverName?.userName?.slice(1)} </Text>
            </View>
            <View >
                <Text style={{
                    textAlign: "center", fontSize: 20,
                    color: "#4E5052",
                    fontWeight: "600",
                    fontFamily: "Avenir-Black",
                }}>{driverName?.tenantName} </Text>
                <View style={styles.line} />
                <FlatList
                    renderItem={list}
                    data={screens}
                />
            </View>
            <View style={{
                position: "absolute", bottom: 0,
                width: '100%',
                display: "flex",
                justifyContent: "center",
                flexDirection: 'row',
                marginBottom: 10,
            }}>
                <Text style={{
                    textAlign: "center", fontSize: 16,
                    color: "black",
                    fontWeight: "600",
                    marginLeft: 19,
                    fontFamily: "Avenir-Roman"
                }}>V {versionNumber} </Text>
            </View>
        </View>
    )
}

export default SideDrawer