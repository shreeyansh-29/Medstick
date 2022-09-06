import {View} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../components/atoms/appIcon';

const UserProfile = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <MainHeader title={'PROFILE'} navigation={navigation} />
    </View>
  );
};

export default UserProfile;
