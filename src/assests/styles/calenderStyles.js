import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
  calendar: {
    height: 110,
    paddingTop: 10,
    paddingBottom: 20,
  },
  calenderHeaderStyle: {
    color: '#F1F5F9',
    fontSize: 20,
    paddingBottom: 18,
    paddingTop: 5,
  },
  calendarColor: '#667EEA',
  dateNumberStyle: {color: '#f1f5f9', fontSize: 11.5},
  dateNameStyle: {color: '#f1f5f9', fontSize: 11.5},
  daySelection: {
    type: 'background',
    highlightColor: '#fff',
    // highlightColor: 'rgb(107, 169, 250)',
  },
  icon: {flex: 0.14},
  iconStyle: {
    height: 20,
    width: 20
  },
  highlightedDateNumber: {
    color: '#0EA5E9',
    fontSize: 12.5,
    fontWeight: '900',
  },
  highlightedDateName: {
    color: '#0EA5E9',
    fontSize: 12.5,
    fontWeight: '900',
  },
});
