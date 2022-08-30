import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from '../../../assests/styles/headerStyle'
import Title from '../../atoms/title'


const MedicineHeader = ({title}) => {
  return (
    <View style={styles.container}>
    <Icon size={32} name='grid-outline' color='#000' /> 
          <Title title={title} />
        </View>
  )
}

export default MedicineHeader