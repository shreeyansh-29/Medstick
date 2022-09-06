import {View} from 'react-native';
import React from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../../components/atoms/appIcon';

const Medicine = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <MainHeader title={'MEDICINE'} navigation={navigation} />
    </View>
  );
};

export default Medicine;
