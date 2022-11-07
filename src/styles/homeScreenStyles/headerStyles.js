import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  headerItem: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colorPalette.mainColor,
  },
  header: {
    flex: 2,
  },
  headerFont: {
    fontSize: 24,
    fontFamily: '',
    paddingLeft: horizontalScale(10),
    color: colorPalette.basicColor,
  },
  appIcon: {
    flex: 0.4,
    paddingLeft: horizontalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    flex: 0.5,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: colorPalette.mainColor,
    height: '50%',
    width: '200%',
    // borderRadius: 180,
    borderBottomEndRadius: 530,
    borderBottomStartRadius: 590,
    top: -120,
    right: -120,
  },
});
