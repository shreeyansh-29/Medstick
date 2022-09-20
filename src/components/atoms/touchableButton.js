import {Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {colorPalette} from './colorPalette';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TouchableButton = ({title, loggedIn}) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
    });
  });

  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        padding: 12,
        backgroundColor: colorPalette.mainColor,
        width: '40%',
        alignItems: 'center',
      }}
      onPress={async () => {
        Alert.alert('Do you want to Logout?', '', [
          {
            text: 'Logout',
            onPress: async () => {
              await GoogleSignin.signOut();
              await AsyncStorage.setItem('user_id', '');
              await AsyncStorage.setItem('user_name', '');
              await AsyncStorage.setItem('user_photo', '');
              await AsyncStorage.setItem('user_email', '');
              await AsyncStorage.setItem('accessToken', '');
              loggedIn(false);
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
          },
        ]);
      }}>
      <Text
        style={{
          fontSize: 18,
          color: colorPalette.basicColor,
        }}>{`${title}`}</Text>
    </TouchableOpacity>
  );
};
export default TouchableButton;
