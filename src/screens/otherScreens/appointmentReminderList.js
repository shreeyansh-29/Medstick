import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import CustomImage from '../../components/atoms/customImage';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../components/molecules/customModal';
import UpdateAppointment from './updateAppointment';
import {useIsFocused} from '@react-navigation/native';
import {AddMedicine, getMedicine} from '../../utils/storage';
import Loader from '../../components/atoms/loader';
import PushNotification from 'react-native-push-notification';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {monthName} from '../../constants/constants';
import {colorPallete} from '../../components/atoms/colorPalette';
import moment from 'moment';

const AppointmentReminderList = ({navigation}) => {
  const isFocused = useIsFocused();
  const [appointments, setAppointments] = useState([]);
  const [notes1, setNotes1] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [temp, setTemp] = useState('');
  const [time1, setTime1] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [doctorName, setDoctorName] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);

  let todayDate = new Date();
  let currentTime =
    todayDate?.getHours() +
    ':' +
    (todayDate?.getMinutes() < 10
      ? '0' + todayDate.getMinutes()
      : todayDate.getMinutes());

  todayDate =
    todayDate.getFullYear() +
    '-' +
    (todayDate.getMonth() + 1) +
    '-' +
    (todayDate.getDate() < 10
      ? '0' + todayDate.getDate()
      : todayDate.getDate());

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      false;
    };
  }, []);

  // const backAction = () => {
  //   setDoctorName([]);
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  const fetchData = () => {
    setRefresh(true);
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        let updatedList = data;
        let doctorList = [];
        let reminderList = [];

        updatedList.map(item => {
          if (item.doctorName !== null && item.medicineName !== null) {
            doctorList.push({
              doctorName: item.doctorName,
              prescriptionId: item.prescriptionId,
            });
          }
          if (item.appointmentList.length !== 0) {
            item.appointmentList.map(ele => {
              if (ele?.date >= todayDate) {
                reminderList.push(ele);
              } else {
                item.appointmentList.pop(ele);
                AddMedicine(updatedList);
              }
            });
          }
        });

        const key1 = 'prescriptionId';
        const uniqueDoctor = [
          ...new Map(doctorList.map(item => [item[key1], item])).values(),
        ];

        setDoctorName(uniqueDoctor);

        const key2 = 'appointmentId';
        const uniqueReminder = [
          ...new Map(reminderList.map(item => [item[key2], item])).values(),
        ];
        setAppointments(uniqueReminder);
      }
    });
    setRefresh(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const onClickDeleteAppointment = deleteId => {
    getMedicine().then(data => {
      let updatedList = data;
      let time;
      updatedList.map(a => {
        if (a.appointmentList.length !== 0) {
          a.appointmentList.map((r, index) => {
            if (r.appointmentId === deleteId) {
              time = r.time;
              a.appointmentList.splice(index, 1);
              a.isModified = true;
            }
          });
        }
      });
      AddMedicine(updatedList);
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          let reminderList = [];
          data.map(item => {
            if (item.appointmentList.length !== 0) {
              item.appointmentList.map(ele => {
                reminderList.push(ele);
              });
            }
          });
          const key2 = 'appointmentId';
          const uniqueReminder = [
            ...new Map(reminderList.map(item => [item[key2], item])).values(),
          ];
          setAppointments(uniqueReminder);
        }
      });
      PushNotification.getScheduledLocalNotifications(rn => {
        for (let i = 0; i < rn.length; i++) {
          if (
            'You have an appointment scheduled at' + ' ' + time ===
              rn[i].message &&
            rn[i].title === 'Appointment!'
          ) {
            PushNotification.cancelLocalNotification({id: rn[i].id});
          }
        }
      });
    });
  };

  const renderItem = ({item}) => {
    const dateHandler = date => {
      let dob = date.split('-');
      return dob[2] + '-' + monthName[dob[1]] + '-' + dob[0];
    };

    let localTime = moment(item.time, ['h:mm A']).format('HH:mm');

    return (
      <View style={styles.top}>
        <ListItem>
          <ListItem.Content style={styles.mainView}>
            <View style={styles.view}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 2,
                }}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Date
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {dateHandler(item?.date)}
                </ListItem.Subtitle>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 2,
                }}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Time
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {item.time}
                </ListItem.Subtitle>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Note
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {item.notes}
                </ListItem.Subtitle>
              </View>
            </View>
            <View style={styles.subView}>
              {item?.date === todayDate ? (
                <>
                  {localTime >= currentTime ? (
                    <>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          setModalVisible(true);
                          setTemp(item.date);
                          setTime1(item.time);
                          setNotes1(item.notes);
                          setAppointmentId(item?.appointmentId);
                        }}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          size={19}
                          color={colorPallete.mainColor}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          Alert.alert(
                            'Are you sure!!!',
                            'Click ok to proceed',
                            [
                              {
                                text: 'Ok',
                                onPress: () => {
                                  onClickDeleteAppointment(item?.appointmentId);
                                },
                              },
                              {
                                text: 'Cancel',
                                onPress: () => {},
                              },
                            ],
                          );
                        }}>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          size={19}
                          color={colorPallete.mainColor}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text
                      style={{color: 'gray', fontSize: 16, fontWeight: '500'}}>
                      Expired
                    </Text>
                  )}
                </>
              ) : (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setModalVisible(true);
                      setTemp(item.date);
                      setTime1(item.time);
                      setNotes1(item.notes);
                      setAppointmentId(item?.appointmentId);
                    }}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size={19}
                      color={colorPallete.mainColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      Alert.alert('Are you sure!!!', 'Click ok to proceed', [
                        {
                          text: 'Ok',
                          onPress: () => {
                            onClickDeleteAppointment(item?.appointmentId);
                          },
                        },
                        {
                          text: 'Cancel',
                          onPress: () => {},
                        },
                      ]);
                    }}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size={19}
                      color={colorPallete.mainColor}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SubHeader
        title={'Appointment Reminders'}
        navigation={navigation}
        routeName={'SaveAppointment'}
        notes={doctorName}
      />

      <CustomModal
        onRequestClose={() => setModalVisible(false)}
        type="fade"
        modalVisible={modalVisible}
        modalView={
          <UpdateAppointment
            setModalVisible={setModalVisible}
            notes1={notes1}
            time1={time1}
            temp={temp}
            appointmentId={appointmentId}
            setAppointments={setAppointments}
          />
        }
      />

      {showLoader ? (
        <Loader />
      ) : (
        <>
          {appointments.length === 0 ? (
            <View style={styles.imgCont}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
                source={require('../../assets/images/noAppointments.png')}
              />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={appointments}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={fetchData}
                  colors={[colorPallete.mainColor]}
                  tintColor={colorPallete.mainColor}
                />
              }
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  imgCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  img: {width: '70%'},
  top: {marginVertical: 2},

  reminderKey: {
    fontSize: 16,
    fontWeight: '900',
    color: 'black',
    width: '16%',
  },
  listSubtitle: {
    fontSize: 15,
    color: 'gray',
    width: '84%',
    paddingTop: 1.6,
  },
  view: {width: '80%', justifyContent: 'center'},
  subView: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-evenly',
  },
  mainView: {flexDirection: 'row', alignItems: 'center'},
});

export default AppointmentReminderList;
