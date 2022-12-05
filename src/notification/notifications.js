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

  schduleNotification(date, check1, name, time, enddate) {
    let currentTime = new Date();
    let currentTime2 =
      currentTime.getFullYear() +
      '-' +
      (currentTime.getMonth() + 1) +
      '-' +
      currentTime.getDate();

    console.log(currentTime2, 'current timeee');
    console.log(enddate,"enddateeee");

    if (check1) {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take '+name+' at '+time,
        date: date,
        repeatType: 'day',
        number:name
      });
    } else {
      PushNotification.localNotificationSchedule({
        number: name,
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name+' at '+time,
        date: date,
        repeatType: currentTime2 <= enddate ? 'day' : null,
        
      });
    }
  }
  schduleNotification2(date, Id) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Appointment!',
      message: 'You have an appointment scheduled',
      date: date,
      number: Id,
      shortcutId: 'shortcut-id',
    });
  }
}

export default new Notifications();
