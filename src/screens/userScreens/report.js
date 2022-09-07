import {View, Text} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import {styles} from '../../styles/reportScreenStyles/reportScreenStyles';
import CalenderIcon from '../../components/molecules/calenderIcon';
import ProgressReport from '../../components/atoms/progressCircle';

const Report = ({navigation}) => {
  return (
    <View style={styles.report}>
      <MainHeader title={'REPORTS'} navigation={navigation} />
      <CalenderIcon navigation={navigation} />
      <View style={styles.reportContainer}>
        <View style={styles.analytics}>
          <ProgressReport styles={styles} />
          <Text style={styles.font}>Overall Performance</Text>
        </View>
      </View>
      <View style={{flex: 0.5, backgroundColor: 'white'}}></View>
    </View>
  );
};

export default Report;
