import {View, Text} from 'react-native';
import React from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPalette} from '../../components/atoms/colorPalette';

const AppointmentReminders = ({navigation}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: colorPalette.mainColor,
          height: '50%',
          width: '200%',
          // borderRadius: 180,
          borderBottomEndRadius: 530,
          borderBottomStartRadius: 590,
          top: -120,
          right: -120,
        }}
      />
      <View>
        <SubHeader title={'Appointment Reminders'} navigation={navigation} />
        <Text>appointmentReminders</Text>
      </View>
    </>
  );
};

export default AppointmentReminders;
