import {Text} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';

const SubTitle = ({title}) => {
  return <Text style={styles.subHeaderFont}>{title}</Text>;
};

export default SubTitle;
