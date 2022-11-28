import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  mainView: {
    marginTop: 16,
    width: '90%',
    alignSelf: 'center',
  },
  inputField: {marginVertical: 6},
  field: {backgroundColor: 'white'},
  errorText: {color: 'red', marginTop: 4},
  description: {height: 100, backgroundColor: 'white'},
  pickerView: {
    width: '48%',
    marginTop: 6,
  },
  pickerField: {
    color: 'black',
    height: 56,
  },
  inputGroup: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  subInputGroup: {width: '50%'},
  picker: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    // height: 58,
  },
  textbox: {
    width: '50%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  unitBox: {
    width: '50%',
    alignItems: 'center',
  },
  subText: {fontSize: 14, fontWeight: '500', color: 'black'},
  addedBtn: {
    width: '43%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnStyles: {
    backgroundColor: colorPalette.mainColor,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addBtn: {
    width: '50%',
    alignItems: 'center',
  },
  divider: {height: 1, marginTop: 8},
  contStyles: {alignItems: 'center', marginVertical: 24},
  saveBtn: {
    backgroundColor: colorPalette.mainColor,
    width: '50%',
    borderRadius: 5,
  },
});
