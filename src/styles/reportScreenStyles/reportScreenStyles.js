import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const reportStyles = StyleSheet.create({
  report: {
    flex: 1,
    backgroundColor: colorPalette.basicColor,
  },
  reportContainer: {
    justifyContent:'center',
    alignItems: 'center',
  },
  analytics: {
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,
    paddingBottom: 30,
    backgroundColor: '#EEEEEE',
  },
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
});
