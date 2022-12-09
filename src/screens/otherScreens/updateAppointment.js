import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
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
import {AddMedicine, getMedicine} from '../../utils/storage';
import Notifications from '../../pushNotification/pushNotifications';
import PushNotification from 'react-native-push-notification';
import {colorPallete} from '../../components/atoms/colorPalette';

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
  const showAlert = () => {
    Alert.alert('Please add valid time', '', [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  };

  const handlePushNotification = (obj, reminderTime, time) => {
    let dateTime = moment(obj.date + ' ' + reminderTime);
    Notifications.schduleNotification2(dateTime._d, obj.appointmentId, time);
  };

  const updateAppointment = values => {
    let obj = {
      notes: values.notes.trim(),
      date: values.date1,
      time: values.time,
      appointmentId: appointmentId,
    };

    let d = new Date();
    let currentTime = d.getHours() + ':' + d.getMinutes();
    let currentDate =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    const time1 = moment(obj.time, ['h:mm A']).format('HH:mm');
    const time2 = moment(currentTime, ['h:mm A']).format('HH:mm');
    let reminderTime =
      parseInt(time1.split(':')[0] - 1) + ':' + parseInt(time1.split(':')[1]);

    if (currentDate === obj.date) {
      time1 > time2
        ? getMedicine().then(data => {
            let localTime;
            let updatedList = data;
            updatedList.map(item => {
              if (item.appointmentList.length !== 0) {
                item.appointmentList.map((ele, index) => {
                  if (ele.appointmentId === appointmentId) {
                    localTime = ele.time;
                    PushNotification.getScheduledLocalNotifications(rn => {
                      for (let i = 0; i < rn.length; i++) {
                        if (
                          'You have an appointment scheduled at' +
                            ' ' +
                            localTime ===
                            rn[i].message &&
                          rn[i].title === 'Appointment!'
                        ) {
                          PushNotification.cancelLocalNotification({
                            id: rn[i].id,
                          });
                        }
                      }
                    });
                    reminderTime > time2
                      ? handlePushNotification(obj, reminderTime, obj.time)
                      : null;
                    handlePushNotification(obj, time1, obj.time);
                    item.appointmentList[index] = obj;
                    item.isModified = true;
                  }
                });
              }
              AddMedicine(updatedList);
              Toast.show({
                type: 'success',
                text1: 'Updated Successfully',
              });

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
            setTimeout(() => {
              setModalVisible(false);
            }, 1000);
          })
        : showAlert();
    } else {
      getMedicine().then(data => {
        let localTime;
        let updatedList = data;
        updatedList.map(item => {
          if (item.appointmentList.length !== 0) {
            item.appointmentList.map((ele, index) => {
              if (ele.appointmentId === appointmentId) {
                localTime = ele.time;
                PushNotification.getScheduledLocalNotifications(rn => {
                  for (let i = 0; i < rn.length; i++) {
                    if (
                      'You have an appointment scheduled at' +
                        ' ' +
                        localTime ===
                        rn[i].message &&
                      rn[i].title === 'Appointment!'
                    ) {
                      PushNotification.cancelLocalNotification({
                        id: rn[i].id,
                      });
                    }
                  }
                });
                reminderTime > time2
                  ? handlePushNotification(obj, reminderTime, obj.time)
                  : null;
                handlePushNotification(obj, time1, obj.time);
                item.appointmentList[index] = obj;
                item.isModified = true;
              }
            });
          }
          AddMedicine(updatedList);
          Toast.show({
            type: 'success',
            text1: 'Updated Successfully',
          });

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
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      });
    }
  };

  return (
    <View style={styles.mainHead}>
      <View style={styles.innerBody}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
          style={styles.closeBtn}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={colorPallete.mainColor}
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.updateHeading}>
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
              <View style={styles.formBody}>
                <View style={styles.notes}>
                  <InputField
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    label="Notes"
                    mode="outlined"
                    outlineColor="lightgrey"
                    text="notes"
                    activeOutlineColor={colorPallete.mainColor}
                    value={values.notes}
                    styles={styles.field}
                    multiline={true}
                    selectTextOnFocus={true}
                  />
                  {errors.notes && touched.notes && (
                    <Text style={styles.validation}>{errors.notes}</Text>
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
                      <View style={styles.heading}>
                        <Text style={styles.dateText}>Date</Text>
                      </View>
                      <View style={styles.dateView}>
                        <View style={styles.dateSubView}>
                          <Text style={styles.dateText1}>
                            {moment(values.date1).format('YYYY-MM-DD')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  minimumDate={new Date()}
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
                      <View style={styles.heading}>
                        <Text style={styles.dateText}>Time</Text>
                      </View>
                      <View style={styles.dateView}>
                        <View style={styles.dateSubView}>
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
                      date.getHours() > 11
                        ? hour[date.getHours()] + ':' + minutes + ' ' + 'PM'
                        : date.getHours() + ':' + minutes + ' ' + 'AM';

                    setFieldValue('time', newTime);
                    setTimeOpen(false);
                  }}
                  onCancel={() => setTimeOpen(false)}
                />

                <Divider style={styles.divider} />
                <CustomButton
                  title={'Save'}
                  handleSubmit={handleSubmit}
                  contStyles={styles.contStyles}
                  btnStyles={styles.btnStyles}
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
  closeBtn: {alignSelf: 'flex-end', marginRight: 14, marginTop: 8},
  formBody: {alignItems: 'center', flex: 1},
  updateHeading: {alignItems: 'center'},
  notes: {
    width: '90%',
  },
  field: {height: 100, backgroundColor: 'white'},
  validation: {color: 'red', marginTop: 4},
  heading: {justifyContent: 'flex-start', width: '35%'},
  dateView: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSubView: {
    width: '90%',
    alignItems: 'center',
  },
  contStyles: {marginVertical: 18},
  btnStyles: {
    backgroundColor: colorPallete.mainColor,
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  divider: {height: 1, width: '92%'},
});

export default UpdateAppointment;
