import React from 'react';
import BottomNavigator from './bottomNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/userScreens/homeScreen';
import {colorPalette} from '../components/atoms/colorPalette';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colorPalette.colorTabs,
        },
      }}>
      <Drawer.Screen name="MEDSTICK" component={BottomNavigator} />
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
