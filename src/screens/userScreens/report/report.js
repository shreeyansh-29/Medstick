import {View, Text} from 'react-native';
import React from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import {styles} from '../../../styles/reportScreenStyles/reportScreenStyles';
import CalenderIcon from '../../../components/molecules/calenderIcon';
import ProgressReport from '../../../components/atoms/progressCircle';
import {colorPalette} from '../../../components/atoms/colorPalette';

const Report = ({navigation}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: colorPalette.mainColor,
          height: '50%',
          width: '200%',
          // borderRadius: 180,
          borderBottomEndRadius: 530,
          borderBottomStartRadius: 590,
          top: -150,
          right: -120,
        }}
      />
      <View style={styles.report}>
        <MainHeader title={'Reports'} navigation={navigation} />
        <CalenderIcon navigation={navigation} />
        <View style={styles.reportContainer}>
          <View style={styles.analytics}>
            <ProgressReport styles={styles} />
            <Text style={styles.font}>Overall Performance</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Report;
