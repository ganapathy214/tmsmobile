import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 20,
    elevation: 8,
    width: "90%",
    marginBottom: "10%",
    borderWidth: 2,
    borderColor: "#4E5052",
    borderWidth: 2,
    padding: "3%",
  },
  imagehead: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "2%",
  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  horizontalLineGray: {
    marginVertical: "2%",
    height: 2,
    borderRadius: 3,
    backgroundColor: "#F5F5F5",
  },
  Cardtemplate: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: "2%",
  },
  CardData: {
    flex: 1,
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    
  },
  Flatcontainer: {
    marginTop: 20,
  },
  Flatlabel: {
    flex: 0.5,
    fontSize: 16,
    // color: "black",
    fontWeight: "800",
    color: "#4E5052",
    marginBottom: 5,
    fontFamily:"Avenir-Roman"
  },
  Flatvalue: {
    flex: 2,
    fontSize: 16,
    color: "#4E5052",
    fontFamily:"Avenir-Roman"
  },
  viewStyle: {
    marginTop: "15%",
  },
  close: {
    marginLeft: "52%",
    position: "absolute",
    top: "75%",
    left: "5%",
    width: 25,
    height: 25,
    color: "black",
  },
});
