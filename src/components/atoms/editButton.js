import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons';

const EditButton = ({edit, setEdit}) => {
  return edit ? null : (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        onPress={() => setEdit(true)}
        activeOpacity={1}
        style={{padding: 2}}>
        <FontAwesomeIcon icon={faPenToSquare} color={'white'} size={19} />
      </TouchableOpacity>
    </View>
  );
};

export default EditButton;
