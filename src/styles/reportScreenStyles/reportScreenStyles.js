import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  report: {
    flex: 1,
    // backgroundColor: colorPalette.basicColor,
  },
  reportContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    // backgroundColor: colorPalette.basicColor,
  },
  analytics: {
    alignItems: 'center',
    width: '80%',
    paddingTop: 50,
    borderRadius: 20,
    paddingBottom: 50,
    backgroundColor: colorPalette.basicColor,
  },
  font: {
    color: colorPalette.mainColor,
    fontSize: 22,
    top: 16,
  },
  percentage: {fontSize: 18, color: colorPalette.redPercentageColor},
  color: colorPalette.greenPercentageColor,
  shadowColor: colorPalette.redPercentageColor,
  bgColor: colorPalette.basicColor,
  outerCircle: {bottom: 12},
  performance: {
    color: colorPalette.hightlightedColor,
    marginTop: 20,
    fontSize: 24,
    paddingTop: 20,
  },
  statistics: {
    marginTop: 10,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,
    paddingBottom: 30,
    backgroundColor: '#EEEEEE',
  },
  header: {
    color: colorPalette.hightlightedColor,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  calenderIcon: {
    position: 'absolute',
    right: '16%',
    top: '1.5%',
  },
  lottie: {height: 40, width: 40},
});
