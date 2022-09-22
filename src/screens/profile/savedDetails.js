/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {
  faCalendarCheck,
  faDroplet,
  faFlag,
  faMarsAndVenus,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from '../../styles/profile/profileStyles';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colorPalette} from '../../components/atoms/colorPalette';

const SavedDetails = () => {
  const [bio, setBio] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodGroup, setBloodGroup] = React.useState('');

  useFocusEffect(() => {
    async function getuserdetail() {
      let patient_bio = await AsyncStorage.getItem('bio');
      let patient_contact = await AsyncStorage.getItem('contact');
      let patient_dob = await AsyncStorage.getItem('dob');
      let patient_country = await AsyncStorage.getItem('country');
      let patient_gender = await AsyncStorage.getItem('gender');
      let patient_bloodGroup = await AsyncStorage.getItem('bloodGroup');

      setBio(patient_bio);
      setContact(patient_contact);
      setDob(patient_dob);
      setGender(patient_gender);
      setCountry(patient_country);
      setBloodGroup(patient_bloodGroup);
    }

    getuserdetail();
  });

  return (
    <>
      <View style={styles.sd}>
        <View style={styles.sdContainer}>
          <View style={styles.sdSubContainer}>
            <FontAwesomeIcon
              size={18}
              icon={faUser}
              color={colorPalette.mainColor}></FontAwesomeIcon>
          </View>
          <View style={styles.sdText}>
            <Text style={styles.sdText1}>{bio}</Text>
          </View>
        </View>
        <View style={styles.sdContainer}>
          <View style={styles.sdSubContainer}>
            <FontAwesomeIcon
              size={18}
              icon={faPhone}
              color={colorPalette.mainColor}></FontAwesomeIcon>
          </View>
          <View style={styles.sdText}>
            <Text style={styles.sdText1}>{contact}</Text>
          </View>
        </View>
        <View style={styles.sdContainer}>
          <View style={styles.sdSubContainer}>
            <FontAwesomeIcon
              size={18}
              icon={faCalendarCheck}
              color={colorPalette.mainColor}></FontAwesomeIcon>
          </View>
          <View style={styles.sdText}>
            <Text style={styles.sdText1}>{dob}</Text>
          </View>
        </View>
        <View style={styles.sdContainer}>
          <View style={styles.sdSubContainer}>
            <FontAwesomeIcon
              size={18}
              icon={faFlag}
              color={colorPalette.mainColor}></FontAwesomeIcon>
          </View>
          <View style={styles.sdText}>
            <Text style={styles.sdText1}>{country}</Text>
          </View>
        </View>
        <View style={styles.sdContainer}>
          <View style={styles.sdSubContainer}>
            <FontAwesomeIcon
              size={18}
              icon={faDroplet}
              color={colorPalette.mainColor}></FontAwesomeIcon>
          </View>
          <View style={styles.sdText}>
            <Text style={styles.sdText1}>{bloodGroup}</Text>
          </View>
        </View>
        <View style={styles.sdContainer}>
          <View style={styles.sdSubContainer}>
            <FontAwesomeIcon
              size={18}
              icon={faMarsAndVenus}
              color={colorPalette.mainColor}></FontAwesomeIcon>
          </View>
          <View style={styles.sdText}>
            <Text style={styles.sdText1}>{gender}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default SavedDetails;
