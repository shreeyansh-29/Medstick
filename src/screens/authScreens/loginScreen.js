import {View, Text} from 'react-native';
import React from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {styles} from '../../styles/loginScreenStyles';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>{'LOGIN'}</Text>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      />
    </View>
  );
};

export default LoginScreen;
