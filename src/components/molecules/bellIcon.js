import {View, Animated, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';

const BellIcon = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notifications');
        }}>
        <FontAwesomeIcon icon={faBell} color={'white'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default BellIcon;
