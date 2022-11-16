import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MedicineList from '../../screens/userScreens/medicines/medicineList';
import ReminderDuration from '../../screens/userScreens/reminder/reminderDuration';
import Reminder from '../../screens/userScreens/reminder/reminder';

const Stack = createNativeStackNavigator();

const MedicinePanelStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation:'portrait'}}
      initialRouteName={'MedicineList'}>
      <Stack.Screen name="MedicineList" component={MedicineList} />
      <Stack.Screen name="Reminder" component={Reminder} />
      <Stack.Screen name="ReminderDuration" component={ReminderDuration} />
    </Stack.Navigator>
  );
};

export default MedicinePanelStack;
