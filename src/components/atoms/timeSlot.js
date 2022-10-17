import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/reportScreenStyles/reportScreenStyles'

const TimeSlot = ({time}) => {
  return (
    <View style={styles.timeSlot}>
     <Text style={styles.timeSlotText}>{time}</Text>
    </View>
  )
}

export default TimeSlot