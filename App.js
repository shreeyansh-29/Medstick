import React from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/index';
import {StatusBar} from 'react-native';
import {colorPalette} from './src/components/atoms/colorPalette';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colorPalette.mainColor} />
      <MainNavigation />
    </Provider>
  );
};

export default App;
