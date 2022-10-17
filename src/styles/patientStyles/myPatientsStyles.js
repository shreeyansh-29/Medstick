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
    color:"black",
    fontSize: 16,
    marginLeft: 3,
    fontWeight: 'bold',
  },
  touch: {paddingVertical: 15},
  icon: {alignItems: 'center'},

  //main
  container: {backgroundColor: 'white', height: '100%'},
  img: {width: 250},
  imgView: {position: 'absolute', alignSelf: 'center', top: 90},
});
