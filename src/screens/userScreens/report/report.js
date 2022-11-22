import {View, Text, ScrollView, Modal, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import {styles} from '../../../styles/reportScreenStyles/reportScreenStyles';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DayComponent from './dayComponent';
import HistoryDetail from '../patients/historyDetail';
import AnimatedProgressCircle from '../../../components/atoms/AnimatedProgressCircle';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {colorPalette} from '../../../components/atoms/colorPalette';
import ProgressCircle from 'react-native-progress-circle';
import {getMedicine} from '../../../utils/storage';

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
  const [medicineId, setMedicineId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [selectDate, setSelectDate] = useState('');
  const year = selectedDate?.year;
  const month = selectedDate?.month;
  const date = selectedDate?.day;
  const [getUserMedicine, setGetUserMedicine] = useState([]);
  const [historyData, setHistoryData] = useState({});
  const [historyListData, setHistoryListData] = useState([]);
  const isFocused = useIsFocused();


  useEffect(() => {
    if(isFocused){
      getMedicine().then(data => {
        console.log('zzz', data);
        setGetUserMedicine(data);
      });
    }
  }, [isFocused]);

  function getHistory() {
    let histories = [];
    getUserMedicine.map(data => {
      if (data.userMedicineId == medicineId) {
        data.historyList.map(i => {
          let his = {};
          console.log(i, 'his');
          his.historyId = i.historyId;
          his.taken = i.taken;
          his.notTaken = i.notTaken;
          his.date = i.date;
          histories.push(his);
          console.log('222', histories);
          setHistoryListData(histories);
          overallPecentage(data.totalReminders, data.currentCount);
        });
      }
    });
  }
  // useFocusEffect(() => {
  //   const checkMeds = () => {
  //     if (getUserMedicine === null || getUserMedicine.length === 0) {
  //       Alert.alert('Add Medicine First', 'Click Ok to proceed', [
  //         {
  //           text: 'Ok',
  //           onPress: () => {
  //             navigation.navigate('AddMedicineStack', {screen: 'AddMedicine'});
  //           },
  //         },
  //         {
  //           text: 'Cancel',
  //           onPress: () => {
  //             navigation.navigate('Home');
  //           },
  //         },
  //       ]);
  //     }
  //   };
  //   checkMeds();
  // });

  const dayPercentageCalculator = (Taken, notTaken) => {
    const nt = [];
    const t = [];
    if (notTaken !== '') {
      notTaken.split(',').map(i => {
        nt.push(i);
      });
    }
    if (Taken !== '') {
      Taken.split(',').map(i => {
        t.push(i);
      });
    }
    let totalCount = nt.length + t.length;
    return Math.floor((t.length / totalCount) * 100);
  };

  function overallPecentage(totalReminders, currentCount) {
    setPercentage(Math.floor((currentCount / totalReminders) * 100));
  }

  const [dataMap, setDataMap] = useState([]);
  const dateSelector = history => {
    console.log('zzz', history);
    var data = [];
    history.map(item => {
      let percentage = dayPercentageCalculator(item.taken, item.notTaken);
      data.push({date: item.date, percentage: percentage});
    });
    setDataMap(data);
  };

  useEffect(() => {
    if (medicineId !== null) {
      getHistory();
      dateSelector(historyListData);
    }
  }, [medicineId]);

  const ModalOpen = () => {
    setModalVisible(true);
  };

  const alertFunction = () => {
    Alert.alert('You have no reminder of this date', '', [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  };

  const getHistorydata = date => {
    const a = b => b.date == date.dateString;
    const historyIndex = historyListData.findIndex(a);
    console.log('12345', historyListData);
    console.log('z', historyListData[historyIndex]);
    setHistoryData(historyListData[historyIndex]);
    console.log(historyData, 'his');
  };

  let startDate = new Date().toDateString();
  const dayComponent = (date, state) => {
    // console.log('date', date.dateString);
    const a = b => b.date == date.dateString;
    const index = dataMap.findIndex(a);
    // console.log('1234', index);
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
            history={getHistorydata}
          />
        ) : (
          <TouchableOpacity
            style={{}}
            activeOpacity={1}
            onPress={() => alertFunction()}>
            <ProgressCircle
              percent={0}
              radius={15}
              borderWidth={3}
              color={'grey'}
              shadowColor={'lightgrey'}
              bgColor={colorPalette.backgroundColor}>
              <Text style={{fontSize: 16, color: colorPalette.blackColor}}>
                {date.day}
              </Text>
            </ProgressCircle>
          </TouchableOpacity>
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
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalBox}>
            <HistoryDetail
              data={historyData}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
        <View style={{paddingHorizontal: 12, paddingTop: 10}}>
          <View style={styles.picker}>
            <Picker
              mode="dropdown"
              id="picker1"
              selectedValue={medicineId}
              onValueChange={data => {
                setMedicineId(data);
              }}>
              {getUserMedicine?.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.medicineName}
                    value={item.userMedicineId}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
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
                  radius={57}
                  percentage={percentage}
                  strokeWidth={12}
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

const history = [
  {
    historyId: '39e58fff-8f55-47c7-9698-ed693cdf05d0',
    date: '2022-11-01',
    taken: '10:00 AM,2:00 PM,8:00 PM',
    notTaken: '',
  },
  {
    historyId: '39e58fff-8f55-47c7-9698-ed693cdf05d1',
    date: '2022-11-03',
    taken: '10:00 AM,2:00 PM',
    notTaken: '8:00 PM',
  },
  {
    historyId: '39e58fff-8f55-47c7-9698-ed693cdf05d1',
    date: '2022-11-05',
    taken: '10:00 AM',
    notTaken: '2:00 PM,8:00 PM',
  },
  {
    historyId: '39e58fff-8f55-47c7-9698-ed693cdf05d0',
    date: '2022-11-07',
    taken: '10:00 AM,2:00 PM,8:00 PM',
    notTaken: '',
  },
  {
    historyId: '39e58fff-8f55-47c7-9698-ed693cdf05d1',
    date: '2022-11-08',
    taken: '10:00 AM,2:00 PM',
    notTaken: '8:00 PM',
  },
  {
    historyId: '39e58fff-8f55-47c7-9698-ed693cdf05d1',
    date: '2022-11-09',
    taken: '10:00 AM',
    notTaken: '2:00 PM,8:00 PM',
  },
];

export default Report;
