
import React, { useEffect, useMemo, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, PermissionsAndroid, Platform } from "react-native"
import { CommonActions, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

import * as types from '../../services/Manifestsession/ManifestActionType';

import reactotron from "reactotron-react-native";
import { adminTrackingCall, etaCall, trackingCall } from "../../services/Manifestsession/ManifestAction";

import * as signalR from '@microsoft/signalr';

import { baseURL } from "../../Common/Utils";
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

const LatLong = () => {
    const dispatch = useDispatch();
    const eta = useSelector(state => state?.Manifest?.etacall?.data?.[0] ?? "")
    const Manifested = useSelector(state => state.Manifest.ManifestData?.data ?? []);
    const userdetails = useSelector(state => state.session.userDetails.data ?? {});
    const currentSwipeData = useSelector(state => state.Manifest.swipescreenOrder.data ?? []);
    const versionNumber = DeviceInfo.getVersion()

    const manifeststarted = useMemo(() => {
        let returningData = Manifested.filter(data => (data.orderStatus === "Manifest Started"));
        return returningData;
    }, [Manifested]);


    let counter = useRef(null);

    const isLogged = useSelector(state => state.session.isLogged);

    const trackcycle = async (eta, manifeststarted) => {
        try {
            const granted = await requestLocationPermission();
            if (granted) {
                Geolocation.getCurrentPosition(
                    position => {
                        const datas = {
                            "tenantid": eta?.tenantId,
                            "manifestid": manifeststarted[0]?.maniFestId,
                            "Longitude": position?.coords?.longitude.toString(),
                            "Latitude": position?.coords?.latitude.toString(),
                            "DriverId": manifeststarted[0]?.driverID,
                            "deviceType": `${Platform.OS} ${versionNumber}`
                        };
                        dispatch(trackingCall({ ...datas }))
                    },
                    err => {

                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        } catch (error) {

        }
    }

    useMemo(() => {
        if (manifeststarted.length === 0) {
            if (!!counter.current) {
                clearInterval(counter.current)
            }
        }
    }, [manifeststarted]);

    useMemo(async () => {
        const etaTimeInterval = eta?.trackingInterval;

        if (userdetails?.roleId === 3 && !!etaTimeInterval && manifeststarted.length !== 0) {
            if (!!manifeststarted && manifeststarted.length !== 0) {
                reactotron.log(".........start log..............:))",)

                counter.current = setInterval(() => {
                    trackcycle(eta, manifeststarted)
                }, Number(etaTimeInterval) * 60 * 1000);
            } else {
                if (!!counter.current) {
                    clearInterval(counter.current)
                }
            }
        } else {
            if (!!counter.current) {
                reactotron.log(".........end log..............:))")
                clearInterval(counter.current)
            }
        }

    }
        , [eta?.trackingInterval])
    return (<>

        <View>
        </View>
    </>)

}
export default LatLong