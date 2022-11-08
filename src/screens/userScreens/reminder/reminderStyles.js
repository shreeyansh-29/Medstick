import {StyleSheet} from 'react-native';
import {colorPalette} from '../../../components/atoms/colorPalette';

const styles = StyleSheet.create({
  scrollView: {height: '100%', backgroundColor: 'white'},
  top: {height: '100%', backgroundColor: 'white'},
  container1: {height: '100%', padding: 7, marginBottom: 15},
  containerTouch: {flexDirection: 'row', paddingVertical: 5, marginTop: 5},
  dateContainer: {flexDirection: 'row', width: '100%', paddingVertical: 6},
  dateText: {fontSize: 16, marginLeft: 8, fontWeight: '700'},
  dateText1: {
    fontSize: 17,
    marginLeft: 8,
    color: 'black',
  },
  arrow: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    right: 4,
    width: '10%',
  },
  title: {
    fontSize: 17,
    marginLeft: 8,
    marginTop: 10,
    fontWeight: '700',
  },
  titleText: {margin: 8, marginBottom: 10, fontSize:16},
  timeTouch: {flexDirection: 'row', marginTop: 10},
  timeContainer: {flexDirection: 'column', width: '100%', paddingBottom: 5},
  selectTime: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '700',
    marginBottom: 5,
  },
  downIcon: {right: 0, position: 'absolute'},
  timeTextConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
    width: '80%',
    alignSelf: 'center',
    paddingBottom: 6,
  },
  timeText: {fontWeight: '800'},
  selectDays: {fontSize: 16, fontWeight: '700'},
  days: {paddingHorizontal: 16, paddingVertical:5,},
  durationContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 18,
  },
  durationText: {fontWeight: '700'},
  multiSlider: {alignItems: 'center'},
  buttonStyle: {backgroundColor: colorPalette.appColor, width: '50%'},
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 35,
  },
});
export default styles;
