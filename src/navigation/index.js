import React, {useState, useEffect} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/otherScreens/splashScreen';
import BottomNavigator from './bottomNavigator';
import AuthScreen from '../screens/authScreens/authScreen';
import AccountStack from './stacks/AccountStack';
import AddMedicineStack from './stacks/AddMedicineStack';
import MedicinePanelStack from './stacks/MedicinePanelStack';
import HomeStack from './stacks/HomeStack';
import Logout from '../screens/otherScreens/Logout';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {saveInternetConnectivityStatus} from '../redux/action/loginAction/saveInternetConnectivity';
import {saveUserLoggedIn} from '../redux/action/loginAction/saveUserLoggedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddMedicine, getMedicine, savePrescription} from '../utils/storage';
import {syncDataRequest} from '../redux/action/userMedicine/syncDataAction';
import {
  clearMedicineList,
  loadMedicineList,
} from '../redux/action/userMedicine/medicineListAction';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const load = useSelector(state => state.userInfo?.data);
  const syncStatus = useSelector(state => state.syncData?.data);
  const userMedicine = useSelector(state => state.medicineList?.data);

  useEffect(() => {
    if (userMedicine !== null && userMedicine.length !== 0) {
      let updatedList = [];
      let prescriptionList = [];
      getMedicine().then(data => {
        if (data === null) {
          userMedicine.map(item => {
            if (item.prescriptionId !== null) {
              let obj = {
                doctorName: item.doctorName,
                prescriptionId: item.prescriptionId,
                contact: item.contact,
                prescriptionUrl: item.prescriptionUrl,
                location: item.location,
                specialization: item.specialization,
              };
              prescriptionList.some(
                ele => ele.prescriptionId === obj.prescriptionId,
              )
                ? null
                : prescriptionList.push(obj);
            }
            item.historyList = [];
            item.doctorAppointmentList = [];
            isSynced = true;
            updatedList.push(item);
          });
          AddMedicine(updatedList);
          savePrescription(prescriptionList);
        }
      });
    }
    dispatch(clearMedicineList());
  }, [userMedicine]);

  useEffect(() => {
    if (syncStatus?.status === 'Success') {
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          let updatedList = data;
          updatedList.map((item, index) => {
            item.isSynced = true;
          });
          AddMedicine(updatedList);
        }
      });
    }
    return () => {};
  }, [syncStatus]);

  useEffect(() => {
    if (connected && load) {
      syncMedicine();
      (async () => {
        dispatch(loadMedicineList(await AsyncStorage.getItem('user_id')));
      })();
    }
    return () => {};
  }, [connected, load]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);

  useEffect(() => {
    let intenetInfo;
    if (!intenetInfo) {
      intenetInfo = NetInfo.addEventListener(state => {
        dispatch(
          saveInternetConnectivityStatus(
            state.isConnected && state.isInternetReachable,
          ),
        );
      });
    }
    return () => {
      intenetInfo && intenetInfo();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user_id');
      if (user !== null) dispatch(saveUserLoggedIn(true));
    })();
  }, []);

  const syncMedicine = () => {
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        let updatedList = data;
        let syncArray = [];
        updatedList.map(item => {
          if (item.isSynced === false) {
            let obj = {
              userMedicineId: item.userMedicineId,
              medicineId: item.medicineId,
              medicineName: item.medicineName,
              description: item.description,
              present: item.present,
              dosageType: item.dosageType,
              dosageQuantity: item.dosageQuantity,
              dosagePower: item.dosagePower,
              stock: item.stock,
              leftStock: item.leftStock,
              reminderId: item.reminderId,
              startDate: item.startDate,
              endDate: item.endDate,
              days: item.days,
              reminderTitle: item.reminderTitle,
              reminderTime: item.reminderTime,
              everyday: item.everyday,
              noEndDate: item.noEndDate,
              reminderStatus: item.reminderStatus,
              frequency: item.frequency,
              beforeAfter: item.beforeAfter,
              totalReminders: item.totalReminders,
              currentCount: item.currentCount,
              prescriptionId: item.prescriptionId,
              doctorName: item.doctorName,
              specialization: item.specialization,
              contact: item.contact,
              location: item.location,
              prescriptionUrl: item.prescriptionUrl,
              doctorAppointmentList: item.appointmentList,
              flag: item.flag,
            };
            syncArray.push(obj);
          }
        });
        syncArray?.length !== 0 ? dispatch(syncDataRequest(syncArray)) : null;
      }
    });
  };

  return (
    <>
      {showSplashScreen ? <SplashScreen /> : null}

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, orientation: 'portrait'}}
          initialRouteName="Bottom">
          <Stack.Screen name="Bottom" component={BottomNavigator} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="AddMedicineStack" component={AddMedicineStack} />
          <Stack.Screen
            name="MedicinePanelStack"
            component={MedicinePanelStack}
          />
          <Stack.Screen name="AccountStack" component={AccountStack} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="Logout" component={Logout} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
