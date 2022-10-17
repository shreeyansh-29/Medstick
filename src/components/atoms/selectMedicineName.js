import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';

const SelectMedicineName = medicineName => {
  return (
    <View style={Styles.medicineNameBox}>
      {Object.values(medicineName)[0] === '' ? (
        <Text style={Styles.text}>Select the Medicine....</Text>
      ) : (
        <Text>{Object.values(medicineName)[0]}</Text>
      )}
    </View>
  );
};

export default SelectMedicineName;
