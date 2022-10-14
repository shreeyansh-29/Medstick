import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { colorPalette } from './colorPalette'

const CrossButton = () => {
  return (
   <Icon name={'close-circle-sharp'} size={40} color={colorPalette.redColor}/>
  )
}

export default CrossButton