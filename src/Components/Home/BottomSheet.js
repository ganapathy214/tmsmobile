import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import React, { useState, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo } from 'react';

import UploadImage from '../Uploadimage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { primaryColor, commonStyle, primaryIconColor, } from '../../Common/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/AntDesign'
import { styles } from './orderDetailstyle';
import Signature from '../Signature';
import profilelogo from "../../../assets/Images/Arrow.png";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useHeaderHeight } from '@react-navigation/elements';

import SwipeButton from 'rn-swipe-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profilelogo from "../../../assets/Images/rightArrowbig.svg";
import { useDispatch, useSelector } from 'react-redux';
import { Commentsgetall, UpdateAll, Updatestatus, ordetailswipeScreen, ordetaiswipelPause, updatePickupTrack } from '../../services/Manifestsession/ManifestAction';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Stop from 'react-native-vector-icons/Ionicons';
import { baseURL } from '../../Common/Utils';
import Toast from "react-native-simple-toast"
import reactotron from 'reactotron-react-native';



const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MODAL_HEIGHT = SCREEN_HEIGHT * 0.60; // need to change dynamically
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = React.forwardRef(
  ({ children, params, navigation, storedImages, orderdetails, quanity, Status }, ref) => {

    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const bottomSheetParams = params.completed
    const fetchdata = params.fetchdata
    const type = params.type
    const orderId = params.orderId
    const orderStatus = Status
    const statusType = params?.updateStatus

    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [length, setlength] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [signatureImage, setSelectedSignatureImages] = useState(false);
    const [sheetValue, setSheetValue] = useState(true);
    const [status, setstatus] = useState(true);
    const [data, setdata] = useState(true)
    const [customername, setcustomername] = useState("")
    const [emptyName, setemptyName] = useState("")
    const orderNumber = params?.orderNumber
    const pickupData = useSelector(state => state.Manifest.pickupData.data) ?? [];



    const patch = () => {
      // dispatch(Commentsgetall())
      dispatch(Commentsgetall(orderId))
    }
    const headerHeight = useHeaderHeight();

    const [signaturebaseImage, setsignaturebaseImage] = useState();

    const [SignmodalVisible, setSignModalVisible] = useState(false);
    const [productbaseImage, setproductImage] = useState();

    const [pause, setPause] = useState(true)

    const Pause = () => {
      setPause(false)
    }

    const currentOrderList = useMemo(() => {
      return params?.groupItem?.orderItems?.map(data => data?.orderId)
    }, [params?.groupItem])


    let currentPickupData = useMemo(() => {
      let pickupdata = pickupData?.filter(fd => fd?.manifestId === params?.manifestId && currentOrderList?.includes(fd?.orderId));
      return pickupdata
    }, [pickupData, currentOrderList])


    const goStart = () => {
      if (currentPickupData?.length > 0) {
        let payloadData = {
          orderId: currentOrderList,
          manifestId: params?.manifestId,
          loadIn: currentPickupData?.[0]?.loadIn,
          loadOut: formattedDate,
          isLoaded: true,
        }
        dispatch(updatePickupTrack(payloadData));
        setPause(true)
        dispatch(Updatestatus(7, orderdetails?.tenantId, params?.groupItem?.orderItems?.[0]?.orderId))
      }
    }

    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(3, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    useEffect(async () => {
      const pauseStatusString = await AsyncStorage.getItem('OrderSwipekey');
      if (pauseStatusString === null) {
        // setstatus(false) 
        setdata(true)
      } else {
        // setstatus(true) 
        setdata(false)
      }
    },
      []);

    const handleSwipeSuccess = async () => {

      let pickup = pickupData.filter(fd => fd?.manifestId === params?.manifestId && !!fd?.loadIn && fd?.loadOut == null);

      if (!!params?.swipescreenOrder?.startTime && currentPickupData?.length == 0 && pickup?.length == 0) {
        let payloadData = {
          orderId: params?.groupItem?.orderItems?.map(data => data?.orderId),
          manifestId: params?.manifestId,
          loadIn: formattedDate,
          loadOut: null,
          isLoaded: false,
        }
        dispatch(updatePickupTrack(payloadData));
        Pause()
      } else {
        if (pickup.length) {
          Toast.show("Kindly complete existing pickup")
        } else {
          Toast.show("Kindly start the Manifest")
        }
      }

    };
    const dispatch = useDispatch();
    const comments = useSelector(state => state.Manifest.commentsgetall);
    const updateemptyquantity = useSelector(state => state.Manifest.updateemptyquantity);
    const updatequantity = useSelector(state => state.Manifest.updatequantity);

    useEffect(() => {

      setSelectedImages(storedImages)
      fetchStoredImages()
      commentsOreder();
      patch()
    }, [storedImages])
    const isFocused = useIsFocused();

    useEffect(async () => {

      const commentsValue = await AsyncStorage.getItem('comments')
      setlength(commentsValue);
    }, [])
    const commentsOreder = async () => {
      const localcomments = await AsyncStorage.getItem('comments_data');
      const commentslength = JSON.parse(localcomments).length
      setBatch(commentslength);
    }

    const fetchStoredImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem('selected');
        if (storedImages) {
          const parsedImages = JSON.parse(storedImages);
          setSelectedImages(parsedImages);
        }
      } catch (error) {
        console.log('Error to get stored images:', error);
      }
    };
    const scrollTo = useCallback((destination) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
        runOnJS(setSheetValue)(true)
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          runOnJS(setSheetValue)(false)
          scrollTo(Platform.OS === 'ios' ? -180 : -120);

        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y - 50);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );
      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });
    const callbackImage = (data) => {
      const imageBase64 = data?.data?.replace('data:image/png;base64,', "");
      const datas = data.data
      setproductImage(imageBase64);
      update(imageBase64);
    }
    const callbackSign = (data, name) => {
      const signBase64 = data
      setsignaturebaseImage(signBase64)
      setcustomername(name)
      update("", signBase64, name);



    }
    const ImageModal = ({ visible, onClose, images, onRemove }) => {
      const newData = images.filter(({ path }) => path !== null);
      return (
        <Modal visible={visible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={{ position: "relative" }}>
              <View style={[styles.modalContent, { height: MODAL_HEIGHT }]}>
                <View style={[styles.buttonContainer,]}>
                  <View style={{ width: "100%" }}>
                    <>
                      <TouchableOpacity style={{ position: "absolute", left: 0, top: 0 }} onPress={() => setModalVisible(false)} >
                        <Icons
                          name={'close'}
                          size={20}
                          color={'#4E5052'}
                        />
                      </TouchableOpacity>
                      <View style={[{ display: 'flex', flexDirection: 'row', width: "100%", margin: 10 }]}>

                        <View style={{ marginHorizontal: 5 }}>
                          <Text style={styles.headertext1}>{fetchdata === 'completed' && orderdetails?.deliveryItemImage !== null || type === 'Cancelled' && orderdetails?.deliveryItemImage !== null || type === 'Delivered' && orderdetails?.deliveryItemImage !== null || selectormyprofile === 2 && orderdetails?.deliveryItemImage !== null ? 'Uploaded Image' : 'Upload Image'}</Text>
                          {fetchdata === 'completed' && orderdetails?.deliveryItemImage === null ? null
                            :
                            fetchdata === 'completed' || type === 'Cancelled' || type === "Delivered" || selectormyprofile === 2 ? null :
                              <Text style={{ width: "100%", marginLeft: 10, fontFamily: "Avanir-Roman", fontSize: 12 }}>Add files as attachments</Text>
                          }

                        </View>

                      </View>
                      <View >
                      </View>
                      <View style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>

                        <UploadImage updatefn={update} mainModal={setModalVisible} orderdetails={orderdetails} callbackImage={callbackImage} deliveryItemImage={orderdetails?.deliveryItemImage} fetchdata={fetchdata} type={type} />
                      </View>
                    </>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    };
    const signcall = (dataone, datatwo) => {
      setSignModalVisible(dataone)
      if (datatwo === undefined) {
        setSelectedSignatureImages(false)
      } else {
        setSelectedSignatureImages(true)
      }
    }
    const SignModal = ({ visible, onClose, images, onRemove }) => {
      const screenHeight = Dimensions.get('window').height;
      const MODAL_HEIGHT_RATIO = 0.78;
      const Signature_MODAL_HEIGHT = screenHeight * MODAL_HEIGHT_RATIO;
      return (
        <Modal visible={visible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={{ position: "relative" }}>
              <View style={[styles.modalContent, { height: Signature_MODAL_HEIGHT }]}>
                <View style={[styles.buttonContainer,]}>
                  <View style={{ width: "100%" }}>
                    <>
                      <TouchableOpacity style={{ position: "absolute", left: 0, top: 0 }} onPress={() => setSignModalVisible(false)} >
                        <Icons
                          name={'close'}
                          size={20}
                          color={'#4E5052'}
                        />
                      </TouchableOpacity>
                      <View style={[{ display: 'flex', flexDirection: 'row', width: "100%", margin: 10 }]}>
                      </View>
                      <View >
                      </View>
                      <View style={{ height: "auto", width: "auto" }}>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: 'space-between' }}>
                          <View style={{ marginHorizontal: 5, width: "50%" }}>
                            <Text style={[styles.headertext1]}>Signature</Text>
                          </View>
                        </View>

                        <Signature signmodal={signcall} orderdetails={orderdetails} callbackSign={callbackSign} signatureImage={orderdetails?.signatureImage} fetchdata={fetchdata} type={type} />
                      </View>
                    </>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    };

    const Remove = async (index) => {
      const updatedImages = [...selectedImages];
      const removedImage = updatedImages.splice(index, 1)[0];
      setSelectedImages(updatedImages);
      try {
        const storedImages = await AsyncStorage.getItem('selected');
        if (storedImages) {
          const parsedImages = JSON.parse(storedImages);
          const updatedStoredImages = parsedImages.filter(image => image !== removedImage);
          await AsyncStorage.setItem('selected', JSON.stringify(updatedStoredImages));
        }
      } catch (error) {
        console.log('Error removing image from AsyncStorage:', error);
      }
    };
    const Comments = () => {
      const orderID = orderdetails?.orderId
      const type = params.type
      const commnetsshow = comments
      const fetchdata = params.fetchdata
      navigation.navigate("Comments", { orderID, commnetsshow, fetchdata, statusType, orderNumber: orderNumber, isEnable: !!params?.swipescreenOrder?.startTime, type });
    }

    const ImageComponent = () => {
      return (
        <Profilelogo height={20} width={100} />
      )
    }

    const getimgBase64 = async (url) => {
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise(resolve => {
        xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            let result = reader?.result?.replace("data:application/octet-stream;base64,", "");
            let iosResult = reader?.result?.replace(/^data:image\/[a-z]+;base64,/, "");
            if (Platform.OS === "ios") {
              resolve(iosResult)
            }
            else {
              resolve(result)
            }
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();

      })
    }


    const update = async (imageBase64 = "", signBase64 = "", name = "") => {

      const orderDetails = orderdetails;

      let uploadedImages = {
        signImageBase64: !!signBase64 ? signBase64 : await getimgBase64(`${baseURL}${orderdetails?.signatureImage}`),
        productImageBase64: !!imageBase64 ? imageBase64 : await getimgBase64(`${baseURL}${orderdetails?.deliveryItemImage}`),
        receiverName: !!name ? name : orderdetails?.receiverName
      };


      const updateAll = {
        "orderId": orderDetails?.orderId,
        "tenantId": orderDetails?.tenantId,
        "customerId": orderDetails?.customerId,
        "orderValue": orderDetails?.orderValue,
        "shippingCost": orderDetails?.shippingCost,
        "deliveryDate": orderDetails?.deliveryDate,
        "deliveryInstruction": orderDetails?.deliveryInstruction,
        "pickupAddressId": orderDetails?.pickupAddressId,
        "pickupAddress": orderDetails?.pickupAddress,
        "pickupCountry": orderDetails?.pickupCountryId,
        "pickupState": orderDetails?.pickupStateId,
        "pickupCity": orderDetails?.pickupCityId,
        "pickupZip": orderDetails.pickupPin,
        "pickupPhone": orderDetails?.pickupPhoneNumber,
        "deliveryAddressId": orderDetails?.deliveryAddressid,
        "isManual": false,
        "deliveryAddress": orderDetails?.deliveryAddress,
        "deliveryCountry": orderDetails?.deliveryCountryId,
        "deliveryState": orderDetails?.deliveryStateId,
        "deliveryCity": orderDetails?.deliveryCityId,
        "deliveryZip": orderDetails.deliveryPin,
        "deliveryPhone": orderDetails.deliveryPhoneNumber,
        "customerOrderNumber": orderDetails?.customerOrderNumber,
        "customerNumber": null,
        "paymentStatus": orderDetails?.paymentStatus,
        "createdBy": orderDetails?.createdBy,
        "windowIn": orderDetails?.windowIn,
        "windowOut": orderDetails?.windowOut,
        "isForkLift": orderDetails?.isForkLift,
        "customerZone": orderDetails?.customerZone,
        "orderitems": updatequantity ?? [],
        "returnOrderitems": updateemptyquantity,
        "isActive": true,
        ...uploadedImages
      }

      dispatch(UpdateAll(updateAll));
    }
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{
          width: '100%',
          height: "100%",
          backgroundColor: '#e9e9e9',
          top: SCREEN_HEIGHT,
          borderRadius: 25
        }, rBottomSheetStyle]}>
          <Icon
            name={sheetValue ? 'chevron-down' : 'chevron-up'}
            size={20}
            color={primaryIconColor}
            style={[styles.chevron, { alignItems: "center", alignSelf: "center", color: primaryIconColor }]}
          />
          <View style={{ marginBottom: Platform.OS === 'ios' ? (headerHeight + (headerHeight * 2)) : (headerHeight + (headerHeight * 1.3)) }}>
            {children}
          </View>
          <View style={{ height: Platform.OS === 'ios' ? headerHeight * 1.9 : headerHeight * 1.5, backgroundColor: "white", position: 'absolute', bottom: 0, width: '100%', paddingVertical: 10, paddingHorizontal: 10 }}>
            {selectormyprofile === 2 || fetchdata === "completed" || type === "Cancelled" || type === "Delivered" || type !== "Pickup" && !!params?.swipescreenOrder?.startTime === false ?
              <View style={[styles.orderDetailFooterContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <View style={[styles.footerIcon, { alignContent: "center", alignItems: "center", gap: 25 }]}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                  >
                    <View
                      style={[
                        styles.orderDetailFooterIconView,
                        { backgroundColor: "lightgrey" },
                      ]}
                    >
                      <EvilIcons
                        name={"camera"}
                        size={35}
                        color={'#4E5052'}
                      />
                      {!!orderdetails?.deliveryItemImage || productbaseImage ?
                        <View style={styles.badge}>
                          <Entypo
                            name={"check"}
                            size={15}
                            color={"white"}
                          />
                        </View>
                        : null}
                    </View>
                  </TouchableOpacity>
                  <ImageModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    images={selectedImages}
                  />
                  <ImageModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    images={selectedImages}
                  />
                  <TouchableOpacity style={styles.orderDetailFooterContentButton}
                    onPress={() => setSignModalVisible(true)}

                  >

                    <View style={[styles.orderDetailFooterIconView, styles.footerCommon, { backgroundColor: "lightgrey" }]} >
                      <MaterialCommunityIcons
                        name={"signature-freehand"}
                        size={35}
                        color={'#4E5052'}
                      />
                      {!!orderdetails?.signatureImage || signaturebaseImage ?
                        <View style={styles.badge}>
                          <Entypo
                            name={"check"}
                            size={15}
                            color={"white"}
                          />
                        </View>
                        : null}
                    </View>

                  </TouchableOpacity>
                  <SignModal
                    visible={SignmodalVisible}
                    onClose={() => setSignModalVisible(false)}
                    images={signatureImage}
                  />
                  <TouchableOpacity style={styles.orderDetailFooterContentButton}
                    onPress={() => Comments()}
                  >
                    <View style={[styles.orderDetailFooterIconView, styles.footerCommon, { backgroundColor: "lightgrey" }]} >
                      <MaterialCommunityIcons
                        name={"comment-text"}
                        size={35}
                        color={primaryIconColor}
                      />
                      {!!comments?.data?.length ?
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>{comments?.data?.length}</Text>
                        </View> : null}

                    </View>
                  </TouchableOpacity>
                </View>
              </View> :
              <View>
                {type === "Pickup" ?

                  <View>
                    {(!!currentPickupData[0]?.loadIn && !!currentPickupData[0]?.loadOut) ? (
                      <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                        <Text style={{ fontSize: 16, color: primaryIconColor, fontFamily: "Avenir-Roman" }}>{"Status : All order items are picked up"}</Text>
                      </View>) :

                      <>
                        {(currentPickupData.length === 0) ?
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '3%' }}>
                            <SwipeButton
                              height={35}
                              width={'96%'}
                              title={'Swipe to start the pickup'}
                              swipeSuccessThreshold={50}
                              titleColor={primaryIconColor}
                              onSwipeSuccess={() => handleSwipeSuccess()}
                              railBackgroundColor='white'
                              thumbIconComponent={ImageComponent}
                              thumbIconBackgroundColor='#1bcfb4'
                              railBorderColor='#1bcfb4'
                              railStyles={{
                                backgroundColor: "#1bcfb4",
                                opacity: 0.5,
                                borderColor: '#1bcfb4',
                              }}
                            />
                          </View>
                          :
                          <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => goStart()} style={[styles.startDelivery1, { backgroundColor: 'white', display: 'flex', flexDirection: 'row', gap: 10, width: '10%', height: 40, width: 40, marginLeft: '45%', }]}>
                              <View><Text ><Stop
                                name={"stop-circle-outline"}
                                size={40}
                                color={'#fe7c96'}
                                style={[styles.iconstyle]}
                              /></Text></View>
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', color: "#4E5052", fontSize: 16, fontFamily: "Avenir-Roman", fontWeight: "600", bottom: 5 }}>{"Click once every order items are picked up"}</Text>
                          </View>
                        }
                      </>}
                  </View> :
                  <View style={[styles.orderDetailFooterContainer, { maxWidth: "100%" }]}>
                    <View style={[styles.footerIcon, { alignContent: "center", alignItems: "center", width: '65%' }]}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                      >
                        <View
                          style={[
                            styles.orderDetailFooterIconView,
                            { backgroundColor: "lightgrey" },
                          ]}
                        >
                          <EvilIcons
                            name={"camera"}
                            size={35}
                            color={'#4E5052'}
                          />
                          {!!orderdetails?.deliveryItemImage || productbaseImage ?
                            <View style={styles.badge}>
                              <Entypo
                                name={"check"}
                                size={15}
                                color={"white"}
                              />
                            </View>
                            : null}
                        </View>
                      </TouchableOpacity>
                      <ImageModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        images={selectedImages}
                      />

                      <TouchableOpacity style={styles.orderDetailFooterContentButton}
                        onPress={() => setSignModalVisible(true)}
                      >

                        <View style={[styles.orderDetailFooterIconView, styles.footerCommon, { backgroundColor: "lightgrey" }]} >
                          <MaterialCommunityIcons
                            name={"signature-freehand"}
                            size={35}
                            color={'#4E5052'}
                          />
                          {!!orderdetails?.signatureImage || signaturebaseImage ?
                            <View style={styles.badge}>
                              <Entypo
                                name={"check"}
                                size={15}
                                color={"white"}
                              />
                            </View>
                            : null}
                        </View>

                      </TouchableOpacity>
                      <SignModal
                        visible={SignmodalVisible}
                        onClose={() => setSignModalVisible(false)}
                        images={signatureImage}
                      />
                      <TouchableOpacity style={styles.orderDetailFooterContentButton}
                        onPress={() => Comments()}
                      >
                        <View style={[styles.orderDetailFooterIconView, styles.footerCommon, { backgroundColor: "lightgrey" }]} >
                          <MaterialCommunityIcons
                            name={"comment-text"}
                            size={35}
                            color={primaryIconColor}
                          />
                          {!!comments?.data?.length ?
                            <View style={styles.badge}>
                              <Text style={styles.badgeText}>{comments?.data?.length}</Text>
                            </View> : null}

                        </View>
                      </TouchableOpacity>
                    </View>
                    {selectormyprofile === 2 || fetchdata === "completed" || type === "Pickup" || type === "Delivered" || !!params?.swipescreenOrder?.startTime === false ? null :
                      <View style={{ width: '35%' }}>
                        <TouchableOpacity onPress={() => update()} style={[styles.updateButtons, { backgroundColor: "#1bcfb4" }]}>
                          <Feather
                            name={'checkcircleo'}
                            size={14}
                            color={'white'}
                            style={{ marginRight: 5 }}
                          />
                          <Text style={[styles.selectedText, { color: "white" }]}>{"Update"}</Text>
                        </TouchableOpacity>
                      </View>}
                  </View>}
              </View>
            }
          </View>
        </Animated.View>
      </GestureDetector>
    );
  }
);
export default BottomSheet;