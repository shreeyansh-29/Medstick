import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPalette.backgroundColor},
  form: {
    backgroundColor: colorPalette.backgroundColor,
  },
  formView: {
    width: '90%',
  },
  field: {
    marginLeft: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    width: '86%',
  },
  lottieCont: {
    height: '80%',
    alignItems: 'center',
    marginVertical: verticalScale(124),
    // justifyContent: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
    backgroundColor: colorPalette.backgroundColor,
  },
  text: {
    color: 'red',
    marginTop: 8,
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 33,
  },
  listButton: {
    backgroundColor: colorPalette.mainColor,
    padding: 10,
    borderRadius: 4,
  },
  text1: {color: colorPalette.backgroundColor},
  card: {
    borderRadius: 16,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: 'black',
    marginBottom: verticalScale(5),
    marginHorizontal: horizontalScale(8),
    backgroundColor: colorPalette.basicColor,
  },
  mainView: {margin: 3},
  listView: {marginHorizontal: 8},
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {flexDirection: 'column', marginLeft: 10},
  font: {fontWeight: '600', fontSize: 18},
});
