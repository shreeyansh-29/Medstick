import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  //cn --- caretakerName
  cnConatiner: {flexDirection: 'row', marginTop: 10, paddingLeft: 8},
  cnChechBoxIcon: {borderColor: colorPalette.mainColor, borderWidth: 1.3},
  cnCheckBoxText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 17,
    color: 'black',
  },
  cnText: {fontWeight: '600', fontSize: 18},
  cnText1: {fontWeight: '600', fontSize: 16},
  // cnView: {marginTop: 5},

  //mn --- medicineNAme
  mnView: {marginTop: 15, marginBottom: 6},
  mnText: {marginLeft: 8, fontSize: 18, fontWeight: '700', color: '#858383'},

  //main container
  container: {flex: 1, backgroundColor: 'white'},
  modal: {alignItems: 'center'},
  modalOuterView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  modalInnerView: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '70%',
    height: '50%',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  container1Text: {fontWeight: 'bold', fontSize: 20},
  image: {height: '100%', width: '100%', borderRadius: 10},
  imgContainer: {
    height: verticalScale(260),
    padding: 7,
  },
  //BottomButton
  button: {
    backgroundColor: colorPalette.mainColor,
    marginHorizontal: 100,
    paddingVertical: 10,
  },
  buttonContainer: {marginVertical: 100},
  share: {
    fontWeight: 'bold',
    color: colorPalette.basicColor,
    fontSize: 16,
  },
  shareIcon: {marginRight: 8},
  shareCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPalette.mainColor,
    padding: 12,
    borderRadius: 8,
  },
  parentCont: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
  },
  renderMeds: {marginHorizontal: 9, marginTop: -14, marginBottom: 10},
  renderCT: {marginHorizontal: 9, marginTop: -14},
});
