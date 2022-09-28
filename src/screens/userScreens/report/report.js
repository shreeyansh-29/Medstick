import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import {styles} from '../../../styles/reportScreenStyles/reportScreenStyles';
import ProgressReport from '../../../components/atoms/progressCircle';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { horizontalScale } from '../../../components/atoms/constant';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Décember',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul.',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
};
LocaleConfig.defaultLocale = 'en';
const Report = ({navigation}) => {
  let startDate = new Date().toDateString();
  return (
    <>
      <View
        style={styles.container}
      />
      <View style={styles.report}>
        <MainHeader title={'Reports'} navigation={navigation} />
        <ScrollView>
          <View style={styles.reportContainer}>
            <View style={styles.analytics}>
              <View
                style={styles.container1Text}>
                <Text style={styles.font}>Overall Performance</Text>
                <Text style={styles.fontSmall}>
                  This percentage shows your overall adherence rate.
                </Text>
              </View>
              <View
                style={styles.progressView}>
                <ProgressReport styles={styles} />
              </View>
            </View>
          </View>
          <View style={styles.reportHeading}>
            <Text style={styles.reportText}>Your Report</Text>
          </View>
          <View style={styles.calendarView}>
            <Calendar
              style={styles.calendar}
              theme={styles.theme}
              initialDate={startDate}
              minDate={'2012-05-10'}
              maxDate={'2222-12-30'}
              onDayPress={day => {
                // console.log('selected day', day);
              }}
              onDayLongPress={day => {
                // console.log('selected day', day);
              }}
              monthFormat={'yyyy MM'}
              onMonthChange={month => {
                // console.log('month changed', month);
              }}
              hideArrows={false}
              hideExtraDays={true}
              disableMonthChange={true}
              firstDay={7}
              hideDayNames={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
              renderHeader={date => {
                return (
                  <Text
                    style={{fontSize: 20, fontWeight: '600', color: 'grey'}}>
                    {date.toDateString()}
                  </Text>
                );
              }}
              enableSwipeMonths={true}
              markingType={'dot'}
              markedDates={markedDay}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

function ColorCode(percentage) {
  if (percentage < 60) {
    return colorPalette.redPercentageColor;
  } else if (61 <= percentage && percentage < 90) {
    return 'orange';
  } else {
    return colorPalette.greenPercentageColor;
  }
}

const data = [
  {id: 1, date: '2022-09-22', percentage: 100},
  {id: 2, date: '2022-09-23', percentage: 70},
  {id: 3, date: '2022-09-24', percentage: 30},
  {id: 4, date: '2022-09-25', percentage: 93},
  {id: 1, date: '2022-10-02', percentage: 100},
  {id: 2, date: '2022-10-03', percentage: 70},
  {id: 3, date: '2022-10-04', percentage: 30},
  {id: 4, date: '2022-10-15', percentage: 93},
  {id: 1, date: '2022-10-12', percentage: 100},
  {id: 2, date: '2022-10-23', percentage: 70},
  {id: 3, date: '2022-10-24', percentage: 30},
  {id: 4, date: '2022-10-25', percentage: 93},
];
let markedDay = {};

data.map(item => {
  // console.log(item.percentage);
  markedDay[item.date] = {
    selected: true,
    marked: true,
    selectedColor: ColorCode(item.percentage),
  };
});

export default Report;
