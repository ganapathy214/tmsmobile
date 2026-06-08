

import { React, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SidenavScreen from './Sidebar';
import Home from '../Components/Home/index'
import DeliveryLists from '../Components/Home/DeliveryLists'
import OrderDetail from '../Components/Home/OrderDetail'
import Header from '../Common/Components/Header'
import ChangePassword from '../Components/ChangePassword';
import Uploadimage from '../Components/Uploadimage';
import { Map } from '../Components/Home/Map';
import Myprofile from "../Components/Myprofile";
import Signature from '../Components/Signature/index';
import { Comment } from '../Components/Comments/Comments';
import CancelledManifest from '../Components/CancelledManifest';
import { CurrentOrderedlists, Completelists } from '../Components/Home/Orders'
import Deliverydata from '../Components/Home/Deliverydata';
import OrderItem from '../Components/Home/OrderItems';
import CustomHeader from '../Common/Components/CustomHeader'
import Notifications from "../Components/Home/Notification";
import reactotron from "reactotron-react-native";
// import useTracker from "../Components/Home/useTracker";


const Drawer = createDrawerNavigator();
const Mainstack = createNativeStackNavigator();

const HomeComponents = () => {
  const [groupList, setGroupList] = useState(CurrentOrderedlists)
  return (
    <Mainstack.Navigator
      backBehavior={"history"}
      screenOptions={{
        headerShown: true,
      }}>
      <Mainstack.Screen name="manifest" component={Home} options={({ navigation }) => ({
        headerLeft: () => (
          <Header icon={"menu"} navigation={navigation} stack={true} />
        ),
        headerTitle: () => <CustomHeader />,
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} />
      {/* <Mainstack.Screen name="deliverylists" options={({ navigation }) => ({
                                headerLeft: () => (
                                  <Header icon={"arrow-back"} navigation={navigation} stack={false} />
                                ),
                                headerTitle: 'Manifest #: 34451',
                                headerStyle: {
                                  backgroundColor: "white",
                                },
                                headerTintColor: 'black',
                              })} component={DeliveryLists} /> */}

      <Mainstack.Screen
        name="deliverylists"
        options={({ route, navigation }) => {
          const manifestId = route?.params?.name;
          const manifestName = manifestId?.split("_")
          return {
            headerLeft: () => (
              <Header icon={"arrow-back"} navigation={navigation} stack={false} />
            ),
            headerTitle: `# ${manifestName[manifestName.length - 1]}`,
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: 'black',
          };
        }}
        component={DeliveryLists}
      />
      <Mainstack.Screen name="deliverydata" options={({ navigation }) => ({
        headerLeft: () => (
          <Header icon={"arrow-back"} navigation={navigation} stack={false} />
        ),
        headerTitle: 'Delivery Instructions',
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} component={Deliverydata} />
      <Mainstack.Screen name="orderItem" options={({ navigation }) => ({
        headerLeft: () => (
          <Header icon={"arrow-back"} navigation={navigation} stack={false} />
        ),
        headerTitle: 'Order Item',
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} component={OrderItem} />
      <Mainstack.Screen name="Comments" options={({ navigation }) => ({
        // headerLeft: () => (
        //   <Header icon={"arrow-back"} navigation={navigation} stack={false} />
        // ),
        // headerTitle: 'Comments',
        // headerStyle: {
        //   backgroundColor: "white",
        // },
        // headerTintColor: 'black',
        headerShown: false
      })} component={Comment} />
      <Mainstack.Screen name="orderDetail" options={({ route, navigation }) => {
        const orderNumber = route?.params?.orderNumber
        const orderId = route.params.orderId;
        const type = route.params.type
        return {
          headerLeft: () => (
            <Header icon={"arrow-back"} navigation={navigation} stack={false} />
          ),
          headerTitle: type === "Pickup" ? "Pickup" : `Order #: ${orderNumber}`,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: 'black',
        }
      }} component={OrderDetail} />

      <Mainstack.Screen name="uploadImage" options={({ navigation }) => ({
        headerShown: false
      })} component={Uploadimage} />

      <Mainstack.Screen name="Map" options={({ navigation }) => ({
        headerLeft: () => (
          <Header icon={"arrow-back"} navigation={navigation} stack={false} />
        ),
        headerTitle: 'Map',
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} component={Map} />
      <Mainstack.Screen name="Signature" options={({ navigation }) => ({
        // headerLeft: () => (
        //   <Header icon={"close"} navigation={navigation} stack={false} />
        // ),
        // headerTitle: 'Signature',
        // headerStyle: {
        //   backgroundColor: "white",
        // },
        // headerTintColor: 'black',
        headerShown: false
      })} component={Signature} />
      <Mainstack.Screen name="Notifications" options={({ navigation }) => ({
        headerLeft: () => (
          <Header icon={"arrow-back"} navigation={navigation} stack={false} />
        ),
        // headerTitle: 'Signature',
        // headerStyle: {
        //   backgroundColor: "white",
        // },
        // headerTintColor: 'black',
        // headerShown: false
      })} component={Notifications} />
    </Mainstack.Navigator >
  )
}

const DrawerNavigation = () => {
  const [drawerWidth, setDrawerWidth] = useState(Dimensions.get('window').width * 0.8); //drawer width

  const updateDrawerWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    setDrawerWidth(screenWidth * 0.8);
  };
  return (<>
    <Drawer.Navigator backBehavior={'history'} screenOptions={{
      drawerStyle: { width: drawerWidth },
    }} initialRouteName="manifest" drawerContent={props => <SidenavScreen {...props} navigation={props.navigation} />}>
      <Drawer.Screen name="manifest" component={HomeComponents} options={({ navigation, route }) => ({
        header: () => null
      })} />
      <Drawer.Screen name="cancelled manifest" options={({ navigation }) => ({
        headerTitle: 'Cancelled Manifest',
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} component={CancelledManifest} />
      <Drawer.Screen name="profile" options={({ navigation }) => ({
        headerTitle: 'My Profile',
        // headerLeft: () => (
        //   <Header icon={"menu"} navigation={navigation} stack={true} />
        // ),

        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} component={Myprofile} />
      <Drawer.Screen name="changePassword" options={({ navigation, route }) => ({
        headerTitle: 'Change Password',
        // headerLeft: () => (
        //   <Header icon={"menu"} navigation={navigation} stack={true} />
        // ),
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} component={ChangePassword} />
      <Drawer.Screen name="Notifications" options={({ navigation, route }) => ({
        headerTitle: 'Notifications',

        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: 'black',
      })} component={Notifications} />
    </Drawer.Navigator >
  </>
  )
}

export default DrawerNavigation
