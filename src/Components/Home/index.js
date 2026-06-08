import { React, useState, useEffect, useRef, useCallback } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Animated, Dimensions, Text } from 'react-native';
import Manifest from './Manifest'
import CompleteHome from './CompleteManifest'
import DeclinedManifest from '../CancelledManifest/index'
import { TabView, SceneMap } from 'react-native-tab-view';
import { primaryColor } from "../../Common/Styles";
import { screenWidth } from "../../Common/Utils";
import { Manifests, cancelManifest, completedManifests, etaCall, fetchManifests, notification } from "../../services/Manifestsession/ManifestAction";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import reactotron from "reactotron-react-native";
import LatLong from "./LatLong";


const Home = (props) => {
    const [manifestsFetched, setManifestsFetched] = useState(false);
    const [completedManifestsFetched, setCompletedManifestsFetched] = useState(false);
    const [cancelledManifestsFetched, setCancelledManifestsFetched] = useState(false);

    const dispatch = useDispatch();
    const username = useSelector(state => state.session.userDetails.data.userName);
    const scrollRef = useRef()

    useFocusEffect(
        useCallback(() => {
            dispatch(Manifests());
            dispatch(completedManifests());
            dispatch(cancelManifest());
            return () => ""
        }, [])
    );
    useEffect(() => {
        dispatch(etaCall())
        // seteta( eta)
    }, []);
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'Manifest', title: `Recent` },
        { key: 'CompleteHome', title: 'Completed' },
        { key: 'DeclinedManifest', title: 'Cancelled' },
    ].filter(fd => fd));

    const _renderScene = SceneMap({
        Manifest: () => <Manifest styles={styles} {...props} />,
        CompleteHome: () => <CompleteHome styles={styles} {...props} />,
        DeclinedManifest: () => <DeclinedManifest styles={styles} {...props} />
    });

    const renderTabBar = (props) => {
        const activeTab = props.navigationState.routes[index].key;
        if (activeTab === "Manifest" && !manifestsFetched) {
            dispatch(notification());
            dispatch(Manifests());
            setManifestsFetched(true);
            setCompletedManifestsFetched(false);
            setCancelledManifestsFetched(false);
        } else if (activeTab === "CompleteHome" && !completedManifestsFetched) {
            dispatch(completedManifests());
            setCompletedManifestsFetched(true);
            setManifestsFetched(false);
            setCancelledManifestsFetched(false);
        } else if (activeTab === "DeclinedManifest" && !cancelledManifestsFetched) {
            dispatch(cancelManifest());
            setCancelledManifestsFetched(true);
            setManifestsFetched(false);
            setCompletedManifestsFetched(false);
        }
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (

            <View style={{ height: 40, width: "80%", alignSelf: "center" }}>
                <ScrollView ref={scrollRef} onIndexChange={(event) => { }} style={{ ...styles.tabBar }} horizontal={true} showScroll={false} showsHorizontalScrollIndicator={false} scroll>
                    {props.navigationState.routes.map((route, i) => {
                        const opacity = props.position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((inputIndex) => {
                                return inputIndex === i ? 1 : 0.5
                            }
                            ),
                        });
                        return (
                            <View style={[{ flex: 1, width: "100%", }]}>
                                <TouchableOpacity
                                    style={{ alignItems: "center", flex: 1, minWidth: screenWidth / 3.75 }}
                                    onPress={() => setIndex(i)}>
                                    <Animated.Text numberOfLines={1} style={{ paddingHorizontal: 20, opacity, fontFamily: "Avenir-Roman", fontSize: 14, fontWeight: "700", color: i === index ? primaryColor : "#242628" }}>{route.title}</Animated.Text>
                                    <View style={{ marginTop: 10, width: "100%" }}>
                                        {i === index ? <View style={{ backgroundColor: primaryColor, width: "100%", height: 5, borderRadius: 19 }}></View> : <View style={{ backgroundColor: "lightgrey", width: "100%", height: 5, }} />}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };
    return (<View >
        <View style={{ marginVertical: 5, width: '100%' }}>
            <Text style={styles.headertext}>{'Welcome, '}{username.charAt(0).toUpperCase() + username.slice(1)}</Text>
        </View>
        <LatLong />
        <View style={{ height: "100%", marginTop: 20, width: "100%" }}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={_renderScene}
                onIndexChange={(index) => {
                    setIndex(index);
                    if (index === 0) {
                        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
                    } else if (index == 3) {
                        scrollRef.current.scrollTo({ x: 300, y: 0, animated: true })
                    }
                    else {
                        scrollRef.current.scrollTo({ x: 100, y: 0, animated: true })
                    }
                }}
                animationEnabled
            />
        </View>
    </View>
    )
}

export default Home;


const styles = StyleSheet.create({
    headertext: {
        fontFamily: "Avenir-Black",
        fontSize: 20,
        color: "#4E5052",
        paddingHorizontal: 30,
        marginVertical: 5,
        paddingVertical: 5,
    },

    tabBar: {
        flexDirection: 'row',
        width: "100%",
    },

})

