import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  icon: {marginBottom: 6},
  tabIndicator: {
    backgroundColor: colorPalette.mainColor,
    height: 3,
  },
  tab: {backgroundColor: colorPalette.mainColor},
  tabItem: {backgroundColor: colorPalette.basicColor},
  tabTitle: {fontSize: 12, color: colorPalette.mainColor},
  tabItems: {backgroundColor: colorPalette.basicColor, width: '100%'},
});
