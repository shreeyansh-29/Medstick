import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {styles} from '../../styles/authScreensStyles/loginScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginRequest,
  resetLogin,
} from '../../redux/action/loginAction/loginAction';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';
import {saveUserLoggedIn} from '../../redux/action/loginAction/saveUserLoggedIn';
import {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from '../../components/atoms/customToast';

const Login = ({navigation, logout}) => {
  const result = useSelector(state => state.signIn.data);
  console.log(result);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const getResponse = async () => {
    if (result?.status === 200) {
      let res = result?.data;
      await AsyncStorage.setItem('user_id', res.userList[0].id);
      await AsyncStorage.setItem('user_name', res.userList[0].userName);
      await AsyncStorage.setItem('user_email', res.userList[0].email);
      // let token = encryptData(res?.accessToken);
      await AsyncStorage.setItem('accessToken', res?.accessToken);
      await AsyncStorage.setItem(
        'user_photo',
        res?.userList[0].userDetails.picPath,
      );
      dispatch(saveUserLoggedIn(true));
      SuccessToast({text1: 'Logged In Successfully'});
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2500);
    } else {
      logout();
      ErrorToast({text1: 'Error While Login'});
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (result?.status === 200) {
        getResponse();
      } else if (result?.status === 404) {
        logout();
        InfoToast({text1: 'User Not Found'});
        dispatch(resetLogin());
      }
    }
  }, [isFocused, result]);

  const login = async () => {
    if (connected) {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const token = await messaging().getToken();
        const {email} = userInfo.user;

        dispatch(loginRequest({email, token}));
      } catch (err) {
        if (await GoogleSignin.isSignedIn()) {
          await GoogleSignin.signOut();
        }
        InfoToast({text1: 'Something Went Wrong'});
      }
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
