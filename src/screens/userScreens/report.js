import {View, Text} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../components/atoms/appIcon';

const Report = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <MainHeader title={'REPORTS'} navigation={navigation} />
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
