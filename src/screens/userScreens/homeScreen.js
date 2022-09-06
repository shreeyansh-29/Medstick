import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/molecules/performanceCircle';
import Reminders from './reminders';
import CameraIcon from '../../components/molecules/cameraIcon';
import {colorPalette} from '../../components/atoms/colorPalette';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colorPalette.basicColor}}>
      <MainHeader navigation={navigation} title={'MEDSTICK'} />
      <Calender />
      <PerformanceCircle />
      <Reminders />
    </View>
  );
};

export default HomeScreen;
