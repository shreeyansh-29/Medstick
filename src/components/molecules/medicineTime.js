import { View, Text } from 'react-native'
import React from 'react'
import TimeText from '../atoms/Text'
import TakenText from '../atoms/takenText'

const MedicineTime = () => {
  return (
    <View >
      <TimeText/>
      <TakenText/>
    </View>
  )
}

export default MedicineTime