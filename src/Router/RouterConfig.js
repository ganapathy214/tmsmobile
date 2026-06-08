import React from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import Login from '../Components/Login/index';
import ForgotPassword from '../Components/ForgotPassword/index';
import Drawer, { HomeComponents } from "./Drawer";
import InputOtpScreen from "../Components/InputOtpScreen/index";
import { Comment } from "../Components/Comments/Comments";
import DrawerNavigation from "./Drawer";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackComp = () => {
  const isLogged = useSelector(state => state.session.isLogged);
  return (
    <AuthStack.Navigator backBehavior="history" screenOptions={{ headerShown: false }}>
      {isLogged ? (
        <>
          {/* <AuthStack.Screen name="Comments" component={Comment} /> */}
          <AuthStack.Screen name="drawer" component={DrawerNavigation} />
        </>
      ) : (
        <>
          <AuthStack.Screen name="login" component={Login} />
          <AuthStack.Screen name="forgotpassword" component={ForgotPassword} />
          <AuthStack.Screen name="InputOtpScreen" component={InputOtpScreen} />
        </>
      )}
    </AuthStack.Navigator>
  );
};

const RouterConfig = () => {
  return (
    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, backgroundColor: "red" } }}>
      <Stack.Navigator backBehavior="history" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={AuthStackComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { RouterConfig };