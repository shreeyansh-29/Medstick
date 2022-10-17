import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {verticalScale} from '../../components/atoms/constant';

const styles = StyleSheet.create({
  dateday: {
    borderRadius: 11,
    elevation: 3,
    padding: 10,
    borderColor: 'grey',
    width: '95%',
    alignSelf: 'center',
    marginBottom: 14,
    borderTopWidth: 3,
    borderTopColor: colorPalette.mainColor,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateView: {alignItems: 'center', marginLeft: 12},
  date: {fontSize: 16, fontWeight: '600', marginLeft: 19, color: 'black'},
  progressView: {alignItems: 'center', marginRight: 60},
  divider: {height: 1, marginVertical: 8},
  divider1: {
    marginVertical: 7,
    height: 1,
    color: 'grey',
    width: '94%',
    alignSelf: 'center',
  },
  takenText: {color: '#66bb6a'},

  //main
  detailView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  lottie: {width: 70, height: 70},
  performanceContainer: {
    alignItems: 'center',
    padding: verticalScale(8),
    backgroundColor: colorPalette.mainColor,
  },
  outerCircle: {},
  percentage: {fontSize: 18, color: colorPalette.redPercentageColor},
  performance: {
    // color: colorPalette.mainColor,
    color: 'white',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
    fontSize: 20,
    // paddingTop: 10,
  },
  color: colorPalette.redPercentageColor,
  shadowColor: colorPalette.restPercentageColor,
  bgColor: colorPalette.basicColor,
  mainCont: {flex: 1, backgroundColor: colorPalette.mainColor},
  progress: {backgroundColor: 'white'},
  bottomSheet: {
    backgroundColor: colorPalette.backgroundColor,
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  mainView: {height: 130, alignItems: 'center', marginTop: 8},
  heading: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    paddingVertical: 4,
    marginBottom: 2,
  },
  scrollView: {
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  scrollViewCont: {alignItems: 'center'},
  scrollViewText: {color: 'black', fontSize: 16, paddingBottom: 4},
  scrollViewDate: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 30,
    color: 'black',
  },
  medicineHistory: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    paddingVertical: 6,
  },
});
export default styles;
