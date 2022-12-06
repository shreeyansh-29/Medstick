import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {colorPalette} from './components/atoms/colorPalette';
import {resetLogin} from './redux/action/loginAction/loginAction';
import {resetSignUp} from './redux/action/signUpAction/signUpAction';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveUserLoggedIn} from './redux/action/loginAction/saveUserLoggedIn';

const Logout = ({navigation}) => {
  const dispatch = useDispatch();

  const logout = async () => {
    await GoogleSignin.signOut();
    await AsyncStorage.setItem('user_id', '');
    await AsyncStorage.setItem('user_name', '');
    await AsyncStorage.setItem('user_photo', '');
    await AsyncStorage.setItem('user_email', '');
    await AsyncStorage.setItem('accessToken', '');
    dispatch(resetLogin());
    dispatch(resetSignUp());
    dispatch(saveUserLoggedIn(false));
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  };

  useEffect(() => {
    logout();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPalette.mainColor,
      }}>
      <Text
        style={{
          fontWeight: '500',
          color: colorPalette.basicColor,
          fontSize: 20,
          marginBottom: 10,
        }}>
        Logging Out
      </Text>
      <ActivityIndicator size={28} color={'white'} />
    </View>
  );
};

export default Logout;
