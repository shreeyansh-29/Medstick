import {View} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/organisms/performanceCircle';
import Reminders from './reminders';
import {colorPalette} from '../../components/atoms/colorPalette';
import {styles} from '../../styles/homeScreenStyles/performanceCircleStyles';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colorPalette.basicColor}}>
      <MainHeader navigation={navigation} title={'MEDSTICK'} />
      <Calender />
      <PerformanceCircle styles={styles} />
      <Reminders />
    </View>
  );
};

export default HomeScreen;
