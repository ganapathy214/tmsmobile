import React from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import deliveryTruck from "../../../../assets/Images/delivery-truck.png";
import { styles } from './styles';

const BGview = ({ children }) => {
    return (
        <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
            <View style={styles.img1container} >
                <Image style={styles.img1} source={deliveryTruck} />
            </View>
            <View style={styles.container}>
                {children}
            </View>
        </KeyboardAvoidingView>
    );
};

export default BGview;