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
import PickerField from '../../components/atoms/pickerField';
import {useDispatch, useSelector} from 'react-redux';
import {appointmentReminderSelector} from '../../constants/Selector/appointmentReminderSelector';
import {appointmentReminderRequest} from '../../redux/action/userMedicine/appointmentReminderAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import SaveButton from '../../components/molecules/saveButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveAppointmentRequest } from '../../redux/action/appointmentReminderAction/saveAppointmentAction';

const AppointmentReminders = ({navigation}) => {

  let dn = [];
  const [notes, setNotes] = useState(dn);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  
  const doctor = useSelector(appointmentReminderSelector.appointmentReminder);
  const getdoctor= useSelector(appointmentReminderSelector.getAppointment);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(appointmentReminderRequest(pageNo));
    setIsLoading(true);
  }, [pageNo]);

  // useEffect(() => {
  //   if (doctor !== null) {
  //     console.log(doctor,"doctor");

  //      dn = doctor.result.map(item => item.doctorName);
  //     console.log(dn,"doctor name");
  //     setNotes(dn);
  //   }
  // },[doctor]);
  
  const savePrescriptionId= async()=>{
    try {
      await AsyncStorage.setItem('prescriptionId',(doctor.result.prescriptionId))
    } catch (error) {
      console.log(error,"error")
    }
  }
  const saveAppointment = () =>{
    dispatch(saveAppointmentRequest())
  }

  const renderItem = ({item}) => {
    return (
      <>
        <Card style={Styles.card}>
          <View style={Styles.listView}>
            <ListItem style={Styles.list}>
              <ListItem.Content>
                <View style={Styles.avatarView}>
                  <View style={Styles.medNameView}>
                    <ListItem.Title style={Styles.medName}>
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>{item.symptom}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </View>
        </Card>
      </>
    );
  };

  return (
    <>
      <View>
        <SubHeader title={'Appointment Reminders'} navigation={navigation} />
      </View>
      <View>
        <Picker
          id="picker"
          selectedValue={notes}
          onValueChange={(itemValue, _itemIndex) => setNotes(itemValue)}>
          {doctor?.result.map((item,ind) => {
            return (
              <Picker.Item
                label={item.doctorName}
                value={item.doctorName}
                key={ind.toString()}
              />
            );
          })}
        </Picker>
        <TextInput
          id="Notes"
          style={{width: '82%', marginLeft: '8%', marginTop: '4%'}}
          label="Notes"
          value={notes}
          mode="outlined"
          onChangeText={text => setNotes(text)}
          outlineColor="#02ABA6"
          activeOutlineColor="#02ABA6"
        />
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            marginTop:"3%",
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
                  date.getMinutes()+
                  ':' +
                  date.getSeconds()}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={{marginTop:"22%"}} >
          <SaveButton />
        </TouchableOpacity>
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
