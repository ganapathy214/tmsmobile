
  import { StyleSheet, Dimensions, Platform } from 'react-native';
import { commonStyle, primaryColor, primaryIconColor } from '../../Common/Styles/index'
const { height } = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;
const screenHeight = height;

export const emptystyles = StyleSheet.create({
 
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width:"60%"
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        color: 'black'
      },
      selectedTextStyle: {
        fontSize: 16,
        color: 'black'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },

})
