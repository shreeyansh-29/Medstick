import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/userScreens/homeScreen';
import NotificationScreen from '../../screens/userScreens/notificationScreen';
import SendSnapToCaretaker from '../../screens/otherScreens/sendSnapToCaretaker';
import SendSnap from '../../components/atoms/sendSnap';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, orientation:'portrait'}}>
      <Stack.Screen
        name="SendSnapToCaretaker"
        component={SendSnapToCaretaker}
      />
      {/* <Stack.Screen name="SendSnap" component={SendSnap} /> */}
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
