import React from 'react';
import 'react-native-gesture-handler';
import {isReadyRef, navigationRef} from '@navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export const RootNavigator = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <AppNavigator />
    </NavigationContainer>
  );
};
