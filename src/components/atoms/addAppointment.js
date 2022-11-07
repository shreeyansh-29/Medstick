import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AddAppointment = ({navigation, routeName}) => {
  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(routeName);
        }}>
        <EvilIcons name="plus" color={"white"} size={34} />
      </TouchableOpacity>
    </View>
  );
};

export default AddAppointment;
