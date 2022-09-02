import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import UserHeader from '../../components/molecules/headers/userHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/molecules/performanceCircle';
import Reminders from './reminders';
import CameraIcon from '../../components/molecules/cameraIcon';
import BarIcon from '../../components/atoms/barIcon';
import {styles} from '../../styles/homeScreenStyles/headerStyles';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerItem}>
        <BarIcon navigation={navigation} />
        <UserHeader title={'MEDSTICK'} />
      </View>
      <Calender />
      <PerformanceCircle />
      <Reminders />
    </View>
  );
};

export default HomeScreen;
