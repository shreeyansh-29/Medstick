import { StyleSheet } from 'react-native';
import { colorPalette } from '../../components/atoms/colorPalette';
export const MedicinePanel = StyleSheet.create({
  flatlistL: {
    width: '100%',
    backgroundColor: '#ffff',
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  text: {
    margin: 10, fontSize: 18, color: '#02aba6',
    justifyContent:'flex-start'
  },
  picker: {
    width: '100%',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#02aba6',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%'
  },
  flatlistMainInfo: {
    shadowColor: '#6777',
    elevation: 20,
    paddingBottom: 20,
    shadowOffset: { width: 0, height: 10 },
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
    borderTopEndRadius:20,
    borderTopStartRadius:20,
    backgroundColor:colorPalette.basicColor,
  },
  addMedicinesHeader: {
    width: '100%',
    height: '30%',
    backgroundColor: colorPalette.appColor
  }
  ,
  addMedicinesLogo: {
    width: '100%',
    height: '80%',
    backgroundColor: colorPalette.appColor
  },
  saveButton: {
    width: '100%',
    height: '10%',
  },
  addPrescriptionIcon: {
    width: '15%',
    marginLeft:35,

  },
  savelogo: {
    width: '100%'
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
  },
  addPrescriptionHeader: {
    width:'100%',
    height:'30%',
    marginTop:30,
    backgroundColor: colorPalette.appColor,
    justifyContent: 'center',

  },
  addPrescriptionContainer: {
    height: '100%',
    width: '100%',
    paddingTop:10,
    backgroundColor: colorPalette.appColor,
    
  },
  addPrescriptionLottie: {
    alignItems: 'center',

  },
  addPrescriptionList: {
    height: '70%',
    width:'100%',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colorPalette.basicColor,
  },
  addMedicinePage:{
    backgroundColor:colorPalette.appColor,
    flex:1,
  },
  addingPrescription:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',

  },
  addingPrescriptionIcon:{
    width:'30%',
paddingLeft:40,
  },
  addingPrescriptionTouchable:{
justifyContent:'flex-end',
  },

  textInput:{
width:'70%'
  },
  saveButton:{
    width:'50%',
    // backgroundColor:'#000'
   
  },
  saveTouchable:{
    position:'absolute',
    right:0,
    bottom:0,
    alignItems:'flex-end',
    marginEnd:20,

  }
});














