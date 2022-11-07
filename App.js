import React from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/index';
import {StatusBar} from 'react-native';
import {colorPalette} from './src/components/atoms/colorPalette';
import store from './src/redux/store';
import './ignoreWarnings';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';

const App = () => {
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
