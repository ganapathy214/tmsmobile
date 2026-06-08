import { StyleSheet, Dimensions } from 'react-native';

import { getDynamicHeight, screenWidth, height } from '../../Utils';
import { primaryColor } from '../../Styles';


export const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: "white",
        flex: 1
    },
    img1container: {
        alignItems: 'center',
        backgroundColor: primaryColor,
        borderBottomLeftRadius: getDynamicHeight(110),
        borderBottomRightRadius: getDynamicHeight(110),
        overflow: 'hidden'
    },
    img1: {
        width: screenWidth * 0.7,
        height: height * 0.3,
        resizeMode: 'cover',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})