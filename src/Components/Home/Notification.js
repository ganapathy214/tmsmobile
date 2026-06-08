import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
} from "react-native";
import Toast from 'react-native-simple-toast';

import { style } from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import OrderDetail from "../Home/OrderDetail";
import { styles } from './styles';
import { notification, recentManifests } from '../../services/Manifestsession/ManifestAction';
import CustomHeader from "../../Common/Components/CustomHeader";
import { useDispatch, useSelector } from "react-redux";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import reactotron from "reactotron-react-native";

const Notifications = (props) => {

    const notificatonResponse = useSelector(state => state.Manifest.notification);
    const ausTime = (data = new Date()) => new Date(data).toLocaleString("en-US", { hour: "numeric", minute: '2-digit', timeZone: "Australia/Sydney" });
    const ausday = (data = new Date()) => new Date(data).toLocaleString("en-US", { timeZone: "Australia/Sydney", day: '2-digit' });
    const ausdate = (data = new Date()) => new Date(data).toLocaleString("en-US", { timeZone: "Australia/Sydney", month: 'short', year: 'numeric' });

    const dispatch = useDispatch()
    const Manifested = useSelector(state => state.Manifest.ManifestData?.data ?? []);


    useEffect(() => {
        dispatch(notification());
    }, [])


    const RenderPersionalList = (item, index) => {
        const messages = item.item.messageBody
        return (
            <View

                style={{ flexDirection: 'column', marginBottom: 10 }}>
                <View key={index} style={[styles.Notificationcard, { borderColor: "white" }]}>
                    <View style={styles.headermessage}>
                        <View>
                            <MaterialIcons
                                name={'notifications-on'}
                                size={25}
                                color={"#4E5052"}
                                style={{ marginRight: "7%" }}
                            />
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.txtColor}>
                                {messages}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.clock, { marginTop: 7 }]}>
                    <EvilIcons
                        name={"clock"}
                        size={18}
                        color={'black'}
                    />
                    <Text style={styles.time}>{`${ausday(item?.item?.createdDate)} ${ausdate(item?.item?.createdDate)} - ${ausTime(item?.item?.createdDate)}`}</Text>
                </View>
            </View>
        )
    }


    return (
        <View >
            <FlatList
                data={notificatonResponse?.data}
                renderItem={RenderPersionalList}
                keyExtractor={(item, index) => `key-${index}`}
                ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
            />
        </View>
    )
}
export default Notifications