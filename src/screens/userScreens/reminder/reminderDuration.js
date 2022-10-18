import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';
import CheckBox from 'react-native-check-box';
import {deviceWidth} from '../../../components/atoms/constant';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import { day_data, months } from './pushNotification/timeData';
import { useEffect } from 'react';
import SaveButton from '../../../components/molecules/saveButton';

const ReminderDuration = ({route, navigation}) => {
  const [endDate, endDateState] = useState(new Date());
  let startDate= route.params.date;
  const [multiSliderValue, setMultiSliderValue] = useState([0]);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [showMulitiSlider, setShowMultiSlider] = useState(check3);
  const [picker, pickerstate] = useState(false);
  const [finalEndDate, setFinalEnddate]= useState("");
  const [days, setDays] = useState(0);

  console.log(endDate);
  const hideDatePicker = () => {
    pickerstate(false);
  };

  const handleConfirm = date => {
    // console.log(date);
    pickerstate(false);
    endDateState(date);
  };
  const multiSliderValuesChange = values => {
    var curr_date = new Date();
    // console.log(curr_date);
    setDays(values);
    endDateState(curr_date);
    setMultiSliderValue(values);
  };


  
  let previousDate = new Date();

  const handleEndDate = ()=>{
      endDateState(startDate);
  }
  return (
    <View style={styles.container}>
      <SubHeader navigation={navigation} title={'Duration'} />
      <View style={{marginHorizontal: 20}}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Start Date</Text>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text style={styles.dateText1}>
              {day_data[0].children[startDate.getDay()].id+" "+startDate.getDate()+" "+ months[startDate.getMonth()]+", "+startDate.getFullYear()}
            </Text>
          </View>
        </View>
        <Divider></Divider>
        <View style={{paddingVertical: 10, paddingHorizontal: 6}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.textView}>
              <Text style={styles.itemText}>No End Date </Text>
            </View>
            <View style={styles.checkView}>
              <CheckBox
                style={styles.days}
                onClick={() => {
                  setCheck1(!check1);
                  setCheck2(false);
                  setCheck3(false);
                  handleEndDate()
                }}
                isChecked={check1}
                checkBoxColor={colorPalette.appColor}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.textView}>
              <Text style={styles.itemText}>Untill This Date </Text>
            </View>
            <View style={styles.checkView}>
              <CheckBox
                style={styles.days}
                onClick={() => {
                  setCheck2(!check2);
                  setCheck3(false);
                  setCheck1(false);
                  pickerstate(true);
                }}
                isChecked={check2}
                checkBoxColor={colorPalette.appColor}
              />
            </View>
          </View>
          {check2 && (
            <View>
              <DateTimePicker
                isVisible={picker}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.textView}>
              <Text style={styles.itemText}>For X No. of Days - {days}</Text>
            </View>
            <View style={styles.checkView}>
              <CheckBox
                style={styles.days}
                onClick={() => {
                  setCheck3(!check3);
                  setCheck2(false);
                  setCheck1(false);
                }}
                isChecked={check3}
                checkBoxColor={colorPalette.appColor}
              />
            </View>
          </View>
          {check3 && (
            <MultiSlider
              values={[multiSliderValue[0]]}
              sliderLength={deviceWidth / 1.2}
              onValuesChange={multiSliderValuesChange}
              max={100}
              step={1}
              customMarker={() => (
                <FontAwesomeIcon
                  color={colorPalette.appColor}
                  size={20}
                  icon={faCircle}></FontAwesomeIcon>
              )}
            />
          )}
        </View>
        <Divider></Divider>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 15,
          }}>
          <View>
            <Text style={styles.dateText}>End Date </Text>
          </View>
          <Text style={styles.dateText1}>
            { check1 ? "No End Date" : (day_data[0].children[endDate.getDay()].id+" "+endDate.getDate()+" "+ months[endDate.getMonth()]+", "+endDate.getFullYear())}
          </Text>
        </View>
        <TouchableOpacity onPress={()=>{ route.params.endDate(endDate);navigation.pop()}} style={{marginTop:40}}>
        <SaveButton/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReminderDuration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
  },
  dateContainer: {width: '100%', paddingVertical: 20},
  dateText: {fontSize: 20, fontWeight: '600'},
  dateText1: {
    fontSize: 16,
    color: 'black',
  },
  days: {paddingVertical: 8},
  textView: {
    width: '60%',
    alignItems: 'flex-start',
  },
  itemText: {
    fontSize: 17,
    fontWeight: '500',
  },
  checkView: {
    width: '40%',
    alignItems: 'center',
  },
  line: {height: 1, backgroundColor: 'red', width: '50%'},
});
