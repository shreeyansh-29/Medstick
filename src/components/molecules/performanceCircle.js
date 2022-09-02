import {View, Text} from 'react-native';
import React from 'react';
import ProgressCircle from 'react-native-progress-circle';

const PerformanceCircle = () => {
  return (
    <View
      style={{alignItems: 'center', paddingBottom:12}}>
      <ProgressCircle
        percent={30}
        radius={52}
        borderWidth={8}
        color="#0EA5E9"
        outerCircleStyle={{top: 16}}
        shadowColor="#BFB8B8"
        bgColor="#fff">
        <Text style={{fontSize: 18, color: '#0EA5E9'}}>{'30%'}</Text>
      </ProgressCircle>
      <Text
        style={{color: 'black', marginTop: 20, marginBottom: 8, fontSize: 24,paddingTop: 10}}>
        {"Today's Performance"}
      </Text>
    </View>
  );
};

export default PerformanceCircle;
