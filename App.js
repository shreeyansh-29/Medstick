import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// import MainNavigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
// import FlashMessage from 'react-native-flash-message';
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {/* <MainNavigation /> */}
        {/* <FlashMessage position="center" animated={true} hideStatusBar={true} /> */}
      </SafeAreaView>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});
export default App;
