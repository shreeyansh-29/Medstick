import { View, Text } from 'react-native'
import React from 'react'
import Dot from '../atoms/dot'
import Line from '../atoms/line'
import TimeSlot from '../atoms/timeSlot'

const ProgressBar = () => {
  return (
   <View style={{alignItems:'center',}}>
   
   <Dot/>
    <Line/>
   </View>
  )
}

export default ProgressBar