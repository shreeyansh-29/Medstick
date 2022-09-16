import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgrey',
    marginHorizontal: horizontalScale(24),
  },
});
