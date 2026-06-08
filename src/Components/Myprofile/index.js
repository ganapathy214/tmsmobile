import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { style } from "./styles";
import profilelogo from "../../../assets/Images/driving.jpg";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../../services/Manifestsession/ManifestAction";
import reactotron from "reactotron-react-native";
import { baseURL } from "../../Common/Utils";


const Myprofile = () => {
  const driverName = useSelector(state => state?.session?.userDetails?.data)
  const dispatch = useDispatch()

  const roleID = useSelector(state => state?.session?.userDetails?.data?.roleId)

  useEffect(() => {
    dispatch(profileData(roleID));

  }, [])

  const selectormyprofile = useSelector(state => state.Manifest.profileUsers)

  const profilescreen = [
    {
      label: "Name:",
      // value: driverName.userName,
      value: driverName.userName?.charAt(0).toUpperCase() + driverName.userName?.slice(1),
    },
    {
      label: "Mobile:",
      value: selectormyprofile.phoneNumber,
    },
    {
      label: "Email:",
      value: selectormyprofile.email,
    },
    // {
    //   label: "Gender:",
    //   value: "",
    // },
    // {
    //   label: "DOB:",
    //   value: "",
    // },
    {
      label: "Licence:",
      value: selectormyprofile.licenseNumber,
    },
    {
      label: "Expiry:",
      value: selectormyprofile.licenseExpiryDate,
    },
  ]

  const personalInfo = [
    {
      label: "Name:",
      value: "",
    },
    {
      label: "Mobile:",
      value: "",
    },
    {
      label: "Email:",
      value: "",
    },
    // {
    //   label: "Gender:",
    //   value: "",
    // },
    // {
    //   label: "DOB:",
    //   value: "",
    // },
    {
      label: "Licence:",
      value: "",
    },
    {
      label: "Expiry:",
      value: "",
    },
  ];
  const RenderPersionalList = ({ item }) => {
    return (
      <View>
        <View style={style.Cardtemplate}>
          <Text style={style.Flatlabel}>{item.label}</Text>

          <Text style={style.Flatvalue}>{item.value}</Text>
        </View>
        <View style={style.horizontalLineGray} />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.viewStyle}>
          <View style={style.card}>
            <View style={style.imagehead}>
              {!!selectormyprofile?.image ?
                <Image
                  source={{ uri: `${baseURL}${selectormyprofile?.image?.replace(/\\/g, "/")}?time=${new Date()}` }}
                  resizeMode="cover"
                  style={style.profileAvatar}
                  pluscircleo
                />
                :
                <Image
                  source={profilelogo}
                  resizeMode="cover"
                  style={style.profileAvatar}
                  pluscircleo
                />}
            </View>
            <View style={style.Flatcontainer}>
              <FlatList
                data={Object.keys(selectormyprofile).length >= 0 ? profilescreen : personalInfo}
                renderItem={RenderPersionalList}
                keyExtractor={(item, index) => `key-${index}`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Myprofile;