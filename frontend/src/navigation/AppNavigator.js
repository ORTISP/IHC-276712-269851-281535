import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainMenu from "../screens/MainMenu";
import LoginScreen from "../screens/login/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import FormScreen from "../screens/form/FormScreen";
import FinishFormScreen from "../screens/form/FinishFormScreen";
import MenusScreen from "../screens/menus/Menus";
import CreateMenuScreen from "../screens/menus/CreateMenu";
import ViewMenuScreen from "../screens/menus/ViewMenu";

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
        <Stack.Screen name="Menus" component={MenusScreen} />
        <Stack.Screen name="CreateMenu" component={CreateMenuScreen} />
        <Stack.Screen name="ViewMenu" component={ViewMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
