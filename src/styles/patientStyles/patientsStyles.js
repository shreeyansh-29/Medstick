import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  tabIndicator: {
    backgroundColor: colorPallete.mainColor,
    height: 3,
  },
  tab: {backgroundColor: colorPallete.mainColor},
  tabItem: {backgroundColor: colorPallete.basicColor},
  tabTitle: {fontSize: 12, color: colorPallete.mainColor},
  tabItems: {backgroundColor: colorPallete.basicColor, width: '100%'},
});
