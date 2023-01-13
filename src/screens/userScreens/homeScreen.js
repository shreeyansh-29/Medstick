import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import Reminders from './homeReminders';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import AnimatedProgressCircle from '../../components/atoms/AnimatedProgressCircle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  myCaretakerClear,
  myCaretakerRequest,
} from '../../redux/action/caretaker/myCaretakerAction';
import {verticalScale} from '../../components/atoms/constant';
import {getMedicine, getPercentageDetails} from '../../utils/storage';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/atoms/loader';
// import Notifications from '../../pushNotification/pushNotifications';
import {CustomAlert} from '../../components/atoms/customAlert';
import syncMedicine from '../../sync/syncMedicine';
import fetchUserMedicine from '../../sync/fetchUserMedicine';
import {
  clearMedicineList,
  loadMedicineList,
} from '../../redux/action/userMedicine/medicineListAction';
import {
  getAppointmentListClear,
  getAppointmentListRequest,
} from '../../redux/action/userMedicine/getAppointmentListAction';
import {
  getAllMedicineHistoryClear,
  getAllMedicineHistoryRequest,
} from '../../redux/action/userMedicine/getAllMedicineHistoryAction';
import MedicineHistory from './medicineHistory';
import getPercentage from './getPercentage';
import {colorPallete} from '../../components/atoms/colorPalette';
import CustomTooltip from '../../components/atoms/customTooltip';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const [medData, setMedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myCaretakers, setMyCaretakers] = useState([]);
  const [showTip, setShowTip] = useState(false);

  const connected = useSelector(state => state.internetConnectivity?.data);
  const load = useSelector(state => state.userInfo?.data);
  const res = useSelector(state => state.myCaretaker?.data);
  const userMedicine = useSelector(state => state.medicineList?.data);
  const appointmentList = useSelector(state => state.appointmentList?.data);
  const historyList = useSelector(state => state.allMedicineHistory?.data);
  const errorState = useSelector(state => state.medicineList?.error);

  // const backAction = () => {
  //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //   ]);
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  useEffect(() => {
    if (userMedicine !== null && userMedicine.length !== 0) {
      fetchUserMedicine(userMedicine, appointmentList, historyList);
    }
    dispatch(clearMedicineList());
    dispatch(getAppointmentListClear());
    dispatch(getAllMedicineHistoryClear());
  }, [userMedicine, errorState]);

  useEffect(() => {
    if (connected && load) {
      if (medData.length !== 0) {
        dispatch(myCaretakerRequest(0));
      }
      (async () => {
        dispatch(loadMedicineList());
        dispatch(getAllMedicineHistoryRequest());
        dispatch(getAppointmentListRequest());
      })();
    }
  }, [connected, load]);

  useEffect(() => {
    if (res !== null && res.length !== 0) {
      setMyCaretakers(res);
      dispatch(myCaretakerClear());
    }
    return () => {};
  }, [res]);

  useFocusEffect(
    React.useCallback(() => {
      getData().then(() => {
        if (connected && load) {
          syncMedicine(dispatch);
        }
      });
    }, [connected, load]),
  );

  const getData = async () => {
    getMedicine().then(data => {
      if (data.length !== 0 && data !== null) {
        setMedData(data);
        //for Calculating Overall Percentage
        let p = getPercentage(data);
        setPercentage(p);
      } else {
        setMedData([]);
        setPercentage(0);
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    //for Calculating today's Reminder
    medData.length !== 0 ? MedicineHistory(medData, dispatch) : null;
  }, [medData]);

  // useEffect(() => {
  //   notifyNotification(medData);
  // }, []);

  // const notifyNotification = medData => {
  //   let date = new Date();
  //   let dateNew = moment(date).add(1, 'm').toDate();
  //   // console.log(medData, 'date');
  //   let i;
  //   for (i = 0; i < medData.length; i++) {
  //     if (parseInt(medData[i].leftStock) >= parseInt(medData[i].stock)) {
  //       Notifications.notifyMedicineNotification(dateNew, medData[i]?.stock);
  //     }
  //   }
  // };

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
      Alert.alert(
        'Would you like to send a snap to caretaker',
        'Click Ok to send',
        [
          {
            text: 'Ok',
            onPress: () => {
              if (myCaretakers.length === 0) {
                CustomAlert({text1: 'Need to add caretaker first'});
              } else {
                navigation.navigate('HomeStack', {
                  screen: 'SendSnapToCaretaker',
                });
              }
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

        <View style={styles.reminderView}>
          <Text style={styles.font}>Reminders</Text>
          <View style={styles.info}>
            <CustomTooltip
              isVisible={showTip}
              setShowTip={setShowTip}
              placement="top"
              supportedOrientations={['portrait']}
              tooltipStyle={{marginLeft: 14}}
              contentStyle={{width: '100%', height: '100%'}}
              onClose={() => setShowTip(false)}
              content={
                <Text style={{fontSize: 16, color: 'grey'}}>
                  All your reminders will be shown here. Save and mark your
                  reminders to view your report in Report Tab.
                </Text>
              }>
              <TouchableOpacity
                style={styles.circle}
                activeOpacity={0.6}
                onPress={() => setShowTip(true)}>
                <FontAwesomeIcon
                  icon={faInfo}
                  color={colorPallete.mainColor}
                  size={13}
                />
              </TouchableOpacity>
            </CustomTooltip>
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
