import {View} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/organisms/performanceCircle';
import Reminders from './reminders';
import {Styles} from '../../styles/homeScreenStyles/performanceCircleStyles';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import { getReminder } from '../../utils/storage';

const HomeScreen = ({navigation}) => {
  const [reminders, setReminders] = useState('')

  useEffect(()=>{
    getReminder().then(data=>setReminders(data))
  },[])
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
          <PerformanceCircle
            styles={Styles}
            radius={42}
            borderWidth={6}
            percent={30}
            text="Today's Performance"
          />
        </View>
        <Reminders />
        {/* </ScrollView>
        </View> */}
      </View>
    </>
  );
};

export default HomeScreen;
