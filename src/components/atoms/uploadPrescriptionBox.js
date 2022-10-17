import { Text,  TouchableOpacity, } from 'react-native'
import React from 'react'
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles'

const UploadPrescriptionBox = ({navigation}) => {
  return (
    <TouchableOpacity style={Styles.uploadPrescriptionBox} onPress={()=>{navigation.navigate('Prescription')}}>
      <Text style={Styles.uploadPrescriptionText}>Upload New Prescription</Text>
    </TouchableOpacity>
  )
}

export default UploadPrescriptionBox