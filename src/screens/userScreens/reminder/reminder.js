import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {day_data, months} from './pushNotification/timeData';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './reminderStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {useDispatch, useSelector} from 'react-redux';
import {saveReminderSelector} from '../../../constants/Selector/saveReminderSelector';
import {saveReminderRequest} from '../../../redux/action/Reminder/saveReminderAction';
import {
  AddMedicine,
  addReminder,
  getMedicine,
  getReminder,
  SaveReminder,
} from '../../../utils/storage';
import PushNotification, {Importance} from 'react-native-push-notification';
import uuid from 'react-native-uuid';
import {hour} from '../../../constants/constants';

var counter = 0;

const Reminder = ({route, navigation, props}) => {
  const [medicineInfo, setMedicineInfo] = useState(route.params.data);
  const [picker, pickerstate] = useState(false);
  const [selecteddaysItems, slecteddaysstate] = useState([]);
  const [load, loadstate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, endDateState] = useState(new Date());
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [title, titlestate] = useState('');
  const [time_picker_mode, time_picker_mode_state] = useState(false);
  const [timeings, timestate] = useState([]);
  const [timearray, timearraystate] = useState([]);
  const [food, setFood] = useState();
  const [frequency, setFrequency] = useState([]);
  const [breakfastTouchable, setBreakfastTouchable] = useState(false);
  const [lunchTouchable, setLunchTouchable] = useState(false);
  const [dinnerTouchable, setDinnerTouchable] = useState(false);
  const [noEndDate, setNoEndDate] = useState(false);
  const [reminderStatus, setReminderStatus] = useState(true);
  const [totalReminders, setTotalReminders] = useState(10);
  const [currentCount, setCurrentCount] = useState(0);
  const [time, setTime] = useState('');
  const [foodBefore, setFoodBefore] = useState(false);
  const [foodAfter, setFoodAfter] = useState(false);
  const [arr, setArr] = useState('');
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [fDateSecondary, setfDate] = useState('');

  const dispatch = useDispatch();

  const saveReminderData = useSelector(saveReminderSelector.saveReminder);
  const saveReminderResponse = saveReminderData?.data?.data?.status;

  const userMedicineId = route.params.id;

  let fDatePrimary =
    startDate.getFullYear() +
    '-' +
    (startDate.getMonth() + 1) +
    '-' +
    startDate.getDate();

  const onSelecteddaysItemsChange = selectedi => {
    slecteddaysstate(selectedi);
  };
  const hideDatePicker = () => {
    pickerstate(false);
  };

  const titlechange = txt => {
    titlestate(txt);
  };
  const hideDatePickerfortime = () => {
    time_picker_mode_state(false);
  };

  const setReminderWithSelectedDate = ({title, startDate, endDate}) => {
    counter = 0;
    var now = new Date();
    console.log(now, 'uo');
    // now.setDate(startDate?.getDate());

    console.log(
      now.getDate(),
      now.getHours(),
      now.getTime(),
      '.......................',
    );
    // console.log(new Date(now.getTime()));
    // console.log(now, 'now');
    let sample_date = new Date();
    console.log(sample_date, 'sample date');
    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    // var set = new Set() < String > selecteddaysItems;
    if (check1) {
      timeings.forEach(timee => {
        var num = Math.floor(Math.random() * 90000) + 10000;

        counter += 1;
        let timm_array = timee.split(':');

        now.setHours(timm_array[0]);
        now.setMinutes(timm_array[1]);

        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          title: title,
          message: 'Time to eat your medicine',
          subText: 'Mark as read if you have taken', // (required)
          id: num.toString(),
          channelId: 'test1',
          color: '#02A6AB',
          showWhen: true,
          tag: userMedicineId.toString(),
          visibility: 'public',
          usesChronometer: true,
          when: now.getHours() + '' + now.getMinutes(),
          date: new Date(now.getTime() + 5 * 100), // in 60 secs
          allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
          vibrate: true,
          playSound: true,
          invokeApp: false,
          soundName: 'android.resource://com.project/raw/my_sound.mp3',
          importance: Importance.HIGH,
          repeatType: 'day',
          smallIcon: 'android.resource://com.project/raw/icon.png',

          actions: ['Open app to mark', 'Skip'],

          /* Android Only Properties */
          repeatTime: 3, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });
      });
      return;
    }
    while (sample_date <= endDate) {
      now.setDate(sample_date.getDate());

      now.setMonth(sample_date.getMonth());
      if (set.has(weeks[now.getDay()])) {
        timeings.forEach(timee => {
          // var num = Math.floor(Math.random() * 90000) + 10000;
          counter += 1;
          let timm_array = timee.split(':');

          now.setHours(timm_array[0]);
          now.setMinutes(timm_array[1]);
          console.log(now, ' ', now.getHours(), ' ', weeks[now.getDay()]);

          let num1 = Math.floor(Math.random() * 90000) + 10000;

          PushNotification.createChannel(
            {
              channelId: 'test1', // (required)
              channelName: title + 'Med channel', // (required)
              channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
              playSound: false, // (optional) default: true
              soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
              importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
          );
          PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            title: title,
            message: 'Time to eat your medicine',
            subText: 'Mark as read if you have taken', // (required)
            id: num1.toString(),
            channelId: 'test1',
            color: '#3743ab',
            showWhen: true,
            tag: userMedicineId.toString(),
            visibility: 'public',
            usesChronometer: true,
            when: new Date(now.getTime() + 5 * 100),
            date: new Date(now.getTime()), // in 60 secs
            allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
            vibrate: true,
            playSound: true,
            invokeApp: false,
            soundName: 'android.resource://com.project/raw/my_sound.mp3',
            importance: Importance.HIGH,

            smallIcon: 'ic_launcher',
            largeIcon: 'ic_launcher',
            actions: ['Open app to mark', 'Skip'],

            /* Android Only Properties */
            repeatTime: 3, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
          });
        });
      }

      sample_date.setDate(sample_date.getDate() + 1);
    }
  };

  const pushReminderChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  // const handlePushNotification = () => {
  //   PushNotification.localNotificationSchedule({
  //     channelId: 'test-channel',
  //     title: 'Alarm',
  //     message: 'Take medicine',
  //     date: new Date(Date.now() + 20 * 1000),
  //     allowWhileIdle: true,
  //   });
  // };

  useEffect(() => {
    pushReminderChannel();
  }, []);

  function getEndDate(params) {
    if (params.getTime() <= startDate.getTime()) {
      setNoEndDate(true);
      setfDate('No End Date');
    } else {
      endDateState(params);
      setfDate(
        params.getFullYear() +
          '-' +
          (params.getMonth() + 1) +
          '-' +
          params.getDate(),
      );
    }
  }

  const handleConfirm = date => {
    pickerstate(false);
    setStartDate(date);
    store_start_date(date);
  };

  const handleConfirmfortime = date => {
    // let minutes =
    //   date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    if (date.getHours() > 11) {
      timearray[currentIndex] =
        hour[date.getHours()] + ':' + date.getMinutes() + ' PM';
      timeings[currentIndex] = hour[date.getHours()] + ':' + date.getMinutes();
      timestate(timeings);
    } else {
      timearray[currentIndex] =
        date.getHours() + ':' + date.getMinutes() + ' AM';
      timeings[currentIndex] = date.getHours() + ':' + date.getMinutes();
      timestate(timeings);
    }
    hideDatePickerfortime();
  };

  function frequencyHandler() {
    if (breakfast) {
      frequency.push('Breakfast');
    }
    if (lunch) {
      frequency.push('Lunch');
    }
    if (dinner) {
      frequency.push('Dinner');
    }
  }

  const savereminder = (
    fDatePrimary,
    fDateSecondary,
    title,
    check1,
    noEndDate,
    reminderStatus,
    frequency,
    food,
    totalReminders,
    currentCount,
    userMedicineId,
  ) => {
    if (
      title.length === 0
      // || timearray.length === 0
    ) {
      Alert.alert('Make sure you have valid reminder', ' ', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return;
    }

    loadstate(true);
    let time = '';
    let days = '';
    for (let i = 0; i < timearray.length; i++) {
      let mtime = timearray[i]?.split(' ')[0]?.split(':')[0];
      if (breakfast && i == 0) {
        if (parseInt(timearray[i].split(' ')[0].split(':')[1]) < 10) {
          mtime += ':0' + timearray[i].split(' ')[0].split(':')[1];
        } else {
          mtime += ':' + timearray[i].split(' ')[0].split(':')[1];
        }
        if (i === timearray.length - 1) {
          time += mtime + ' ' + timearray[i].split(' ')[1];
        } else {
          time += mtime + ' ' + timearray[i].split(' ')[1] + ',';
        }
      } else if (lunch && i == 1) {
        setFrequency([...frequency, 'Lunch']);
        if (parseInt(timearray[i].split(' ')[0].split(':')[1]) < 10) {
          mtime += ':0' + timearray[i].split(' ')[0].split(':')[1];
        } else {
          mtime += ':' + timearray[i].split(' ')[0].split(':')[1];
        }
        if (i === timearray.length - 1) {
          time += mtime + ' ' + timearray[i].split(' ')[1];
        } else {
          time += mtime + ' ' + timearray[i].split(' ')[1] + ',';
        }
      } else if (dinner && i == 2) {
        setFrequency([...frequency, 'Dinner']);
        if (parseInt(timearray[i].split(' ')[0].split(':')[1]) < 10) {
          mtime += ':0' + timearray[i].split(' ')[0].split(':')[1];
        } else {
          mtime += ':' + timearray[i].split(' ')[0].split(':')[1];
        }
        if (i === timearray.length - 1) {
          time += mtime + ' ' + timearray[i].split(' ')[1];
        } else {
          time += mtime + ' ' + timearray[i].split(' ')[1] + ',';
        }
      }
    }
    setTime(time);
    if (check2) {
      for (let i = 0; i < selecteddaysItems.length; i++) {
        if (i == selecteddaysItems.length - 1) {
          days += selecteddaysItems[i];
        } else {
          days += selecteddaysItems[i] + ',';
        }
      }
      console.log(days, ' final days ');
    } else if (check1) {
      days += 'Everyday';

      slecteddaysstate(['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']);
    }

    // setReminderWithSelectedDate(title, fDatePrimary, fDateSecondary);

    // handlePushNotification();

    frequencyHandler();
    console.log(frequency, 'freq  ');
    const frequencyTemp = frequency.toString();

    if (endDate === 'No End Date') {
      setfDate('null');
    }

    let obj = route?.params?.data;

    obj.days = days;
    obj.frequency = frequencyTemp;
    obj.endDate = fDateSecondary;
    obj.noEndDate = noEndDate;
    obj.reminderStatus = true;
    obj.reminderTime = time;
    obj.beforeAfter = food;
    obj.everyday = check1;
    obj.reminderTitle = title;
    obj.startDate = fDatePrimary;
    obj.totalReminders = totalReminders;
    obj.currentCount = currentCount;

    getMedicine().then(data => {
      const temp = data;
      if (temp[route.params.index].reminderId !== null) {
        temp[route.params.index] = obj;
      } else {
        obj.reminderId = uuid.v4();
        temp[route.params.index] = obj;
      }
      AddMedicine(temp);
      console.log(temp, 'data with reminder');
    });
    loadstate(false);

    setTimeout(() => {
      navigation.pop();
    }, 1000);

    // dispatch(
    //   saveReminderRequest(
    //     fDatePrimary,
    //     fDateSecondary,
    //     days,
    //     title,
    //     time,
    //     check1,
    //     noEndDate,
    //     reminderStatus,
    //     frequencyTemp,
    //     food,
    //     totalReminders,
    //     currentCount,
    //     userMedicineId,
    //   ),
    // );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SubHeader title={'Add Reminder'} navigation={navigation} />
      <View style={styles.top}>
        <View style={styles.container1}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              pickerstate(true);
            }}
            style={styles.containerTouch}>
            <View style={styles.dateContainer}>
              <View style={{justifyContent: 'flex-start', width: '35%'}}>
                <Text style={styles.dateText}>Start Date</Text>
              </View>
              <View
                style={{
                  width: '65%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    width: '90%',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={styles.dateText1}>
                    {day_data[0].children[startDate.getDay()].id +
                      ' ' +
                      startDate.getDate() +
                      ' ' +
                      months[startDate.getMonth()] +
                      ', ' +
                      startDate.getFullYear()}
                  </Text>
                </View>
                <View style={styles.arrow}>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={styles.downIcon}
                    color=""></FontAwesomeIcon>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <Divider></Divider>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('ReminderDuration', {
                date: startDate,
                endDate: getEndDate,
              });
            }}
            style={{paddingVertical: 15, flexDirection: 'row', width: '100%'}}>
            <View
              style={{
                justifyContent: 'flex-start',
                width: '40%',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.dateText}>Select Duration</Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                width: '60%',
                alignItems: 'center',
                paddingRight: 4,
              }}>
              <Text style={styles.dateText1}>
                {fDateSecondary == 'No End Date'
                  ? 'No End Date'
                  : day_data[0].children[endDate.getDay()].id +
                    ' ' +
                    endDate.getDate() +
                    ' ' +
                    months[endDate.getMonth()] +
                    ', ' +
                    endDate.getFullYear()}
              </Text>
            </View>
          </TouchableOpacity>
          <Divider></Divider>
          <DateTimePicker
            isVisible={picker}
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={time_picker_mode}
            mode="time"
            onConfirm={handleConfirmfortime}
            onCancel={hideDatePickerfortime}
          />
          <Text style={styles.title}>Add Title</Text>
          <TextInput
            placeholder="Title for reminder"
            style={styles.titleText}
            mode="outlined"
            value={title}
            onChangeText={txt => {
              titlechange(txt);
            }}
            selectionColor={colorPalette.appColor}
            outlineColor={colorPalette.appColor}
            activeOutlineColor={colorPalette.appColor}
          />
          <Divider></Divider>
          <View>
            <Text style={styles.title}>Frequency</Text>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column', width: '30%'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    borderRadius: breakfast ? 3 : 0,
                    alignItems: 'center',
                    borderColor: colorPalette.mainColor,
                    backgroundColor: breakfast
                      ? colorPalette.mainColor
                      : colorPalette.greyColor,
                  }}
                  onPress={() => {
                    setBreakfastTouchable(!breakfastTouchable);
                    setBreakfast(!breakfast);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: breakfast ? 'white' : 'black',
                      padding: 6,
                    }}>
                    Breakfast
                  </Text>
                </TouchableOpacity>
                {breakfastTouchable ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      borderRadius: 3,
                      alignItems: 'center',
                      borderColor: colorPalette.mainColor,
                      backgroundColor: colorPalette.greyColor,
                      padding: 6,
                      marginTop: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      time_picker_mode_state(true);
                      setCurrentIndex(0);
                    }}>
                    <Text style={{fontSize: 16, textAlign: 'center'}}>
                      {timearray[0]}
                    </Text>
                    <View style={styles.arrow}>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        style={styles.downIcon}
                        color=""></FontAwesomeIcon>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>

              <View style={{flexDirection: 'column', width: '30%'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    borderRadius: lunch ? 3 : 0,
                    alignItems: 'center',
                    borderColor: colorPalette.mainColor,
                    backgroundColor: lunch
                      ? colorPalette.mainColor
                      : colorPalette.greyColor,
                  }}
                  onPress={() => {
                    setLunchTouchable(!lunchTouchable);
                    setLunch(!lunch);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: lunch ? 'white' : 'black',
                      padding: 6,
                    }}>
                    Lunch
                  </Text>
                </TouchableOpacity>
                {lunchTouchable ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      alignItems: 'center',
                      borderRadius: 3,
                      borderColor: colorPalette.mainColor,
                      backgroundColor: colorPalette.greyColor,
                      padding: 6,
                      marginTop: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      time_picker_mode_state(true);
                      setCurrentIndex(1);
                    }}>
                    <Text style={{fontSize: 16, textAlign: 'center'}}>
                      {timearray[1]}
                    </Text>
                    <View style={styles.arrow}>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        style={styles.downIcon}
                        color=""></FontAwesomeIcon>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
              <View style={{flexDirection: 'column', width: '30%'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    borderRadius: dinner ? 3 : 0,
                    alignItems: 'center',
                    borderColor: colorPalette.mainColor,
                    backgroundColor: dinner
                      ? colorPalette.mainColor
                      : colorPalette.greyColor,
                  }}
                  onPress={() => {
                    setDinnerTouchable(!dinnerTouchable);
                    setDinner(!dinner);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: dinner ? 'white' : 'black',
                      padding: 6,
                    }}>
                    Dinner
                  </Text>
                </TouchableOpacity>
                {dinnerTouchable ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      alignItems: 'center',
                      borderRadius: 3,
                      borderColor: colorPalette.mainColor,
                      backgroundColor: colorPalette.greyColor,
                      padding: 6,
                      marginTop: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      time_picker_mode_state(true);
                      setCurrentIndex(2);
                    }}>
                    <Text style={styles.touchableText}>{timearray[2]}</Text>
                    <View style={styles.arrow}>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        style={styles.downIcon}
                        color=""></FontAwesomeIcon>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
          <Divider></Divider>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: '35%',
                marginTop: 10,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingVertical: 6,
              }}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                Take Medicine:
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '65%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  borderWidth: 1,
                  borderColor: colorPalette.mainColor,
                  borderRadius: 6,
                  backgroundColor: foodBefore
                    ? colorPalette.mainColor
                    : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 6,
                  width: '46.5%',
                }}
                onPress={() => {
                  setFood('Before');
                  setFoodBefore(!foodBefore);
                  setFoodAfter(false);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: foodBefore ? 'white' : 'black',
                    textAlign: 'center',
                  }}>
                  Before food
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  borderWidth: 1,
                  borderColor: colorPalette.mainColor,
                  backgroundColor: foodAfter ? colorPalette.mainColor : 'white',
                  borderRadius: 6,
                  justifyContent: 'center',
                  paddingVertical: 6,
                  width: '46.5%',
                }}
                onPress={() => {
                  setFood('After');
                  setFoodAfter(!foodAfter);
                  setFoodBefore(false);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: foodAfter ? 'white' : 'black',
                    textAlign: 'center',
                  }}
                  numberOfLines={2}
                  textBreakStrategy="highQuality">
                  After food
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider></Divider>
          <View style={{marginBottom: 10}}>
            <Text style={styles.title}>Select Days</Text>
            <CheckBox
              style={styles.days}
              onClick={() => {
                setCheck1(!check1);
                setCheck2(false);
              }}
              isChecked={check1}
              checkBoxColor={colorPalette.appColor}
              leftText={'Everyday'}
              leftTextStyle={{fontSize: 16}}
            />
            <CheckBox
              style={styles.days}
              onClick={() => {
                setCheck2(!check2);
                setCheck1(false);
              }}
              isChecked={check2}
              checkBoxColor={colorPalette.appColor}
              leftText={'Selected days'}
              leftTextStyle={{fontSize: 16}}
            />
            {check2 && (
              <SectionedMultiSelect
                hideSearch={true}
                IconRenderer={Icon}
                items={day_data}
                uniqueKey="id"
                subKey="children"
                selectText="Choose days"
                showDropDowns={true}
                expandDropDowns={true}
                icons={{
                  arrowUp: {
                    size: 20,
                    name: 'keyboard-arrow-up',
                  },
                  arrowDown: {
                    name: 'keyboard-arrow-down', // dropdown toggle
                    size: 22,
                  },
                  check: {
                    name: 'check', // selected item
                    size: 22,
                  },
                  close: {
                    name: 'close', // chip close
                    size: 16,
                  },
                }}
                styles={{
                  listContainer: {height: 300, backgroundColor: 'red'},
                  container: {maxHeight: 370, marginTop: 200, padding: 20},
                  backdrop: {height: 400},
                  modalWrapper: {height: 400},
                  button: {
                    backgroundColor: colorPalette.appColor,
                  },
                  cancelButton: {
                    backgroundColor: 'white',
                  },
                  chipContainer: {
                    backgroundColor: colorPalette.appColor,
                  },
                }}
                colors={{
                  chipColor: 'white',
                }}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelecteddaysItemsChange}
                selectedItems={selecteddaysItems}></SectionedMultiSelect>
            )}
          </View>
          <Divider></Divider>
          <Button
            loading={load}
            title="Save reminder"
            onPress={() => {
              savereminder(
                fDatePrimary,
                fDateSecondary,
                title,
                check1,
                noEndDate,
                reminderStatus,
                frequency,
                food,
                totalReminders,
                currentCount,
                userMedicineId,
              );
            }}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Reminder;
