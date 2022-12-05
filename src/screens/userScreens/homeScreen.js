import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import Reminders from './homeReminders';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import AnimatedProgressCircle from '../../components/atoms/AnimatedProgressCircle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../components/molecules/customModal';
import {useDispatch, useSelector} from 'react-redux';
import {myCaretakerRequest} from '../../redux/action/caretaker/myCaretakerAction';
import CheckConnection from '../../connectivity/checkConnection';
import {verticalScale} from '../../components/atoms/constant';
import {
  getMedicine,
  getPercentageDetails,
  savePercentageDetails,
} from '../../utils/storage';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [connected, connectedstate] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [medData, setMedData] = useState([]);

  let td_da = moment().format('YYYY-MM-DD');

  const checkconnection = async () => {
    let conn = await CheckConnection();
    connectedstate(conn);
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold On!', 'Are you sure you want to exit?', [
  //       {text: 'Cancel', onPress: () => {}, style: 'cancel'},
  //       {text: 'Yes', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );
  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    checkconnection();
  }, []);

  useEffect(() => {
    dispatch(myCaretakerRequest(0));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, []),
  );

  function getPercentage(data) {
    let tr = 0;
    let cc = 0;
    data.map(item => {
      item.historyList.map(k => {
        if (k.date == td_da) {
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
      } else if (data !== null && data.length !==0) {
        obj=data;
        obj.map((item, index) => {
          const a = b => b.date == td_da;
          if (item.date === td_da) {
            item.percentage = Math.floor((cc / tr) * 100);
            obj[index] = item;
            console.log('zzz', obj);
          } else if (!obj.some(a) && tr !== 0) {
            temp.date = td_da;
            temp.percentage = Math.floor((cc / tr) * 100);
            obj.push(temp);
          }
        });
        savePercentageDetails(obj);
        // console.log('Percent in local', data);
      }
    });
    console.log('tr total reminders=>', tr, ' ,cc=> ', cc);
    return Math.floor((cc / tr) * 100);
  }

  function getData() {
    getMedicine().then(data => {
      if (data.length === 0 || data === null) {
        setPercentage(0);
      } else {
        setMedData(data);
        let p = getPercentage(data);
        setPercentage(p);
      }
    });
  }

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

  let res = useSelector(state => state.myCaretaker?.data);
  const [modalVisible, setModalVisible] = useState(false);
  const showAlert = () => {
    if (connected) {
      if (res?.length === 0) {
        Alert.alert('Need to add caretaker first', '', [
          {
            text: 'Ok',
            onPress: () => {},
          },
          {
            text: 'Cancel',
            onPress: () => {
              {
              }
            },
          },
        ]);
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

            <Text style={styles.progressText}>Today's Overall Performance</Text>
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
          <Reminders
            showAlert={showAlert}
            setPercentage={setPercentage}
            data={medData}
          />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
