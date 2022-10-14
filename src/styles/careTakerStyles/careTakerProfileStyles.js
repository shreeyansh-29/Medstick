import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  card1: {
    width: '90%',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 3,
    marginVertical: 16,
  },
  mainView: {width: '100%', marginVertical: 10},
  subCont: {flexDirection: 'row', marginVertical: 12},
  subView1: {flex: 2.4},
  subView2: {flex: 3},
  heading: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 18,
  },
  content: {
    color: 'black',
    fontSize: 18,
    fontWeight: '300',
  },
  divider: {marginVertical: 6, height: 1.2, width: '100%'},
  sd: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: colorPalette.mainColor,
    height: '60%',
    width: '120%',
    borderRadius: 300,
    top: -290,
    right: -38,
  },
  sdContainer: {
    flex: 1,
    marginTop: verticalScale(8),
    alignItems: 'center',
  },
  sdSubContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(18),
    paddingLeft: horizontalScale(28),
    marginHorizontal: horizontalScale(10),
  },
  sdText: {marginLeft: horizontalScale(24), width: '80%'},
  sdText1: {fontSize: 20, color: 'grey'},
  lineCont: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
    width: '94%',
  },
  line: {
    flex: 1,
    height: 1.2,
    backgroundColor: 'lightgrey',
    marginHorizontal: horizontalScale(24),
  },
  imgCont: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(8),
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 82,
    borderWidth: 4,
    borderColor: 'white',
  },
  icon: {
    justifyContent: 'center',
  },
});
