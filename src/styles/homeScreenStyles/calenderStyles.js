import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  calendar: {
    height: 100,
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor:colorPalette.backgroundColor
  },
  calenderHeaderStyle: {
    color: colorPalette.mainColor,
    fontSize: 24,
    paddingBottom: verticalScale(18),
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
    height: 18,
    width: 18,
  },
  highlightedDateNumber: {
    color: colorPalette.basicColor,
    fontSize: 11,
    fontWeight: '900',
  },
  highlightedDateName: {
    color: colorPalette.basicColor,
    fontSize: 11,
    fontWeight: '900',
  },
});
