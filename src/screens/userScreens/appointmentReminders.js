import {View, Text} from 'react-native';
import React from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';

const AppointmentReminders = ({navigation}) => {
  return (
    <View>
      <SubHeader title={'Appointment Reminders'} navigation={navigation} />
      <Text>appointmentReminders</Text>
    </View>
  );
};

export default AppointmentReminders;
