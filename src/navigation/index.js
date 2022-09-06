import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/userScreens/homeScreen';
import MedicinePanel from '../screens/userScreens/medicines/medicinePanel';
import Report from '../screens/userScreens/report';
import AddMedicine from '../screens/userScreens/medicines/addMedicine';
import MyCareTaker from '../screens/userScreens/myCareTaker';
import AddPatient from '../screens/userScreens/addPatient';
import OnboardingScreen from '../screens/onBoardingScreen';
import DrawerNavigator from './drawerNavigator';
import Medicine from '../screens/userScreens/medicines/medicine';
import ClickImage from '../components/atoms/clickImage';
import BottomNavigator from './bottomNavigator';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={OnboardingScreen} />
        <Stack.Screen name="Bottom" component={BottomNavigator} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MedicinePanel" component={MedicinePanel} />
        <Stack.Screen name="AddMedicine" component={AddMedicine} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="MyCareTaker" component={MyCareTaker} />
        <Stack.Screen name="AddPatient" component={AddPatient} />
        <Stack.Screen name="Medicine" component={Medicine} />
        <Stack.Screen name="ClickImage" component={ClickImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
