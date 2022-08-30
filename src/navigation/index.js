import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/userScreens/homeScreen';
import MedicinePanel from '../screens/userScreens/medicines/medicinePanel';
const stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="homeScreen">
        <stack.Screen name="homeScreen" component={HomeScreen} />
        <stack.Screen name="medicinePanel" component={MedicinePanel} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
