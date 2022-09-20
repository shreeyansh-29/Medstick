import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  //list of Patients
  top: {
    flexDirection: 'row',
    marginVertical: verticalScale(2),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    fontSize: 16,
    marginLeft: horizontalScale(3),
    fontWeight: 'bold',
  },
  subtitle: {marginLeft: horizontalScale(3)},
  // icon: {alignItems: 'center'},

  //main
  container: {flex: 1, backgroundColor: colorPalette.backgroundColor},
  img: {height: verticalScale(230), width: horizontalScale(230)},
  imgView: {
    flex: 1,
    backgroundColor: colorPalette.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: horizontalScale(16),
  },
  addBtn: {height: 84, width: 84},
});
