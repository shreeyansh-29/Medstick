import {View, Text, SafeAreaView, Image, Alert} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import TwoTouchable from '../../components/molecules/twoTouchable';
import TouchableButton from '../../components/atoms/touchableButton';
import {colorPalette} from '../../components/atoms/colorPalette';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountTab = ({navigation}) => {
  useFocusEffect(() => {
    async function checkforlog() {
      const islogged = await GoogleSignin.isSignedIn();
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
      <MainHeader title={'ACCOUNT'} navigation={navigation} />
      <SafeAreaView style={{flex: 2, backgroundColor: colorPalette.mainColor}}>
        <View style={{flexDirection: 'row', padding: 20, marginBottom: 15}}>
          <Image
            source={require('../../assets/images/accept.jpg')}
            style={{width: 70, height: 70, borderRadius: 50}}
          />
          <View>
            <Text
              style={{
                left: 40,
                fontSize: 22,
                color: 'black',
                fontWeight: '600',
                marginBottom: 10,
              }}>
              Name
            </Text>
            <Text
              style={{
                left: 40,
                fontSize: 20,
                color: 'black',
                fontWeight: '500',
              }}>
              user@gmail.com
            </Text>
          </View>
        </View>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: 'white',
            height: '100%',
            alignContent: 'center',
          }}>
          <View
            style={{
              padding: 10,
            }}>
            <TwoTouchable
              title1="My Caretaker"
              title2="My Patients"
              navigationTitle1="CareTaker"
              navigationTitle2="Patients"
              navigation={navigation}
            />
            <TwoTouchable
              title1="Prescription"
              title2="Appointment Reminders"
            />
            <TwoTouchable
              title1="Send snap"
              title2="Settings"
              navigationTitle1="ClickImage"
              navigationTitle2="Settings"
              navigation={navigation}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <TouchableButton title="Help & Support" />
            <TouchableButton title="Logout" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AccountTab;
