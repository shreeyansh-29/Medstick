import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DatePicker from 'react-native-date-picker';
import {
  faCalendarDays,
  faClock,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {colorPallete} from '../atoms/colorPallete';
import {useState} from 'react';

const DateTime = ({temp, time1}) => {
  const [tempDate, setTempDate] = useState(new Date(temp));
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 5,
          marginTop: '3%',
          marginRight: '20%',
          marginLeft: '7%',
        }}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <View style={Styles.box1}>
            <Text style={Styles.text}>Date</Text>
            <FontAwesomeIcon
              icon={faCalendarDays}
              size={28}
              color={colorPallete.mainColor}
            />
            <DatePicker
              modal
              open={open}
              date={tempDate}
              value={tempDate}
              mode="date"
              format="YYYY-MM-DD"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              onDateChange={setTempDate}
            />
          </View>
        </TouchableOpacity>

        {date == Date() ? (
          <View style={Styles.box2}>
            <Text style={{fontSize: 20}}>{temp}</Text>
          </View>
        ) : (
          <View style={Styles.box2}>
            <Text style={{fontSize: 18}}>
              {date?.getFullYear() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getDate()}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 5,
          marginTop: '4%',
          marginRight: '20%',
          marginLeft: '7%',
        }}>
        <TouchableOpacity onPress={() => setOpen1(true)}>
          <View style={Styles.box1}>
            <Text style={Styles.text}>Time</Text>
            <FontAwesomeIcon
              icon={faClock}
              size={28}
              color={colorPallete.mainColor}
            />
            <DatePicker
              modal
              open={open1}
              date={date}
              value={time1}
              mode="time"
              onConfirm={date => {
                setOpen1(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen1(false);
              }}
            />
          </View>
        </TouchableOpacity>
        {date == Date() ? (
          <View style={Styles.box2}>
            <Text style={{fontSize: 20}}>{time1}</Text>
          </View>
        ) : (
          <View style={Styles.box2}>
            <Text style={{fontSize: 18}}>
              {date?.getHours() + ':' + (date.getMinutes() + 1) + ':' + '00'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DateTime;
