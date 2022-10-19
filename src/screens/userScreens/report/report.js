import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import {styles} from '../../../styles/reportScreenStyles/reportScreenStyles';
import ProgressReport from '../../../components/atoms/progressCircle';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {horizontalScale} from '../../../components/atoms/constant';
import {icon} from '@fortawesome/fontawesome-svg-core';
import CrossButton from '../../../components/atoms/crossButton';
import Line from '../../../components/atoms/line';
import Dot from '../../../components/atoms/dot';
import ProgressBar from '../../../components/molecules/progressBar';
import TimeSlot from '../../../components/atoms/timeSlot';
import {Picker} from '@react-native-picker/picker';
import MedicinePicker from '../../../components/atoms/medicinePicker';
import { useDispatch, useSelector } from 'react-redux';
import { loadGetMedicineHistory } from '../../../redux/action/userMedicine/getMedicineHistoryAction';
import TimeText from '../../../components/atoms/Text';
import MedicineTime from '../../../components/molecules/medicineTime';
import { loadGetMedicineHistoryByDate } from '../../../redux/action/userMedicine/getMedicineHistoryByDateAction';
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Décember',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul.',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
};
LocaleConfig.defaultLocale = 'en';
const Report = ({ navigation }) => {
  const dispatch = useDispatch()
  const [medicineId, setMedicineId] = useState('')
  console.log(medicineId, "mid")
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('')
  const [selectDate,setSelectDate]=useState('')
  console.log(selectedDate,'sdate')
  const [medicineName, setMedicineName] = useState('')
  
  const year = selectedDate?.year
  const month = selectedDate?.month
  const date = selectedDate?.day

  const medicineHistory = useSelector(state => state.getMedicineHistoryByDateReducer)
  console.log(medicineHistory, "medicine History")
  // useEffect(()=>{
  //   dispatch(loadGetMedicineHistory(medicineId))
  // },[])

  const fetchMedicineHistory=()=>{
    setSelectDate(year+'-'+month+'-'+date)
    dispatch(loadGetMedicineHistoryByDate(medicineId,selectDate))
  }
 

  console.log(selectedDate, "date")
  const modalOpen=(day)=>{
    console.log(day)
    setSelectedDate(day)
    setModalVisible(true)
    fetchMedicineHistory()
    
  }

  const fetchMedicineId = (data) => {
    setMedicineId(data)
    if (medicineId !== null) {
      // dispatch(loadGetMedicineHistory(medicineId))
    }
  }

  let startDate = new Date().toDateString();
  return (
    <>
      <View style={styles.container} />
      <View style={styles.report}>
        <MainHeader title={'Reports'} navigation={navigation} />
        <View style={{padding:15}}>
        <MedicinePicker
          onChange={fetchMedicineId}
        /></View>
        

        <ScrollView>
          <View style={styles.reportContainer}>
            <View style={styles.analytics}>
              <View style={styles.container1Text}>
                <Text style={styles.font}>Overall Performance</Text>
                <Text style={styles.fontSmall}>
                  This percentage shows your overall adherence rate.
                </Text>
              </View>
              <View style={styles.progressView}>
                <ProgressReport
                  styles={styles}
                  radius={42}
                  borderWidth={6}
                  percent={3}
                />
              </View>
            </View>
          </View>
          <View style={styles.reportHeading}>
            <Text style={styles.reportText}>Your Report</Text>
          </View>
          <View style={styles.calendarView}>
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalBox}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <CrossButton />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modalSubHeader}>
                      <Text style={styles.modalHeaderText}>
                        DATE: {date} -{month} -{year}
                      </Text>
                    </View>

                    <View style={styles.progressBar}>
                      <TimeSlot
                        time={'Time'}
                      />
                      <ProgressBar />
                      <MedicineTime />

                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <Calendar
              style={styles.calendar}
              theme={styles.theme}
              initialDate={startDate}
              minDate={'2012-05-10'}
              maxDate={'2222-12-30'}
              onDayPress={day => {
                modalOpen(day,year,month,date)
              }}
              onDayLongPress={day => {
                // console.log('selected day', day);
              }}
              monthFormat={'yyyy MM'}
              onMonthChange={month => {
                // console.log('month changed', month);
              }}
              hideArrows={false}
              hideExtraDays={true}
              disableMonthChange={true}
              firstDay={7}
              hideDayNames={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
              renderHeader={date => {
                return (
                  <Text
                    style={{fontSize: 20, fontWeight: '600', color: 'grey'}}>
                    {date.toDateString()}
                  </Text>
                );
              }}
              enableSwipeMonths={true}
              markingType={'dot'}
              markedDates={markedDay}
            />
          </View>
          {data.date == '2022-09-22' ? (
            <View></View>
          ) : (
            <View style={{ margin: 15 }}>
              <Text style={{ fontSize: 17, color: 'black' }}>No Remainders</Text>

            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

function ColorCode(percentage) {
  if (percentage < 60) {
    return colorPalette.redPercentageColor;
  } else if (61 <= percentage && percentage < 90) {
    return 'orange';
  } else {
    return colorPalette.greenPercentageColor;
  }
}

const data = [
  {id: 1, date: '2022-09-22', percentage: 100},
  {id: 2, date: '2022-09-23', percentage: 70},
  {id: 3, date: '2022-09-24', percentage: 30},
  {id: 4, date: '2022-09-25', percentage: 93},
  {id: 1, date: '2022-10-02', percentage: 100},
  {id: 2, date: '2022-10-03', percentage: 70},
  {id: 3, date: '2022-10-04', percentage: 30},
  {id: 4, date: '2022-10-15', percentage: 93},
  {id: 1, date: '2022-10-12', percentage: 100},
  {id: 2, date: '2022-10-23', percentage: 70},
  {id: 3, date: '2022-10-24', percentage: 30},
  {id: 4, date: '2022-10-25', percentage: 93},
];
let markedDay = {};

data.map(item => {
  // console.log(item.percentage);
  markedDay[item.date] = {
    selected: true,
    marked: true,
    selectedColor: ColorCode(item.percentage),
  };
});

export default Report;
