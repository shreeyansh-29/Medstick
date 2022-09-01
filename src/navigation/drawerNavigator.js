import React from 'react';
import BottomNavigator from './bottomNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667EEA',
        },
      }}>
      <Drawer.Screen name="MEDSTICK" children={BottomNavigator}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
