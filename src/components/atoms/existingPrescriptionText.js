import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles'

const ExistingPrescriptionText = () => {
  return (
    <View>
      <Text style={Styles.prescriptionText}>Prescription attached by you </Text>
    </View>
  )
}

export default ExistingPrescriptionText