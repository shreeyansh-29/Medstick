import {Text, View} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/organisms/performanceCircle';
import Reminders from './homeReminders';
import {Styles} from '../../styles/homeScreenStyles/performanceCircleStyles';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import AnimatedProgressCircle from '../../components/atoms/AnimatedProgressCircle';
import {verticalScale} from '../../components/atoms/constant';
import {colorPalette} from '../../components/atoms/colorPalette';

const HomeScreen = ({navigation}) => {
  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <MainHeader title={'Medstick'} navigation={navigation} />
        {/* <View style={{flex: 1, width: '100%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
            }}> */}
        <View style={styles.card}>
          <Calender />
          <View
            style={styles.progressCircleContainer}>
            <AnimatedProgressCircle
              radius={55}
              percentage={75}
              strokeWidth={10}
            />
            <Text style={styles.progressText}>Today's Overall Performance</Text>
          </View>
        </View>
        <Reminders />
        {/* </ScrollView>
        </View> */}
      </View>
    </>
  );
};

export default HomeScreen;
