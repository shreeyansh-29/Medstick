import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {colorPalette} from './components/atoms/colorPalette';
import {resetLogin} from './redux/action/loginAction/loginAction';
import {resetSignUp} from './redux/action/signUpAction/signUpAction';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation, imgstate, setName, setIsLoggedIn}) => {
  const dispatch = useDispatch();

  const logout = async () => {
    await GoogleSignin.signOut();
    await AsyncStorage.setItem('user_id', '');
    await AsyncStorage.setItem('user_name', '');
    await AsyncStorage.setItem('user_photo', '');
    await AsyncStorage.setItem('user_email', '');
    await AsyncStorage.setItem('accessToken', '');
    imgstate('https://i.stack.imgur.com/l60Hf.png');
    setName('Please Login First');
    setIsLoggedIn(false);
    dispatch(resetLogin());
    dispatch(resetSignUp());
  };

  useEffect(() => {
    dispatch(resetLogin());
    dispatch(resetSignUp());
    setTimeout(() => {
      navigation.navigate('AuthScreen', {
        text: 'logout',
      });
    }, 3000);

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
      <Text style={{fontWeight: '500', color: colorPalette.basicColor}}>
        Logging Out
      </Text>
      <ActivityIndicator size="medium" color={colorPalette.basicColor} />
    </View>
  );
};

export default Logout;
