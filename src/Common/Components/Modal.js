import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import Feather from 'react-native-vector-icons/AntDesign'

import { commonStyle, primaryColor, primaryIconColor } from "../../Common/Styles";
import { useDispatch } from 'react-redux';
import { ManifestsDeclineStatus, OrderdetailDeclineStatus } from '../../services/Manifestsession/ManifestAction';
import reactotron from 'reactotron-react-native';
// import { styles } from '../../Components/Home/styles';
const Error = ({ params, decline, tenantId, orderId, details, parentCallback, Callback, errortext, todelete, fordelete, manifestId, navigation, orderStatus = "" }) => {
    const dispatch = useDispatch();

    const [reason, setReason] = useState('')
    const [text, settext] = useState(null);

    useEffect(() => {
        setReason("");
        settext(null)
    }, [])

    const sendData = (value, data) => {
        if (reason?.length === 0) {
            settext("Please enter the reason")
        }
        else {

            if (decline === "decline") {
                dispatch(OrderdetailDeclineStatus(tenantId, orderId, reason, details?.manifestId, navigation?.navigation, orderStatus, params))
                Callback(value)
            } else {
                dispatch(ManifestsDeclineStatus(manifestId, reason, navigation?.navigation))
                Callback(value)
            }

        }
    }

    const close = (value, data) => {
        Callback(value)
        setReason("")
        settext(null)
    }

    return (
        // <KeyboardAvoidingView style={{ flex: 1 }}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={parentCallback}
            onRequestClose={() => {
            }}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <Text style={{ ...styles.alertText }}>Alert!</Text>
                    <View style={{ width: '100%', height: undefined, marginBottom: 5, marginTop: 10 }}>
                        <Text style={{ fontFamily: 'Avenir-Book', marginLeft: 20, fontSize: 14, alignContent: 'center', alignItems: 'center', color: "black" }}>{errortext}</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'black', fontFamily: 'Avenir-Roman', fontSize: 14, fontWeight: '800', marginHorizontal: 18, marginTop: '3%' }}>
                            Reason :
                        </Text>
                        <View style={{ marginTop: '4%' }}>
                            {/* <TextInput style={styles.commentBox} placeholder='Notes...' placeholderTextColor={primaryIconColor} multiline /> */}

                            <TextInput
                                style={styles.commentBox}
                                placeholder='Notes...'
                                placeholderTextColor={primaryIconColor}
                                multiline
                                value={reason}
                                onChangeText={(text) => {
                                    setReason(text)
                                    settext(null)
                                }
                                }
                                error={text}
                            />
                            <View style={{ marginHorizontal: 12, marginTop: 5 }}>
                                {text !== null && <Text style={[styles.errorText]}>{text}</Text>}
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ display: "flex", alignSelf: 'center', alignItems: 'center', alignContent: 'center' }}>
                        {todelete ? <View style={{ marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "space-between" }}><TouchableOpacity
                            style={{ marginHorizontal: 20 }}
                            onPress={() => {
                                sendData(!parentCallback.parentCallback, true)
                            }}>
                            <Feather
                                name={'closecircleo'}
                                size={35}
                                color={"#fe7c96"}
                            />
                            <Text style={{ ...styles.textStyle, color: "black" }}>  No  </Text>
                        </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginHorizontal: 20 }}
                                onPress={() => {
                                    sendData(!parentCallback.parentCallback, true)
                                }}>
                                <Feather
                                    name={'checkcircleo'}
                                    size={35}
                                    color={'#57ba4a'}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={{ ...styles.textStyle, color: "black" }}>  Yes  </Text>
                            </TouchableOpacity>

                        </View> : <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#0087FF", alignSelf: "flex-start" }}
                            onPress={() => {
                                sendData(!parentCallback.parentCallback)
                            }}>
                            <Text style={{ ...styles.textStyle }}>  Ok  </Text>
                        </TouchableOpacity>}
                    </View> */}

                    <View style={[styles.deliverybtns, { marginTop: 20 }]}>

                        <TouchableOpacity onPress={() => {
                            sendData(!parentCallback.parentCallback)
                        }} style={[styles.delivery, { backgroundColor: "#1bcfb4" }]}>
                            <Feather
                                name={'checkcircleo'}
                                size={14}
                                color={'white'}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={[styles.deliveryText,]}>{"Yes"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            close(!parentCallback.parentCallback, true)
                        }} style={[styles.delivery, styles.decline, { backgroundColor: "white", borderColor: "#1bcfb4", borderWidth: 1 }]}>
                            <Feather
                                name={'closecircleo'}
                                size={14}
                                color={'#1bcfb4'}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={[styles.deliveryText, { color: "#4E5052" }]}>{"No"}</Text>
                        </TouchableOpacity>




                    </View>
                </View>

            </View>
        </Modal>
    )
}
export default Error;

const styles = StyleSheet.create({
    deliveryText: {
        fontSize: 14,
        color: "white",
        alignContent: "center", alignItems: "center", alignSelf: "center",
        padding: 5,
        fontWeight: "600",
    },
    delivery: {
        height: 45,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#57ba4a",
        width: "45%"
    },
    deliverybtns: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 2, alignItems: "center", width: Platform.OS === 'ios' ? '88%' : '90%', marginLeft: Platform.OS === 'ios' ? '5%' : '6%'
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(100,100,100, 0.8)',
        padding: 20,
    },
    modalView: {
        margin: 25,
        width: '82%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // height: '50%'
    },
    openButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        alignContent: 'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
    },
    alertText: {
        marginBottom: 5,
        textAlign: "center",
        color: 'black',
        fontFamily: 'Avenir-Heavy',
        fontSize: 18
    },
    // headerCommentBox: {
    //     backgroundColor: "#DCDCDC",
    //     width: '80%',
    //     maxHeight: '100%',
    //     borderRadius: 5,
    //     paddingVertical: 2,
    //     // paddingHorizontal: 10,
    //     marginVertical: 5,
    //     shadowColor: '#171717',
    //     shadowOffset: { width: 1, height: 4 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 3,
    //     fontFamily: 'Avenir-Roman',
    //     fontSize: 14,
    // },
    commentBox: {
        borderWidth: 1,
        width: Platform.OS === 'ios' ? '86%' : '90%',
        marginLeft: '6%',
        borderRadius: 5,
        paddingLeft: 5,
        display: 'flex',
        maxHeight: "100%",
        minHeight: Platform.OS === 'ios' ? '8%' : 0,
        color: 'black'
    },
    errorText: {
        color: 'red',
        fontFamily: 'Avenir-Book',
        marginBottom: 10,
        paddingLeft: 5,
    },
})  