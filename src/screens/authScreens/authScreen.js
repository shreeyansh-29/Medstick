import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SignUp from './signUp';
import Login from './login';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Divider} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colorPalette} from '../../components/atoms/colorPalette';
import NetInfo from '@react-native-community/netinfo';

const AuthScreen = ({navigation}) => {
  const [connected, setConnected] = useState(false);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);

      if (!state.isConnected) {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 4000);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      GoogleSignin.configure({
        webClientId:
          '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{position: 'absolute', right: 16, top: 10}}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={{color: 'gray', fontSize: 18}}>Skip</Text>
      </TouchableOpacity>
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
      <Toast visibilityTime={1000} />
      {visible && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: colorPalette.greenPercentageColor,
            height: 22,
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '28%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <MaterialIcons name={'wifi'} color={'white'} size={20} />
            <Text style={{color: 'white', fontSize: 16}}>Back Online</Text>
          </View>
        </View>
      )}
      {!connected && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'grey',
            height: 22,
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '28%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <MaterialIcons name={'wifi-off'} color={'white'} size={20} />
            <Text style={{color: 'white', fontSize: 16}}>No Internet</Text>
          </View>
        </View>
      )}
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
    width: '6%',
  },
  dividerText: {
    paddingHorizontal: 6,
    marginVertical: 6,
    color: 'black',
  },
});

export default AuthScreen;
