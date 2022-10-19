import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {day_data, months} from './pushNotification/timeData';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown, faRemove} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './reminderStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {Picker} from '@react-native-picker/picker';
import {xorBy} from 'lodash';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {saveReminderSelector} from '../../../constants/Selector/saveReminderSelector';
import {saveReminderRequest} from '../../../redux/action/Reminder/saveReminderAction';

var counter = 0;

const Reminder = ({route, navigation}) => {
  const multiSliderValuesChange = values => {
    var curr_date = new Date();
    // console.log(curr_date, 'sjjf');
    // console.log(curr_date.setDate(curr_date.getDate() + values[0]));

    // console.log(curr_date.getDate(), values);
    endDateState(curr_date);
    storeEndDateState(curr_date);
    setMultiSliderValue(values);
  };

  const [counter, setCounter] = useState('');
  const [picker, pickerstate] = useState(false);
  const [selectedItems, slectedstate] = useState([]);
  const [selecteddaysItems, slecteddaysstate] = useState([]);
  const [load, loadstate] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, endDateState] = useState(new Date());
  const [storeStartDate, storeEndDateState] = useState(new Date());
  const [storeEndDate, storeEndDatestate] = useState(new Date());
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [title, titlestate] = useState('');
  const [time_picker_mode, time_picker_mode_state] = useState(false);
  const [timeings, timestate] = useState([]);
  const [multiSliderValue, setMultiSliderValue] = useState([0]);
  const [timearray, timearraystate] = useState([]);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [showReminderDuration, setShowReminderDuration] = useState(false);
  const [food, setFood] = useState();
  const [frequency, setFrequency] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [breakfastTouchable, setBreakfastTouchable] = useState(false);
  const [lunchTouchable, setLunchTouchable] = useState(false);
  const [dinnerTouchable, setDinnerTouchable] = useState(false);
  const [noEndDate, setNoEndDate] = useState(false);
  const [reminderStatus, setReminderStatus] = useState(true);
  const [totalReminders, setTotalReminders] = useState(10);
  const [currentCount, setCurrentCount] = useState(0);
  const [time, setTime] = useState('');
  console.log(time, 'timeeeee');
  const dispatch = useDispatch();

  const saveReminderData = useSelector(saveReminderSelector.saveReminder);
  console.log(saveReminderData,"save reminder");

  const userMedicineId = route.params.id;
  console.log(userMedicineId, 'id');

  let fDatePrimary =
    startDate.getFullYear() +
    '-' +
    (startDate.getMonth() + 1) +
    '-' +
    startDate.getDate();
  let timePrimary =
    startDate.getHours() + ':' + startDate.getMinutes() + ':' + '00';

  const [fDateSecondary, setfDate] = useState('');
  let timeSecondary =
    endDate.getHours() + ':' + endDate.getMinutes() + ':' + '00';

  // console.log(fDatePrimary, 'startDate');
  // console.log(fDateSecondary, 'endDate');
  // console.log(selecteddaysItems, 'days');
  // console.log(title, 'reminderTitle');
  // console.log(timearray, 'reminderTime');
  // console.log(check1, 'everyday');
  // console.log(noEndDate, ' no end date');
  // console.log(reminderStatus, 'reminderStatus');
  // console.log(frequency, 'frequency');
  // console.log(food, 'beforeAfter');
  // console.log(totalReminders, 'totalReminders');
  // console.log(currentCount, 'currentCount');

  const onMultiChange = () => {
    return item => setSelectedTimings(xorBy(selectedTimings, [item], 'id'));
  };

  // const saveData = (
  //   fDatePrimary,
  //   fDateSecondary,
  //   days,
  //   title,
  //   time,
  //   check1,
  //   noEndDate,
  //   reminderStatus,
  //   frequencyTemp,
  //   food,
  //   totalReminders,
  //   currentCount,
  //   userMedicineId,
  // ) => {
  //   dispatch(
  //     saveReminderRequest(
  //       fDatePrimary,
  //       fDateSecondary,
  //       days,
  //       title,
  //       time,
  //       check1,
  //       noEndDate,
  //       reminderStatus,
  //       frequencyTemp,
  //       food,
  //       totalReminders,
  //       currentCount,
  //       userMedicineId,
  //     ),
  //   );
  //   setTimeout(() => {
  //     navigation.pop();
  //   }, 2000);
  // };

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

  const onclickBreakfast = () => {
    setBreakfastTouchable(true);

    setFrequency([...frequency, 'Breakfast']);
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
    // console.log('A time has been picked: ', date.getHours(), date.getMinutes());

    if (date.getHours() > 11) {
      // console.log(timeings);
      timearray.push(date.getHours() + ':' + date.getMinutes() + ' PM');
      timeings.push(date.getHours() + ':' + date.getMinutes());
      timestate(timeings);
      // console.log(timeings);
    } else {
      timearray.push(date.getHours() + ':' + date.getMinutes() + ' AM');

      timeings.push(date.getHours() + ':' + date.getMinutes());
      timestate(timeings);
      // console.log(timeings);
    }
    hideDatePickerfortime();
  };

  const timing = [
    {
      item: 'Breakfast',
      id: 'BK',
    },
    {
      item: 'Lunch',
      id: 'LN',
    },
    {
      item: 'Dinner',
      id: 'DN',
    },
  ];

  console.log(timearray, 'fdhghfhgf');

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
    if (title.length === 0 || timearray.length === 0) {
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
      let mtime = timearray[i].split(' ')[0].split(':')[0];
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
      // console.log('time and days ==>>> ', time, days);
    } else if (check1) {
      days += 'Everyday';

      slecteddaysstate(['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']);
    }
    const frequencyTemp = frequency.toString();
    console.log(fDatePrimary, 'startDate');
    
    console.log(days, 'days');
    console.log(title, 'reminderTitle');
    console.log(time, 'reminderTime');
    console.log(check1, 'everyday');
    console.log(noEndDate, ' no end date');
    if(endDate==="No End Date"){
      setfDate('null');
    }
    console.log(reminderStatus, 'reminderStatus');
    console.log(frequencyTemp, 'frequency');
    console.log(fDateSecondary, 'endDate');
    console.log(food, 'beforeAfter');
    console.log(totalReminders, 'totalReminders');
    console.log(currentCount, 'currentCount');
    console.log(userMedicineId,"iddddd");

    dispatch(
      saveReminderRequest(
        fDatePrimary,
        fDateSecondary,
        days,
        title,
        time,
        check1,
        noEndDate,
        reminderStatus,
        frequencyTemp,
        food,
        totalReminders,
        currentCount,
        userMedicineId,
      ),
    );
    // setTimeout(() => {
    //   navigation.pop();
    // }, 2000);
  };

  // console.log(endDate);

  return (
    // { showReminderDuration &&  <ReminderDuration/>}
    <ScrollView style={styles.scrollView}>
      <SubHeader title={'Add Reminder'} navigation={navigation} />
      <View style={styles.top}>
        <View style={styles.container1}>
          <TouchableOpacity
            onPress={() => {
              // console.log('p');
              // console.log(picker);

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
            label="Title"
            style={styles.titleText}
            mode="outlined"
            value={title}
            onChangeText={txt => {
              titlechange(txt);
            }}
            // selectionColor={colorPalette.appColor}
            outlineColor={colorPalette.appColor}
            activeUnderlineColor={colorPalette.appColor}
          />
          {/* <InteractiveTextInput mainColor="black" placeholder="Title"
                    style={{ borderColor: 'black', position: 'absolute', justifyContent: 'center' }}
                    onChangeText={titlechange}></InteractiveTextInput> */}
          <View>
            <Text style={styles.title}>Frequency</Text>
            <View
              style={{
                flexDirection: 'row',
                margin: 7,
                marginTop: '3%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.touchable1}
                onPress={() => onclickBreakfast()}>
                <Text style={styles.touchableText}>Breakfast</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable2}
                onPress={() => {
                  setLunchTouchable(true);
                  setFrequency([...frequency, 'Lunch']);
                }}>
                <Text style={styles.touchableText}>Lunch</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable3}
                onPress={() => {
                  setDinnerTouchable(true);
                  setFrequency([...frequency, 'Dinner']);
                }}>
                <Text style={styles.touchableText}>Dinner</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', margin: 7, marginBottom: '5%'}}>
            {breakfastTouchable ? (
              <TouchableOpacity
                style={styles.touchable1}
                onPress={() => {
                  time_picker_mode_state(true);
                }}>
                <Text style={styles.touchableText}>{timearray[0]}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            {lunchTouchable ? (
              <TouchableOpacity
                style={styles.touchable2}
                onPress={() => {
                  time_picker_mode_state(true);
                }}>
                <Text style={styles.touchableText}>{timearray[1]}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            {dinnerTouchable ? (
              <TouchableOpacity
                style={styles.touchable3}
                onPress={() => {
                  time_picker_mode_state(true);
                }}>
                <Text style={styles.touchableText}>{timearray[2]}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>

          {/* <View style={{margin: '5%'}}>
            {timearray.map((item, index) => {
              return (
                <View key={index} style={styles.timeTextConatiner}>
                  <View style={{width: '50%', justifyContent: 'flex-start'}}>
                    <Text key={item} style={styles.timeText}>
                      {item}
                    </Text>
                  </View>
                  <TouchableOpacity
                    key={item + '' + index}
                    onPress={() => {
                      console.log(
                        timearray.splice(timearray.indexOf(item), 1),
                        'clock',
                      );
                      timearraystate(
                        timearray.splice(timearray.indexOf(item), 1),
                      );
                    }}
                    style={{
                      alignItems: 'flex-end',
                      width: '50%',
                      justifyContent: 'center',
                    }}>
                    <FontAwesomeIcon
                      color="red"
                      icon={faRemove}></FontAwesomeIcon>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View> */}
          <Divider></Divider>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Take Medicine:</Text>
            <TouchableOpacity
              style={{margin: '3%', borderWidth: 1, padding: '1%'}}
              onPress={() => {
                setFood('Before');
              }}>
              <Text>Before food</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{margin: '3%', borderWidth: 1, padding: '1%'}}
              onPress={() => {
                setFood('After');
              }}>
              <Text>After food</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.days}>
            <TouchableOpacity>
              <Text style={styles.selectDays}>Select Days</Text>
            </TouchableOpacity>
            <CheckBox
              style={styles.days}
              onClick={() => {
                setCheck1(!check1);
                setCheck2(false);
              }}
              isChecked={check1}
              checkBoxColor={colorPalette.appColor}
              leftText={'Everyday'}
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
            />

            {check2 && (
              <SectionedMultiSelect
                IconRenderer={Icon}
                items={day_data}
                uniqueKey="id"
                hideSearch={true}
                subKey="children"
                selectText="Choose days"
                showDropDowns={true}
                expandDropDowns={true}
                styles={{
                  listContainer: {height: 400},
                  container: {maxHeight: 400, marginTop: 200, padding: 20},
                  backdrop: {height: 400},
                  modalWrapper: {height: 400},
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
            onPress={() =>
              // saveData(
              //   fDatePrimary,
              //   fDateSecondary,
              //   selecteddaysItems,
              //   title,
              //   timearray,
              //   check1,
              //   noEndDate,
              //   reminderStatus,
              //   frequency,
              //   food,
              //   totalReminders,
              //   currentCount,
              //   userMedicineId,
              // )
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
              )
            }
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}></Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Reminder;
