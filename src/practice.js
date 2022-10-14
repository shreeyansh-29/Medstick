import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Formik} from 'formik';
import {deviceWidth} from './components/atoms/constant';
import {profileValidationSchema} from './constants/validations';
import {appointmentReminderSelector} from './constants/Selector/appointmentReminderSelector';
import { useSelector } from 'react-redux';

const Practice = () => {
  const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

  const [notes, setNotes] = useState();
  const [notes1, setNotes1] = useState('');

  const doctor = useSelector(appointmentReminderSelector.appointmentReminder);

  useEffect(() => {
    if (doctor !== null) {
      dn = doctor.result.map(item => item);
      console.log(dn);
      setNotes(dn);
    }
  }, [doctor]);

  const handleSubmit = (fDate, time, notes1) => {
    dispatch(saveAppointmentRequest(fDate, time, notes1, notes));
    setTimeout(() => {
      navigation.pop();
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={'padding'}
      keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
      <ScrollView
        contentContainerStyle={{width: deviceWidth / 1.1, flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Formik
          validator={() => ({})}
          enableReinitialize
          initialValues={{
            DoctorName: '',
            Description: '',
            Date: '',
            Time: '',
          }}
          validationSchema={profileValidationSchema}
          onSubmit={values => handleSubmit(values)}>
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Practice;

