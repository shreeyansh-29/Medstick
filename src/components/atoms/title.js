import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../../assests/styles/headerFont';

const Title = ({title}) => {
  return (
    <View>
      <Text style={styles.headerFont}>{title}</Text>
    </View>
  );
};

export default Title;
