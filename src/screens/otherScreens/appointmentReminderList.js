import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appointmentReminderSelector} from '../../constants/Selector/appointmentReminderSelector';
import SubHeader from '../../components/molecules/headers/subHeader';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../styles/patientStyles/myPatientsStyles';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
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
import {
  deleteAppointmentClear,
  deleteAppointmentRequest,
} from '../../redux/action/appointmentReminderAction/deleteAppointmentAction';
import DateTime from '../../components/organisms/dateTime';
import {updateAppointmentRequest} from '../../redux/action/appointmentReminderAction/updateAppointmentAction';
import DatePicker from 'react-native-date-picker';
import {color} from 'react-native-reanimated';
import CustomModal from '../../components/molecules/customModal';
import UpdateAppointment from './updateAppointment';
import Toast from 'react-native-toast-message';

const AppointmentReminderList = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [notes1, setNotes1] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [temp, setTemp] = useState('');
  const [time1, setTime1] = useState('');
  const [refresh, setRefresh] = useState(false);
  const getdoctor = useSelector(appointmentReminderSelector.getAppointment);
  const [modalVisible, setModalVisible] = useState(false);
  const getDoctorLoading = useSelector(
    appointmentReminderSelector.getAppointmentLoading,
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
              activeOpacity={1}
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
              activeOpacity={1}
              style={{marginLeft: '10%', marginRight: '10%'}}
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
    <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
      <SubHeader
        title={'Appointment Reminders'}
        navigation={navigation}
        routeName={'SaveAppointment'}
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
            pageNo={pageNo}
          />
        }
      />

      {getDoctorLoading ? (
        <Loader />
      ) : (
        <>
          {appointments?.length === 0 ? (
            <View></View>
          ) : (
            <FlatList
              style={{marginTop: 6}}
              showsVerticalScrollIndicator={false}
              data={appointments}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
                  refreshing={refresh}
                  onRefresh={() => {
                    dispatch(getAppointmentRequest(pageNo));
                    setRefresh(false);
                  }}
                />
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default AppointmentReminderList;
