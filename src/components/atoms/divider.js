import {View} from 'react-native';
import React from 'react';

const Divider = ({contStyle, lineStyle}) => {
  return (
    <View style={contStyle}>
      <View style={lineStyle} />
    </View>
  );
};

export default Divider;
