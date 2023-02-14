import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './screens/CustomDrawer';
import Splash from './screens/Splash';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Test" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
