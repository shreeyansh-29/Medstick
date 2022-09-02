import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCameraAlt, faCameraRetro} from '@fortawesome/free-solid-svg-icons';
import Feather from 'react-native-vector-icons/Feather';
import {colorPalette} from '../atoms/colorPalette';
import {styles} from '../../styles/homeScreenStyles/headerStyles';

const CameraIcon = ({navigation, title}) => {
  if (title === 'MEDSTICK') {
    return (
      <View style={styles.cameraIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ClickImage');
          }}>
          <Feather name="camera" size={32} color={colorPalette.barColor} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return <View style={{flex: 0.5}}></View>;
  }
};

export default CameraIcon;
