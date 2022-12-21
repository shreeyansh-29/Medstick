import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onBoardingScreen';
import BottomNavigator from './bottomNavigator';
import AuthScreen from '../screens/authScreens/authScreen';
import AccountStack from './stacks/AccountStack';
import AddMedicineStack from './stacks/AddMedicineStack';
import MedicinePanelStack from './stacks/MedicinePanelStack';
import HomeStack from './stacks/HomeStack';
import Logout from '../screens/otherScreens/Logout';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {saveInternetConnectivityStatus} from '../redux/action/loginAction/saveInternetConnectivity';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {saveUserLoggedIn} from '../redux/action/loginAction/saveUserLoggedIn';

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
    checkNetworkHandler();
  }, []);

  const checkNetworkHandler = () => {
    let intenetInfo;
    if (!intenetInfo) {
      intenetInfo = NetInfo.addEventListener(state => {
        dispatch(saveInternetConnectivityStatus(state.isConnected));
      });
    }
    return () => {
      intenetInfo && intenetInfo();
    };
  };

  const getUserLoggedIn = async () => {
    const user = await GoogleSignin.getCurrentUser();
    if (user !== null) dispatch(saveUserLoggedIn(true));
  };

  useEffect(() => {
    getUserLoggedIn();
  }, []);

  return (
    <>
      {showSplashScreen ? <OnboardingScreen /> : null}

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
