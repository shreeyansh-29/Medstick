import {StyleSheet} from 'react-native';
import {colorPallete} from '../../../components/atoms/colorPalette';

const styles = StyleSheet.create({
  scrollView: {flex: 1, backgroundColor: colorPallete.basicColor},
  container1: {padding: 7, marginBottom: 15},
  containerTouch: {flexDirection: 'row', paddingVertical: 5, marginTop: 5},
  dateContainer: {flexDirection: 'row', width: '100%', paddingVertical: 6},
  dateText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
    color: colorPallete.black,
  },
  startDateContainer: {
    justifyContent: 'flex-start',
    width: '35%',
  },
  endDateContainer: {
    width: '35%',
    alignItems: 'flex-start',
  },
  mainView: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subView: {
    justifyContent: 'flex-end',
    width: '90%',
    alignItems: 'flex-end',
  },
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
    fontWeight: '600',
    color: colorPallete.black,
  },
  titleText: {margin: 8, marginBottom: 10, fontSize: 16},
  timeTouch: {flexDirection: 'row', marginTop: 10},
  timeContainer: {flexDirection: 'column', width: '100%', paddingBottom: 5},
  selectTime: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
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
  selectDays: {fontSize: 16, fontWeight: '600'},
  days: {paddingHorizontal: 16, paddingVertical: 5},
  durationContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 18,
  },
  durationText: {fontWeight: '700'},
  multiSlider: {alignItems: 'center'},
  buttonStyle: {backgroundColor: colorPallete.appColor, width: '50%'},
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 35,
  },
  frequencyTouchable: {
    borderRadius: 3,
    alignItems: 'center',
    borderColor: colorPallete.mainColor,
    backgroundColor: colorPallete.greyColor,
    padding: 6,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'red',
    width:'100%'
  },
  medicineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
    height: '8%',
  },
  takeMedicine: {
    width: '35%',
  },
  takeMedicineText: {
    fontSize: 16,
    fontWeight: '600',
    color: colorPallete.black,
  },
  touchableButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    alignSelf: 'center',
  },
  buttonStyles: {
    borderWidth: 1,
    borderColor: colorPallete.mainColor,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    width: '46.5%',
  },
});
export default styles;
