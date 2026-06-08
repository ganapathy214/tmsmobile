import { StyleSheet, Dimensions, } from 'react-native';

import { getDynamicHeig, screenWidth, screenfontSize } from '../../Common/Utils/index';

export const styles = StyleSheet.create({
  textBold: {
    marginTop: 50,
    fontSize: screenfontSize(0.05),
    fontFamily: 'Avenir-Roman',
    fontWeight: "400",
    textAlign: "center",
    color: "black"
  },
  fieldWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
    width: screenWidth * 0.8
  },
  loginbutton: {
    width: "50%",
    height: 46,
    borderRadius: 25,
    backgroundColor: "#77e0b5",
    justifyContent: 'center',
    display: "flex",
    alignItems: 'center'
  },
  logintext: {
    fontFamily: 'Avenir',
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  rowise: {
    marginTop: 15,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  forgotpass: {
    fontFamily: 'Avenir-Roman',
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    textDecorationLine: "underline"
  },
});