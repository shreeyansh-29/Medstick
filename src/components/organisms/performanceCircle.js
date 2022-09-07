import {View, Text} from 'react-native';
import React from 'react';
import ProgressReport from '../atoms/progressCircle';

const PerformanceCircle = ({styles}) => {
  return (
    <View style={styles.performanceContainer}>
      <ProgressReport styles={styles} />
      <Text style={styles.performance}>{"Today's Performance"}</Text>
    </View>
  );
};

export default PerformanceCircle;
