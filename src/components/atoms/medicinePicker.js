import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'
import { loadGetUserMedicine } from '../../redux/action/userMedicine/getUserMedicineAction'
import { styles } from '../../styles/reportScreenStyles/reportScreenStyles'

const MedicinePicker = () => {
    const [medicineName,setMedicineName]=useState('')
    const dispatch=useDispatch()
    const getUserMedicine=useSelector(state=>state.getUserMedicineReducer?.data?.result)
    console.log(getUserMedicine,"medicine")
   const getmedicine=()=>{
    dispatch(loadGetUserMedicine())
   }
   useEffect(()=>{
    getmedicine()
   },[])

  return (
    <View style={styles.picker}>
        <Picker
        id='picker1'
        selectedValue={medicineName}
        onValueChange={(data)=>setMedicineName(data)}
        >
        {getUserMedicine?.map((item,index)=>{
            return(
                <Picker.Item
                    label={item.medicineName}
                    key={index}
                />
            )
        })}
        </Picker>
    </View>
    
  )
}

export default MedicinePicker