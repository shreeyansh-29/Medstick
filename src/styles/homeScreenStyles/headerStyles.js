import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  headerItem: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPalette.mainColor,
  },
  header: {
    width: '69%',
  },
  headerFont: {
    fontSize: 24,
    color: colorPalette.basicColor,
  },
  appIcon: {
    alignItems: 'center',
    width: '17%',
  },
  bellIcon: {
    width: '14%',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: colorPalette.mainColor,
    height: '50%',
    width: '200%',
    borderBottomEndRadius: 530,
    borderBottomStartRadius: 590,
    top: -120,
    right: -120,
  },
});
