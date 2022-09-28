import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
  },
  container1: {
    backgroundColor: colorPalette.mainColor,
    height: 190,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 83,
    borderWidth: 4,
    borderColor: 'white',
  },
  topItem: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  topItemText1: {color: 'white', fontWeight: 'bold', fontSize: 21},
  topItemText2: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 6,
  },
  editButton: {
    backgroundColor: colorPalette.mainColor,
    width: '40%',
    borderRadius: 10,
  },
  editButtonConatiner: {
    alignItems: 'center',
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '95%',
    marginLeft: 8,
    marginTop: 10,
  },
  textInput: {
    height: 43,
    width: '85%',
    margin: 8,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pickercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 7,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 8,
  },
  picker: {
    flex: 1,
    backgroundColor: 'white',
  },

  pickerIcon: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  bgPickerView: {
    flex: 1,
    width: '97%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  bgPicker: {
    backgroundColor: 'white',
    width: '100%',
  },
  pickerItem: {color: 'grey'},
  pickerText: {color: 'red', alignSelf: 'center'},
  saveButtonView: {paddingBottom: 20},
  saveButton: {
    backgroundColor: colorPalette.mainColor,
    width: '48%',
    marginTop: 8,
    borderRadius: 30,
  },
  saveButtonContainer: {alignItems: 'center'},

  //savedDetails
  sd: {
    marginTop: 10,
    marginLeft: 8,
    width: '95%',
  },
  sdContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 15,
    alignItems: 'center',
  },
  sdSubContainer: {
    justifyContent: 'center',
  },
  sdText: {
    paddingLeft: 18,
  },
  sdText1: {
    fontSize: 17,
    color: 'grey',
  },
});

export default styles;
