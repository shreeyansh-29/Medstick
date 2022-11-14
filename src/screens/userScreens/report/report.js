import {View, Text, ScrollView, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import {styles} from '../../../styles/reportScreenStyles/reportScreenStyles';
import ProgressReport from '../../../components/atoms/progressCircle';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import MedicinePicker from '../../../components/atoms/medicinePicker';
import {useDispatch, useSelector} from 'react-redux';
import {loadGetMedicineHistoryByDate} from '../../../redux/action/userMedicine/getMedicineHistoryByDateAction';
import DayComponent from './dayComponent';
import HistoryDetail from '../patients/historyDetail';
import AnimatedProgressCircle from '../../../components/atoms/AnimatedProgressCircle';
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
const Report = ({navigation}) => {
  const dispatch = useDispatch();
  const [medicineId, setMedicineId] = useState('');
  // console.log(medicineId, 'mid');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [visible, setVisible] = useState(false);
  const [percentage, setPercentage] = useState();
  const [medicineName, setMedicineName] = useState('');
  const year = selectedDate?.year;
  const month = selectedDate?.month;
  const date = selectedDate?.day;
  const medicineHistory = useSelector(
    state => state.getMedicineHistoryByDateReducer,
  );
  // console.log(medicineHistory, 'medicine History');
  // useEffect(()=>{
  //   dispatch(loadGetMedicineHistory(medicineId))
  // },[])
  const fetchMedicineHistory = () => {
    setSelectDate(year + '-' + month + '-' + date);
    dispatch(loadGetMedicineHistoryByDate(medicineId, selectDate));
  };
  useEffect(() => {
    if (medicineId === null) {
      setVisible(true);
    }
  }, [medicineId]);
  console.log(selectedDate, 'date');
  const ModalOpen = day => {
    console.log('12345');
    setModalVisible(true);
    // fetchMedicineHistory();
  };
  const fetchMedicineId = data => {
    if (data === null) {
      setVisible(true);
    } else setMedicineId(data);
  };
  let startDate = new Date().toDateString();
  const dayComponent = (date, state) => {
    const a = b => b.date == date.dateString;
    const index = dataMap.findIndex(a);
    return (
      <>
        {dataMap.some(a) ? (
          <DayComponent
            date={date}
            state={state}
            selectedDate={selectedDate}
            initialDate={'2022-11-11'}
            setSelectedDate={setSelectedDate}
            percentage={dataMap[index].percentage}
            setModalVisible={ModalOpen}
          />
        ) : (
          <DayComponent
            date={date}
            state={state}
            selectedDate={selectedDate}
            initialDate={'2022-11-11'}
            setSelectedDate={setSelectedDate}
            percentage={0}
            setModalVisible={ModalOpen}
          />
        )}
      </>
    );
  };
  return (
    <>
      <View style={styles.container} />
      <View style={styles.report}>
        <MainHeader title={'Reports'} navigation={navigation} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(!visible)}>
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
            }}>
            <Text>Add Medicine First</Text>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalBox}>
            <HistoryDetail
              data={history}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
        <View style={{paddingHorizontal: 12, paddingTop: 10}}>
          <MedicinePicker onChange={fetchMedicineId} />
        </View>
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
                <AnimatedProgressCircle
                  radius={55}
                  percentage={75}
                  strokeWidth={10}
                />
              </View>
            </View>
          </View>
          <View style={styles.reportHeading}>
            <Text style={styles.reportText}>Your Report</Text>
          </View>
          <View style={styles.calendarView}>
            <Calendar
              style={styles.calendar}
              theme={styles.theme}
              initialDate={startDate}
              minDate={'2012-05-10'}
              maxDate={'2222-12-30'}
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
                    {date.toLocaleDateString()}
                  </Text>
                );
              }}
              enableSwipeMonths={true}
              dayComponent={({date, state}) => dayComponent(date, state)}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const history = {
  historyId: '39e58fff-8f55-47c7-9698-ed693cdf05d0',
  date: '2022-08-30',
  taken: '10:00 AM,14:00 PM,20:00 PM',
  notTaken: '',
};
var dataMap = [
  {date: '2022-11-01', percentage: 91},
  {date: '2022-11-03', percentage: 91},
  {date: '2022-11-05', percentage: 91},
  {date: '2022-11-07', percentage: 61},
  {date: '2022-11-08', percentage: 95},
  {date: '2022-11-09', percentage: 91},
  {date: '2022-11-10', percentage: 91},
  {date: '2022-11-12', percentage: 91},
  {date: '2022-11-13', percentage: 61},
  {date: '2022-11-14', percentage: 95},
  {date: '2022-11-15', percentage: 91},
  {date: '2022-11-17', percentage: 91},
  {date: '2022-11-18', percentage: 95},
  {date: '2022-11-19', percentage: 91},
  {date: '2022-11-21', percentage: 91},
  {date: '2022-11-22', percentage: 21},
  {date: '2022-11-24', percentage: 61},
  {date: '2022-11-25', percentage: 11},
];

export default Report;
