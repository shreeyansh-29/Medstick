import PushNotification from 'react-native-push-notification';

class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {},
      onNotification: function (notification) {
        console.log('Notification:', notification);
      },
      popInitialNotification: true,
      requestPermissions: false.valueOf,
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Take medicine',
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN -----', rn);
    });
  }

  schduleNotification(date) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Reminder!',
      message: 'You have set this reminder',
      date,
    });
  }
}

export default new Notifications();
