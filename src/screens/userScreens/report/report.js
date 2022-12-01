import {View, Text, ScrollView, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
import {useEffect} from 'react';

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
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
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
  dayNamesShort: ['Sun','Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

const Report = ({navigation}) => {
  const [medicineId, setMedicineId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [getUserMedicine, setGetUserMedicine] = useState([]);
  const [historyData, setHistoryData] = useState({});
  const [historyListData, setHistoryListData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused)
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          setGetUserMedicine(data);
        } else {
          setGetUserMedicine([]);
          showAlert();
        }
      });
  }, [isFocused]);

  const showAlert = () => {
    Alert.alert('Add Medicine First', 'Click Ok to proceed', [
      {
        text: 'Ok',
        onPress: () => {
          navigation.navigate('AddMedicineStack', {
            screen: 'AddMedicine',
          });
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          navigation.navigate('Home');
        },
      },
    ]);
  };

  function getHistory() {
    let histories = [];
    getUserMedicine.map(data => {
      if (data.userMedicineId == medicineId && data.historyList.length !== 0) {
        data.historyList.map(i => {
          let his = {};
          his.historyId = i.historyId;
          his.taken = i.taken;
          his.notTaken = i.notTaken;
          his.date = i.date;
          histories.push(his);
          setHistoryListData(histories);
          dateSelector(histories);
          overallPecentage(data);
        });
      } else if (
        data.userMedicineId == medicineId &&
        data.historyList.length === 0
      ) {
        setHistoryListData([]);
        dateSelector([]);
        overallPecentage(0, 0);
      }
    });
  }

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
    let takenLength = 0;
    let notTakenLength = 0;
    nt.map(i => {
      if (i !== '') {
        notTakenLength += 1;
      }
    });
    t.map(i => {
      if (i !== '') {
        takenLength += 1;
      }
    });
    let totalCount = notTakenLength + takenLength;
    return Math.floor((takenLength / totalCount) * 100);
  };

  function overallPecentage(data) {
    let cc = 0;
    let tr = 0;
    data.historyList.map(item => {
      tr += data.reminderTime.split(',').length;
      let temp = item.taken.split(',');
      temp.map(i => {
        if (i !== '') {
          cc += 1;
        }
      });
    });
    console.log('tr and cc in Report', tr, cc);
    setPercentage(Math.floor((cc / tr) * 100));
  }

  const [dataMap, setDataMap] = useState([]);
  const dateSelector = history => {
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
    console.log('date', date);
    const a = b => b.date == date.dateString;
    const historyIndex = historyListData.findIndex(a);
    console.log('his', historyListData[historyIndex]);
    setHistoryData(historyListData[historyIndex]);
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
            initialDate={'2022-11-21'}
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
        <MainHeader title={'Report'} navigation={navigation} />

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
              style={{color: 'black'}}
              mode="dropdown"
              selectedValue={medicineId}
              onValueChange={data => {
                getHistory();
                setMedicineId(data);
                console.log('medicineId', data);
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
              }}
              monthFormat={'yyyy MM'}
              onMonthChange={month => {
              }}
              hideArrows={false}
              disableMonthChange={true}
              firstDay={7}
              hideDayNames={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
              enableSwipeMonths={true}
              dayComponent={({date, state}) => dayComponent(date, state)}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Report;
