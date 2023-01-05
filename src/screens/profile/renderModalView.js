import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Formik} from 'formik';
import ProfileForm from './profileForm';
import {profileValidationSchema} from '../../constants/validations';
import {
  editProfileRequest,
  resetProfile,
} from '../../redux/action/profileAction/editProfileAction';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {colorPallete} from '../../components/atoms/colorPalette';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import {bloodGroup, gender} from '../../constants/pickerItem';
import {ErrorToast, SuccessToast} from '../../components/atoms/customToast';
import {getUserProfileClear} from '../../redux/action/profileAction/getUserProfileAction';

const RenderModalVisible = ({
  isCancel,
  onPress,
  setModalVisible,
  setEdit,
  result,
}) => {
  const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;
  const dispatch = useDispatch();
  const res = useSelector(state => state.editProfile);

  useEffect(() => {
    if (res?.data?.status === 'Success') {
      dispatch(getUserProfileClear());
      dispatch(resetProfile());
      SuccessToast({text1: 'Updated Successfully', position: 'bottom'});

      setTimeout(() => {
        setModalVisible(false);
        setEdit(false);
      }, 1500);
    } else if (res?.data?.status === 'Failed') {
      dispatch(getUserProfileClear());
      dispatch(resetProfile());
      ErrorToast({text1: 'Something Went Wrong!!!', position: 'bottom'});
    }
    return () => {};
  }, [res]);

  const handleClick = values => {
    dispatch(
      editProfileRequest({
        bio: values?.bio.trim(),
        dateOfBirth: values?.dateofBirth,
        gender: values?.gender,
        bloodGroup: values?.bloodGroup,
        country: values?.country.trim(),
        state: values?.state.trim(),
        address: values?.address.trim(),
        contact: values?.contact.trim(),
        date: values?.date,
      }),
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.customStyles}>
        <View style={styles.closeBtn}>
          {isCancel ? (
            <>
              <TouchableOpacity onPress={onPress} activeOpacity={1}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size={26}
                  color={colorPallete.mainColor}
                />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={'padding'}
          keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Formik
              validator={() => ({})}
              enableReinitialize
              initialValues={{
                bio: result?.bio,
                contact: result?.contact,
                dateofBirth: result?.dateOfBirth,
                gender:
                  result?.gender === '' ? gender[0].value : result?.gender,
                country: result?.country,
                bloodGroup:
                  result?.bloodGroup === ''
                    ? bloodGroup[0].value
                    : result?.bloodGroup,
                address: result?.address,
                state: result?.state,
              }}
              validationSchema={profileValidationSchema}
              onSubmit={values => {
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
      <Toast visibilityTime={1000} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  customStyles: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '90%',
  },
  closeBtn: {
    alignItems: 'flex-end',
    paddingVertical: 10,
    marginRight: 6,
  },
});

export default RenderModalVisible;
