import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import TwoTouchable from '../../components/molecules/twoTouchable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TouchableButton from '../../components/atoms/touchableButton';
import {colorPalette} from '../../components/atoms/colorPalette';

const UserProfile = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <MainHeader title={'PROFILE'} navigation={navigation} />
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
            <TwoTouchable title1="My Caretaker" title2="My patients" />
            <TwoTouchable
              title1="Prescription"
              title2="Appointment Reminders"
            />
            <TwoTouchable title1="Send snap" title2="Settings" />
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

export default UserProfile;
