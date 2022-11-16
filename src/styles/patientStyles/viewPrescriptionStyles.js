import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const style = StyleSheet.create({
  mainCont: {flex: 1, backgroundColor: colorPalette.basicColor},
  imgCont: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorPalette.backgroundColor,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,
  },
  patientName: {
    fontSize: 16,
    // marginLeft: 3,
    fontWeight: 'normal',
  },
  touch: {paddingVertical: 15},
  icon: {alignItems: 'center'},
  subtitle: {
    color: 'black',
  },

  font: {fontWeight: '600'},
  btn: {marginRight: 12},
});
