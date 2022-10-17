import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const style = StyleSheet.create({
  mainCont: {flex: 1, backgroundColor: colorPalette.basicColor},
  imgCont: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
    paddingTop: 2,
  },
  card: {
    flexDirection: 'row',
    margin: 2,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
  },
  subtitle1: {marginVertical: 3, fontSize: 15, fontWeight: '400'},
  subtitle2: {fontSize: 13, fontWeight: '400'},
  options: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagesbtn: {
    marginRight: 18,
    borderRadius: 4,
    backgroundColor: colorPalette.mainColor,
  },
  imagesText: {padding: 8, fontSize: 16, color: 'white'},
  ripple: {
    marginRight: 10,
    padding: 6,
    borderRadius: 16,
  },
});
