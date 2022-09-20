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
  lottie: {justifyContent: 'center', alignItems: 'center', flex: 1},
  lottieView: {width: '70%'},
  flatlist: {
    flex: 1,
    top: 200,
    backgroundColor: '#fafafa',
    marginTop: verticalScale(16),
  },
  card: {
    borderRadius: 30,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: 'black',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(14),
  },
  listView: {margin: moderateScale(5)},
  list: {marginHorizontal: moderateScale(16)},
  avatarView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medNameView: {flexDirection: 'column', marginLeft: verticalScale(16)},
  medName: {fontWeight: '600'},
  rem: {marginRight: 12},
  icon: {
    flexDirection: 'row',
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
  saveButton: {
    width: '100%',
    height: '10%',
  },
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
    paddingTop: 10,
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
  },
  textInput: {
    width: '70%',
  },
  saveButton: {
    width: '50%',
    // backgroundColor:'#000'
  },
  saveTouchable: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    marginEnd: 20,
  },
});

export default Styles;
