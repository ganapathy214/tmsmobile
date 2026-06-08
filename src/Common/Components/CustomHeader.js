import { Dimensions, View, Image, Text, TouchableOpacity, Platform } from "react-native";
import Feather from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//fixed the header ui issue
import { useHeaderHeight } from '@react-navigation/elements';
import profilelogo from "../../../assets/Images/ATTLogo.jpg";
import { ScrollView } from "react-native-gesture-handler";
import { primaryColor } from "../Styles";
import Notifications from "../../Components/Home/Notification";

import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import reactotron from "reactotron-react-native";
import { baseURL } from "../Utils";
const CustomHeader = (props, totalTextItems) => {
    const notifyLength = useSelector(state => state.Manifest.notification);
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const driverName = useSelector(state => state.session.userDetails.data)
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight()
    const handleBellIconPress = () => {
        // props.navigation.navigate("Notifications")
        navigation.navigate('Notifications');
    }
    return (
        <View style={{ height: headerHeight, width: Dimensions.get("screen").width - 33 }} >
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 5, alignItems: "flex-end" }}>
                    {!!driverName?.logoA ? 
                    <Image style={{ width: 100, height: Platform.OS === 'ios' ? "80%" : (headerHeight),marginTop: Platform.OS === 'ios' ?  3 : 0}} source={{uri: `${baseURL}${driverName?.logoA?.replace(/\\/g, "/")}?time=${new Date()}`}}  /> : 
                    <Image style={{ width: 100, height: Platform.OS === 'ios' ? "80%" : (headerHeight), marginTop: Platform.OS === 'ios' ?  3 : 0}} source={profilelogo} />
                    }
                </View>
                <View style={{ flex: 5, alignItems: 'center', height: (headerHeight) }}>
                    {/* <View style={{position:"relative"}}>
                  <MaterialCommunityIcons
                        name={'bell'}
                        size={25}
                        color={"#4E5052"}
                        style={{ marginTop: 20, marginLeft: 60 }}
                    />
                    <View style={{
                        position: "absolute",
                        top:8,
                        right: -9,
                        minWidth: 20,
                        height: 20,
                        borderRadius: 12.5,
                        backgroundColor: primaryColor,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 12,
                            fontWeight: "bold",
                        }}>{"1"}</Text>
                    </View>
                  </View> */}
                   {selectormyprofile===2?null: <TouchableOpacity onPress={handleBellIconPress}>
                        <View style={{ position: "relative" }}>
                            <MaterialCommunityIcons
                                name={'bell'}
                                size={25}
                                color={"#4E5052"}
                                style={{ marginTop: Platform.OS === 'ios' ? 12 : 20, marginLeft: Platform.OS === 'ios' ? 8 : 60 }}
                            />
                            {notifyLength.data?.length>0&&<View style={{
                                position: "absolute",
                                top: Platform.OS === 'ios' ? 3 : 8,
                                right: Platform.OS === 'ios' ? -12 : -9,
                                minWidth: 20,
                                height: 20,
                                borderRadius: 12.5,
                                backgroundColor: primaryColor,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                }}>{notifyLength?.data?.length}</Text>
                            </View>}
                        </View>
                    </TouchableOpacity>}


                </View>
            </View>

        </View>
    );
};
export default CustomHeader