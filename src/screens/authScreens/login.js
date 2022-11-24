import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {styles} from '../../styles/authScreensStyles/loginScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../redux/action/loginAction/loginAction';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';

const Login = ({navigation, connected}) => {
  const res = useSelector(state => state.signIn.data);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const getResponse = async () => {
    if (res?.status === 'Success') {
      await AsyncStorage.setItem('user_id', res.userList[0].id);
      await AsyncStorage.setItem('user_name', res.userList[0].userName);
      await AsyncStorage.setItem('user_email', res.userList[0].email);
      await AsyncStorage.setItem('accessToken', res.accessToken);

      Toast.show({
        type: 'success',
        text1: 'Logged In Successfully',
      });

      setTimeout(() => {
        navigation.navigate('Home');
      }, 500);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error While Login',
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (res?.status === 'Success') {
        getResponse();
      } else if (res?.status === 'Failed') {
        Toast.show({
          type: 'info',
          text1: 'User Not Found',
        });
      }
    }
  }, [isFocused, res]);

  const login = async () => {
    if (connected) {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const token = await messaging().getToken();
        const {email, photo} = userInfo.user;
        await AsyncStorage.setItem('user_photo', photo);

        dispatch(loginRequest({email, token}));
      } catch (err) {
        if (await GoogleSignin.isSignedIn()) {
          await GoogleSignin.signOut();
        }
        Toast.show({
          type: 'info',
          text1: 'Something Went Wrong',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please connect to Internet',
      });
    }
  };

  return (
    <View style={styles.signInCont}>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => login()}
      />
    </View>
  );
};

export default Login;
