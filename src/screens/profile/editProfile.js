/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {Text, View, Image, ScrollView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  faCalendarCheck,
  faDroplet,
  faFlag,
  faMarsAndVenus,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import {Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import styles from '../../styles/profile/profileStyles';
import SavedDetails from './savedDetails';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPalette} from '../../components/atoms/colorPalette';
import {useDispatch} from 'react-redux';
import {editProfileRequest} from '../../redux/action/editProfileAction/editProfileAction';
import {useIsFocused} from '@react-navigation/native';

const profileValidationSchema = yup.object().shape({
  Bio: yup.string().required('Bio is Required').nullable(),
  Contact: yup
    .string()
    .min(10, ({min}) => `Contact number must be ${min} characters`)
    .max(10, ({max}) => `Contact number can be only ${max} characters`)
    .required('Contact is Required')
    .nullable(),
  DateOfBirth: yup.string().required().nullable(),
  Gender: yup
    .string()
    .min(3, ({min}) => `Gender must be at least ${min} characters`)
    .required(),
  BloodGroup: yup.string().required().nullable(),
  Country: yup.string().required().nullable('Country is Required'),
});

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, namestate] = React.useState({
    user: {name: 'Not logged in!', photo: '', email: ''},
  });
  const focused = useIsFocused();
  const [img, imgstate] = React.useState('https://i.stack.imgur.com/l60Hf.png');
  const [load, loadstate] = React.useState(false);

  const [editenabled, editstate] = React.useState(false);

    const handleClick = async values => {
    loadstate(true);
    await AsyncStorage.setItem('bio', values.Bio);
    await AsyncStorage.setItem('contact', values.Contact);
    await AsyncStorage.setItem('dob', values.Age);
    await AsyncStorage.setItem('country', values.Weight);
    await AsyncStorage.setItem('gender', values.Gender);
    await AsyncStorage.setItem('bloodgroup', values.BloodGroup);

    let patient_bio = await AsyncStorage.getItem('bio');
    let patient_contact = await AsyncStorage.getItem('contact');
    let patient_dob = await AsyncStorage.getItem('dob');
    let patient_country = await AsyncStorage.getItem('country');
    let patient_gender = await AsyncStorage.getItem('gender');
    let patient_bloodGroup = await AsyncStorage.getItem('bloodgroup');

    dispatch(
      editProfileRequest({
        bio: patient_bio,
        contact: patient_contact,
        dateOfBirth: patient_dob,
        gender: patient_gender,
        bloodGroup: patient_bloodGroup,
        country: patient_country,
      }),
    );
  };

  const getUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    namestate(user);
    imgstate(user.user.photo);
  };

  useEffect(() => {
    if (focused) {
      getUser();
    }
  }, [focused]);

  return (
    <View style={styles.container}>
      <SubHeader navigation={navigation} title={'Profile'} />
      <ScrollView>
        <Toast visibilityTime={1500}></Toast>
        <View style={styles.container1}>
          <View style={styles.top}>
            <Image source={{uri: img}} style={styles.avatar}></Image>
            <View style={styles.topItem}>
              <Text style={styles.topItemText1}>{name.user.name}</Text>
              <Text style={styles.topItemText2}>{name.user.email}</Text>
            </View>
          </View>
          <View>
            <Button
              title="Edit profile"
              buttonStyle={styles.editButton}
              containerStyle={styles.editButtonConatiner}
              onPress={() => editstate(true)}></Button>
          </View>
          <View>
            <View>
              {editenabled ? (
                <>
                  <View>
                    <Formik
                      enableReinitialize
                      validationSchema={profileValidationSchema}
                      initialValues={{
                        Bio: '',
                        Contact: '',
                        DateOfBirth: '',
                        Country: '',
                        Gender: '',
                        BloodGroup: '',
                      }}
                      onSubmit={values => handleClick(values)}>
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        isValid,
                        touched,
                        setFieldValue,
                      }) => (
                        <View style={styles.inputContainer}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderBottomWidth: 1,
                              borderColor: 'lightgrey',
                            }}>
                            <FontAwesomeIcon
                              style={{marginLeft: 20}}
                              size={18}
                              icon={faUser}
                              color={colorPalette.mainColor}
                            />
                            <TextInput
                              label=" Bio"
                              mode="flat"
                              style={styles.textInput}
                              onChangeText={handleChange('Bio')}
                              onBlur={handleBlur('Bio')}
                              value={values.Bio}
                              outlineColor={colorPalette.mainColor}
                              activeOutlineColor={colorPalette.mainColor}
                            />
                            {errors.Bio && touched.Bio && (
                              <Text style={styles.errorText}>{errors.Bio}</Text>
                            )}
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderBottomWidth: 1,
                              borderColor: 'lightgrey',
                            }}>
                            <FontAwesomeIcon
                              style={{marginLeft: 22}}
                              size={18}
                              icon={faPhone}
                              color={colorPalette.mainColor}
                            />
                            <TextInput
                              label=" Contact"
                              mode="flat"
                              style={styles.textInput}
                              onChangeText={handleChange('Contact')}
                              onBlur={handleBlur('Contact')}
                              value={values.Contact}
                              outlineColor={colorPalette.mainColor}
                              activeOutlineColor={colorPalette.mainColor}
                            />
                            {errors.Contact && touched.Contact && (
                              <Text style={styles.errorText}>{errors.Bio}</Text>
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderBottomWidth: 1,
                              borderColor: 'lightgrey',
                            }}>
                            <FontAwesomeIcon
                              style={{marginLeft: 22}}
                              size={18}
                              icon={faCalendarCheck}
                              color={colorPalette.mainColor}
                            />
                            <TextInput
                              label=" Date of Birth"
                              mode="flat"
                              style={styles.textInput}
                              onChangeText={handleChange('DateOfBirth')}
                              onBlur={handleBlur('DateOfBirth')}
                              value={values.DateOfBirth}
                              outlineColor={colorPalette.mainColor}
                              activeOutlineColor={colorPalette.mainColor}
                            />
                            {errors.DateOfBirth && touched.DateOfBirth && (
                              <Text style={styles.errorText}>{errors.Bio}</Text>
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderBottomWidth: 1,
                              borderColor: 'lightgrey',
                            }}>
                            <FontAwesomeIcon
                              style={{marginLeft: 22}}
                              size={18}
                              icon={faFlag}
                              color={colorPalette.mainColor}
                            />
                            <TextInput
                              label=" Country"
                              mode="flat"
                              style={styles.textInput}
                              onChangeText={handleChange('Country')}
                              onBlur={handleBlur('Country')}
                              value={values.Country}
                              outlineColor={colorPalette.mainColor}
                              activeOutlineColor={colorPalette.mainColor}
                            />
                            {errors.Country && touched.Country && (
                              <Text style={styles.errorText}>{errors.Bio}</Text>
                            )}
                          </View>
                          <View style={styles.pickerContainer}>
                            <View style={styles.pickerIcon}>
                              <FontAwesomeIcon
                                size={18}
                                icon={faMarsAndVenus}
                                color={
                                  colorPalette.mainColor
                                }></FontAwesomeIcon>
                            </View>
                            <View style={styles.picker}>
                              <Picker
                                mode="dropdown"
                                selectedValue={values.Gender}
                                onValueChange={itemchange =>
                                  setFieldValue('Gender', itemchange)
                                }>
                                <Picker.Item
                                  label="Gender"
                                  value="Gender"
                                  style={styles.pickerItem}
                                />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                              </Picker>
                            </View>
                            <Text style={styles.pickerText}>
                              {touched.Gender && errors.Gender}
                            </Text>
                          </View>

                          <View style={styles.pickerContainer}>
                            <View style={styles.pickerIcon}>
                              <FontAwesomeIcon
                                size={18}
                                icon={faDroplet}
                                color={
                                  colorPalette.mainColor
                                }></FontAwesomeIcon>
                            </View>
                            <View style={styles.bgPickerView}>
                              <Picker
                                mode="dropdown"
                                style={styles.bgPicker}
                                selectedValue={values.BloodGroup}
                                onValueChange={itemchange =>
                                  setFieldValue('BloodGroup', itemchange)
                                }>
                                <Picker.Item
                                  label="BloodGroup"
                                  value="BloodGroup"
                                  style={styles.pickerItem}
                                />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                              </Picker>
                            </View>
                            <Text style={styles.pickerText}>
                              {touched.BloodGroup && errors.BloodGroup}
                            </Text>
                          </View>
                          <View style={styles.saveButtonView}>
                            <Button
                              loading={load}
                              onPress={handleSubmit}
                              title="SAVE"
                              buttonStyle={styles.saveButton}
                              containerStyle={styles.saveButtonContainer}
                              // disabled={!isValid}
                            />
                          </View>
                        </View>
                      )}
                    </Formik>
                  </View>
                </>
              ) : (
                <SavedDetails />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
