import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  //list of Patients
  top: {flexDirection: 'row', marginVertical: 2},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 4,
  },
  patientName: {
    fontSize: 16,
    marginLeft: 3,
    fontWeight: 'bold',
  },
  touch: {paddingVertical: 15},
  icon: {alignItems: 'center'},
  subtitle: {marginLeft: 3},

  //main
  container: {backgroundColor: 'white', height: '100%'},

  mainCont: {flex: 1, backgroundColor: colorPalette.backgroundColor},
  imgCont: {
    flex: 1,
    backgroundColor: colorPalette.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '70%'},
  bottomView: {position: 'absolute', bottom: 20, right: 16},
  addBtn: {height: 84, width: 84},
});
