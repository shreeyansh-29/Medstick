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
import AddRemainder from '../screens/userScreens/medicines/addRemainder';
import Edit from '../components/organisms/alarm/edit';
import Alarm from '../components/organisms/alarm/alarm';
import Prescriptions from '../screens/otherScreens/prescriptions';
import SendSnapToCaretaker from '../screens/otherScreens/sendSnapToCaretaker';
import AddPrescription from '../screens/userScreens/medicines/addPrescription';
import PatientProfile from '../screens/userScreens/patients/patientProfile';
import CareTakerProfile from '../screens/userScreens/careTaker/careTakerProfile';
import AuthScreen from '../screens/authScreens/authScreen';
import AddPrescriptionPanel from '../screens/userScreens/medicines/addPrescriptionPanel';
import Logout from '../Logout';
import DoctorPrescription from '../screens/otherScreens/doctorPrescription';
import AppointmentReminderList from '../screens/otherScreens/appointmentReminderList';
import MedicineList from '../screens/userScreens/medicines/medicineList';
import MedicineDetailCard from '../screens/userScreens/medicines/medicineDetailCard';
import ViewPrescriptions from '../screens/userScreens/patients/viewPrescriptions';
import ViewMedicines from '../screens/userScreens/patients/viewMedicines';
import MedicineReport from '../screens/userScreens/patients/medicineReport';
import MedicineImages from '../screens/userScreens/patients/medicineImages';
import NotificationScreen from '../screens/userScreens/notificationScreen';
import Reminder from '../screens/userScreens/reminder/reminder';
import ReminderDuration from '../screens/userScreens/reminder/reminderDuration';
import AppointmentReminders from '../screens/otherScreens/appointmentReminders';

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
        <Stack.Screen name="MedicineList" component={MedicineList} />
        <Stack.Screen
          name="SendSnapToCaretaker"
          component={SendSnapToCaretaker}
        />
        <Stack.Screen name="PatientProfile" component={PatientProfile} />
        <Stack.Screen name="CareTakerProfile" component={CareTakerProfile} />
        <Stack.Screen
          name="addPrescriptionPanel"
          component={AddPrescriptionPanel}
        />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="ViewPrescription" component={DoctorPrescription} />
        <Stack.Screen
          name="PatientPrescriptions"
          component={ViewPrescriptions}
        />
        <Stack.Screen name="PatientMedicines" component={ViewMedicines} />
        <Stack.Screen name="MedicineReport" component={MedicineReport} />
        <Stack.Screen name="MedicineImages" component={MedicineImages} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="AddReminder" component={AddRemainder} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="ReminderDuration" component={ReminderDuration} />
        <Stack.Screen
          name="AppointmentReminders"
          component={AppointmentReminders}
        />
        <Stack.Screen
          name="AppointmentReminderList"
          component={AppointmentReminderList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
