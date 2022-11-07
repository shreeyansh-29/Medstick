import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appointmentReminderSelector} from '../../constants/Selector/appointmentReminderSelector';
import SubHeader from '../../components/molecules/headers/subHeader';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../styles/patientStyles/myPatientsStyles';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TextInput} from 'react-native-paper';
import AddButton from '../../components/atoms/addButton';
import {getAppointmentRequest} from '../../redux/action/appointmentReminderAction/getAppointmentAction';
import CustomImage from '../../components/atoms/customImage';
import {
  faCalendarDays,
  faPenToSquare,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../../components/atoms/colorPalette';
import Loader from '../../components/atoms/loader';
import {deleteAppointmentRequest} from '../../redux/action/appointmentReminderAction/deleteAppointmentAction';
import DateTime from '../../components/organisms/dateTime';
import {updateAppointmentRequest} from '../../redux/action/appointmentReminderAction/updateAppointmentAction';
import DatePicker from 'react-native-date-picker';
import {color} from 'react-native-reanimated';

const AppointmentReminderList = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [notes1, setNotes1] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState('');
  const [time1, setTime1] = useState('');
  const [date, setDate] = useState(new Date());
  const getdoctor = useSelector(appointmentReminderSelector.getAppointment);
  console.log(getdoctor, 'get doctor');
  const [modalVisible, setModalVisible] = useState(false);
  const getDoctorLoading = useSelector(
    appointmentReminderSelector.getAppointmentLoading,
  );

  const updateAppointmentData = useSelector(
    appointmentReminderSelector.updateAppointment,
  );

  let fDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let time = date.getHours() + ':' + date.getMinutes() + ':' + '00';

  const updateAppointment1 = useSelector(
    appointmentReminderSelector.updateAppointmentLoading,
  );

  const getAppointmentLoader = useSelector(
    appointmentReminderSelector.getAppointmentLoading,
  );

  const deleteAppointment = useSelector(
    appointmentReminderSelector.deleteAppointment,
  );

  useEffect(() => {
    if (getdoctor?.data !== null) {
      setAppointments(getdoctor.data);
    }
  }, [getdoctor]);

  useEffect(() => {
    dispatch(getAppointmentRequest(pageNo));
  }, []);

  const onClickDeleteAppointment = deleteId => {
    dispatch(deleteAppointmentRequest(deleteId));

    setTimeout(() => {
      dispatch(getAppointmentRequest(pageNo));
    }, 1000);
  };

  const updateAppointment = (fDate, time, notes1, appointmentId) => {
    if (notes1) {
      dispatch(updateAppointmentRequest(fDate, time, notes1, appointmentId));
      if (updateAppointmentData?.data?.status === 'Success') {
        setModalVisible(false);
      }
      dispatch(getAppointmentRequest(pageNo));
    } else {
      Alert.alert("Empty fields are not required");
    }
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <ListItem style={styles.list}>
          <ListItem.Content>
            <View>
              <View style={{flexDirection: 'row'}}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Date:
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  style={{
                    marginLeft: 3,
                    fontSize: 15,
                    color: colorPalette.mainColor,
                  }}>
                  {' '}
                  {`${item.localDate}`}
                </ListItem.Subtitle>
              </View>

              <View style={{flexDirection: 'row'}}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Time:
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  style={{
                    marginLeft: 3,
                    fontSize: 15,
                    color: colorPalette.mainColor,
                  }}>
                  {`${item.localTime}`}
                </ListItem.Subtitle>
              </View>

              <View style={{flexDirection: 'row'}}>
                <ListItem.Subtitle style={styles.reminderKey}>
                  Notes:
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  style={{
                    marginLeft: 3,
                    fontSize: 15,
                    color: colorPalette.mainColor,
                  }}>
                  {`${item.notes}`}
                </ListItem.Subtitle>
              </View>
            </View>
          </ListItem.Content>
          <View style={{flexDirection: 'row', left: 55, padding: '6%'}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setTemp(item.localDate);
                setTime1(item.localTime);
                setNotes1(item.notes);
                setAppointmentId(item.appointmentId);
              }}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size={19}
                color={colorPalette.mainColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: '10%', marginRight: '10%'}}
              onPress={() => {
                onClickDeleteAppointment(item.appointmentId);
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
    <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
      <SubHeader
        title={'Appointment Reminders'}
        navigation={navigation}
        routeName={'AppointmentReminders'}
      />
      <Modal
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          }}>
          <View
            style={{
              height: 310,
              width: 340,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: colorPalette.mainColor,
                borderTopStartRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  margin: '4%',
                  fontWeight: '400',
                  color: '#ffffff',
                }}>
                Update Appointment
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                position: 'absolute',
                right: 10,
                marginTop: '3%',
                marginLeft: '3%',
              }}>
              <FontAwesomeIcon
                icon={faXmark}
                size={30}
                color={colorPalette.GREY}
              />
            </TouchableOpacity>
            <View style={{margin: '1%'}}>
              {/* <DateTime temp={temp} time1={time1} /> */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 5,
                  marginTop: '3%',
                  marginRight: '20%',
                  marginLeft: '7%',
                }}>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <View style={Styles.box1}>
                    <Text style={[Styles.text, {fontSize: 15}]}>DateTime</Text>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      size={28}
                      color={colorPalette.mainColor}
                    />
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      value={date}
                      mode="datetime"
                      onConfirm={date => {
                        setOpen(false);
                        setDate(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {date == Date() ? (
                  <View style={Styles.box2}>
                    <Text>-----------------------</Text>
                  </View>
                ) : (
                  <View style={Styles.box2}>
                    <Text style={{fontSize: 17}}>
                      {date?.getFullYear() +
                        '/' +
                        (date.getMonth() + 1) +
                        '/' +
                        date.getDate() +
                        '  ' +
                        date.getHours() +
                        ':' +
                        date.getMinutes() +
                        ':' +
                        date.getSeconds()}
                    </Text>
                  </View>
                )}
              </View>
              <TextInput
                id="Notes"
                style={{width: '82%', marginLeft: '8%', marginTop: '4%'}}
                label="Notes"
                value={notes1}
                mode="outlined"
                onChangeText={text => setNotes1(text)}
                outlineColor="#02ABA6"
                activeOutlineColor="#02ABA6"
              />
              <View
                style={{
                  borderWidth: 1.5,
                  marginTop: '6%',
                  marginLeft: '8%',
                  marginRight: '9.6%',
                  borderRadius: 7,
                  borderColor: colorPalette.mainColor,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    updateAppointment(fDate, time, notes1, appointmentId)
                  }
                  style={{
                    margin: '1%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      padding: '1%',
                      borderColor: colorPalette.mainColor,
                      borderRadius: 7,
                    }}>
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {getDoctorLoading ? (
        <Loader />
      ) : (
        <>
          {appointments?.length === 0 ? (
            <View></View>
          ) : (
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={appointments}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default AppointmentReminderList;
