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

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

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
      const [visible, setVisible] = useState(false);
      const user = await AsyncStorage.getItem('user_id');
      if (user !== null) dispatch(saveUserLoggedIn(true));
    })();
  }, []);

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
