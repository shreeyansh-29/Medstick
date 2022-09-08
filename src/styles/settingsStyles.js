import {StyleSheet} from 'react-native';
import {colorPalette} from '../components/atoms/colorPalette';

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: colorPalette.basicColor},
  setting: {color: 'gray', fontSize: 16, marginLeft: 15},
  settingItems: {color: 'black', fontSize: 18},
  general: {color: 'gray', fontSize: 16, marginLeft: 15},
});
export default styles;
