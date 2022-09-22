import {View} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/organisms/performanceCircle';
import Reminders from './reminders';
import {Styles} from '../../styles/homeScreenStyles/performanceCircleStyles';

import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';

const HomeScreen = ({navigation}) => {
  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <MainHeader title={'Medstick'} />
        {/* <View style={{flex: 1, width: '100%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
            }}> */}
        <View style={styles.card}>
          <Calender />
          <PerformanceCircle styles={Styles} />
        </View>
        <Reminders />
        {/* </ScrollView>
        </View> */}
      </View>
    </>
  );
};

export default HomeScreen;
