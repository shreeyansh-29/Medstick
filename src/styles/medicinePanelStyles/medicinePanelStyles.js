import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  //medicine panel styles
  container: {flex: 1, backgroundColor: '#fafafa'},
  lottie: {justifyContent: 'center', alignItems: 'center', flex: 1},
  flatlist: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: verticalScale(16),
  },
  card: {
    borderRadius: 20,
    margin: 4,
    borderColor: 'lightgrey',
    elevation: 4,
    shadowColor: 'black',
    marginHorizontal: horizontalScale(20),
  },
  listView: {marginBottom: 7},
  list: {height: 80, marginHorizontal: 20, marginTop: 4},
  avatarView: {flexDirection: 'row'},
  medNameView: {flexDirection: 'column', margin: 3},
  medName: {fontWeight: '600'},
  rem: {marginRight: 12},

  //add medicine styles
  flatlistMainInfo: {
    shadowColor: '#6777',
    elevation: 20,
    paddingBottom: 20,
    shadowOffset: {width: 0, height: 10},
    shadowColor: '#171717',
    shadowOpacity: 0.51,
    shadowRadius: 13,
    elevation: 10,
  },
  flatlistInfo: {
    marginLeft: 25,
    marginBottom: 10,
  },
  constainer: {
    padding: 20,
    flex: 1,
  },
});
