import React from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
// import store from './src/redux/store';

const App = () => {
  return (
    // <Provider store={store}>
    <>
      <StatusBar backgroundColor="#3743ab" />
      <MainNavigation />
    </>

    // </Provider>
  );
};

export default App;
