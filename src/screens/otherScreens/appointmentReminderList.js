import {View, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
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
import SubTitle from '../../components/atoms/subTitle';
import DateTime from '../../components/organisms/dateTime';
import {updateAppointmentRequest} from '../../redux/action/appointmentReminderAction/updateAppointmentAction';
import DatePicker from 'react-native-date-picker';

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
  const [modalVisible, setModalVisible] = useState(false);
  const getDoctorLoading = useSelector(
    appointmentReminderSelector.getAppointmentLoading,
  );

  let fDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let time = date.getHours() + ':' + date.getMinutes() + ':' + '00';

  console.log(fDate,"fDateee");

  const updateAppointment1 = useSelector(
    appointmentReminderSelector.updateAppointment);

console.log(updateAppointment1,"update....")

  const getAppointmentLoader= useSelector(appointmentReminderSelector.getAppointmentLoading);

  const deleteAppointment = useSelector(appointmentReminderSelector.deleteAppointment);
  console.log(deleteAppointment,"delete appointment");


  useEffect(() => {
    if (getdoctor?.data !== null) {
      setAppointments([getdoctor.data]);
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
    dispatch(updateAppointmentRequest(fDate, time, notes1, appointmentId));
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);

    dispatch(getAppointmentRequest(pageNo));
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <ListItem style={styles.list}>
          <ListItem.Content>
            <View>
              <ListItem.Subtitle style={styles.patientName}>
                Date: {`${item.localDate}`}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{marginLeft: 3, fontSize:15, color: colorPalette.mainColor}}>
                Time: {`${item.localTime}`}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{marginLeft: 3, fontSize:15, color: colorPalette.mainColor}}>
                Notes: {`${item.notes}`}
              </ListItem.Subtitle>
            </View>
          </ListItem.Content>
          <View style={{flexDirection: 'row', left: 55, padding:"6%"}}>
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
                size={17}
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
                size={17}
                color={colorPalette.mainColor}
              />
            </TouchableOpacity>
          </View>
        </ListItem>
      </View>
    );
  };

  return (
    
    <View style={{flex: 1}}>
   
      <SubHeader title={'Appointment Reminders'} navigation={navigation} />

      {/* Modal */}
      {getdoctor.isLoading?.loader && <Loader/>}
      <Modal visible={modalVisible}>
        <View style={{flex: 1}}>
          <View style={{backgroundColor: colorPalette.mainColor}}>
            <Text style={{fontSize: 23, margin: '4%', fontWeight: '600'}}>
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
          <View style={{margin: '2%'}}>
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
                  <Text style={Styles.text}>DateTime</Text>
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
                  <Text style={{fontSize: 18}}>
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
            <View style={{borderWidth:1.5, marginTop:"5%", marginLeft:"8%", marginRight:"9.6%", borderRadius:7, borderColor:colorPalette.mainColor }} >
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
                    fontSize: 20,
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
      </Modal>
     

      {appointments.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CustomImage
            resizeMode="contain"
            styles={{width: '70%'}}
            source={require('../../assets/images/noappointment.png')}
          />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointments[0]}
          renderItem={renderItem}
          extraData={appointments[0]}
          numColumns={1}
        />
      )}
      <View style={{position: 'absolute', bottom: 20, right: 16}}>
        <AddButton
          text="add"
          routeName={'AppointmentReminders'}
          navigation={navigation}
          styles={{height: 84, width: 84}}
        />
      </View>
    </View>
    
  );
};

export default AppointmentReminderList;
