import {View, Text, Alert} from 'react-native';
import React from 'react';

const CustomAlert = ({text1, text2, action1, action2, onPress1, onPress2}) => {
  return Alert.alert(text1, text2, [
    {
      text: action1,
      onPress: onPress1,
    },
    {
      text: action2,
      onPress: onPress2,
    },
  ]);
};

export default CustomAlert;
