// const setreminderwithselecteddate = (titl) => {
//     counter = 0;
//     var now = new Date();

//     now.setDate(start_date.getDate());

//     console.log(now.getDate(), now.getHours(), now.getTime());
//     console.log(new Date(Date.now()));
//     console.log('now', now);
//     let sample_date = new Date(start_date);
//     var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
//     var set = new Set<String>(selecteddaysItems);
//     if (check1) {
//       timeings.forEach((timee) => {
//         // var num = Math.floor(Math.random() * 90000) + 10000;
//         counter += 1;
//         let timm_array = timee.split(':');

//         now.setHours(timm_array[0]);
//         now.setMinutes(timm_array[1]);

//         PushNotification.localNotificationSchedule({
//           //... You can use all the options from localNotifications
//           title: titl,
//           message: 'Time to eat your medicine',
//           subText: 'Mark as read if you have taken', // (required)
//           id: num.toString(),
//           color: '#3743ab',
//           showWhen: true,
//           tag: id.toString(),
//           visibility: 'public',
//           usesChronometer: true,
//           when: now.getHours() + '' + now.getMinutes(),
//           date: new Date(now.getTime()), // in 60 secs
//           allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
//           vibrate: true,
//           playSound: true,
//           invokeApp: false,
//           soundName: 'android.resource://com.project/raw/my_sound.mp3',
//           importance: Importance.HIGH,
//           repeatType: 'day',
//           smallIcon: 'android.resource://com.project/raw/icon.png',

//           actions: ['Open app to mark', 'Skip'],

//           /* Android Only Properties */
//           repeatTime: 3, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
//         });
//       });
//       return;
//     }
//     while (sample_date <= end_date) {
//       now.setDate(sample_date.getDate());

//       now.setMonth(sample_date.getMonth());
//       if (set.has(weeks[now.getDay()])) {
//         timeings.forEach((timee) => {
//           // var num = Math.floor(Math.random() * 90000) + 10000;
//           counter += 1;
//           let timm_array = timee.split(':');

//           now.setHours(timm_array[0]);
//           now.setMinutes(timm_array[1]);
//           console.log(now, ' ', now.getHours(), ' ', weeks[now.getDay()]);

//           let num1 = Math.floor(Math.random() * 90000) + 10000;

//           PushNotification.createChannel(
//             {
//               channelId: num1.toString(), // (required)
//               channelName: titl + 'Med channel', // (required)
//               channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//               playSound: false, // (optional) default: true
//               soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//               importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//               vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//             },
//             created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//           );
//           PushNotification.localNotificationSchedule({
//             //... You can use all the options from localNotifications
//             title: titl,
//             message: 'Time to eat your medicine',
//             subText: 'Mark as read if you have taken', // (required)
//             id: num1.toString(),
//             color: '#3743ab',
//             showWhen: true,
//             tag: id.toString(),
//             visibility: 'public',
//             usesChronometer: true,
//             when: now.getHours() + '' + now.getMinutes(),
//             date: new Date(now.getTime()), // in 60 secs
//             allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
//             vibrate: true,
//             playSound: true,
//             invokeApp: false,
//             soundName: 'android.resource://com.project/raw/my_sound.mp3',
//             importance: Importance.HIGH,

//             smallIcon: 'ic_launcher',
//             largeIcon: 'ic_launcher',
//             actions: ['Open app to mark', 'Skip'],

//             /* Android Only Properties */
//             repeatTime: 3, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
//           });
//         });
//       }

//       sample_date.setDate(sample_date.getDate() + 1);
//     }
//   };