import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/index';
import {StatusBar} from 'react-native';
import {colorPallete} from './src/components/atoms/colorPalette';
import store from './src/redux/store';
import './ignoreWarnings';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';
import OfflineBar from './src/components/atoms/offlineBar';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ErrorBoundary>
        <Provider store={store}>
          {/* <OfflineBar /> */}
          <StatusBar backgroundColor={colorPallete.mainColor} />
          <MainNavigation />
        </Provider>
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default App;
