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

  schduleNotification(date, check1, name, enddate, check2, length) {
    let currentTime = new Date();
    let currentTime2 =
      currentTime.getFullYear() +
      '-' +
      (currentTime.getMonth() + 1) +
      '-' +
      currentTime.getDate();
    console.log(date, check1, name, enddate, check2, length, 'local');

    if (check1 || enddate == 'No End Date') {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name,
        date: date,
        repeatType: 'day',
      });
    } else if (check2) {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name,
        date: date,
        repeatType: 'week',
        repeatTime: length,
      });
    } else {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!',
        message: 'Take ' + name,
        date: date,
        repeatType: currentTime2 <= enddate ? 'day' : null,
      });
    }
  }
  schduleNotification2(date, time) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Appointment!',
      message: `You have an appointment scheduled at ${time}`,
      date: date,
    });
  }
  notifyMedicineNotification(date, stock, name){
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Stocks! ',
      playSound:true,
      soundName:'android.resource://com.project/raw/notification.mp3',
      message: `You have left with only ${stock} ${name}`,
      date: date,
    });
  }
}

export default new Notifications();
