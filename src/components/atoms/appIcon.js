import {View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import {colorPalette} from './colorPalette';

const AppIcon = () => {
  return (
    <View style={styles.appIcon}>
      <FontAwesomeIcon
        icon={faCircleUser}
        size={36}
        color={colorPalette.basicColor}
      />
    </View>
  );
};

export default AppIcon;
