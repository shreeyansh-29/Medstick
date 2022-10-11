import {View, Text} from 'react-native';
import React from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';

const Notifications = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SubHeader title={'Notifications'} navigation={navigation} />
    </View>
  );
};

export default Notifications;
