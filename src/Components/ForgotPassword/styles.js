// import { StyleSheet } from 'react-native';

// import { getDynamicHeight } from '../../Common/Utils/index';


// export const styles = StyleSheet.create({
//   linearGradient: {
//     flex: 1,
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderRadius: 5
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   img: {
//     width: 10,
//     height: 10,
//     padding: 10,
//   },
//   img1: {
//     width: 150,
//     height: 140,
//     borderRadius: 50,
//     alignItems: 'center',
//     alignContent: 'center',
//     alignSelf: 'center'
//   },
//   container: {
//     flex: 1,
//     alignContent:'center',
//     alignItems:'center',
//     alignSelf:'center',
//     backgroundColor:"black"
//   },
//   forgotpass: {
//     fontFamily: 'Avenir-Medium',
//     fontSize: 14,
//     fontWeight: "500",
//     color: "black"
//   },
//   image: {
//     width: 800,
//     height: getDynamicHeight(720),
//   },

//   fieldWrapper: {
//     paddingHorizontal: 10
//   },

//   alignCenter: {
//     display: 'flex', alignContent: 'center', alignItems: 'center',
//     marginVertical: 15, marginBottom: 25
//   },

//   loginbutton: {
//     paddingVertical: 10,
//     width: "50%",
//     height: 46,
//     borderRadius: 25,
//     backgroundColor: "#77e0b5",
//     justifyContent: 'center',
//     display: "flex",
//     alignItems: 'center'
//   },
//   leanearButton: {
//     paddingVertical: 10,
//     width: "100%",
//     height: 46,
//     borderRadius: 25,
//     backgroundColor: "#77e0b5",
//     justifyContent: 'center',
//     display: "flex",
//     alignItems: 'center'
//   },
//   logintext: {
//     fontFamily: 'Avenir',
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "700",
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center'
//   },
//   otp: {
//     fontFamily: 'Avenir-Medium',
//     fontSize: 14,
//     fontWeight: "500",
//     textDecorationLine: 'underline',
//     color: "black",
//     lineHeight: 16
//   },
//   rowise: {
//     marginTop: 15,
//     display: 'flex',
//     alignContent: 'center',
//     alignItems: 'center'
//   },
//   midcontent: {
//     position: "relative",
//     marginTop: 20,
//     width: '90%',
//     height: getDynamicHeight(420),
//     borderRadius: 10,
//     justifyContent:"center",
//     shadowOpacity: 0.5,
//     shadowColor: 'gray',
//     padding: 10,
//   },
//   textBold: {
//     fontFamily: 'Avenir-Roman',
//     fontSize: 20,
//     fontWeight: "400",
//     color: "black"
//   },
//   topContainer: {
//     width: '100%',
//     height:"100%",
//     alignItems: "center"
//   },
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1
//   },
// goBack:{
//   fontFamily: 'Avenir-Roman',
//   fontSize: 16,
//   fontWeight: "600",
//   color: "black",
//   textDecorationLine:"underline"
// }
// });


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
    width: screenWidth * 0.5,
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
    alignItems: 'center'
  },
  forgotpass: {
    fontFamily: 'Avenir-Roman',
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    textDecorationLine: "underline"
  },
  goBack:{
    fontFamily: 'Avenir-Roman',
    fontSize: 16,
    fontWeight: "600",
    color: "black"
  }
});