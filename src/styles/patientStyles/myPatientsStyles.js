import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  //main
  container: {backgroundColor: 'white', height: '100%'},
  mainCont: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  imgCont: {
    flex: 1,
    backgroundColor: colorPallete.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '70%'},
  bottomView: {position: 'absolute', bottom: 20, right: 16},
  addBtn: {height: 84, width: 84},

  //list of Patients
  top: {flexDirection: 'row', marginVertical: 2},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    color: 'black',
    fontSize: 16,
    marginLeft: 3,
    fontWeight: 'bold',
  },
  subtitle: {marginLeft: 3},
});
