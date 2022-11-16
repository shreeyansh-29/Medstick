import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onBoardingScreen';
import BottomNavigator from './bottomNavigator';
import AuthScreen from '../screens/authScreens/authScreen';
import AccountStack from './stacks/AccountStack';
import AddMedicineStack from './stacks/AddMedicineStack';
import MedicinePanelStack from './stacks/MedicinePanelStack';
import HomeStack from './stacks/HomeStack';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, orientation:'portrait'}}
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={OnboardingScreen} />
        <Stack.Screen name="Bottom" component={BottomNavigator} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="AddMedicineStack" component={AddMedicineStack} />
        <Stack.Screen
          name="MedicinePanelStack"
          component={MedicinePanelStack}
        />
        <Stack.Screen name="AccountStack" component={AccountStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
