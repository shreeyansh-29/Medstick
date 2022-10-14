import { View, Text } from 'react-native'
import React from 'react'
import { notificationStyles } from '../../styles/notificationScreenStyles/notificationPanelStyles'
import NotificationHeading from '../atoms/notificationHeading'
import NotificationMessage from '../atoms/notificationMessage'
import CloseButton from '../atoms/closeButton'
import BellIcon from '../atoms/bellIcon'


const NotificationCard = ({ text, date, time,notificationId,sender ,navigation}) => {
  return (

    <View style={notificationStyles.card}>
      <View style={notificationStyles.cardHeader}>

        <NotificationHeading 
          sender={sender}
        />
        <CloseButton
        notificationId={notificationId} 
        navigation={navigation}
          
        />
      </View>
      <View style={notificationStyles.cardMessage}>
        <BellIcon />
        <NotificationMessage
          text={text}
          date={date}
          time={time}
          
        />
      </View>
    </View>

  )
}

export default NotificationCard