import {View, Text} from 'react-native';
import React from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';

const Prescriptions = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SubHeader title={'Prescriptions'} navigation={navigation} />
      <Text>prescription</Text>
    </View>
  );
};

export default Prescriptions;
