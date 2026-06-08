import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Bgutils from '../../Common/Components/Backgroundutils'
import TextField from '../../Common/Components/TextField'
import LinearGradient from 'react-native-linear-gradient';
import * as componStyle from '../../Common/Styles/index'
import MapImage from '../../../assets/Images/map_image.png'
import deliveryTruck from "../../../assets/Images/delivery-truck.png";
import { styles } from './styles';
import { useDispatch } from "react-redux";
import { forgotPassowrdAction } from "../../services/session/sessionAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reactotron from "reactotron-react-native";

export default function ForgotPassword(props) {

  const [mailid, setmailID] = useState("")
  const [password, setPassword] = useState("")
  const [forgotPassword, setForgotPassword] = useState("")
  const [mobiletext, setmobiletext] = useState("");
  const [changetext, setChangeText] = useState(false);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async ()=>{
    let eString = await AsyncStorage.getItem('emailData')
    setmailID(eString)
 },[])

  const resetPassword = async () => {
    const nameRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (mailid === null || mailid === '' || !mailid?.match(nameRegEx)) {
      setChangeText(true);
      setmobiletext(`Please enter a valid Email`);
      return;
    }

    const mail = mailid?.toLocaleLowerCase()

    setIsLoading(true)
    const ForgetEmail = await dispatch(forgotPassowrdAction(mail,props.navigation.navigate))
    setIsLoading(false)



    // if (ForgetEmail.statusCode = "200") {
    //   props.navigation.navigate("InputOtpScreen");
    // } else {
    //   setChangeText(true);
    //   setmobiletext('Failed to reset password. Please try again later.');
    // }


  };

  const onChangeText = (data) => {
    setmailID(data);
    setChangeText(false);
  };


  return (
    <Bgutils>
      <View>
        <Text style={styles.textBold}>Forgot Password</Text>
        <>
          <View style={[styles.fieldWrapper]}>
            <TextField
              validation={changetext}
              errorMessage={mobiletext}
              label={"Email"}
              text="Email"
              onChangeText={onChangeText}
              value={mailid}
            />
          </View>
          <View style={{ height: 20 }} />
          {isLoading ?
            <ActivityIndicator size="large" color="#0000ff" />
            : <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => resetPassword()} style={[styles.loginbutton, { backgroundColor: componStyle.primaryColor, alignContent: 'center', alignItems: "center" }]} >
                <Text style={{ ...styles.logintext }}>Send Email</Text>
              </TouchableOpacity>
              <View style={{ height: 20 }} />
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text style={{ ...styles.goBack }}>Go Back</Text>
              </TouchableOpacity>
            </View>
          }
        </>
      </View >
    </Bgutils >
  );
}