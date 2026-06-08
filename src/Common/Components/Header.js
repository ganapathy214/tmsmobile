
import { View, TouchableOpacity, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
//fixed the header ui issue
const Header = (props) => {
  return (
    <View style={{ marginRight: 20, paddingRight: 8 }}>
      <TouchableOpacity
        onPress={() => { props.icon === "menu" ? props?.navigation.toggleDrawer() : props?.navigation.goBack() }
        }
      >
        <Icon
          name={props.icon}
          style={{ marginTop: 3, marginLeft: Platform.OS === 'ios' ? 10 : 0}}
          size={25}
          color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default Header