import {View, Text} from 'react-native';
import React from 'react';
import UserHeader from '../../components/molecules/headers/userHeader';
import Calender from '../../components/organisms/calender';

const HomeScreen = () => {
  return (
    <View>
      <UserHeader title={'MEDSTICK'} />
      <Calender />
    </View>
  );
};

export default HomeScreen;
