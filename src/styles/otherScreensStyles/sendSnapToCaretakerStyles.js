import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../components/atoms/constant';

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
  mnView: {marginTop: verticalScale(14), marginBottom: verticalScale(5)},
  mnText: {
    marginLeft: horizontalScale(6),
    fontSize: 18,
    fontWeight: '700',
    color: '#858383',
  },

  //main container
  container: {flex: 1, backgroundColor: colorPalette.backgroundColor},
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: moderateScale(9),
  },
  container1Text: {fontWeight: 'bold', fontSize: 20},
  image: {height: '100%', width: '100%', borderRadius: 10},
  imgContainer: {
    height: verticalScale(260),
    padding: moderateScale(7),
  },
  //BottomButton
  button: {
    backgroundColor: colorPalette.mainColor,
    marginHorizontal: horizontalScale(100),
    paddingVertical: verticalScale(10),
    borderRadius: 8,
  },
  buttonContainer: {marginVertical: 100},
  share: {
    fontWeight: 'bold',
    color: colorPalette.basicColor,
    fontSize: 16,
  },
  shareIcon: {marginRight: horizontalScale(8)},
  shareCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPalette.mainColor,
    padding: moderateScale(12),
    borderRadius: 8,
  },
  parentCont: {
    paddingHorizontal: horizontalScale(10),
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
  },
  renderMeds: {
    marginHorizontal: horizontalScale(7),
    marginTop: verticalScale(-14),
    marginBottom: verticalScale(10),
  },
  renderCT: {
    marginHorizontal: horizontalScale(7),
    marginTop: verticalScale(-14),
  },
});
