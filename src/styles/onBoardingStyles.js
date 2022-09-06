import {StyleSheet} from 'react-native';
import {colorPalette} from '../components/atoms/colorPalette';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colorPalette.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: 400, height: 400, marginTop: 20},
});
export default styles;
