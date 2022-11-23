import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {colorPalette} from '../../components/atoms/colorPalette';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import {Divider} from 'react-native-paper';
import {Formik} from 'formik';
import {updateAppointmentSchema} from '../../constants/validations';
import InputField from '../../components/atoms/inputField';
import CustomButton from '../../components/atoms/customButton';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import {hour} from '../../constants/constants';
import {getPrescription, savePrescription} from '../../utils/storage';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const UpdateAppointment = ({
  setModalVisible,
  notes1,
  time1,
  temp,
  appointmentId,
  setAppointments,
}) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const updateAppointment = values => {
    let obj = {
      notes: values.notes,
      date: values.date1,
      time: values.time,
      appointmentId: appointmentId,
    };
    getPrescription().then(data => {
      let updatedList = data;
      updatedList.map(item => {
        if (item.appointmentList.length !== 0) {
          item.appointmentList.map((ele, index) => {
            if (ele.appointmentId === appointmentId) {
              item.appointmentList[index] = obj;
            }
          });
        }
        savePrescription(updatedList);
        Toast.show({
          type: 'success',
          text1: 'Updated Successfully',
        });

        getPrescription().then(data => {
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

        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      });
    });
  };

  return (
    <View style={styles.mainHead}>
      <View style={styles.innerBody}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
          style={{alignSelf: 'flex-end', marginRight: 14, marginTop: 8}}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={colorPalette.mainColor}
            size={24}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Update Appointment</Text>
        </View>

        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={'padding'}
          keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
          <Formik
            validator={() => ({})}
            enableReinitialize
            initialValues={{
              notes: notes1,
              date1: moment(temp).format('YYYY-MM-DD'),
              time: time1,
            }}
            validationSchema={updateAppointmentSchema}
            onSubmit={values => {
              updateAppointment(values);
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
              <View style={{alignItems: 'center', flex: 1}}>
                <View style={{width: '90%'}}>
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
                    <Text style={{color: 'red', marginTop: 4}}>
                      {errors.notes}
                    </Text>
                  )}
                </View>

                {/* Date */}
                <View style={styles.container1}>
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
                          <Text style={styles.dateText1}>
                            {moment(values.date1).format('YYYY-MM-DD')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  isVisible={dateOpen}
                  mode="date"
                  onConfirm={date => {
                    setFieldValue('date1', moment(date).format('YYYY-MM-DD'));
                    setDateOpen(false);
                  }}
                  onCancel={() => setDateOpen(false)}
                  date={moment(values.date1).toDate()}
                />

                {/* Time */}
                <View style={styles.container1}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setTimeOpen(true);
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
                </View>

                <DateTimePickerModal
                  isVisible={timeOpen}
                  mode="time"
                  onConfirm={date => {
                    let minutes =
                      date.getMinutes() < 10
                        ? '0' + date.getMinutes()
                        : date.getMinutes();

                    let newTime =
                      date.getHours() > 12
                        ? hour[date.getHours()] + ':' + minutes + ' ' + 'PM'
                        : date.getHours() + ':' + minutes + ' ' + 'AM';

                    setFieldValue('time', newTime);
                    setTimeOpen(false);
                  }}
                  onCancel={() => setTimeOpen(false)}
                />

                <Divider style={{height: 1, width: '92%'}} />
                <CustomButton
                  title={'Save'}
                  handleSubmit={handleSubmit}
                  contStyles={{marginVertical: 18}}
                  btnStyles={{
                    backgroundColor: colorPalette.mainColor,
                    borderRadius: 5,
                    paddingHorizontal: 30,
                  }}
                />
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
      <Toast visibilityTime={500} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainHead: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  innerBody: {
    height: 360,
    width: Dimensions.get('window').width / 1.1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  container1: {
    marginVertical: 10,
    width: '92%',
  },
  containerTouch: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 5,
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
  arrow: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    right: 4,
    width: '10%',
  },
  downIcon: {right: 0, position: 'absolute'},
});

export default UpdateAppointment;
