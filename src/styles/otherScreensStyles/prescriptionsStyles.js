import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalette.backgroundColor,
    flex: 1,
  },
  noPrescription: {
    flex: 1,
    backgroundColor: colorPalette.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistView: {
    alignItems: 'center',
    flex: 1,
  },
  flatList: {
    paddingTop: 12,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
  },
  card: {
    width: 172,
    maxHeight: 300,
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 0.4,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: 'black',
  },
  imgCont: {
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 15,
    alignItems: 'center',
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  text1: {fontSize: 14, fontWeight: 'bold'},

  //doctor Prescription
  container1: {
    flex: 1,
    backgroundColor: colorPalette.mainColor,
  },
  lottieCont: {alignItems: 'center', justifyContent: 'center'},
  lottie: {width: '70%'},
  card1: {
    borderRadius: 10,
    marginBottom: 12,
    width: '94%',
    alignSelf: 'center',
  },
  mainView: {
    // marginHorizontal: 6,
    width: '100%',
    marginVertical: 10,
    // backgroundColor: 'yellow',
  },
  subCont: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  subView1: {flex: 2.4},
  subView2: {flex: 3},
  heading: {
    color: 'black',
    fontSize: 19,
    fontWeight: '600',
    paddingLeft: 18,
  },
  content: {
    color: 'black',
    fontSize: 19,
    fontWeight: '300',
  },
  divider: {marginVertical: 6, height: 1.2, width: '100%'},
  touchable: {
    alignSelf: 'center',
    marginVertical: 12,
  },
  btn: {
    color: '#576F72',
    fontSize: 18,
    padding: 8,
    fontWeight: '400',
  },
});
