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

    // PushNotification.cancelAllLocalNotifications();

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

  schduleNotification(date, check1, name, userId, time) {
    let Id1 = parseInt(userId);
    if (check1) {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name + ' at ' + time,
        date: date,
        repeatType: 'day',
        id: Id1,
      });
    } else {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name + ' at ' + time,
        date: date,
        id: Id1,
      });
    }
  }
  schduleNotification2(date, id, time) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Appointment!',
      message: 'You have an appointment scheduled at' + ' ' + time,
      date: date,
      vibrate: true,
      vibration: 300,
    });
  }
}

export default new Notifications();
