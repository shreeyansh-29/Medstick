import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../../assests/styles/headerStyles';

const Title = ({title}) => {
  return (
    <View>
      <Text style={styles.headerFont}>{title}</Text>
    </View>
  );
};

export default Title;
