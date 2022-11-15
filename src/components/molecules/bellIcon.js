import {View, Animated, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';

const BellIcon = ({navigation}) => {
  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        onPress={() =>
          navigation?.navigate('HomeStack', {screen: 'Notification'})
        }>
        <FontAwesomeIcon icon={faBell} color={'white'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default BellIcon;
