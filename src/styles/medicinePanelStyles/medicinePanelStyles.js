import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../components/atoms/constant';

const Styles = StyleSheet.create({
  //medicine panel styles
  container: {flex: 1, backgroundColor: '#fafafa'},
  lottie: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {width: '70%'},
  flatlist: {
    flex: 1,
    top: 200,
    backgroundColor: '#fafafa',
    marginTop: verticalScale(16),
  },
  image: {
    borderColor: 'white',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  lottieAnimation: {width: 240, height: 240},
  card: {
    borderRadius: 30,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: 'black',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(10),
  },
  camera: {height: '100%'},
  listView: {margin: moderateScale(4)},
  list: {marginHorizontal: moderateScale(16)},
  avatarView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medNameView: {
    flexDirection: 'column',
    marginLeft: verticalScale(16),
  },
  medName: {fontWeight: '600', fontSize: 17},
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rem: {padding: 8},
  background: {
    position: 'absolute',
    backgroundColor: colorPalette.mainColor,
    height: '50%',
    width: '200%',
    borderBottomEndRadius: 530,
    borderBottomStartRadius: 590,
    top: -140,
    right: -120,
  },

  //add medicine styles
  flatlistMainInfo: {
    shadowColor: '#6777',
    elevation: 20,
    paddingBottom: 20,
    shadowOffset: {width: 0, height: 10},
    shadowColor: '#171717',
    shadowOpacity: 0.51,
    shadowRadius: 13,
    elevation: 10,
  },
  flatlistInfo: {
    marginLeft: 25,
    marginBottom: 10,
  },
  constainer: {
    padding: 25,
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colorPalette.basicColor,
  },
  addMedicinesHeader: {
    width: '100%',
    height: '30%',
    backgroundColor: colorPalette.appColor,
  },
  addMedicinesLogo: {
    width: '100%',
    height: '80%',
    backgroundColor: colorPalette.appColor,
  },
  // saveButton: {
  //   width: '100%',
  //   height: '10%',
  //   alignItems:"center"
  // },
  addPrescriptionIcon: {
    width: '18%',
    marginLeft: 35,
  },
  savelogo: {
    width: '100%',
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
  },
  addPrescriptionHeader: {
    flex: 1,
    backgroundColor: 'black',
  },
  addPrescriptionContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    backgroundColor: '#0789',
  },
  addPrescriptionLottie: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addPrescriptionList: {
    flex: 0.7,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colorPalette.basicColor,
  },
  addMedicinePage: {
    backgroundColor: colorPalette.appColor,
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  addingPrescription: {
    marginLeft: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
  },
  addingPrescriptionIcon: {
    width: '30%',
    paddingLeft: 40,
  },
  addingPrescriptionTouchable: {
    justifyContent: 'flex-end',
    marginTop: '8%',
  },
  textInput: {
    width: '70%',
    marginTop: '9%',
  },
  saveButton: {
    width: '32%',
  },
  saveTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonArea: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  medicineModal: {
    flex: 1,
    padding: 10,
  },
  medicineNameBox: {
    width: '100%',
    borderColor: colorPalette.appColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  textView: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  textView1: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  textbox: {
    width: '50%',
    justifyContent: 'center',
  },
  stockbox: {
    width: '40%',
  },
  picker: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    // height: 58,
  },
  addbutton: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colorPalette.appColor,
    margin: 5,
    height: 40,
  },
  modallottie: {
    width: '80%',
  },
  modalHeader: {
    flex: 1,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  box: {
    margin: '3.6%',
    marginBottom: '30%',
    borderWidth: 1.2,
    padding: '4%',
    borderRadius: 5,
    borderColor: colorPalette.mainColor,
  },
  box1: {
    margin: '2.6%',
    borderWidth: 1.2,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '2%',
    borderRadius: 5,
    paddingBottom: '5%',
    paddingHorizontal: '0.5%',
    borderColor: colorPalette.mainColor,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  box2: {
    margin: '1.6%',
    borderWidth: 1.2,
    alignItems: 'center',
    marginLeft: '3%',
    padding: '1.5%',
    paddingLeft: '3.5%',
    paddingRight: '3.5%',
    borderRadius: 5,
    paddingHorizontal: 2,
    borderColor: colorPalette.mainColor,
  },
  box: {
    margin: '3.6%',
    marginBottom: '30%',
    borderWidth: 1.2,
    padding: '4%',
    borderRadius: 5,
    borderColor: colorPalette.mainColor,
  },
  addPrescriptionHeader: {
    backgroundColor: colorPalette.appColor,
    flexDirection: 'row',
    padding: 10,
  },
  addPrescriptionHeaderText: {
    color: colorPalette.basicColor,
    paddingLeft: 10,
    fontSize: 20,
  },
  uploadPrescriptionText: {
    color: colorPalette.appColor,
    fontSize: 20,
    paddingVertical: 20,
  },
  uploadPrescriptionBox: {
    borderWidth: 2,
    borderColor: colorPalette.appColor,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
  },
  nodata: {
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 100,
  },
  prescriptionText: {
    color: colorPalette.appColor,
    fontSize: 26,
    padding: 20,
  },
  prescriptionBox: {
    width: '98%',
    padding: 5,
    elevation: 2,
    marginTop: 5,
    borderColor: colorPalette.appColor,
    borderStartWidth: 4,
  },
  prescriptionText1: {
    fontSize: 18,
    color: '#000',
    paddingLeft: 20,
  },
});

export default Styles;
