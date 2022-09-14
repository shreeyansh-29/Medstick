import {View} from 'react-native';
import React from 'react';
import SubHeader from '../molecules/headers/subHeader';

const SendSnap = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SubHeader title={'Send Snap'} navigation={navigation} />
    </View>
  );
};

export default SendSnap;
