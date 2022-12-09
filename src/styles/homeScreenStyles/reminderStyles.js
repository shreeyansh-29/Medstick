import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: verticalScale(6),
    alignItems: 'center',
    // backgroundColor:'red',
    paddingHorizontal: horizontalScale(13),
  },
  imgContainer: {
    backgroundColor: colorPallete.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: verticalScale(5),
    borderRadius: 20,
    elevation: 3,
    height: 300,
  },
  flatList: {
    flex: 1,
    width: '100%',
    height: verticalScale(200),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorPallete.backgroundColor,
    marginHorizontal: 8,
    marginVertical: 6,
    elevation: 3,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  img: {width: '60%'},
  avatarView: {
    flexDirection: 'row',
    backgroundColor: colorPallete.backgroundColor,
  },
  medNameView: {flexDirection: 'column'},
  medName: {fontWeight: '600', fontSize: 20},
});
