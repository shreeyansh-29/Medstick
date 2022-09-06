import {View, Text} from 'react-native';
import React, {useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {styles} from '../../styles/homeScreenStyles/calenderStyles';
import moment from 'moment';

const Calender = () => {
  const [date, setDate] = useState('');
  console.log(date);
  return (
    <View>
      <CalendarStrip
        numDaysInWeek={7}
        scrollable
        selectedDate={moment()}
        onDateSelected={todayDate => {
          setDate(todayDate);
        }}
        style={styles.calendar}
        calendarColor={styles.calendarColor}
        highlightDateNumberStyle={styles.highlightedDateNumber}
        highlightDateNameStyle={styles.highlightedDateName}
        calendarHeaderStyle={styles.calenderHeaderStyle}
        dateNumberStyle={styles.dateNumberStyle}
        dateNameStyle={styles.dateNameStyle}
        daySelectionAnimation={styles.daySelection}
        iconContainer={styles.icon}
        iconStyle={styles.iconStyle}
      />
    </View>
  );
};

export default Calender;
