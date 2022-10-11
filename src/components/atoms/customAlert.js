import {View, Text, Alert} from 'react-native';
import React from 'react';

const CustomAlert = ({text1, text2, action1, action2, onPress}) => {
  return Alert.alert({text1}, {text2}, [
    {
      text: {action1},
      onPress: onPress,
    },
    {
      text: {action2},
    },
  ]);
};

export default CustomAlert;
