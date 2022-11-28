import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import CustomImage from '../../components/atoms/customImage';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../../components/atoms/colorPalette';
import CustomModal from '../../components/molecules/customModal';
import UpdateAppointment from './updateAppointment';
import {useIsFocused} from '@react-navigation/native';
import {AddMedicine, getMedicine} from '../../utils/storage';
import Loader from '../../components/atoms/loader';

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

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      false;
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          let doctorList = [];
          let reminderList = [];
          data.map(item => {
            if (item.doctorName !== null && item.medicineName !== null) {
              doctorList.push({
                doctorName: item.doctorName,
                prescriptionId: item.prescriptionId,
              });
            }
            if (item.appointmentList.length !== 0) {
              item.appointmentList.map(ele => {
                reminderList.push(ele);
              });
            }
          });
          setAppointments(reminderList);
          setDoctorName(doctorList);
        }
      });
    }
  }, [isFocused]);

  const onClickDeleteAppointment = deleteId => {
    getMedicine().then(data => {
      let updatedList = data;
      updatedList.map(a => {
        if (a.appointmentList.length !== 0) {
          a.appointmentList.map((r, index) => {
            if (r.appointmentId === deleteId) {
              a.appointmentList.splice(index, 1);
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
          setAppointments(reminderList);
        }
      });
    });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.top}>
        <ListItem style={styles.list}>
          <ListItem.Content>
            <View>
              <View style={{flexDirection: 'row'}}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Date:
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {item.date}
                </ListItem.Subtitle>
              </View>

              <View style={{flexDirection: 'row'}}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Time:
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {item.time}
                </ListItem.Subtitle>
              </View>

              <View style={{flexDirection: 'row'}}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Notes:
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {item.notes}
                </ListItem.Subtitle>
              </View>
            </View>
          </ListItem.Content>
          <View style={styles.editView}>
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
                color={colorPalette.mainColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.deleteTouch}
              onPress={() => {
                Alert.alert('Are you sure', 'Click ok to proceed', [
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
                icon={faTrash}
                size={19}
                color={colorPalette.mainColor}
              />
            </TouchableOpacity>
          </View>
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
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colorPalette.backgroundColor},
  imgCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  img: {width: '70%'},
  top: {flexDirection: 'row', marginVertical: 2},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderKey: {
    fontSize: 16,
    marginLeft: 3,
    fontWeight: '900',
    color: '#000',
  },
  listSubtitle: {
    marginLeft: 3,
    fontSize: 15,
    color: colorPalette.mainColor,
  },
  editView: {flexDirection: 'row', left: 55, padding: '6%'},
  deleteTouch: {marginLeft: '10%', marginRight: '10%'},
});

export default AppointmentReminderList;
