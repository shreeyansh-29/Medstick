import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubHeader from '../../components/molecules/headers/subHeader'
import NotificationCard from '../../components/molecules/notificationCard'
import { notificationStyles } from '../../styles/notificationScreenStyles/notificationPanelStyles'
import { useDispatch, useSelector } from 'react-redux'
import { loadGetAllNotification } from '../../redux/action/notification/getAllNotification'


const NotificationScreen = ({navigation}) => {
     const dispatch=useDispatch()
     const pageNo=0
     const getAllNotification=useSelector(state=>state.getAllNotificationReducer?.data)
     const getNotificationMessage=useSelector(state=>state.getAllNotificationReducer?.data?.object)
     console.log(getNotificationMessage,"notification")
     
     const getNotification=()=>{
        dispatch(loadGetAllNotification(pageNo))
     }
     useEffect(()=>{
        getNotification(pageNo)
     },[])
     

    

     

  return (
    <ScrollView style={notificationStyles.screen}>
    <View style={{flex:1 }}>
    <SubHeader
        title={'Notifications'}
        navigation={navigation}
    />
    </View>
    <View style={notificationStyles.container}>
    {getAllNotification?.status === 'Success'?
    getNotificationMessage.map((item)=>(
        <NotificationCard
        text={item.message}
        date={item.localDate}
        time={item.localTime}
        notificationId={item.notificationId}
        sender={item.sender}
        navigation={navigation}
    />  
    ))
    :
    <View>
        <Text>no data</Text>
    </View>}
    
    </View>
    
    </ScrollView>
  )
}

export default NotificationScreen