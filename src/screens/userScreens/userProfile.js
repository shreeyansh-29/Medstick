import {View} from 'react-native';
import React from 'react';
import UserHeader from '../../components/molecules/headers/userHeader';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import BarIcon from '../../components/atoms/barIcon';
import CameraIcon from '../../components/molecules/cameraIcon';

const UserProfile = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerItem}>
        <BarIcon navigation={navigation} />
        <UserHeader title={'PROFILE'} />
        <CameraIcon />
      </View>
    </View>
  );
};

export default UserProfile;
