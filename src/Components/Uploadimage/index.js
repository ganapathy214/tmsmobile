import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    PermissionsAndroid,
    TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { CommonButton, RemoveButton, CustomModal } from './utils';
import { styles } from './style';
import * as componStyle from '../../Common/Styles/index';
import { AddImageButton } from './utils';
import { useSelector } from 'react-redux';
import { baseURL, getDynamicHeight } from '../../Common/Utils';
import { updateOrderDetails } from '../../services/Manifestsession/ManifestAction';
import reactotron from 'reactotron-react-native';
import { useDispatch } from 'react-redux';

export default function UploadImage({ mainModal, deliveryItemImage, callbackImage, fetchdata, orderdetails, type, updatefn }) {
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const uploadParams = fetchdata
    const [selectedImage, setSelectedImage] = useState(!!orderdetails?.deliveryItemImage ? `https://www.att-fleet.com/api/${orderdetails?.deliveryItemImage}` : null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const dispatch = useDispatch()

    useEffect(async () => {
        if (!!orderdetails?.deliveryItemImage) {
            setSelectedImage({ path: `${baseURL}${orderdetails?.deliveryItemImage}?time=${new Date()}` })
        } else {
            setSelectedImage(null);
        }
    }, [orderdetails?.deliveryItemImage])

    const handleChooseImage = () => {
        setModalVisible(false);
        ImagePicker.openPicker({
            multiple: false, // Set to false to select only one image
            mediaType: 'photo',
            cropping: true,
            includeBase64: true
        })
            .then((image) => {
                setSelectedImage(image);
            })
            .catch((error) => {
                console.log('Error selecting image:', error);
            });
    };

    const handleTakePhoto = async () => {
        setModalVisible(false);
        if (Platform.OS === 'ios') {
            const { status } = await ImagePicker.requestCameraPermission();
            if (status === 'granted') {
                ImagePicker.openCamera({
                    cropping: true,
                    width: 500,
                    height: 500,
                    includeExif: true,
                    mediaType: 'photo',
                    includeBase64: true
                })
                    .then((image) => {
                        setSelectedImage(image);
                    })
                    .catch((e) => console.error(e));
            }
        } else {

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs access to your camera so you can upload pictures.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    ImagePicker.openCamera({
                        cropping: true,
                        width: 500,
                        height: 500,
                        includeExif: true,
                        mediaType: 'photo',
                        includeBase64: true
                    })
                        .then((image) => {
                            setSelectedImage(image);
                        })
                        .catch((e) => console.error(e));
                } else {

                }
            } catch (err) {
                console.warn(err);
            }
        }

    };

    const handleRemoveImage = () => {
        dispatch(updateOrderDetails({ data: [{ ...orderdetails, deliveryItemImage: "" }] }))
        setSelectedImage(null);
    };

    const handleUploadImage = async () => {
        const checkImage = Object.keys(selectedImage);
        if (checkImage[0] === "path") {
            Toast.show('Please Update the Image');

        } else {
            setErrorMessages('');
            mainModal(false)
            dispatch(updateOrderDetails({ data: [{ ...orderdetails, deliveryItemImage: selectedImage?.data }] }))
            callbackImage(selectedImage)
        }

    };
    const resetImage = () => {
        dispatch(updateOrderDetails({ data: [{ ...orderdetails, deliveryItemImage: "" }] }))
        setSelectedImage(null)
    }


    return (
        <>
            <View style={styles.container}>
                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    {!selectedImage && selectedImage === null ? (
                        <View style={{ width: "100%", alignItems: "center" }}>
                            {fetchdata === 'completed' || type === 'Cancelled' || selectormyprofile === 2 && orderdetails?.deliveryItemImage === null || type === 'Cancelled' && orderdetails?.deliveryItemImage === null || type === 'Delivered' && orderdetails?.deliveryItemImage === null ?
                                orderdetails?.deliveryItemImage === null ? <Text style={{ marginVertical: '40%', color: 'black', fontFamily: "Avanir-Roman", fontSize: 12 }}>{'There are no Images uploaded'}</Text> :
                                    <Image
                                        source={{
                                            uri: 'https://www.hertrack.com/wp-content/uploads/2018/10/no-image.jpg',
                                        }}
                                        style={styles.image}
                                        resizeMode="contain"
                                    />
                                :
                                <View style={{ ...styles.noImagesContainer }}>
                                    <Image
                                        source={{
                                            uri: 'https://www.hertrack.com/wp-content/uploads/2018/10/no-image.jpg',
                                        }}
                                        style={styles.image}
                                        resizeMode="contain"
                                    />
                                </View>}
                            <CustomModal
                                handleChooseImage={handleChooseImage}
                                handleTakePhoto={handleTakePhoto}
                                uploadParams={uploadParams}
                                type={type}
                            />
                        </View>
                    ) : (
                        <>
                            <View style={[styles.noImagesContainer]}>
                                {orderdetails?.deliveryItemImage !== null ? <Image
                                    source={{ uri: orderdetails?.deliveryItemImage?.length > 200 ? `data:image/png;base64,${orderdetails?.deliveryItemImage}` : selectedImage?.path?.replace("\\", "/") }}
                                    style={styles.image}
                                /> : <Image
                                    source={{ uri: selectedImage.path }}
                                    style={styles.image}
                                />}
                                {selectormyprofile === 2 || uploadParams === 'completed' || type === "Cancelled" || type === "Delivered" || orderdetails?.deliveryItemImage === null ? null : <RemoveButton onPress={handleRemoveImage} />}
                            </View>
                            <View>
                                {selectormyprofile === 2 || uploadParams === 'completed' || type === "Cancelled" || type === "Delivered" ? null :
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginTop: 20, width: getDynamicHeight(140) }}>
                                        <TouchableOpacity
                                            onPress={() => resetImage()}
                                            style={[
                                                styles.delivery,
                                                styles.decline,
                                                { backgroundColor: 'white', borderColor: '#1bcfb4', borderWidth: 1, width: '48%' },
                                            ]}
                                        >
                                            <AntDesign name="reload1" size={14} color="#1bcfb4" style={{ marginRight: 5 }} />
                                            <Text style={[styles.deliveryText, { color: '#4E5052' }]}>Reset</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={handleUploadImage}
                                            style={[styles.delivery, styles.decline, { backgroundColor: '#1bcfb4', width: '48%' }]}
                                        >
                                            <AntDesign name="upload" size={14} color={'white'} style={{ marginRight: 5 }} />
                                            <Text style={[styles.deliveryText, { color: 'white' }]}>Upload</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </>
                    )}
                </View>
            </View>
        </>
    );
}