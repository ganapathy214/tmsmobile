import React from 'react';
import { TouchableOpacity, Text, Image, Modal, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './style'
import * as componStyle from '../../Common/Styles/index';
import { commonStyle, primaryColor, secondaryColor, primaryIconColor } from "../../Common/Styles/index"
import { useSelector } from 'react-redux';

const CommonButton = ({ color, onPress, title, name }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.uploadButton, { backgroundColor: color }]}>
            <View style={[styles.buttonRow, , title === "Reset" ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }]}>
                <Text style={styles.uploadButtonText}>{title}</Text>
                <AntDesign name={name} size={18} color="white" />
            </View>
        </TouchableOpacity>
    );
};

const RemoveButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.removeButton} onPress={onPress}>
            <AntDesign name="close" size={18} color="#4E5052" />
        </TouchableOpacity>
    );
};

const ModalButton = ({ onPress, iconName, iconColor, buttonText }) => {
    return (
        <TouchableOpacity style={styles.modalContentText} onPress={onPress}>
            <AntDesign name={iconName} size={30} color={iconColor} />
            <Text style={styles.modalText}>{buttonText}</Text>
        </TouchableOpacity>
    );
};


const AddImageButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <AntDesign
                name="plus"
                size={35}
                color="black"
            />
        </TouchableOpacity>
    );
}

const CustomModal = ({ handleChooseImage, handleTakePhoto, uploadParams, type }) => {
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const customParams = uploadParams
    return (
        <View>
            {selectormyprofile === 2 || customParams === 'completed' || type === 'Cancelled' || type === 'Delivered' || type === 'Cancelled' && orderdetails?.deliveryItemImage === null || type === 'Delivered' && orderdetails?.deliveryItemImage === null ? null :
                <View style={styles.modalContent}>
                    <ModalButton
                        onPress={handleChooseImage}
                        iconName="totop"
                        iconColor="#4E5052"
                        buttonText="Gallery"
                    />
                    <ModalButton
                        onPress={handleTakePhoto}
                        iconName="camerao"
                        iconColor="#4E5052"
                        buttonText="Camera"
                    />
                </View>}
        </View>
    );
};


export { CommonButton, RemoveButton, CustomModal, AddImageButton };