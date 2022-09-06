import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    marginHorizontal: 28,
    borderWidth: 1.8,
    height: 50,
    borderColor: colorPalette.mainColor,
    elevation: 4,
    shadowColor: colorPalette.appColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  container: {
    marginTop: 4,
    paddingTop: 8,
    width: '50%',
    height: 40,
  },
  reminder: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: colorPalette.basicColor,
    color: colorPalette.mainColor,
  },
});
