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
      // console.log('SN -----', rn);
    });
  }

  schduleNotification(date, check1, name) {
    if (check1) {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name,
        date: date,
        repeatType: 'day',
      });
    } else {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name,
        date: date,
      });
    }
  }
}

export default new Notifications();
