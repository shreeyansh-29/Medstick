import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorPalette} from './colorPalette';
const BellIcon = () => {
  return (
    <View>
      <MaterialCommunityIcons
        name="bell-circle"
        color={colorPalette.appColor}
        size={35}
      />
    </View>
  );
};

export default BellIcon;
