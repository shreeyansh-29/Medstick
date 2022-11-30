import PushNotification from 'react-native-push-notification';

class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) { },
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

  schduleNotification(date, check1, name, userId) {
    if (check1) {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name,
        date: date,
        repeatType: 'day',
        id: userId
      });
    } else {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name,
        date: date,
        id: userId,
      });
    }
  }
  schduleNotification2(date, Id) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Appointment!',
      message: 'You have scheduled appointment',
      date: date,
      id: Id,
    });
  }
}

export default new Notifications();
