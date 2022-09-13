import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  performanceContainer: {
    borderWidth: 0,
    alignItems: 'center',
    paddingBottom: 12,
    backgroundColor: colorPalette.basicColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  outerCircle: {marginTop: 4},
  percentage: {fontSize: 18, color: colorPalette.redPercentageColor},
  performance: {
    // color: colorPalette.mainColor,
    color: '#EB5E0B',
    marginTop: 20,
    marginBottom: 8,
    fontSize: 24,
    // paddingTop: 10,
  },
  color: colorPalette.redPercentageColor,
  shadowColor: colorPalette.restPercentageColor,
  bgColor: colorPalette.basicColor,

  //card
  card: {
    borderRadius: 30,
    margin: 3,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: '#3743ab',
  },
  listView: {marginBottom: 7},
  list: {backgroundColor: 'white', height: 80, width: '100%'},
  avatarView: {flexDirection: 'row'},
  medNameView: {flexDirection: 'column', margin: 3},
  medName: {fontWeight: '600'},
  rem: {marginRight: 10},
  container: {flex: 1, backgroundColor: 'white', height: '100%'},
  imgView: {alignItems: 'center', justifyContent: 'center'},
  img: {width: 300},
  bottom: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
  },
  addButtonTouch: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLottie: {
    bottom: 3,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});
