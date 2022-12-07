import React, {useState} from 'react';
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
import moment from 'moment';
import {AddMedicine, getMedicine} from '../../../utils/storage.js';
import uuid from 'react-native-uuid';
import {hour} from '../../../constants/constants';
import Notifications from '../../../notification/notifications';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';

const Reminder = ({route, navigation}) => {
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
  const totalReminders = 0;
  const currentCount = 0;
  const [time, setTime] = useState('');
  const [foodBefore, setFoodBefore] = useState(false);
  const [foodAfter, setFoodAfter] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [fDateSecondary, setfDate] = useState('');

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

  const handlePushNotification = (obj, check1) => {
    let d = new Date(); // for now
    let currentTime = d.getHours() + ':' + d.getMinutes();
    const number = moment(obj.reminderTime, ['h:mm A']).format('HH:mm');

    let chosenDate = new Date(obj?.startDate).getTime() + 24 * 60 * 60 * 1000;
    let chosenDate1 = new Date(chosenDate);
    let chosenDate2 =
      chosenDate1.getFullYear() +
      '-' +
      (chosenDate1.getMonth() + 1) +
      '-' +
      chosenDate1.getDate();

    if (number < currentTime) {
      let dateTime = moment(chosenDate2 + ' ' + number);
      Notifications.schduleNotification(
        dateTime._d,
        check1,
        obj.medicineName,
        obj.userMedicineId,
        obj.reminderTime,
      );
    } else {
      let dateTime = moment(obj.startDate + ' ' + number);
      Notifications.schduleNotification(
        dateTime._d,
        check1,
        obj.medicineName,
        obj.userMedicineId,
        obj.reminderTime,
      );
    }
  };

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
    timelist,
    setTimelist,
  ) => {
    if (title.length === 0) {
      Alert.alert('Please enter a valid Title', ' ', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return;
    } else if (timearray.length == 0) {
      Alert.alert('Please enter atleat one Frequency', ' ', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return;
    } else if (food == null) {
      Alert.alert('Please specify before or after food.', ' ', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return;
    } else if (!check1 && !check2) {
      Alert.alert('Please select Days', ' ', [
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

    frequencyHandler();
    // console.log(frequency, 'freq  ');
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
    obj.reminderTitle = title.trim();
    obj.startDate = fDatePrimary;
    obj.totalReminders = totalReminders;
    obj.currentCount = currentCount;

    if (reminderStatus == true) {
      PushNotification.getScheduledLocalNotifications(rn => {
        for (let i = 0; i < rn.length; i++) {
          if (obj.userMedicineId === rn[i].id) {
            PushNotification.cancelLocalNotification({
              id: rn[obj.userMedicineId],
            });
          }
        }
      });
    }

    handlePushNotification(obj, check1);

    getMedicine().then(data => {
      const temp = data;
      if (temp[route.params.index].reminderId !== null) {
        temp[route.params.index] = obj;
      } else {
        obj.reminderId = uuid.v4();
        temp[route.params.index] = obj;
      }
      AddMedicine(temp);
    });
    loadstate(false);

    Toast.show({
      text1: 'Reminder Saved',
      type: 'success',
      position: 'bottom',
    });

    setTimeout(() => {
      navigation.pop();
    }, 1000);
  };

  return (
    <View style={styles.scrollView}>
      <SubHeader title={'Add Reminder'} navigation={navigation} />
      <ScrollView style={styles.scrollView}>
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colorPalette.black,
                }}>
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
              leftTextStyle={{fontSize: 16, color: 'gray'}}
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
              leftTextStyle={{fontSize: 16, color: 'gray'}}
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
              );
            }}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </ScrollView>
      <Toast visibilityTime={800} />
    </View>
  );
};

export default Reminder;
