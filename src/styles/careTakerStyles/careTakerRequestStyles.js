import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  imgView: {position: 'absolute', alignSelf: 'center', top: 90},
  img: {width: 250},
  card: {
    elevation: 3,
    marginTop: 8,
    borderRadius: 25,
    marginHorizontal: 14,
    marginBottom: 4,
  },
  cardInner: {flexDirection: 'row', paddingVertical: 4},
  avatar: {marginTop: 10, marginLeft: 20},
  container1: {flexDirection: 'column'},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  listTitle: {
    fontSize: 14,
    marginLeft: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  listSubTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
    marginLeft: 15,
  },
  buttonView: {flexDirection: 'row', marginLeft: 25, bottom: 10},
  confirmButton: {
    width: 80,
    borderRadius: 25,
    // marginBottom: 10,
    backgroundColor: colorPalette.mainColor,
  },
  space: {margin: 5},
  deleteButton: {
    width: 80,
    borderRadius: 25,
    backgroundColor: colorPalette.redPercentageColor,
  },
});
