import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  header: {
    flex: 2,
    paddingLeft: 0,
  },
  headerFont: {
    fontSize: 22,
    color: colorPalette.headerColor,
  },
  headerItem: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colorPalette.colorTabs,
  },
  barIcon: {flex: 0.4, alignItems: 'center'},
  cameraIcon: {flex: 0.5, alignItems: 'center'},
});
