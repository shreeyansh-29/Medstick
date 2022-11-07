import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons';

const EditButton = ({download}) => {
  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity onPress={download} activeOpacity={1}>
        <FontAwesomeIcon icon={faPenToSquare} color={'white'} size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default EditButton;
