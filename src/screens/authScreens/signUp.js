import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {styles} from '../../styles/authScreensStyles/loginScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetSignUp,
  signUpRequest,
} from '../../redux/action/signUpAction/signUpAction';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {saveUserLoggedIn} from '../../redux/action/loginAction/saveUserLoggedIn';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.signUp.data);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const isFocused = useIsFocused();

  const getResponse = async () => {
    await AsyncStorage.setItem('user_id', res.userList[0].id);
    await AsyncStorage.setItem('user_name', res.userList[0].userName);
    await AsyncStorage.setItem('user_email', res.userList[0].email);
    let token = encryptData(res?.accessToken);
    await AsyncStorage.setItem('accessToken', token);
    dispatch(saveUserLoggedIn(true));

    Toast.show({
      type: 'success',
      text1: 'Account Created Successfully',
    });

    setTimeout(() => {
      navigation.navigate('Home');
    }, 2500);
  };

  useEffect(() => {
    if (isFocused) {
      if (res?.status === 'Success') {
        getResponse();
      } else if (res?.status === 'Failed') {
        logout();
        Toast.show({
          type: 'error',
          text1: 'User already exists',
        });
        dispatch(resetSignUp());
      }
    }
  }, [isFocused, res]);

  const logout = async () => {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
    }
  };

  const signUp = async () => {
    if (connected) {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const token = await messaging().getToken();

        const {name, email, photo} = userInfo.user;
        await AsyncStorage.setItem('user_photo', photo);

        dispatch(signUpRequest({name, email, photo, token}));
      } catch (err) {
        if (await GoogleSignin.isSignedIn()) {
          await GoogleSignin.signOut();
        }
        Toast.show({
          type: 'info',
          text1: 'Something Went Wrong',
        });
      }
    }
  };

  return (
    <>
      <View style={styles.signUpCont}>
        <TouchableOpacity
          style={styles.signUpView}
          onPress={() => signUp()}
          activeOpacity={1}>
          <Image
            source={require('../../assets/images/g1.png')}
            style={styles.img}
          />
          <Text style={styles.text}>Connect with Google</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignUp;
