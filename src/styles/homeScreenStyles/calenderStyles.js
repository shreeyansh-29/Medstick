import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  calendar: {
    height: 120,
    paddingTop: 22,
    paddingBottom: 24,
  },
  calenderHeaderStyle: {
    color: colorPalette.mainColor,
    fontSize: 20,
    paddingBottom: 18,
  },
  calendarColor: colorPalette.basicColor,
  dateNumberStyle: {color: colorPalette.mainColor, fontSize: 11.5},
  dateNameStyle: {color: colorPalette.mainColor, fontSize: 11.5},
  daySelection: {
    type: 'background',
    highlightColor: colorPalette.mainColor,
  },
  icon: {flex: 0.14},
  iconStyle: {
    height: 21,
    width: 21,
  },
  highlightedDateNumber: {
    color: colorPalette.basicColor,
    fontSize: 12.5,
    fontWeight: '900',
  },
  highlightedDateName: {
    color: colorPalette.basicColor,
    fontSize: 12.5,
    fontWeight: '900',
  },
});
