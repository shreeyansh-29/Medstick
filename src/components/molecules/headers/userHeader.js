import {View} from 'react-native';
import React from 'react';
import Title from '../../atoms/title';
import {styles} from '../../../assests/styles/headerStyles';

const userHeader = ({title}) => {
  return (
    <View style={styles.header}>
      <Title title={title} />
    </View>
  );
};

export default userHeader;
