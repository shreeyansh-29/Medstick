import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/index';
import {StatusBar, LogBox} from 'react-native';
import {colorPallete} from './src/components/atoms/colorPalette';
import store from './src/redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';
import {StoreProviderService} from './src/utils/storeProviderService';
import SplashScreen from './src/screens/otherScreens/splashScreen';
import IntroScreen from './src/screens/otherScreens/introScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

StoreProviderService.init(store);
const reduxStore = StoreProviderService.getStore();

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showNextTimeIntro, setShowNextTimeIntro] = useState(false);

  useEffect(() => {
    (async () => {
      setShowNextTimeIntro(await AsyncStorage.getItem('intro'));
    })();

    setTimeout(() => {
      setShowSplashScreen(false);
      setShowIntro(true);
    }, 2000);
  }, [showSplashScreen]);

  return (
    <>
      {showSplashScreen ? <SplashScreen /> : null}

      {showIntro && !showNextTimeIntro ? (
        <IntroScreen setShowIntro={setShowIntro} showIntro={showIntro} />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <ErrorBoundary>
            <Provider store={reduxStore}>
              <StatusBar backgroundColor={colorPallete.mainColor} />
              <MainNavigation />
            </Provider>
          </ErrorBoundary>
        </SafeAreaView>
      )}
    </>
  );
};

export default App;
