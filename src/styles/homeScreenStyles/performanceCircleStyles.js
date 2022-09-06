import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  performanceContainer: {
    alignItems: 'center',
    paddingBottom: 12,
    backgroundColor:colorPalette.basicColor,
  },
  outerCircle: {top: 16},
  percentage: {fontSize: 18, color: colorPalette.redPercentageColor},
  performance: {
    color: colorPalette.redPercentageColor,
    marginTop: 20,
    marginBottom: 8,
    fontSize: 24,
    paddingTop: 10,
  },
});
