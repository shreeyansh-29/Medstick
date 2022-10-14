import {Text} from 'react-native';
import React from 'react';
import ProgressCircle from 'react-native-progress-circle';

const ProgressReport = ({styles, radius, borderWidth, percent}) => {
  return (
    <ProgressCircle
      percent={percent}
      radius={radius}
      borderWidth={borderWidth}
      color={styles.color}
      shadowColor={styles.shadowColor}
      outerCircleStyle={styles.outerCircle}
      bgColor={styles.bgColor}>
      <Text style={styles.percentage}>{percent + '0%'}</Text>
    </ProgressCircle>
  );
};

export default ProgressReport;
