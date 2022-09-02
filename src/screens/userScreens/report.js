import {View, Text} from 'react-native';
import React from 'react';
import UserHeader from '../../components/molecules/headers/userHeader';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import BarIcon from '../../components/atoms/barIcon';
import CameraIcon from '../../components/molecules/cameraIcon';

const Report = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerItem}>
        <BarIcon navigation={navigation} style={{marginLeft: 20}} />
        <UserHeader title={'REPORTS'} />
        <CameraIcon />
      </View>
      <View style={{height: 110, backgroundColor: 'BFB8B8'}}>
        <Text style={{color: 'red'}}>{'Reports'}</Text>
        <Text style={{color: 'red'}}>{'Reports'}</Text>
        <Text style={{color: 'red'}}>{'Reports'}</Text>
        <Text style={{color: 'red'}}>{'Reports'}</Text>
      </View>
    </View>
  );
};

export default Report;
