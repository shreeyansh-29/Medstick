import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../../styles/atoms/dividerStyles';

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
    </View>
  );
};

export default Divider;
