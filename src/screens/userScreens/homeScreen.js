import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import Reminders from './homeReminders';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import AnimatedProgressCircle from '../../components/atoms/AnimatedProgressCircle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../components/molecules/customModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  myCaretakerClear,
  myCaretakerRequest,
} from '../../redux/action/caretaker/myCaretakerAction';
import {verticalScale} from '../../components/atoms/constant';
import {
  AddMedicine,
  getMedicine,
  getPercentageDetails,
  savePercentageDetails,
} from '../../utils/storage';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {syncDataRequest} from '../../redux/action/userMedicine/syncDataAction';
import Loader from '../../components/atoms/loader';
import {week} from '../../constants/constants';
import uuid from 'react-native-uuid';
import Notifications from '../../pushNotification/pushNotifications';
import {CustomAlert} from '../../components/atoms/customAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const [medData, setMedData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const load = useSelector(state => state.userInfo?.data);
  let res = useSelector(state => state.myCaretaker?.data);
  const [isLoading, setIsLoading] = useState(true);
  const [myCaretakers, setMyCaretakers] = useState([]);
  let td_da = moment().format('YYYY-MM-DD');

  const syncMedicine = () => {
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        let updatedList = data;
        let syncArray = [];
        updatedList.map(item => {
          if (item.isSynced === false) {
            let obj = {
              userMedicineId: item.userMedicineId,
              medicineId: item.medicineId,
              medicineName: item.medicineName,
              description: item.description,
              present: item.present,
              dosageType: item.dosageType,
              dosageQuantity: item.dosageQuantity,
              dosagePower: item.dosagePower,
              stock: item.stock,
              leftStock: item.leftStock,
              reminderId: item.reminderId,
              startDate: item.startDate,
              endDate: item.endDate,
              days: item.days,
              reminderTitle: item.reminderTitle,
              reminderTime: item.reminderTime,
              everyday: item.everyday,
              noEndDate: item.noEndDate,
              reminderStatus: item.reminderStatus,
              frequency: item.frequency,
              beforeAfter: item.beforeAfter,
              totalReminders: item.totalReminders,
              currentCount: item.currentCount,
              prescriptionId: item.prescriptionId,
              doctorName: item.doctorName,
              specialization: item.specialization,
              contact: item.contact,
              location: item.location,
              prescriptionUrl: item.prescriptionUrl,
              doctorAppointmentList: item.appointmentList,
              flag: true,
            };
            syncArray.push(obj);
          }
        });
        dispatch(syncDataRequest(syncArray));
      }
    });
  };

 
  useEffect(() => {
    if (connected && load) {
      dispatch(myCaretakerRequest(0));
    }
  }, [connected, load]);

  useEffect(() => {
    if (res !== null && res.length !== 0) {
      setMyCaretakers(res);
      dispatch(myCaretakerClear());
    }
  }, [res]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, []),
  );

  //for Calculating Overall Percentage
  function getPercentage(data) {
    let tr = 0;
    let cc = 0;
    data.map(item => {
      item.historyList.map(k => {
        if (k.date === td_da && item.reminderTime !== '') {
          tr += item.reminderTime.split(',').length;
          let temp = k.taken.split(',');
          temp.map(i => {
            if (i !== '') {
              cc += 1;
            }
          });
        }
      });
    });
    getPercentageDetails().then(data => {
      let obj = [];
      let temp = {};
      if (data === null) {
        temp.date = td_da;
        temp.percentage = Math.floor((cc / tr) * 100);
        obj.push(temp);
        savePercentageDetails(obj);
      } else if (data !== null && data.length !== 0) {
        obj = data;
        obj.map((item, index) => {
          const a = b => b.date == td_da;
          if (item.date === td_da) {
            item.percentage = Math.floor((cc / tr) * 100);
            obj[index] = item;
          } else if (!obj.some(a) && tr !== 0) {
            temp.date = td_da;
            temp.percentage = Math.floor((cc / tr) * 100);
            obj.push(temp);
          }
        });
        savePercentageDetails(data);
      }
    });
    return Math.floor((cc / tr) * 100);
  }

  const getData = async () => {
    getMedicine().then(data => {
      if (data.length !== 0 && data !== null) {
        // dispatch(storeRequest(data));
        setMedData(data);
        let p = getPercentage(data);
        setPercentage(p);
      } else {
        setMedData([]);
        setPercentage(0);
      }
    });
    setIsLoading(false);
  };

  //for Calculating today's Reminder
  const MedicineHistory = data => {
    var updateArray = [];
    let history = {
      historyId: null,
      date: null,
      taken: '',
      notTaken: '',
      time: '',
      isSynced: false,
    };
    for (let i = 0; i < data?.length; i++) {
      if (data[i].everyday == true) {
        data[i].days = [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thur',
          'Fri',
          'Sat',
        ].toString();
      }
      let arr = data[i].days.split(',');
      let set = new Set(arr);
      var start_date = data[i].startDate;
      var end_date = data[i].endDate;
      var tody_date = new Date();
      let td_da = moment().format('YYYY-MM-DD');
      if (
        data[i].endDate !== 'No End Date' &&
        set.has(week[tody_date.getDay()]) &&
        start_date <= td_da &&
        td_da <= end_date
      ) {
        if (data[i].historyList.length === 0) {
          history.historyId = uuid.v4();
          history.date = td_da;
          history.time = data[i].reminderTime;
          history.notTaken = '';
          history.taken = '';
          data[i].historyList.push(history);
        } else {
          const a = b => b.date === td_da;
          const index = data[i].historyList.findIndex(a);
          if (
            index >= 0 &&
            data[i].reminderTime !== data[i].historyList[index].time
          ) {
            // console.log('Inside Reminder update')
            history.historyId = data[i].historyList[index].historyId;
            history.date = data[i].historyList[index].date;
            history.notTaken = '';
            history.taken = '';
            history.time = data[i].reminderTime;
            data[i].historyList[index] = history;
            data[i].totalReminders = 0;
            data[i].currentCount = 0;
          } else if (index < 0) {
            history.historyId = uuid.v4();
            history.date = td_da;
            history.time = data[i].reminderTime;
            history.notTaken = '';
            history.taken = '';
            data[i].historyList.push(history);
          }
        }
      } else if (data[i].endDate === 'No End Date') {
        const a = b => b.date == td_da;
        const index = data[i].historyList.findIndex(a);
        if (data[i].historyList.length === 0) {
          history.historyId = uuid.v4();
          history.date = td_da;
          history.time = data[i].reminderTime;
          history.notTaken = '';
          data[i].historyList.push(history);
        } else {
          const a = b => b.date === td_da;
          const index = data[i].historyList.findIndex(a);
          // console.log('Indisde No End Date update Reminder')
          if (
            index >= 0 &&
            data[i].reminderTime !== data[i].historyList[index].time
          ) {
            history.historyId = data[i].historyList[index].historyId;
            history.date = data[i].historyList[index].date;
            history.notTaken = '';
            history.taken = '';
            history.time = data[i].reminderTime;
            data[i].historyList[index] = history;
            data[i].totalReminders = 0;
            data[i].currentCount = 0;
          } else if (index < 0) {
            history.historyId = uuid.v4();
            history.date = td_da;
            history.time = data[i].reminderTime;
            history.notTaken = '';
            history.taken = '';
            data[i].historyList.push(history);
          }
        }
      } else if (td_da > end_date) {
        data[i].reminderStatus = false;
      }

      updateArray.push(data[i]);
    }
    AddMedicine(updateArray);
  };

  useEffect(() => {
    medData.map(item => {
      item.reminderId !== null && MedicineHistory(medData);
    });
  }, [medData]);

  useEffect(() => {
    notifyNotification(medData);
  }, []);

  const notifyNotification = medData => {
    let date = new Date();
    let dateNew = moment(date).add(1, 'm').toDate();
    // console.log(medData, 'date');
    let i;
    for (i = 0; i < medData.length; i++) {
      if (parseInt(medData[i].leftStock) >= parseInt(medData[i].stock)) {
        Notifications.notifyMedicineNotification(dateNew, medData[i]?.stock);
      }
    }
  };

  //for Calculating Overall Percentage on particular date
  function getDate(data) {
    getPercentageDetails().then(item => {
      if (item !== null && item.length !== 0) {
        let temp = item;
        temp.forEach(p => {
          if (p.date === data) {
            console.log('Fetch % from local for date', p.percentage);
            setPercentage(p.percentage);
          } else {
            setPercentage(0);
          }
        });
      }
    });
  }

  const showAlert = () => {
    if (connected && load) {
      if (myCaretakers?.length === 0) {
        CustomAlert({text1: 'Need to add caretaker first'});
      } else {
        Alert.alert(
          'Would you like to send a snap to caretaker',
          'Click Ok to send',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('HomeStack', {
                  screen: 'SendSnapToCaretaker',
                });
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                {
                }
              },
            },
          ],
        );
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background} />
        <MainHeader title={'Medstick'} navigation={navigation} />
        <View style={styles.card}>
          <Calender date={getDate} />
          <View style={styles.progressCircleContainer}>
            {percentage >= 0 ? (
              <AnimatedProgressCircle
                radius={verticalScale(50)}
                percentage={percentage}
                strokeWidth={verticalScale(10)}
              />
            ) : (
              <AnimatedProgressCircle
                radius={verticalScale(50)}
                percentage={0}
                strokeWidth={verticalScale(10)}
              />
            )}

            <Text style={styles.progressText}>Overall Performance</Text>
          </View>
        </View>
        <View>
          <CustomModal
            modalVisible={modalVisible}
            type="fade"
            modalView={
              <View style={styles.modalContainer}>
                <Text style={styles.modalHeading}>INFO</Text>
                <Text style={{fontSize: 18, color: 'grey'}} numberOfLines={3}>
                  All your Reminders will be shown here. Save and mark your
                  reminders to view your report in Report Section.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  activeOpacity={0.8}
                  style={styles.modalTouch}>
                  <Text style={styles.modalOk}>OK</Text>
                </TouchableOpacity>
              </View>
            }
            onRequestClose={() => setModalVisible(!modalVisible)}
            customStyles={styles.modal}
          />
        </View>
        <View style={styles.reminderView}>
          <Text style={styles.font}>Reminders</Text>
          <View style={styles.info}>
            <TouchableOpacity
              style={styles.circle}
              activeOpacity={0.8}
              onPress={() => setModalVisible(!modalVisible)}>
              <FontAwesomeIcon icon={faInfo} color={'grey'} size={13} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: '44%'}}>
          {isLoading ? (
            <Loader />
          ) : (
            <Reminders
              showAlert={showAlert}
              setPercentage={setPercentage}
              data={medData}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
