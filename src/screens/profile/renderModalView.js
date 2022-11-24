import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect} from 'react';
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
import {colorPalette} from '../../components/atoms/colorPalette';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';

const RenderModalVisible = ({
  isCancel,
  onPress,
  setModalVisible,
  setEdit,
  result,
}) => {
  const res = useSelector(state => state.editProfile);
  const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

  const dispatch = useDispatch();

  useEffect(() => {
    if (res?.data?.status === 'Success') {
      Toast.show({
        type: 'success',
        text1: 'Updated Successfully!!!',
        position: 'top',
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
        position: 'top',
      });
    }
  }, [res]);

  const handleClick = values => {
    dispatch(
      editProfileRequest({
        bio: values?.bio,
        dateOfBirth: values?.dateofBirth,
        gender: values?.gender,
        bloodGroup: values?.bloodGroup,
        country: values?.country,
        state: values?.state,
        address: values?.address,
        contact: values?.contact,
        date: values?.date,
      }),
    );
  };

  return (
    <View>
      <View style={{alignItems: 'flex-end', paddingVertical: 10}}>
        {isCancel ? (
          <>
            <TouchableOpacity onPress={onPress} activeOpacity={1}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size={26}
                color={colorPalette.mainColor}
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
              gender: result?.gender,
              country: result?.country,
              bloodGroup: result?.bloodGroup,
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
      <Toast visibilityTime={3000} />
    </View>
  );
};

export default RenderModalVisible;
