import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/userScreens/homeScreen';
import MedicinePanel from '../screens/userScreens/medicines/medicinePanel';
import Report from '../screens/userScreens/report';
import AddMedicine from '../screens/userScreens/medicines/addMedicine';
import CareTaker from '../screens/userScreens/careTaker/careTaker';
import OnboardingScreen from '../screens/onBoardingScreen';
import BottomNavigator from './bottomNavigator';
import CalenderScreen from '../screens/calenderScreen';
import Patients from '../screens/userScreens/patients/patients';
import AccountTab from '../screens/userScreens/accountTab';
import LoginScreen from '../screens/authScreens/loginScreen';
import SearchScreen from '../components/organisms/searchScreen';
import Settings from '../screens/userScreens/settings';
import About from '../screens/userScreens/aboutApp';
import UserProfile from '../screens/profile/editProfile';
import SavedDetails from '../screens/profile/savedDetails';
import EditProfile from '../screens/profile/editProfile';
import SendSnap from '../components/atoms/sendSnap';
import Prescriptions from '../screens/userScreens/prescriptions';
import AppointmentReminders from '../screens/userScreens/appointmentReminders';
import Notifications from '../screens/userScreens/notifications';
import AddRemainder from '../screens/userScreens/addRemainder';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={OnboardingScreen} />
        <Stack.Screen name="Bottom" component={BottomNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MedicinePanel" component={MedicinePanel} />
        <Stack.Screen name="AddMedicine" component={AddMedicine} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Account" component={AccountTab} />
        <Stack.Screen name="CareTaker" component={CareTaker} />
        <Stack.Screen name="Patients" component={Patients} />
        <Stack.Screen name="SendSnap" component={SendSnap} />
        <Stack.Screen name="Calender" component={CalenderScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="SavedDetails" component={SavedDetails} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Prescriptions" component={Prescriptions} />
        <Stack.Screen name="AddRemainder" component={AddRemainder} />
        <Stack.Screen
          name="AppointmentReminders"
          component={AppointmentReminders}
        />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

