import {View} from 'react-native';
import React from 'react';
import UserHeader from '../../components/molecules/headers/userHeader';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import BarIcon from '../../components/atoms/barIcon';

const UserProfile = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerItem}>
        <BarIcon navigation={navigation} />
        <UserHeader title={'PROFILE'} />
      </View>
    </View>
  );
};

export default UserProfile;
