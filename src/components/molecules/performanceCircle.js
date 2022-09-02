import {View, Text} from 'react-native';
import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import {styles} from '../../styles/homeScreenStyles/performanceCircleStyles';
import {colorPalette} from '../atoms/colorPalette';

const PerformanceCircle = () => {
  return (
    <View style={styles.performanceContainer}>
      <ProgressCircle
        percent={30}
        radius={52}
        borderWidth={8}
        color={colorPalette.hightlightedColor}
        outerCircleStyle={styles.outerCircle}
        shadowColor={colorPalette.shadowColor}
        bgColor={colorPalette.barColor}>
        <Text style={styles.percentage}>{'30%'}</Text>
      </ProgressCircle>
      <Text style={styles.performance}>{"Today's Performance"}</Text>
    </View>
  );
};

export default PerformanceCircle;
