import {View, Text} from 'react-native';
import React from 'react';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';

const PrescriptionBox = ({doctorName,locations,contact,specialization,prescriptionUrl}) => {
  return (
    <View style={Styles.prescriptionBox}>
      <Text style={Styles.prescriptionText}>Doctor's Name: {doctorName}</Text>
      <Text style={Styles.prescriptionText1}>Location: {locations}</Text>
      <Text style={Styles.prescriptionText1}>Contact: {contact}</Text>
      <Text style={Styles.prescriptionText1}>Specialization: {specialization}</Text>
    </View>
  );
};

export default PrescriptionBox;
