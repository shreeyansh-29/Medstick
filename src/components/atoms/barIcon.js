import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import {colorPalette} from './colorPalette';

const BarIcon = ({navigation}) => {
  return (
    <View style={styles.barIcon}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <FontAwesomeIcon
          icon={faBars}
          size={24}
          color={colorPalette.barColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BarIcon;
