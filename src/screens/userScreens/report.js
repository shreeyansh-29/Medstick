import {View} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import {reportStyles} from '../../styles/reportScreenStyles/reportScreenStyles';
import CalenderIcon from '../../components/molecules/calenderIcon';

const Report = ({navigation}) => {
  return (
    <View style={reportStyles.report}>
      <MainHeader title={'REPORTS'} navigation={navigation} />
      <CalenderIcon navigation={navigation} />
    </View>
  );
};

export default Report;
