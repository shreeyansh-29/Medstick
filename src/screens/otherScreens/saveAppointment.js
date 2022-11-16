import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
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
  saveAppointmentClear,
  saveAppointmentRequest,
} from '../../redux/action/appointmentReminderAction/saveAppointmentAction';
import {Formik} from 'formik';
import {appointmentValidationSchema} from '../../constants/validations';
import InputField from '../../components/atoms/inputField';
import CustomButton from '../../components/atoms/customButton';
import Toast from 'react-native-toast-message';
import {getAppointmentRequest} from '../../redux/action/appointmentReminderAction/getAppointmentAction';
import DateTimePicker from 'react-native-modal-datetime-picker';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const AppointmentReminders = ({navigation, route}) => {
  const dispatch = useDispatch();
  const notes = route.params.notes;
  const [dateOpen, setDateOpen] = useState(false);
  const [saveTimeOpen, setSaveTimeOpen] = useState(false);

  const saveAppointmentData = useSelector(
    appointmentReminderSelector.saveAppointmentReminder,
  );

  useEffect(() => {
    if (notes.length === 0) {
      Alert.alert('Need to add prescription first', '', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.pop();
          },
        },
      ]);
    }
  }, [notes]);

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
    <View style={{flex: 1, backgroundColor: colorPalette.mainColor}}>
      <SubHeader title={'Save Appointment'} navigation={navigation} />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: 'white',
        }}
        behavior={'padding'}
        keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <Formik
            validator={() => ({})}
            enableReinitialize
            initialValues={{
              doctorName: notes[0]?.prescriptionId,
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
                      style={{width: '58%', color: 'black'}}
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
                    styles={{height: 100, backgroundColor: 'white'}}
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
                      <View
                        style={{justifyContent: 'flex-start', width: '35%'}}>
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

                <DateTimePicker
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
                      <View
                        style={{justifyContent: 'flex-start', width: '35%'}}>
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
                    let time;

                    if (date.getHours() < 10) {
                      time =
                        date.getHours() + ':' + date.getMinutes() + ':' + '00';
                    } else {
                      time =
                        date.getHours() + ':' + date.getMinutes() + ':' + '00';
                    }

                    console.log(time);

                    // let minutes =
                    //   date.getMinutes() < 10
                    //     ? '0' + date.getMinutes()
                    //     : date.getMinutes();
                    // let newTime = date.getHours() + ':' + minutes + ':' + '00';
                    setFieldValue('time', time);
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
      </KeyboardAvoidingView>
      <Toast />
    </View>
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
    paddingVertical: 14,
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