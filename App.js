import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/index';
import {Alert, BackHandler, StatusBar} from 'react-native';
import {colorPalette} from './src/components/atoms/colorPalette';
import store from './src/redux/store';
import './ignoreWarnings';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';

const App = () => {
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold On!', 'Are you sure you want to exit?', [
  //       {text: 'Cancel', onPress: () => {}, style: 'cancel'},
  //       {text: 'Yes', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );
  //   return () => backHandler.remove();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ErrorBoundary>
        <Provider store={store}>
          <StatusBar backgroundColor={colorPalette.mainColor} />
          <MainNavigation />
        </Provider>
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default App;
