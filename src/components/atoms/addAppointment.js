import {View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AddAppointment = ({navigation, routeName, notes}) => {
  const showAlert = () => {
    Alert.alert('Add Medicine and Precription First', '', [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (notes !== null && notes.length !== 0) {
            navigation.navigate(routeName, {notes: notes});
          } else {
            showAlert();
          }
        }}>
        <EvilIcons name="plus" color={'white'} size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default AddAppointment;
