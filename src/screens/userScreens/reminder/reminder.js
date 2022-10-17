import React, {useState} from 'react';
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {day_data, months} from './pushNotification/timeData';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCaretDown,
  faRemove,
} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './reminderStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPalette} from '../../../components/atoms/colorPalette';

var counter = 0;

const Reminder = ({route, navigation}) => {
  //   const db = globalDb();

  //   useEffect(() => {
  //     db.transaction(txn => {
  //       console.log('e');
  //       txn.executeSql(
  //         'SELECT * FROM `User_medicines` where user_id = ? AND status = ?',
  //         [id, 1],
  //         function (tx, res) {
  //           console.log('success');
  //           console.log(res.rows.item(0));
  //           titlestate(res.rows.item(0).title);
  //           timearraystate(res.rows.item(0).time.split('-'));
  //         },
  //       );
  //     });
  //   }, []);

  const multiSliderValuesChange = values => {
    var curr_date = new Date();
    console.log(curr_date);
    console.log(curr_date.setDate(curr_date.getDate() + values[0]));

    console.log(curr_date.getDate(), values);
    endDateState(curr_date);
    storeEndDateState(curr_date);
    setMultiSliderValue(values);
  };

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
  const [showReminderDuration, setShowReminderDuration] = useState(false);
  const userMedicineReminderId = route.params.id;
  console.log(userMedicineReminderId);

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

  function getEndDate(params) {
    endDateState(params);
  }

  const handleConfirm = date => {
    console.log(date);

    pickerstate(false);

    setStartDate(date);
    store_start_date(date);
  };

  const handleConfirmfortime = date => {
    console.log('A time has been picked: ', date.getHours(), date.getMinutes());

    if (date.getHours() > 11) {
      console.log(timeings);
      timearray.push(date.getHours() + ':' + date.getMinutes() + ' PM');
      timeings.push(date.getHours() + ':' + date.getMinutes());
      timestate(timeings);
      console.log(timeings);
    } else {
      timearray.push(date.getHours() + ':' + date.getMinutes() + ' AM');

      timeings.push(date.getHours() + ':' + date.getMinutes());
      timestate(timeings);
      console.log(timeings);
    }
    hideDatePickerfortime();
  };

  const savereminder = () => {
    if (
      multiSliderValue[0] === 0 ||
      title.length === 0 ||
      timearray.length === 0
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
      let mtime = timearray[i].split(' ')[0].split(':')[0];
      if (parseInt(timearray[i].split(' ')[0].split(':')[1]) < 10) {
        mtime += ':0' + timearray[i].split(' ')[0].split(':')[1];
      } else {
        mtime += ':' + timearray[i].split(' ')[0].split(':')[1];
      }
      if (i === timearray.length - 1) {
        time += mtime + ' ' + timearray[i].split(' ')[1];
      } else {
        time += mtime + ' ' + timearray[i].split(' ')[1] + '-';
      }
    }
    if (check2) {
      for (let i = 0; i < selecteddaysItems.length; i++) {
        if (i == selecteddaysItems.length - 1) {
          days += selecteddaysItems[i];
        } else {
          days += selecteddaysItems[i] + ':';
        }
      }
      console.log('time and days ==>>> ', time, days);
    } else if (check1) {
      days += 'Everyday';
      slecteddaysstate(['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']);
    }
    setreminderwithselecteddate(title);

    // console.log('date', store_end_date.toISOString(), ' total_meds ' + counter);
    // db.transaction(function (txn) {
    //   txn.executeSql(
    //     'CREATE TABLE IF NOT EXISTS User_medicines(user_id INTEGER PRIMARY KEY NOT NULL, medicine_name TEXT, medicine_des TEXT , title TEXT, time TEXT , days TEXT , start_date TEXT , end_date TEXT , status INTEGER , sync INTEGER, total_med_reminders INTEGER , current_count INTEGER)',
    //     [],
    //   );

    //   txn.executeSql(
    //     'UPDATE User_medicines SET title=? , time=? , days=? , start_date =? , end_date=? , status=? , sync=? , total_med_reminders = ? , current_count = ?  where user_id = ' +
    //       id,
    //     [
    //       title,
    //       time,
    //       days,
    //       store_start_date.toISOString(),
    //       store_end_date.toISOString(),
    //       1,
    //       0,
    //       counter,
    //       0,
    //     ],
    //   );

    //   txn.executeSql('SELECT * FROM `User_medicines`', [], function (tx, res) {
    //     for (let i = 0; i < res.rows.length; ++i) {
    //       console.log('item:', res.rows.item(i));
    //     }

    //     loadstate(false);
    //     navigation.pop(1);
    //   });
    // });

    //     loadstate(false);
    //     navigation.pop(1);
    // console.log(selectedItems, selecteddaysItems);
  };
  

  return (
    // { showReminderDuration &&  <ReminderDuration/>}
    <ScrollView style={styles.scrollView}>
      <SubHeader title={'Add Reminder'} navigation={navigation} />
      <View style={styles.top}>
        <View style={styles.container1}>
          <TouchableOpacity
            onPress={() => {
              console.log('p');
              console.log(picker);

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
                  alignItems:'center',
                }}>
                <View style={{justifyContent:'flex-end', width:'90%', alignItems:'flex-end'}}>
                  <Text style={styles.dateText1}>
                    {day_data[0].children[startDate.getDay()].id+" "+startDate.getDate()+" "+ months[startDate.getMonth()]+", "+startDate.getFullYear()}
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
              navigation.navigate('ReminderDuration',{date:startDate, endDate:getEndDate});
            }}
            style={{paddingVertical: 15, flexDirection: 'row', width: '100%',}}>
            <View style={{justifyContent: 'flex-start', width: '40%',alignItems:'flex-start'}}>
              <Text style={styles.dateText}>Select Duration</Text>
            </View>
            <View style={{justifyContent: 'flex-end', width: '60%',alignItems:'center', paddingRight:4}}>
              <Text style={styles.dateText1}>
                {day_data[0].children[endDate.getDay()].id+" "+endDate.getDate()+" "+ months[endDate.getMonth()]+", "+endDate.getFullYear()}
                {/* {endDate
                .toISOString().split('T')[0]} */}

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
          <Divider></Divider>
          <View>
            <TouchableOpacity
              onPress={() => {
                time_picker_mode_state(true);
              }}
              style={styles.timeTouch}>
              <View style={styles.timeContainer}>
                <Text style={styles.selectTime}>Select Time</Text>
              </View>
              <View style={{right:12}}>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  style={styles.downIcon}
                  color=""></FontAwesomeIcon>
              </View>
            </TouchableOpacity>
            {timearray.map((item, index) => {
              return (
                <View key={index} style={styles.timeTextConatiner}>
                  <View style={{width:'50%', justifyContent:'flex-start'}}>
                  <Text key={item} style={styles.timeText}>
                    {item}
                  </Text>
                  </View>
                  <TouchableOpacity
                    key={item + '' + index}
                    onPress={() => {
                      console.log(timearray.splice(timearray.indexOf(item), 1));
                      timearraystate(
                        timearray.splice(timearray.indexOf(item), 1),
                      );
                    }}
                    style={{alignItems:'flex-end',width:'50%',justifyContent:'center'}}>
                    <FontAwesomeIcon
                      color="red"
                      icon={faRemove}></FontAwesomeIcon>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <Divider></Divider>
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
            onPress={savereminder}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}></Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Reminder;
