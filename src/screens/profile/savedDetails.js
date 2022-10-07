/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from '../../styles/profile/profileStyles';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';

const SavedDetails = () => {
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');

  useFocusEffect(() => {
    async function getuserdetail() {
      let patient_bio = await AsyncStorage.getItem('bio');
      let patient_contact = await AsyncStorage.getItem('contact');
      let patient_dob = await AsyncStorage.getItem('dob');
      let patient_country = await AsyncStorage.getItem('country');
      let patient_gender = await AsyncStorage.getItem('gender');
      let patient_bloodGroup = await AsyncStorage.getItem('bloodgroup');
      let patient_address = await AsyncStorage.getItem('address');
      let patient_state = await AsyncStorage.getItem('state');

      setBio(patient_bio);
      setContact(patient_contact);
      setDob(patient_dob);
      setGender(patient_gender);
      setCountry(patient_country);
      setBloodGroup(patient_bloodGroup);
      setAddress(patient_address);
      setState(patient_state);
    }

    getuserdetail();
  });

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <View style={styles.mainView}>
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Bio</Text>
              </View>

              <View style={styles.subView2}>
                <Text style={styles.content}>{bio}</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.mainView}>
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Contact</Text>
              </View>

              <View style={styles.subView2}>
                <Text style={styles.content}>{contact}</Text>
              </View>
            </View>
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Date Of Birth</Text>
              </View>

              <View style={styles.subView2}>
                <Text style={styles.content}>{dob}</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.mainView}>
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>BloodGroup</Text>
              </View>

              <View style={styles.subView2}>
                <Text style={styles.content}>{bloodGroup}</Text>
              </View>
            </View>

            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Gender</Text>
              </View>

              <View style={styles.subView2}>
                <Text style={styles.content}>{gender}</Text>
              </View>
            </View>
          </View>
        </Card>
        <Card style={styles.card}>
          <View style={styles.mainView}>
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Address</Text>
              </View>

              <View style={styles.subView2}>
                <Text style={styles.content}>{address}</Text>
              </View>
            </View>

            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>State</Text>
              </View>
              <View style={styles.subView2}>
                <Text style={styles.content}>{state}</Text>
              </View>
            </View>

            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Country</Text>
              </View>

              <View style={styles.subView2}>
                <Text style={styles.content}>{country}</Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

export default SavedDetails;
