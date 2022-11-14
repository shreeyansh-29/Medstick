import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: colorPalette.mainColor,
    height: '50%',
    width: '200%',
    borderBottomEndRadius: 530,
    borderBottomStartRadius: 590,
    top: -120,
    right: -120,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: colorPalette.backgroundColor,
  },
  card: {
    borderRadius: 20,
    borderColor: 'white',
    marginVertical: verticalScale(8),
    width: '92%',
    borderWidth: 1,
    shadowColor: 'black',
    elevation: 4,
    backgroundColor: 'red',
  },
  progressCircleContainer: {
    borderWidth: 0,
    alignItems: 'center',
    paddingBottom: verticalScale(12),
    backgroundColor: colorPalette.basicColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    height: verticalScale(170),
    paddingBottom: 15,
  },
  progressText: {fontSize: 20, fontWeight: '600', color: 'black'},
});
