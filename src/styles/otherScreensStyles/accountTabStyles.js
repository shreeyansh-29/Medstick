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
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: horizontalScale(10),
  },
  heading: {marginTop: verticalScale(4)},
  title: {
    marginLeft: verticalScale(18),
    fontSize: 20,
    color: colorPalette.mainColor,
    fontWeight: '600',
  },
  subTitle: {
    marginLeft: verticalScale(18),
    fontSize: 16,
    color: 'grey',
    fontWeight: '500',
  },
  card: {
    alignItems: 'center',
  },
  logout: {
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  lineCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgrey',
    marginHorizontal: horizontalScale(24),
  },
});
