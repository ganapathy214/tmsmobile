import SignatureScreen from "react-native-signature-canvas";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button, Image, TouchableOpacity, Text, Dimensions, Platform, TextInput } from "react-native";
import { styles } from "./style";
import Icons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/AntDesign'
import { primaryIconColor } from "../../Common/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { baseURL } from "../../Common/Utils";
import { useFocusEffect } from "@react-navigation/native";
import reactotron from "reactotron-react-native";
import * as types from '../../services/Manifestsession/ManifestActionType';
import { useDispatch } from "react-redux";
import { updateOrderDetails } from "../../services/Manifestsession/ManifestAction";


const Signature = ({ text, onOK, navigation, signmodal, signatureImage, callbackSign, fetchdata, orderdetails, type }) => {
  const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
  const signParams = fetchdata
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [signimage, setsignimage] = useState(orderdetails?.signatureImage);
  const [signapi, setsignapi] = useState(true);
  const [sign, setsign] = useState("");
  const [name, setName] = useState("");
  const [errorText, setErrorText] = useState(null)
  const [receiverName, setReceiverName] = useState(false)
  const ref = useRef();
  const dispatch = useDispatch()
  useEffect(() => {

    const base64Signature = convertToBase64(sign);
    if (base64Signature === undefined) {
      setsign(base64Signature);
    } else {
      dispatch(updateOrderDetails({ data: [{ ...orderdetails, signatureImage: base64Signature, receiverName: name }] }))
      callbackSign(base64Signature, name);
    }
  }, [sign, name])
  useEffect(() => {
    if (!!orderdetails?.signatureImage) {
      setsignimage(orderdetails?.signatureImage)
    }
  }, [])

  const handleOK = (signature) => {
    if (name?.length === 0) {
      setErrorText("Please enter the name")
      signmodal(true);
    } else {
      setsign(signature);
      const base64Signature = convertToBase64(signature);
      dispatch(updateOrderDetails({ data: [{ ...orderdetails, signatureImage: base64Signature, receiverName: name }] }))
      callbackSign(base64Signature, name,);
      signmodal(false)
    }
  };

  const handleClear = () => {
    ref?.current?.clearSignature();
    setsign("");
    setReceiverName(true);
  };

  const handleClears = () => {
    ref?.current?.clearSignature();
    setsign("");
    setsignapi(false);
    setReceiverName(true);

  };

  const convertToBase64 = (dataURL) => {
    const base64 = dataURL?.split(',')[1];
    return base64;
  };

  const handleConfirm = async () => {
    const signatureData = await ref?.current?.readSignature();

    if (name?.length === 0) {
      setErrorText("Please enter the name")
      signmodal(true);
    }
  }


  const style = `
   .m-signature-pad {
    border: none;
    box-shadow: none;
  }
  .m-signature-pad--footer {
    display: none;
    margin: 0px;

  }
  .m-signature-pad--body {
  border-radius: 0px;
  padding: 13px;
  background-color: white ;
  border-style: dotted;
  border-color: lightgrey;
  height: 100%;
  border-width: ${screenWidth * 0.01}px;
 }
 `;
  const iosstyle = `
 .m-signature-pad {
  border: none
}
.m-signature-pad--footer {
  display: none;
}
.m-signature-pad--body {
border-style: dotted;
width:100%;
height:100%;
}
`;
  return (
    <>
      {!!orderdetails?.receiverName && receiverName === false ?
        <View style={{ display: "flex", width: "100%", justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', marginHorizontal: 15 }}>
          <Text style={{ display: "flex", fontFamily: "Avenir-Black", fontSize: 15, color: "#4E5052", }}>Name <Text style={{ display: "flex", fontFamily: "Avanir-Roman", fontSize: 13, color: 'black', }}>: {` ${orderdetails?.receiverName}`}</Text></Text>
        </View>
        : null}
      <View style={[styles.container]}>

        {signParams === 'completed' && orderdetails?.signatureImage === null || type === 'Cancelled' && orderdetails?.signatureImage === null || type === 'Delivered' && orderdetails?.signatureImage === null || selectormyprofile === 2 && orderdetails?.signatureImage === null ?
          <Text style={{ fontFamily: "Avanir-Roman", fontSize: 12, textAlign: 'center', alignItems: "center", marginVertical: '45%', color: 'black' }}>{'The customer has not signed yet'}</Text> :
          signapi === false ? <>
            <SignatureScreen ref={ref} onOK={handleOK} webStyle={Platform.OS === 'ios' ? iosstyle : style} />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', }}>
              <Text style={{ justifyContent: 'center', alignSelf: 'center', color: 'black' }}>{'Name :'}</Text>
              <TextInput
                style={styles.nameBox}
                placeholder='Receiver Name'
                placeholderTextColor={primaryIconColor}
                multiline
                value={name}
                onChangeText={(text) => {
                  setName(text)
                  setErrorText(null)
                }}
                error={errorText}
              />
            </View>
            <View style={{ marginHorizontal: '18%' }}>
              {errorText !== null && <Text style={[styles.nameError]}>{errorText}</Text>}
            </View>
          </>
            :
            selectormyprofile === 2 || signParams === 'completed' || type === "Cancelled" || orderdetails?.signatureImage !== null ?
              <>


                <Image source={{ uri: orderdetails?.signatureImage.length > 200 ? `data:image/png;base64,${orderdetails?.signatureImage}` : `${baseURL}${signimage?.replace(/\\/g, "/")}?time=${new Date()}`, cache: 'reload' }} style={{ height: '100%', width: '100%' }} />

              </>
              :
              orderdetails?.signatureImage === null && signapi ? <>

                <SignatureScreen ref={ref} onOK={handleOK} webStyle={Platform.OS === 'ios' ? iosstyle : style} />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                  <Text style={{ justifyContent: 'center', alignSelf: 'center', color: 'black' }}>{'Name :'}</Text>
                  <TextInput
                    style={styles.nameBox}
                    placeholder='Receiver Name'
                    placeholderTextColor={primaryIconColor}
                    multiline
                    value={name}
                    onChangeText={(text) => {
                      setName(text)
                      setErrorText(null)
                    }}
                    error={errorText}
                  />
                </View>
                <View style={{ marginHorizontal: '18%' }}>
                  {errorText !== null && <Text style={[styles.nameError]}>{errorText}</Text>}
                </View>

              </>


                :
                <View >
                  <Image source={{ uri: `${baseURL}${signimage?.replace(/\\/g, "/")}?time=${new Date()}`, cache: 'reload' }} style={{ height: '95%', width: '100%' }} />
                </View>
        }

      </View>

      {selectormyprofile === 2 || signParams === 'completed' || type === "Cancelled" || type === "Delivered" || orderdetails?.signatureImage !== null ? null :
        type === "Pickup" || type === "Cancelled" ? null :
          <View style={styles.row}>
            <TouchableOpacity onPress={handleClear} style={[styles.delivery, styles.decline, { backgroundColor: "white", borderColor: "#1bcfb4", borderWidth: 1 }]}>
              <Feather
                name={'closecircleo'}
                size={14}
                color={'#1bcfb4'}
                style={{ marginRight: 5 }}
              />
              <Text style={[styles.deliveryText, { color: "#4E5052", }]}>{"Clear"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={[styles.delivery, { backgroundColor: "#1bcfb4" }]}>
              <Feather
                name={'checkcircleo'}
                size={14}
                color={'white'}
                style={{ marginRight: 5 }}
              />
              <Text style={[styles.deliveryText, { color: "white" }]}>{"Save"}</Text>
            </TouchableOpacity>
          </View>
      }
      {orderdetails?.signatureImage !== null ?
        selectormyprofile === 2 || signParams === 'completed' || type === "Cancelled" || type === "Delivered" ? null :
          type === "Pickup" ? null :
            <View style={[styles.clearrow, { marginVertical: !!orderdetails.receiverName && receiverName === false ? 0 : "3%" }]}>
              <TouchableOpacity onPress={() => handleClears()} style={[styles.delivery, styles.decline, { backgroundColor: "white", borderColor: "#1bcfb4", borderWidth: 1, },]}>
                <Feather
                  name={'closecircleo'}
                  size={14}
                  color={'#1bcfb4'}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.deliveryText, { color: "#4E5052", }]}>{"Clear"}</Text>
              </TouchableOpacity>

              {signapi === false ? <TouchableOpacity onPress={handleConfirm} style={[styles.delivery, { backgroundColor: "#1bcfb4" }]}>
                <Feather
                  name={'checkcircleo'}
                  size={14}
                  color={'white'}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.deliveryText, { color: "white" }]}>{"Save"}</Text>
              </TouchableOpacity> : null}
            </View>



        : null}
    </>
  );
};

export default Signature;