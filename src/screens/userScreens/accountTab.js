import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import TwoTouchable from '../../components/molecules/twoTouchable';
import TouchableButton from '../../components/atoms/touchableButton';
import {colorPalette} from '../../components/atoms/colorPalette';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  faUserNurse,
  faUserDoctor,
  faStopwatch,
  faCameraRetro,
  faGear,
  faHospitalUser,
} from '@fortawesome/free-solid-svg-icons';
import Divider from '../../components/atoms/divider';
import {styles} from '../../styles/otherScreensStyles/accountTabStyles';

const AccountTab = ({navigation}) => {
  useFocusEffect(() => {
    async function checkforlog() {
      const checkforlogin = await AsyncStorage.getItem('user_id');

      if (checkforlogin === null) {
        Alert.alert(
          'Sign in first to use this feature',
          'Click ok to proceed',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                navigation.navigate('HomeSCreen');
              },
            },
          ],
        );
      }
    }

    checkforlog();
  });
  return (
    <View style={styles.container}>
      <MainHeader title={'Account'} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <View style={styles.profile}>
          <Image
            source={require('../../assets/images/shreeyansh.jpg')}
            style={styles.img}
          />
          <View style={styles.heading}>
            <Text style={styles.title}>Shreeyansh Singh</Text>
            <Text style={styles.subTitle}>See your profile</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
      <View style={styles.card}>
        <TwoTouchable
          icon1={faUserNurse}
          icon2={faHospitalUser}
          title1="My Caretaker"
          title2="My Patients"
          navigationTitle1="CareTaker"
          navigationTitle2="Patients"
          navigation={navigation}
        />
        <TwoTouchable
          icon1={faUserDoctor}
          icon2={faStopwatch}
          navigationTitle1="Prescriptions"
          navigationTitle2="AppointmentReminders"
          title1="Prescriptions"
          title2="Appointment Reminders"
          navigation={navigation}
        />
        <TwoTouchable
          icon1={faCameraRetro}
          icon2={faGear}
          title1="Send snap"
          title2="Settings"
          navigationTitle1="SendSnap"
          navigationTitle2="Settings"
          navigation={navigation}
        />
      </View>
      <Divider />
      <View style={styles.logout}>
        <TouchableButton title={'Log out'} />
      </View>
    </View>
  );
};

export default AccountTab;
