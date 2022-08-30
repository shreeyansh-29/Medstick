import {View, StatusBar} from 'react-native';
import React from 'react';
import UserHeader from '../components/molecules/headers/userHeader';
import Calender from '../components/organisms/calender';

const homeScreen = () => {
  return (
    <View>
      <UserHeader title={'MEDSTICK'} />
      <Calender />
      <StatusBar backgroundColor="#4B68EB" />
    </View>
  );
};

export default homeScreen;
