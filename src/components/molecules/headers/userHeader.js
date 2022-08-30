import {View} from 'react-native';
import React from 'react';
import Title from '../../atoms/title';
import { styles } from '../../../assests/styles/headerStyle';
import Icon from 'react-native-vector-icons/Ionicons'
const UserHeader = ({title}) => {
  return (
    <View style={styles.container}>
<Icon size={32} color='#000' name='grid-outline'/> 
      <Title title={title} />
    </View>
  );
};



export default UserHeader;

