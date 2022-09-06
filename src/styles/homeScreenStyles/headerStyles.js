import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  headerItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colorPalette.basicColor,
    // backgroundColor: 'red',
  },
  header: {
    flex: 2,
  },
  headerFont: {
    fontSize: 24,
    fontFamily: '',
    paddingLeft: 10,
    color: colorPalette.mainColor,
  },
  appIcon: {
    flex: 0.4,
    paddingLeft: 8,
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center',
  },
  bellIcon: {
    flex: 0.5,
    alignItems: 'center',
  },
});
