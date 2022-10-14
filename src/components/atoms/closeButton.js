import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import AntIcon from "react-native-vector-icons/AntDesign";
import { colorPalette } from './colorPalette';
import { useDispatch, useSelector } from 'react-redux';
import { loadDeleteNotification } from '../../redux/action/notification/deleteNotificationAction';

const CloseButton = ({ notificationId, navigation }) => {
  const dispatch = useDispatch()
  const deleteNotificationdata = useSelector(state => state.deleteNotificationReducer?.data)
  console.log(deleteNotificationdata?.status, "response")


  const deleteNotification = (notificationId,) => {
    dispatch(loadDeleteNotification(notificationId))
    if (deleteNotificationdata?.status === 'Success') {
    fetchAgain(navigation)
    }
  }

  const fetchAgain=(navigation)=>{
    navigation?.navigate('Home')
  }


  return (
    <View>
      <TouchableOpacity onPress={() => deleteNotification(notificationId)}>
        <AntIcon name='closecircleo' color={colorPalette.redColor} size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default CloseButton