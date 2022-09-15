import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import TwoTouchable from '../../components/molecules/twoTouchable';
import TouchableButton from '../../components/atoms/touchableButton';
import {colorPalette} from '../../components/atoms/colorPalette';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  faUserNurse,
  faUserFriends,
  faRightToBracket,
  faSignOut,
  faUserDoctor,
  faStopwatch,
  faCameraRetro,
  faGear,
  faCircleQuestion,
  faHospitalUser,
} from '@fortawesome/free-solid-svg-icons';

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
                navigation.navigate('HomeScreen');
              },
            },
          ],
        );
      }
    }

    checkforlog();
  });
  return (
    <View style={{flex: 1}}>
      <MainHeader title={'Account'} navigation={navigation} />
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile');
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              marginLeft: 8,
            }}>
            <Image
              source={require('../../assets/images/shreeyansh.jpg')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
            <View style={{paddingTop: 4}}>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 20,
                  color: colorPalette.mainColor,
                  fontWeight: '600',
                }}>
                Shreeyansh Singh
              </Text>

              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  color: 'grey',
                  fontWeight: '500',
                }}>
                See your profile
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              height: 0.6,
              backgroundColor: 'grey',
              marginHorizontal: 24,
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
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

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <View
              style={{
                flex: 1,
                height: 0.2,
                backgroundColor: 'grey',
                marginHorizontal: 24,
              }}
            />
          </View>
          <TouchableButton title={'Log out'} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AccountTab;
