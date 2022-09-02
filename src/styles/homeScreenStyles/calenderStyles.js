import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  calendar: {
    height: 120,
    paddingTop: 22,
    paddingBottom: 24,
  },
  calenderHeaderStyle: {
    color: colorPalette.colorTabs,
    fontSize: 20,
    paddingBottom: 18,
  },
  calendarColor: colorPalette.barColor,
  dateNumberStyle: {color: colorPalette.colorTabs, fontSize: 11.5},
  dateNameStyle: {color: colorPalette.colorTabs, fontSize: 11.5},
  daySelection: {
    type: 'background',
    highlightColor: colorPalette.colorTabs,
  },
  icon: {flex: 0.14},
  iconStyle: {
    height: 21,
    width: 21,
  },
  highlightedDateNumber: {
    color: colorPalette.barColor,
    fontSize: 12.5,
    fontWeight: '900',
  },
  highlightedDateName: {
    color: colorPalette.barColor,
    fontSize: 12.5,
    fontWeight: '900',
  },
});
