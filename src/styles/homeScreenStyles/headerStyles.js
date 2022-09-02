import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  header: {
    flex: 2,
    paddingLeft: 8,
  },
  headerFont: {
    fontSize: 20,
    color: colorPalette.headerColor,
  },
  headerItem: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colorPalette.colorTabs,
  },
  barIcon: {flex: 0.5, alignItems: 'center'},
  cameraIcon: {flex: 0.5, alignItems: 'center'},
});
