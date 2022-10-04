import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {Formik} from 'formik';
import ProfileForm from './profileForm';
import {profileValidationSchema} from '../../constants/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  editProfileRequest,
  resetProfile,
} from '../../redux/action/editProfileAction/editProfileAction';
import {useDispatch} from 'react-redux';
import {deviceWidth} from '../../components/atoms/constant';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const RenderModalVisible = ({isCancel, onPress, setModalVisible, setEdit}) => {
  const res = useSelector(state => state.editProfile);
  const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

  const dispatch = useDispatch();

  useEffect(() => {
    if (res?.data?.status === 'Success') {
      Toast.show({
        type: 'success',
        text1: 'Updated Successfully!!!',
        position: 'bottom',
      });
      setTimeout(() => {
        setModalVisible(false);
        setEdit(false);
        dispatch(resetProfile());
      }, 3000);
    } else if (res?.data?.status === 'Failed') {
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong!!!',
        position: 'bottom',
      });
    }
  }, [res]);

  const handleClick = async values => {
    await AsyncStorage.setItem('bio', values.bio);
    await AsyncStorage.setItem('contact', values.contact);
    await AsyncStorage.setItem('dob', values.dateofBirth);
    await AsyncStorage.setItem('gender', values.gender);
    await AsyncStorage.setItem('bloodgroup', values.bloodGroup);
    await AsyncStorage.setItem('address', values.address);
    await AsyncStorage.setItem('state', values.state);
    await AsyncStorage.setItem('country', values.country);

    let patient_bio = await AsyncStorage.getItem('bio');
    let patient_contact = await AsyncStorage.getItem('contact');
    let patient_dob = await AsyncStorage.getItem('dob');
    let patient_country = await AsyncStorage.getItem('country');
    let patient_gender = await AsyncStorage.getItem('gender');
    let patient_bloodGroup = await AsyncStorage.getItem('bloodgroup');
    let patient_address = await AsyncStorage.getItem('address');
    let patient_state = await AsyncStorage.getItem('state');

    dispatch(
      editProfileRequest({
        bio: patient_bio,
        contact: patient_contact,
        dateOfBirth: patient_dob,
        gender: patient_gender,
        bloodGroup: patient_bloodGroup,
        country: patient_country,
        state: patient_state,
        address: patient_address,
      }),
    );
  };

  return (
    <View>
      <Toast visibilityTime={3000} />
      <View style={{alignItems: 'flex-end', paddingVertical: 10}}>
        {isCancel ? (
          <>
            <TouchableOpacity onPress={onPress}>
              <FontAwesomeIcon icon={faCircleXmark} size={28} color={'red'} />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
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
              // userName: '',
              bio: '',
              contact: '',
              dateofBirth: '',
              gender: '',
              country: '',
              bloodGroup: '',
              address: '',
              state: '',
            }}
            validationSchema={profileValidationSchema}
            onSubmit={values => {
              console.log('hy');
              handleClick(values);
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
              <ProfileForm
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                values={values}
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RenderModalVisible;
