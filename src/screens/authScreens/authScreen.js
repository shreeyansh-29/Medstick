import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import SignUp from './signUp';
import Login from './login';
import Toast from 'react-native-toast-message';
import CheckConnection from '../../connectivity/checkConnection';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Divider} from 'react-native-paper';

const AuthScreen = ({navigation, route}) => {
  const [connected, connectedstate] = useState(false);

  const checkconnection = async () => {
    let conn = await CheckConnection();
    connectedstate(conn);
  };
  useEffect(() => {
    checkconnection();
    GoogleSignin.configure({
      webClientId:
        '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.textContainer}>
          <Text style={styles.signUpText}>Sign in / Sign up</Text>
          <Text style={styles.content}>Sign up to access the app!</Text>
        </View>

        <SignUp navigation={navigation} connected={connected} />

        <View style={styles.dividerCont}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>Or</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.loginView}>
          <Text style={styles.loginText}>Already have an account!</Text>
        </View>
        <Login navigation={navigation} connected={connected} />
      </View>
      <Toast visibilityTime={3000} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {alignItems: 'center'},
  signUpText: {
    color: 'black',
    fontSize: 22,
  },
  content: {
    color: 'grey',
    fontSize: 16,
    paddingTop: 12,
  },
  loginView: {alignItems: 'center'},
  loginText: {
    color: 'grey',
    fontSize: 16,
  },
  dividerCont: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    color: 'grey',
    width: '37%',
  },
  dividerText: {
    paddingHorizontal: 6,
    marginVertical: 6,
    color: 'black',
  },
});

export default AuthScreen;
