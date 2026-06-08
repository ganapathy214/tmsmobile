import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, PermissionsAndroid, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { styles } from './styles';
import { primaryColor } from "../../Common/Styles";
import { pinImgs } from '../../Common/Utils';
import TruckSvg from "../../../assets/Images/pins/truck.svg";

import Geolocation from 'react-native-geolocation-service';
import reactotron from "reactotron-react-native";
import { useSelector } from "react-redux";

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

export const Map = (props) => {
    const GOOGLE_API_KEY = "AIzaSyDUlxaj_7KvQej23TLqmq3oaWwmJBlcE1A";
    const userdetails = useSelector(state => state.session.userDetails.data ?? {});
    const params = props.route.params;
    const Manifested = useSelector(state => state.Manifest.adminLatLong ?? []);
    const mapMarkers = useMemo(() => {
        const latLang = params?.paramData?.sort(function (a, b) {
            var x = a.sortPosition; var y = b.sortPosition;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }).map(data => ({
            title: data.deliveryName,
            coordinate: {
                latitude: !!data.deliveryLatitude ? parseFloat(data.deliveryLatitude) : 0,
                longitude: !!data.deliveryLongitude ? parseFloat(data.deliveryLongitude) : 0,
            },
        }))
        if (latLang?.length > 0) {
            return latLang
        }

    }, [params?.paramData])

    const mapMarkerss = useMemo(() => {
        const latLang = Manifested?.map(data => ({
            title: "DRiver",
            coordinate: {
                latitude: !!data.latitude ? parseFloat(data.latitude) : 0,
                longitude: !!data.longitude ? parseFloat(data.longitude) : 0,
            },
        }))
        if (latLang?.length > 0) {
            return latLang
        }

    }, [Manifested])


    const markers = [
        {
            title: 'direction 1',
            coordinate: {
                latitude: -34.71973504968858,
                longitude: 138.66192098680898,
            },
        },
        {
            title: 'direction 2',
            coordinate: {
                latitude: -34.763639608382135,
                longitude: 138.63880518490572,
            },
        },
        {
            title: 'direction 3',
            coordinate: {
                latitude: -34.80886006455519,
                longitude: 138.5987496007649,
            },
        },
        {
            title: 'direction 4',
            coordinate: {
                latitude: -34.85585533646156,
                longitude: 138.5849577541089,
            },
        },
        {
            title: 'direction 5',
            coordinate: {
                latitude: -34.97331864015153,
                longitude: 138.50948568570263,
            },
        },
        {
            title: 'direction 6',
            coordinate: {
                latitude: -35.02102804740627,
                longitude: 138.52312567598332,
            },
        },
        {
            title: 'direction 7',
            coordinate: {
                latitude: -35.0763674059527,
                longitude: 138.5133984748257,
            },
        },
        {
            title: 'direction 8',
            coordinate: {
                latitude: -35.11526996202685,
                longitude: 138.5011406827073,
            },
        },
        {
            title: 'direction 9',
            coordinate: {
                latitude: -35.115690740922275,
                longitude: 138.53136185364755,
            },
        },
        {
            title: 'direction 10',
            coordinate: {
                latitude: -35.08201522081876,
                longitude: 138.56374347753757,
            },
        },
    ];

    const markerPoint = (i) => {
        const selectedImg = pinImgs[i % pinImgs.length];

        return (
            <View>
                <ImageBackground
                    source={selectedImg}
                    style={{ height: 50, width: 50 }} >
                    <Text
                        style={{
                            color: "black",
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 12,
                            marginVertical: 10,
                        }}>{i + 1}</Text>
                </ImageBackground>
            </View>
        );

    };
    const markerPoints = (i = false) => {
        const selectedImg = pinImgs[i % pinImgs.length];
        if (userdetails?.roleId === 2) {
            return (
                <View>
                    <TruckSvg name="truck" width={50} height={50} style={{ color: 'yourDynamicColorVariable' }} />
                </View>
            );
        }
    };
    const [location, setLocation] = useState(null);

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

    useEffect(() => {
        getLocation();
        const interval = setInterval(() => {
            getLocation();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const locationCoordinates = location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
        }
        : null;
    return (
        <View style={[styles.mapcontainer]}>
            <MapView
                style={[styles.map]}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: !!mapMarkers?.[0].coordinate?.latitude ? mapMarkers[0].coordinate?.latitude : markers[0].coordinate?.latitude,
                    longitude: !!mapMarkers?.[0].coordinate?.longitude ? mapMarkers[0].coordinate?.longitude : markers[0].coordinate?.longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0121,
                }}>
                {!!mapMarkers?.[0].coordinate?.latitude &&
                    <MapViewDirections
                        origin={mapMarkers?.[0].coordinate}
                        destination={mapMarkers[mapMarkers.length - 1].coordinate}
                        waypoints={mapMarkers?.slice(1, mapMarkers.length - 1)?.map(item => item.coordinate)}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={4}
                        strokeColor={primaryColor}
                    />}
                {userdetails?.roleId === 3 && locationCoordinates && (
                    <>
                        <Marker
                            coordinate={locationCoordinates}
                            title="Current Location"
                            description="You are here!"
                        >
                            <TruckSvg name="truck" width={50} height={50} style={{ color: 'yourDynamicColorVariable' }} />
                        </Marker>
                    </>
                )}
                {!!mapMarkers?.[0].coordinate?.latitude &&
                    mapMarkers.map((item, index) => (
                        <Marker coordinate={item.coordinate} key={index} title={item.title}>
                            {markerPoint(index)}
                        </Marker>
                    ))}
                {userdetails?.roleId === 2 && !!mapMarkerss?.[0].coordinate?.latitude &&
                    mapMarkerss?.map((item, index) => (
                        <Marker coordinate={item.coordinate} key={index} title={"Driver"}>
                            {markerPoints()}
                        </Marker>
                    ))}
            </MapView>
        </View>
    );
};
