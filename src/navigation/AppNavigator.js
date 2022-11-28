import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onBoardingScreen';
import BottomTabs from './BottomTabs';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <>
      {showSplashScreen ? <OnboardingScreen /> : null}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
        }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
