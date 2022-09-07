import {Text} from 'react-native';
import React from 'react';
import ProgressCircle from 'react-native-progress-circle';

const ProgressReport = ({styles}) => {
  return (
    <ProgressCircle
      percent={30}
      radius={52}
      borderWidth={8}
      color={styles.color}
      shadowColor={styles.shadowColor}
      outerCircleStyle={styles.outerCircle}
      bgColor={styles.bgColor}>
      <Text style={styles.percentage}>{'30%'}</Text>
    </ProgressCircle>
  );
};

export default ProgressReport;
