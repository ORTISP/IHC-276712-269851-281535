import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainMenu from "../screens/MainMenu";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FormScreen from "../screens/FormScreen";
import FinishFormScreen from "../screens/FinishFormScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="FinishForm" component={FinishFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
