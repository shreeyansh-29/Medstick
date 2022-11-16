import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AddAppointment = ({navigation, routeName, notes}) => {
  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(routeName, {notes: notes});
        }}>
        <EvilIcons name="plus" color={'white'} size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default AddAppointment;
