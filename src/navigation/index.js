import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/userScreens/homeScreen';
import MedicinePanel from '../screens/userScreens/medicines/medicinePanel';
import Report from '../screens/userScreens/report/report';
import AddMedicine from '../screens/userScreens/medicines/addMedicine';
import CareTaker from '../screens/userScreens/careTaker/careTaker';
import OnboardingScreen from '../screens/onBoardingScreen';
import BottomNavigator from './bottomNavigator';
import Patients from '../screens/userScreens/patients/patients';
import AccountTab from '../screens/userScreens/accountTab';
import SearchScreen from '../components/organisms/searchScreen';
import Settings from '../screens/otherScreens/settings';
import About from '../screens/otherScreens/aboutApp';
import SavedDetails from '../screens/profile/savedDetails';
import EditProfile from '../screens/profile/editProfile';
import SendSnap from '../components/atoms/sendSnap';
import AddRemainder from '../screens/userScreens/addRemainder';
import edit from '../components/organisms/alarm/edit';
import alarm from '../components/organisms/alarm/alarm';
import Prescriptions from '../screens/otherScreens/prescriptions';
import AppointmentReminders from '../screens/otherScreens/appointmentReminders';
import Notifications from '../screens/otherScreens/notifications';
import SendSnapToCaretaker from '../screens/otherScreens/sendSnapToCaretaker';
import AddPrescription from '../screens/userScreens/medicines/addPrescription';
import PatientProfile from '../screens/userScreens/patients/patientProfile';
import CareTakerProfile from '../screens/userScreens/careTaker/careTakerProfile';
import AuthScreen from '../screens/authScreens/authScreen';
import Logout from '../Logout';
import DoctorPrescription from '../screens/otherScreens/doctorPrescription';
import AppointmentReminderList from '../screens/otherScreens/appointmentReminderList';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={OnboardingScreen} />
        <Stack.Screen name="Bottom" component={BottomNavigator} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MedicinePanel" component={MedicinePanel} />
        <Stack.Screen name="AddMedicine" component={AddMedicine} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Prescription" component={AddPrescription} />
        <Stack.Screen name="Account" component={AccountTab} />
        <Stack.Screen name="CareTaker" component={CareTaker} />
        <Stack.Screen name="Patients" component={Patients} />
        <Stack.Screen name="SendSnap" component={SendSnap} />
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
        <Stack.Screen
          name="edit"
          component={edit}
          options={{...headerStyles, title: 'Alarm'}}
        />
        <Stack.Screen
          name="SendSnapToCaretaker"
          component={SendSnapToCaretaker}
        />
        <Stack.Screen name="PatientProfile" component={PatientProfile} />
        <Stack.Screen name="CareTakerProfile" component={CareTakerProfile} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="ViewPrescription" component={DoctorPrescription} />
        <Stack.Screen name="AppointmentReminderList" component={AppointmentReminderList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const headerStyles = {
  headerStyle: {
    elevation: 0,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default MainNavigation;
