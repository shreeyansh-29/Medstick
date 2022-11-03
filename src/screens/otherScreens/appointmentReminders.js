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
import {styles} from '../../styles/otherScreensStyles/prescriptionsStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveAppointmentRequest} from '../../redux/action/appointmentReminderAction/saveAppointmentAction';
import {getAppointmentRequest} from '../../redux/action/appointmentReminderAction/getAppointmentAction';
import DateTime from '../../components/organisms/dateTime';

const AppointmentReminders = ({navigation}) => {
  let dn = [];
  const [notes, setNotes] = useState();
  const [notes1, setNotes1] = useState('');
  const [open, setOpen] = useState(false);
  const [doctorAppointment, setDoctorAppointment] = useState([]);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  console.log(notes, 'notesss');

  const doctor = useSelector(appointmentReminderSelector.appointmentReminder);

  const saveAppointmentdata = useSelector(
    appointmentReminderSelector.saveAppointmentReminder,
  );

  let fDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let time = date.getHours() + ':' + date.getMinutes() + ':' + '00';

  useEffect(() => {
    dispatch(appointmentReminderRequest(pageNo));
  }, [pageNo]);

  useEffect(() => {
    if (doctor !== null) {
      dn = doctor.result.map(item => item);
      setNotes(dn);
    }
  }, [doctor]);

  const saveAppointment = (fDate, time, notes1) => {
    dispatch(saveAppointmentRequest(fDate, time, notes1, notes));
    setTimeout(() => {
      navigation.pop();
    }, 2000);
  };

  return (
    <>
      <View>
        <SubHeader title={'Appointment Reminders'} navigation={navigation} />
      </View>
      <View style={{margin: '0.3%'}}>
        <Text style={{fontSize: 18, marginTop: '5%', marginLeft: '7.5%'}}>
          Doctor name
        </Text>
        <View
          style={{
            borderWidth: 1.7,
            borderRadius: 4,
            marginTop: '5%',
            marginLeft: '8%',
            marginRight: '10%',
            borderColor: colorPalette.mainColor,
          }}>
          <Picker
            id="picker"
            selectedValue={notes}
            onValueChange={(itemValue, _itemIndex) => {
              console.log(itemValue, 'itemValue');
              setNotes(itemValue);
            }}>
            {doctor?.result?.map((item, ind) => {
              return (
                <Picker.Item
                  label={item.doctorName}
                  value={item.prescriptionId}
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
        <View style={{margin: '1%'}}>
          <TouchableOpacity
            style={{
              borderWidth: 1.5,
              borderRadius: 4,
              marginTop: '5%',
              alignItems: 'center',
              backgroundColor: colorPalette.mainColor,
              marginLeft: '7%',
              marginRight: '9%',
              padding: '1%',
              borderColor: colorPalette.mainColor,
            }}
            onPress={() => saveAppointment(fDate, time, notes1)}>
            <Text style={{fontSize: 19, color: 'white', fontWeight: '400'}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AppointmentReminders;
