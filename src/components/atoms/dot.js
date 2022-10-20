import React from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import { colorPalette } from './colorPalette'


const Dot = () => {
  return (
    <Icon name={'dot'} size={40} color={colorPalette.appColor}/>
  )
}

export default Dot