import { View, Text } from 'react-native'
import React from 'react'
import Foundation from 'react-native-vector-icons/Foundation';
import { colorPalette } from './colorPalette';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';

const UploadPrescriptionText = () => {
  return (
    <View style={{flexDirection:'row'}}>
    <View style={{padding:20}}>
<Foundation name='clipboard-notes' size={30} color={colorPalette.appColor} padding={20}/>
</View>
      <Text style={Styles.uploadPrescriptionText}>Please add Image and Information of Prescription</Text>
    </View>
  )
}

export default UploadPrescriptionText