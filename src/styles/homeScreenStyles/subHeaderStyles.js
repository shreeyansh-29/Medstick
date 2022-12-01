import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  subHeader: {
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPalette.mainColor,
  },
  header: {
    width: '60%',
  },
  subHeaderFont: {
    fontSize: 20,
    color: colorPalette.basicColor,
  },
  backIcon: {
    alignItems: 'center',
    width: '14%',
  },
  bellIcon: {
    width: '23%',
    alignItems: 'flex-end',
  },
});
