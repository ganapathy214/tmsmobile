import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform, DeviceEventEmitter } from 'react-native';
import Bgutils from '../../Common/Components/Backgroundutils'
import TextField from "../../Common/Components/TextField";
import LinearGradient from "react-native-linear-gradient";
import * as componStyle from "../../Common/Styles/index";
import { styles } from "./styles";
import MapImage from "../../../assets/Images/map_image.png";
import deliveryTruck from "../../../assets/Images/delivery-truck.png";
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../services/session/sessionAction'

import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import { firebase } from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { encryptUsingAES256, decryptUsingAES256 } from "../../Common/Utils";
import reactotron from "reactotron-react-native";
import LatLong from "../Home/LatLong";
import { useFocusEffect } from "@react-navigation/native";

const defaultAppMessaging = firebase.messaging();

export default function Login(props) {

  const isLoader = useSelector(state => state.session.isLoading);

  const [token, setToken] = useState()

  const [iostoken, setiostoken] = useState()
  const [deviceType, setDeviceType] = useState()
  const FonfirebaseMessageReceived = async (message) => { }
  useEffect(() => {
    if (Platform.OS === "ios") {
      DeviceEventEmitter.addListener('onDeviceToken', (event) => {
        const deviceToken = event.deviceToken;
        setiostoken(deviceToken)
      });
    }

    messaging().onMessage(FonfirebaseMessageReceived);
    messaging().setBackgroundMessageHandler(FonfirebaseMessageReceived);
    checkPermission();
    messaging().getInitialNotification()
      .then((remoteMessage) => { });
    messaging().onNotificationOpenedApp(remoteMessage => {
      props.navigation.navigate("manifest");
    });
  }, [])

  const checkPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      getToken()
      return true;
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      return true;
    } else {
      return false;
    }
  }

  const getToken = async () => {

    defaultAppMessaging
      .getToken()
      .then(token => {
        fcmToken = token
        setToken(fcmToken)
      });
  }



  const [mailid, setmailID] = useState("");
  const [password, setPassword] = useState("");
  const [mobiletext, setmobiletext] = useState("");
  const [changetext, setChangeText] = useState(false);
  const [changetextpassword, setChangeTextpassword] = useState(false);
  const [mobiletextpassword, setmobiletextpassword] = useState("");


  const dispatch = useDispatch()

  const login = () => {
    var nameRegEx =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var pattern = /^[0-9]{10}$/;
    let userName = mailid.trim();
    let passWord = password.trim();

    if (userName === "" && passWord === "") {
      setChangeText(true);
      setmobiletext("Please enter the Email");
      setChangeTextpassword(true);
      setmobiletextpassword("Please enter the Password");
    } else if (
      userName === "" ||
      (!userName?.match(nameRegEx) && !userName?.match(pattern))
    ) {
      if (
        userName === null ||
        (!userName?.match(nameRegEx) && !userName?.match(pattern)) ||
        userName === ""
      ) {
        setChangeText(true);
        setmobiletext("Please enter Email");
        return false;
      } else {
        setChangeText(false);
        return true;
      }
    } else if (passWord === "") {
      if (password === "" || password === null) {
        setChangeTextpassword(true);
        setmobiletextpassword("Please enter the Password");
        return false;
      } else {
        setChangeTextpassword(false);
        return true;
      }
    } else {
      const encryptedPassword = encryptUsingAES256(password)
      const emailNames = userName?.toLocaleLowerCase()
      dispatch(loginAction({ encryptedPassword, mailid: emailNames, DeviceId: Platform.OS === "ios" ? iostoken : token, DeviceType: Platform.OS }, props.navigation));
    }
  };

  const onChangeText = (data) => {
    setmailID(data);
    setChangeText(false);

    AsyncStorage.setItem('emailData', data)
  };

  const onChangeTextPassword = (data) => {
    setPassword(data);
    setChangeTextpassword(false);
  };

  const forgotPassword = () => {
    props.navigation.navigate("forgotpassword");
  };

  return (
    <Bgutils>
      <View>
        <Text style={styles.textBold}>Welcome, Please Login</Text>
        <>
          <View style={[styles.fieldWrapper]}>
            <TextField
              validation={changetext}
              errorMessage={mobiletext}
              label={"Email"}
              text="Email"
              onChangeText={(data) => onChangeText(data)}
              value={mailid}
            />
            <TextField
              label={"Password"}
              errorMessage={mobiletextpassword}
              validation={changetextpassword}
              text="Password"
              onChangeText={(data) => onChangeTextPassword(data)}
              value={password}
              isPassword={true}
            />
          </View>
          <View style={{ height: 20 }} />
          {
            isLoader ? <ActivityIndicator size="large" color={componStyle.primaryColor} /> :
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => login()}
                  style={[
                    styles.loginbutton,
                    { backgroundColor: componStyle.primaryColor, alignContent: "center", alignItems: "center" },
                  ]}
                >
                  <Text style={{ ...styles.logintext }}>Login</Text>
                </TouchableOpacity>
              </View>
          }
          <View style={{ height: 10 }} />
          <View style={{ alignItems: "center" }}


          >
            <TouchableOpacity

              style={[styles.rowise, { width: '50%' }]}

              onPress={() => forgotPassword()}
            >
              <Text style={{ ...styles.forgotpass }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </Bgutils>
  );
}