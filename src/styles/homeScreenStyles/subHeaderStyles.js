import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  subHeader: {
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPalette.mainColor,
  },
  subHeaderFont: {
    fontSize: 20,
    color: colorPalette.basicColor,
  },
  backIcon: {
    alignItems: 'center',
    width: '14%',
  },
  header: {
    width: '60%',
  },
  bellIcon: {
    width: '21%',
    alignItems: 'flex-end',
  },
});
