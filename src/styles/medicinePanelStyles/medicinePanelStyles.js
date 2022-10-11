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
    marginHorizontal: horizontalScale(14),
  },
  camera: {height: '100%'},
  listView: {margin: moderateScale(5)},
  list: {marginHorizontal: moderateScale(16)},
  avatarView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medNameView: {flexDirection: 'column', marginLeft: verticalScale(16)},
  medName: {fontWeight: '900'},
  rem: {marginRight: 12},
  icon: {
    flexDirection: 'row',
  },
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
    padding: 15,
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
    width: '15%',
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
    width: '100%',
    height: '30%',
    marginTop: 30,
    backgroundColor: colorPalette.appColor,
    justifyContent: 'center',
  },
  addPrescriptionContainer: {
    height: '100%',
    width: '100%',
    paddingTop: 5,
    backgroundColor: colorPalette.appColor,
  },
  addPrescriptionLottie: {
    alignItems: 'center',
  },
  addPrescriptionList: {
    height: '70%',
    width: '100%',
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
    backgroundColor: colorPalette.basicColor,
  },
  addingPrescription: {
    marginLeft: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    width: '50%',
    alignItems: 'center',
  },
  saveTouchable: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    marginEnd: 20,
  },
  box: {
    margin: '3.6%',
    marginBottom:"30%",
    borderWidth: 1.2,
    padding: '4%',
    borderRadius: 5,
    borderColor: colorPalette.mainColor,
  },
  box1: {
    margin: '3.6%',
    borderWidth: 1.2,
    alignItems: 'center',
    flexDirection:'row',
    padding: '2%',
    borderRadius: 5,
    paddingBottom:"5%",
    paddingHorizontal:"0.5%",
    borderColor: colorPalette.mainColor,
  },
  text: {
    fontSize: 17,
    margin: '3%',
    paddingHorizontal:3,
  },
  box2: {
    margin: '1.6%',
    borderWidth: 1.2,
    alignItems: 'center',
    marginLeft:'3%',
    padding: '2.5%',
    borderRadius: 5,
    paddingHorizontal:2,
    borderColor: colorPalette.mainColor,
  },
});

export default Styles;
