import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddMedicine from '../screens/userScreens/addMedicine';
import AddPatient from '../screens/userScreens/addPatient';
import HomeScreen from '../screens/userScreens/homeScreen';
import Report from '../screens/userScreens/report';
import Profile from '../screens/profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import '../../ignoreWarnings';
import {
  faBriefcaseMedical,
  faFileContract,
  faFileSignature,
  faHouseMedical,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor="#4B68EB" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {height: 55},
          tabBarInactiveTintColor: '#555',
          tabBarInactiveBackgroundColor: 'white',
          tabBarActiveBackgroundColor: '#e3f2fd',
        })}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => (
              (color = focused ? '#667EEA' : 'grey'),
              (
                <FontAwesomeIcon
                  icon={faHouseMedical}
                  size={25}
                  color={color}
                />
              )
            ),
          }}
          key={1}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => (
              (color = focused ? '#667EEA' : 'grey'),
              (
                <FontAwesomeIcon
                  icon={faFileContract}
                  color={color}
                  size={25}
                />
              )
            ),
          }}
          key={2}
          name="Report"
          component={Report}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => (
              (color = focused ? '#667EEA' : 'grey'),
              (
                <FontAwesomeIcon
                  icon={faBriefcaseMedical}
                  size={25}
                  color="grey"
                />
              )
            ),
          }}
          key={3}
          name="Add Medicine"
          component={AddMedicine}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => (
              (color = focused ? '#667EEA' : 'grey'),
              (<FontAwesome name="user-circle-o" size={25} />)
            ),
          }}
          key={4}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
