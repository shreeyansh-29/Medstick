import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-paper';
import SubHeader from '../../components/molecules/headers/subHeader';
import {ListItem} from 'react-native-elements';
import {colorPalette} from '../../components/atoms/colorPalette';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {useDispatch, useSelector} from 'react-redux';
import {appointmentReminderSelector} from '../../constants/Selector/appointmentReminderSelector';
import {appointmentReminderRequest} from '../../redux/action/userMedicine/appointmentReminderAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays, faD} from '@fortawesome/free-solid-svg-icons';
import SaveButton from '../../components/molecules/saveButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveAppointmentRequest} from '../../redux/action/appointmentReminderAction/saveAppointmentAction';
import {getAppointmentRequest} from '../../redux/action/appointmentReminderAction/getAppointmentAction';

const AppointmentReminders = ({navigation}) => {
  let dn = [];
  const [notes, setNotes] = useState();
  const [notes1, setNotes1] = useState('');
  const [open, setOpen] = useState(false);
  const [doctorAppointment, setDoctorAppointment] = useState([]);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [text, setText] = useState('Empty');

  const doctor = useSelector(appointmentReminderSelector.appointmentReminder);

  const getdoctor = useSelector(appointmentReminderSelector.getAppointment);
  console.log(getdoctor, 'doctor list');

  // const saveAppointmentdata = useSelector(
  //   appointmentReminderSelector.saveAppointmentReminder,
  // );
  // console.log(saveAppointmentdata,"datatatatat")
  const [isLoading, setIsLoading] = useState(false);

  let fDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let time =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  useEffect(() => {
    dispatch(appointmentReminderRequest(pageNo));
    setIsLoading(true);
  }, [pageNo]);

  const getAppointmentReminder= async ()=>{
    setIsLoading(true);
    dispatch(getAppointmentRequest(pageNo))
      .then(data => {
        data = data.object;
        setDoctorAppointment(data);
        setIsLoading(false);
      })
      .catch(_err => {
        setIsLoading(false);
        setErrorModal(true);
      });
  }

  console.log(doctorAppointment,"dhfhhgf");

  useEffect(() => {
    if (doctor !== null) {
      dn = doctor.result.map(item => item.doctorName);
      setNotes(dn);
    }
  }, [doctor]);

  const savePrescriptionId = async () => {
    try {
      await AsyncStorage.setItem(
        'prescriptionId',
        doctor.result.prescriptionId,
      );
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getAppointmentReminder();
    savePrescriptionId();
  }, []);

  const saveAppointment = (fDate, time, notes1) => {
    dispatch(saveAppointmentRequest(fDate, time, notes1));
  };

  // const renderItem = ({item}) => {
  //   return (
  //     <>
  //       <Card style={Styles.card}>
  //         <View style={Styles.listView}>
  //           <ListItem style={Styles.list}>
  //             <ListItem.Content>
  //               <View style={Styles.avatarView}>
  //                 <View style={Styles.medNameView}>
  //                   <ListItem.Title style={Styles.medName}>
  //                     {item.name}
  //                   </ListItem.Title>
  //                   <ListItem.Subtitle>{item.symptom}</ListItem.Subtitle>
  //                   <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
  //                 </View>
  //               </View>
  //             </ListItem.Content>
  //           </ListItem>
  //         </View>
  //       </Card>
  //     </>
  //   );
  // };

  return (
    <>
      <View>
        <SubHeader title={'Appointment Reminders'} navigation={navigation} />
      </View>
      <View style={{margin: '0.3%'}}>
        <Text style={{fontSize: 18, marginTop: '5%'}}>Doctor name</Text>
        <View
          style={{
            borderWidth: 1.7,
            borderRadius: 4,
            marginTop: '5%',
            marginLeft: '5%',
            marginRight: '5%',
            borderColor: colorPalette.mainColor,
          }}>
          <Picker
            id="picker"
            selectedValue={notes}
            onValueChange={(itemValue, _itemIndex) => setNotes(itemValue)}>
            {doctor?.result.map((item, ind) => {
              return (
                <Picker.Item
                  label={item.doctorName}
                  value={item.doctorName}
                  key={ind.toString()}
                />
              );
            })}
          </Picker>
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
                  console.log(date, ' date');
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
        <TouchableOpacity
          style={{marginTop: '22%'}}
          onPress={() => saveAppointment(fDate, time, notes1)}>
          <SaveButton />
        </TouchableOpacity>
        <View>
          {getdoctor?.data?.object.map((itm)=>(
            <Text>
              {itm.appointmentId}
            </Text>
          ))}
          {/* {doctorAppointment?.length !== 0 &&
            doctorAppointment?.map((item, ind) => {
              return (
                <View key={index.toString()}>
                  <Text>
                    {item.data.object}
                  </Text>
                </View>
              );
            })} */}
        </View>
      </View>
      {/* {appointment.length === 0 ? (
        <View style={Styles.lottie}>
          <LottieView
            style={Styles.lottieView}
            speed={0.8}
            source={require('../../assets/animation/noMedicine2.json')}
            progress={progress}
          />
        </View>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default AppointmentReminders;
