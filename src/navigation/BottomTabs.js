import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import ReportStack from './stacks/ReportStack';
import AddMedicineStack from './stacks/AddMedicineStack';
import MedicinePanelStack from './stacks/MedicinePanelStack';
import AccountStack from './stacks/AccountStack';
import {colorPallete} from '../components/atoms/colorPalette';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const getHideScreen = route => {
    let currentRoute = getFocusedRouteNameFromRoute(route);
    if (currentRoute === 'AddMedicineLocal') {
      return true;
    } else if (currentRoute === 'MedicinePanel') {
      return true;
    } else if (currentRoute === 'AccountScreen') {
      return false;
    } else if (currentRoute === 'Home') {
      return false;
    }
    return true;
  };
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      lazy={false}
      screenOptions={{
        title: '',
        tabBarStyle: {
          height: 58,
          backgroundColor: colorPallete.basicColor,
          paddingHorizontal: 16,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        lazy: true,
      }}
      backBehavior={'none'}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={({route}) => ({
          tabBarVisible: getHideScreen(route),
        })}
      />
      <Tab.Screen component={ReportStack} name="Report" />
      <Tab.Screen
        component={AddMedicineStack}
        name="Add"
        options={({route}) => ({
          tabBarVisible: getHideScreen(route),
        })}
      />
      <Tab.Screen
        component={MedicinePanelStack}
        name="Medicine"
        options={({route}) => ({
          tabBarVisible: getHideScreen(route),
        })}
      />
      <Tab.Screen
        component={AccountStack}
        name="Account"
        options={({route}) => ({
          tabBarVisible: true,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
