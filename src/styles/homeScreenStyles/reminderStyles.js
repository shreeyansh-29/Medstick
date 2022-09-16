import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(6),
    width: '82%',
    alignItems: 'flex-start',
    marginBottom: verticalScale(6),
  },
  font: {
    color: colorPalette.mainColor,
    fontSize: 24,
  },
  imgContainer: {
    backgroundColor: colorPalette.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: '92%',
    marginTop: verticalScale(10),
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 4,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  img: {height: 290, width: 192},
  card: {
    borderRadius: 30,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: 'black',
    marginVertical: verticalScale(6),
    marginHorizontal: horizontalScale(14),
  },
  listView: {margin: moderateScale(5)},
  list: {marginHorizontal: moderateScale(16)},
  avatarView: {flexDirection: 'row'},
  medNameView: {flexDirection: 'column'},
  medName: {fontWeight: '600'},
});
