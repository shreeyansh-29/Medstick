import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colorPalette} from './colorPalette';

const TouchableButton = ({title}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        padding: 12,
        backgroundColor: colorPalette.mainColor,
        width: '40%',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 18,
          color: colorPalette.basicColor,
        }}>{`${title}`}</Text>
    </TouchableOpacity>
  );
};
export default TouchableButton;
