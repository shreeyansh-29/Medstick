import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../components/atoms/constant';

const Styles = StyleSheet.create({
  //medicine panel styles
  container: {flex: 1, backgroundColor: '#fafafa'},
  imageCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  img: {width: '66%'},
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
  card: {
    width: '100%',
    paddingBottom: 6,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorPallete.backgroundColor,
    marginHorizontal: 7,
    marginTop: 4,
    elevation: 3,
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
  },
  medNameView: {
    flexDirection: 'row',
    backgroundColor: colorPallete.backgroundColor,
    width: '57%',
    paddingLeft: 10,
  },
  medName: {fontWeight: '600', fontSize: 17},
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '28%',
    justifyContent: 'center',
  },
  rem: {padding: 10},
  background: {
    position: 'absolute',
    backgroundColor: colorPallete.mainColor,
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
    backgroundColor: colorPallete.basicColor,
  },
  addMedicinesHeader: {
    width: '100%',
    height: '30%',
    backgroundColor: colorPallete.appColor,
  },
  addMedicinesLogo: {
    width: '100%',
    height: '80%',
    backgroundColor: colorPallete.appColor,
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
    backgroundColor: colorPallete.basicColor,
  },
  addMedicinePage: {
    backgroundColor: colorPallete.appColor,
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
    borderColor: colorPallete.appColor,
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
    borderColor: colorPallete.appColor,
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
    borderColor: colorPallete.mainColor,
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
    borderColor: colorPallete.mainColor,
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
    borderColor: colorPallete.mainColor,
  },
  box: {
    margin: '3.6%',
    marginBottom: '30%',
    borderWidth: 1.2,
    padding: '4%',
    borderRadius: 5,
    borderColor: colorPallete.mainColor,
  },
  addPrescriptionHeader: {
    backgroundColor: colorPallete.appColor,
    flexDirection: 'row',
    padding: 10,
  },
  addPrescriptionHeaderText: {
    color: colorPallete.basicColor,
    paddingLeft: 10,
    fontSize: 20,
  },
  uploadPrescriptionText: {
    color: colorPallete.appColor,
    fontSize: 20,
    paddingVertical: 20,
  },
  uploadPrescriptionBox: {
    borderWidth: 2,
    borderColor: colorPallete.appColor,
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
    color: colorPallete.appColor,
    fontSize: 26,
    padding: 20,
  },
  prescriptionBox: {
    width: '98%',
    padding: 5,
    elevation: 2,
    marginTop: 5,
    borderColor: colorPallete.appColor,
    borderStartWidth: 4,
  },
  prescriptionText1: {
    fontSize: 18,
    color: '#000',
    paddingLeft: 20,
  },
});

export default Styles;
