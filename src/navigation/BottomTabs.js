import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator;

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 58,
          backgroundColor: colorPalette.basicColor,
          paddingHorizontal: 16,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        lazy: true,
      }}
      backBehavior={'none'}>
      <Tab.Screen component={HomeStack} options={()=>({
        tabBarIcon:({focused}) => {
            return <></>
        }
      })}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabs;
