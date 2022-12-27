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
  //React Navigation Hook
  const isFocused = useIsFocused();

  //React useState Hook
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

  //React useEffect Hook
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => {};
  }, [showLoader]);

  //Function to display data
  const fetchData = () => {
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        let updatedList = data;
        let doctorList = [];
        let reminderList = [];
        console.log(updatedList);
        updatedList.map(item => {
          //fetching doctors for saving appointment
          if (item.doctorName !== null && item.medicineName !== null) {
            doctorList.push({
              doctorName: item.doctorName,
              prescriptionId: item.prescriptionId,
            });
          }
          if (item.appointmentList.length !== 0) {
            item.appointmentList.map(ele => {
              if (ele?.localDate >= todayDate) {
                //pushing appointments to display
                reminderList.push(ele);
              }
              //  else {
              //   //poping out reminder if it gets expired
              //   item.appointmentList.pop(ele);
              //   AddMedicine(updatedList);
              // }
            });
          }
        });

        //fetching unique doctors
        const key1 = 'prescriptionId';
        const uniqueDoctor = [
          ...new Map(doctorList.map(item => [item[key1], item])).values(),
        ];

        setDoctorName(uniqueDoctor);

        //fetching unique appointment reminders
        const key2 = 'appointmentId';
        const uniqueReminder = [
          ...new Map(reminderList.map(item => [item[key2], item])).values(),
        ];
        setAppointments(uniqueReminder);
      }
    });
    setRefresh(false);
  };

  //Delete Appointment Function
  const onClickDeleteAppointment = deleteId => {
    getMedicine().then(data => {
      let updatedList = data;
      let time;
      updatedList.map(a => {
        if (a.appointmentList.length !== 0) {
          a.appointmentList.map((r, index) => {
            //splicing up the selected reminder
            if (r.appointmentId === deleteId) {
              time = r.localTime;
              a.appointmentList.splice(index, 1);
              a.isSynced = false;
            }
          });
        }
      });
      //pushing updated list
      AddMedicine(updatedList);
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          let reminderList = [];
          data.map(item => {
            if (item.appointmentList.length !== 0) {
              //fetching unique reminders
              item.appointmentList.map(ele => {
                if (ele?.localDate >= todayDate) {
                  //pushing appointments to display
                  reminderList.push(ele);
                }
              });
            }
          });

          //fetching unique appointment reminders
          const key2 = 'appointmentId';
          const uniqueReminder = [
            ...new Map(reminderList.map(item => [item[key2], item])).values(),
          ];
          setAppointments(uniqueReminder);
        }
      });

      //deleting push notification of selected reminder
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

  const helperFunction = item => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalVisible(true);
            setTemp(item.localDate);
            setTime1(item.localTime);
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
    );
  };

  //FlatList RenderItem
  const renderItem = ({item}) => {
    const dateHandler = date => {
      let dob = date.split('-');
      return dob[2] + '-' + monthName[dob[1]] + '-' + dob[0];
    };

    let localTime = moment(item.localTime, ['h:mm A']).format('HH:mm');

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
                  {dateHandler(item?.localDate)}
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
                  {item.localTime}
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
              {item?.localDate === todayDate ? (
                <>
                  {localTime >= currentTime ? (
                    helperFunction(item)
                  ) : (
                    <Text style={styles.expiryText}>Expired</Text>
                  )}
                </>
              ) : (
                helperFunction(item)
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
            todayDate={todayDate}
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
                  onRefresh={() => {
                    setRefresh(true);
                    setShowLoader(true);
                    fetchData();
                  }}
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
  top: {marginTop: 4},

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
  expiryText: {color: 'gray', fontSize: 16, fontWeight: '500'},
});

export default AppointmentReminderList;
