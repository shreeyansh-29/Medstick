import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPalette.backgroundColor},
  profile: {
    flexDirection: 'row',
    padding: moderateScale(20),
    marginBottom: verticalScale(4),
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  heading: {
    justifyContent: 'center',
    marginLeft: verticalScale(18),
  },
  title: {
    fontSize: 20,
    color: colorPalette.mainColor,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '500',
  },
  card: {
    alignItems: 'center',
  },
  divider: {height: 1, width: '100%'},
  btnStyles: {
    borderRadius: 5,
    padding: 12,
    backgroundColor: colorPalette.mainColor,
    width: '40%',
    alignItems: 'center',
    marginVertical: 40,
  },
  contStyles: {alignItems: 'center', marginTop: verticalScale(16)},
});
