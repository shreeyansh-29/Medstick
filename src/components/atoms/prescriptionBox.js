import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles'

const PrescriptionBox = ({doctorName,locations,contact,specialization}) => {
  return (
    <View style={Styles.prescriptionBox}>
      <Text style={Styles.prescriptionText}>{doctorName}</Text>
      <Text style={Styles.prescriptionText1}>{locations}</Text>
      <Text style={Styles.prescriptionText1}>{contact}</Text>
      <Text style={Styles.prescriptionText1}>{specialization}</Text>
    </View>
  )
}

export default PrescriptionBox