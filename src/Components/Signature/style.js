// import { StyleSheet } from "react-native";
// import { commonStyle, primaryColor } from '../../Common/Styles/index'
// export const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // alignItems: "center",
//     // justifyContent: "center",
//     // padding: 10,
//     // backgroundColor: "white",
//     height: "80%",
//   },
//   row: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     width: "100%",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   signlogo: {
//     marginBottom: 20,
//     width: "100%",
//     height: 250,
//   },
//   deliveryText: {
//     fontSize: 14,
//     color: "grey",
//     padding: 5,
//     ...commonStyle.AvanirBlack,
//     fontWeight: "600",
// },
// decline: {
//   backgroundColor: "#fe7c96", width: "35%", borderRadius: 5
// },
//   delivery: {
//     height: 45,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 5,
//     display: "flex",
//     flexDirection: "row",
//     backgroundColor: "#57ba4a", 
//     width: "35%", 

// },
//   deliverybtns: {
//     flexDirection: "row", justifyContent: "space-between", marginTop: 5, alignItems: "center", marginLeft: 20
// },
//   headertext1: {
//     fontFamily: "Avenir-Black",
//     fontSize: 20,
//     color: "#4E5052",
//     height: 30,
//     paddingHorizontal: 15,
//     marginVertical: 4
// },
//   button: {
//     backgroundColor: "#C276FF",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "white",
//   },
// });

import { StyleSheet } from "react-native";
import { commonStyle, primaryColor } from '../../Common/Styles/index'
export const styles = StyleSheet.create({
  container: {
    height: "77%",
    padding: "1%",
    backgroundColor: "white",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
    marginVertical:"3%",

  },
  clearrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
   

  },
  signlogo: {
    marginBottom: 20,
    width: "100%",
    height: 250,
  },
  deliveryText: {
    fontSize: 14,
    color: "grey",
    padding: 5,
    ...commonStyle.AvanirBlack,
    fontWeight: "600",
  },
  decline: {
    backgroundColor: "#fe7c96", width: "35%", borderRadius: 5
  },
  delivery: {
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#57ba4a",
    width: "35%",
  }, deliverybtns: {
    flexDirection: "row", justifyContent: "space-between", marginTop: 5, alignItems: "center", marginLeft: 20
  },
  headertext1: {
    fontFamily: "Avenir-Black",
    fontSize: 20,
    color: "#4E5052",
    height: 30,
    paddingHorizontal: 15,
    marginVertical: 4
  },
  button: {
    backgroundColor: "#C276FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  nameBox: {
    borderWidth: 1,
    width: Platform.OS === 'ios' ? '86%' : '78%',
    marginLeft: '4%',
    borderRadius: 5,
    paddingLeft: 8,
    display: 'flex',
    maxHeight: "70%",
    minHeight: Platform.OS === 'ios' ? '8%' : 0,
    color: 'black',
    marginTop: 8
},
nameError: {
  color: 'red',
  fontFamily: 'Avenir-Book',
  marginBottom: 2,
  paddingLeft: 5,
},
});
