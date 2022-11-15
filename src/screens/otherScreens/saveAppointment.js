import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPalette} from '../../components/atoms/colorPalette';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {appointmentReminderSelector} from '../../constants/Selector/appointmentReminderSelector';
import {
  appointmentReminderClear,
  appointmentReminderRequest,
} from '../../redux/action/userMedicine/appointmentReminderAction';
import {
  saveAppointmentClear,
  saveAppointmentRequest,
} from '../../redux/action/appointmentReminderAction/saveAppointmentAction';
import {Formik} from 'formik';
import {appointmentValidationSchema} from '../../constants/validations';
import InputField from '../../components/atoms/inputField';
import CustomButton from '../../components/atoms/customButton';
import Toast from 'react-native-toast-message';
import {getAppointmentRequest} from '../../redux/action/appointmentReminderAction/getAppointmentAction';

const AppointmentReminders = ({navigation}) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [saveTimeOpen, setSaveTimeOpen] = useState(false);
  const dispatch = useDispatch();
  const doctor = useSelector(appointmentReminderSelector.appointmentReminder);
  const [notes, setNotes] = useState([]);
  const saveAppointmentData = useSelector(
    appointmentReminderSelector.saveAppointmentReminder,
  );

  useEffect(() => {
    dispatch(appointmentReminderRequest(0));
  }, []);

  useEffect(() => {
    if (doctor !== null) setNotes(doctor);
  }, [doctor]);

  useEffect(() => {
    if (saveAppointmentData?.status === 'Success') {
      Toast.show({
        type: 'success',
        text1: 'Appointment Saved Successfully',
        position: 'bottom',
      });
      setTimeout(() => {
        dispatch(saveAppointmentClear());
        dispatch(getAppointmentRequest(0));
        navigation.pop();
      }, 3000);
    }
    if (saveAppointmentData?.status === 'Failed') {
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
        text2: 'Try Again',
        position: 'bottom',
      });
      setTimeout(() => {
        dispatch(saveAppointmentClear());
      }, 200);
    }
  }, [saveAppointmentData]);

  return (
    <>
      <View>
        <SubHeader title={'Save Appointment'} navigation={navigation} />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}>
        <Formik
          validator={() => ({})}
          enableReinitialize
          initialValues={{
            doctorName: '',
            notes: '',
            date: '',
            time: '',
          }}
          validationSchema={appointmentValidationSchema}
          onSubmit={values => {
            const fDate = values.date;
            const time = values.time;
            const notes1 = values.notes;
            const prescriptionId = values.doctorName;

            dispatch(
              saveAppointmentRequest(fDate, time, notes1, prescriptionId),
            );
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={{alignItems: 'center', flex: 1, marginTop: 19}}>
              <View style={{marginBottom: 16}}>
                <View style={styles.text1}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: '700',
                    }}>
                    Doctor Name
                  </Text>
                  <Picker
                    style={{width: '58%'}}
                    dropdownIconColor={1}
                    mode="dropdown"
                    selectedValue={values.doctorName}
                    onValueChange={itemValue => {
                      setFieldValue('doctorName', itemValue);
                    }}>
                    {notes?.map(item => {
                      return (
                        <Picker.Item
                          label={item.doctorName}
                          value={item.prescriptionId}
                          key={item.prescriptionId}
                        />
                      );
                    })}
                  </Picker>
                </View>
                {errors.doctorName && touched.doctorName && (
                  <Text style={styles.validation1}>{errors.doctorName}</Text>
                )}
              </View>

              {/* Note */}
              <View
                style={{
                  width: '90%',
                  // backgroundColor: 'yellow',
                  marginBottom: 16,
                }}>
                <InputField
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  label="Notes"
                  mode="outlined"
                  outlineColor="lightgrey"
                  text="notes"
                  activeOutlineColor={colorPalette.mainColor}
                  value={values.notes}
                  styles={{height: 100}}
                  multiline={true}
                  selectTextOnFocus={true}
                />
                {errors.notes && touched.notes && (
                  <Text style={styles.validation1}>{errors.notes}</Text>
                )}
              </View>

              {/* Date */}
              <View style={[styles.container1, {marginBottom: 16}]}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setDateOpen(true);
                  }}
                  style={styles.containerTouch}>
                  <View style={styles.dateContainer}>
                    <View style={{justifyContent: 'flex-start', width: '35%'}}>
                      <Text style={styles.dateText}>Date</Text>
                    </View>
                    <View
                      style={{
                        width: '65%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '90%',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.dateText1}>{values.date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                {errors.date && touched.date && (
                  <Text style={styles.validation1}>{errors.date}</Text>
                )}
              </View>

              <DateTimePickerModal
                isVisible={dateOpen}
                mode="date"
                onConfirm={date => {
                  setFieldValue('date', moment(date).format('YYYY-MM-DD'));
                  setDateOpen(false);
                }}
                onCancel={() => setDateOpen(false)}
              />

              {/* Time */}
              <View style={[styles.container1, {marginBottom: 16}]}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setSaveTimeOpen(true);
                  }}
                  style={styles.containerTouch}>
                  <View style={styles.dateContainer}>
                    <View style={{justifyContent: 'flex-start', width: '35%'}}>
                      <Text style={styles.dateText}>Time</Text>
                    </View>
                    <View
                      style={{
                        width: '65%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '90%',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.dateText1}>{values.time}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                {errors.time && touched.time && (
                  <Text style={styles.validation1}>{errors.time}</Text>
                )}
              </View>
              <DateTimePickerModal
                isVisible={saveTimeOpen}
                mode="time"
                onConfirm={date => {
                  let minutes =
                    date.getMinutes() < 10
                      ? '0' + date.getMinutes()
                      : date.getMinutes();
                  let newTime = date.getHours() + ':' + minutes + ':' + '00';
                  setFieldValue('time', newTime);
                  setSaveTimeOpen(false);
                }}
                onCancel={() => setSaveTimeOpen(false)}
              />
              <CustomButton
                title={'Save'}
                handleSubmit={handleSubmit}
                contStyles={{marginVertical: 18, width: '25%'}}
                btnStyles={{
                  backgroundColor: colorPalette.mainColor,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    marginBottom: 15,
    width: '92%',
    padding: 3,
  },
  text1: {
    width: '88%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  validation1: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 9,
    marginTop: 1,
  },
  doctorVal: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 1,
  },
  containerTouch: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  dateText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '700',
    color: 'black',
  },
  dateText1: {
    fontSize: 17,
    marginLeft: 8,
    color: 'black',
  },
});

export default AppointmentReminders;
