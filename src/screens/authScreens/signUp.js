import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {styles} from '../../styles/authScreensStyles/loginScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {signUpRequest} from '../../redux/action/signUpAction/signUpAction';
import CheckConnection from '../../connectivity/checkConnection';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.signUp.data);
  const [connected, connectedstate] = useState(false);

  const isFocused = useIsFocused();

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

  const getResponse = async () => {
    await AsyncStorage.setItem('user_id', res.userList[0].id);
    await AsyncStorage.setItem('user_name', res.userList[0].userName);
    await AsyncStorage.setItem('user_email', res.userList[0].email);
    await AsyncStorage.setItem('accessToken', res.accessToken);

    Toast.show({
      type: 'success',
      text1: 'Account Created Successfully',
    });

    setTimeout(() => {
      navigation.pop(1);
    }, 3000);
  };

  useEffect(() => {
    if (isFocused) {
      if (res?.status === 'Success') {
        getResponse();
      } else if (res?.status === 'Failed') {
        Toast.show({
          type: 'error',
          text1: 'User already exists',
        });
      }
    }
  }, [isFocused, res]);

  const signUp = async () => {
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
        text1: 'Failed',
      });
    }
  };

  return (
    <>
      <View style={styles.signUpCont}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            borderColor: 'lightgrey',
            borderWidth: 1,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
          }}
          onPress={() => signUp()}>
          <Image
            source={require('../../assets/images/g1.png')}
            style={{height: 30, width: 30, marginHorizontal: 8}}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'bold',
              color: 'grey',
              marginLeft: 40,
            }}>
            Connect with Google
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignUp;
