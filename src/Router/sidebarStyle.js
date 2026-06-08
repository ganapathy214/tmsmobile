import { Platform, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  line: {
    borderBottomColor: '#4E5052', 
    borderBottomWidth: 0.5,
    overflow: 'hidden',
    marginBottom: '5%',
    width: '90%',
    marginHorizontal: 15
  },
  line1: {
    marginTop: '60%',
    borderBottomColor: '#4E5052', 
    borderTopWidth: 0.5,
    overflow: 'hidden',
  },
  img1: {
    width: 150,
    height: 140,
    borderRadius: 50,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },

  card: {
    overflow: "hidden",
    width: 140,
    height: 140,
    borderRadius: 90,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: Platform.OS === 'ios' ? "lightgrey" : "white",
    marginTop: '5%'
  },
  center: {
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    marginHorizontal: "auto",
  },
  labelStyle: {
    fontFamily: "Avenir-Roman",
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    textDecorationLine: "underline",
  },
});
