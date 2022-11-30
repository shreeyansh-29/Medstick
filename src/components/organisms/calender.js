import {View} from 'react-native';
import React, {useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {styles} from '../../styles/homeScreenStyles/calenderStyles';
import moment from 'moment';

const Calender = props => {
  const [date, setDate] = useState(null);
  const dateBlackList = i => {
    let temp = i.format('YYYY-MM-DD');
    if (temp > date) {
      return i;
    }
  };

  // let markedDates = [
  //   {
  //     date: '2022-11-28',
  //     dots: [
  //       {
  //         color: 'green',
  //         selectedColor: 'white',
  //       },
  //     ],
  //   },
  // ];
  return (
    <View>
      <CalendarStrip
        numDaysInWeek={7}
        scrollable
        selectedDate={moment().format('YYYY-MM-DD')}
        onDateSelected={todayDate => {
          setDate(todayDate._i);
          props.date(todayDate.format('YYYY-MM-DD'));
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
        datesBlacklist={dateBlackList}
        dayComponentHeight={40}
      />
    </View>
  );
};

export default Calender;
