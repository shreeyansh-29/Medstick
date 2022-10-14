import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container:{position: 'absolute',
  backgroundColor: colorPalette.mainColor,
  height: '50%',
  width: '200%',
  // borderRadius: 180,
  borderBottomEndRadius: 530,
  borderBottomStartRadius: 590,
  top: -150,
  right: -120,},
  report: {
    flex: 1,
    // backgroundColor: colorPalette.basicColor,
  },
  reportContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    marginTop: 25,
    marginBottom: 20,
  },
  analytics: {
    alignItems: 'center',
    width: '92%',
    borderRadius: 10,
    backgroundColor: colorPalette.basicColor,
    justifyContent: 'center',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:30
  },
  container1Text:{
    width: '65%',
    backgroundColor: 'white',
    paddingLeft: horizontalScale(20),
  },
  font: {
    color: colorPalette.mainColor,
    fontSize: 22,
    fontWeight:'600',
    paddingVertical:verticalScale(10)
  },
  fontSmall: {
    color: "grey",
    fontSize: 16,
  },
  progressView:{
    width: '35%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  percentage: {fontSize: 16, color: colorPalette.redPercentageColor},
  color: colorPalette.greenPercentageColor,
  shadowColor: 'lightgrey',
  bgColor: colorPalette.basicColor,
  outerCircle: {bottom: 2},
  performance: {
    color: colorPalette.hightlightedColor,
    marginTop: 20,
    fontSize: 24,
    paddingTop: 10,
  },
  reportHeading: {
    flex: 0.5,
    marginHorizontal: 18,
    justifyContent: 'center',
    marginBottom: 10,
  },
  reportText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
    fontFamily: 'roboto',
  },
  statistics: {
    marginTop: 10,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,
    paddingBottom: 30,
    backgroundColor: '#EEEEEE',
  },
  header: {
    color: colorPalette.hightlightedColor,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  calenderIcon: {
    position: 'absolute',
    right: '16%',
    top: '1.5%',
  },
  lottie: {height: 40, width: 40},
  theme: {
    backgroundColor: 'yellow',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: colorPalette.appColor,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'blue',
    indicatorColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '700',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '800',
    textDayFontSize: 13,
    textMonthFontSize: 10,
    textDayHeaderFontSize: 14,
    arrowStyle: {
      // height:10,
      // width:20
    },
  },
  calendarView:{flex: 5.5, alignItems: 'center', marginBottom: 10},
  calendar: {
    elevation: 2,
    borderRadius: 7,
    width: horizontalScale(320),
    // paddingHorizontal: 10,
  },
  modalHeader:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    padding:10,
    flex:1,
  },
  modalBox:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  modalContainer:{
    width:'98%',
    height:'75%',
    backgroundColor:colorPalette.basicColor,
    
    borderRadius:20,
    borderWidth:1.5,
    borderColor:colorPalette.appColor
  },
  progressBar:{
    
    flex:8,
    padding:10,
    // alignItems:'center',
  },
  modalHeaderText:{
    fontSize:20,
    color:colorPalette.appColor,
    fontWeight:'500'
  },
  modalSubHeader:{
    // justifyContent:'center',
    alignItems:'center',
    flex:2,
    margin:15,
  },
  timeSlot:{
    backgroundColor:colorPalette.appColor,
    borderRadius:70,
  width:'30%',
  height:'15%',
  justifyContent:'center',
  alignItems:'center'
  },
  timeSlotText:{
    color:colorPalette.basicColor,
    fontSize:20,
  },
  picker:{
    borderWidth:2,
    borderColor:colorPalette.appColor,
    backgroundColor:colorPalette.basicColor,
    borderRadius:20,
    paddingHorizontal:10,
  }
});
