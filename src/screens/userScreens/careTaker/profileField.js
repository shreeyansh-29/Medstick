import {View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {styles} from '../../../styles/careTakerStyles/careTakerProfileStyles';

const ProfileField = ({icon, value}) => {
  return (
    <View style={styles.sdSubContainer}>
      <View style={styles.icon}>
        <FontAwesomeIcon icon={icon} size={24} color={colorPalette.mainColor} />
      </View>
      <View style={styles.sdText}>
        <Text style={styles.sdText1}>{value}</Text>
      </View>
    </View>
  );
};

export default ProfileField;
