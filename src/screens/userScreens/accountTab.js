import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import TwoTouchable from '../../components/molecules/twoTouchable';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  faUserNurse,
  faUserDoctor,
  faStopwatch,
  faCameraRetro,
  faGear,
  faHospitalUser,
} from '@fortawesome/free-solid-svg-icons';
import Divider from '../../components/atoms/divider';
import {styles} from '../../styles/otherScreensStyles/accountTabStyles';
import {colorPalette} from '../../components/atoms/colorPalette';
import {useDispatch} from 'react-redux';
import {resetLogin} from '../../redux/action/loginAction/loginAction';
import {resetSignUp} from '../../redux/action/signUpAction/signUpAction';

const AccountTab = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('Please Login First');
  const [img, imgstate] = useState('https://i.stack.imgur.com/l60Hf.png');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
    });
  });

  useFocusEffect(() => {
    async function checkforlog() {
      const checkforlogin = await AsyncStorage.getItem('user_id');

      if (checkforlogin === null) {
        Alert.alert(
          'Sign in first to use this feature',
          'Click ok to proceed',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('AuthScreen');
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
          ],
        );
      } else {
        setName(await AsyncStorage.getItem('user_name'));
        imgstate(await AsyncStorage.getItem('user_photo'));
        setIsLoggedIn(true);
      }
    }

    checkforlog();
  });

  return (
    <View style={styles.container}>
      <MainHeader title={'Account'} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        {isLoggedIn ? (
          <View style={styles.profile}>
            <Image source={{uri: img}} style={styles.img} />
            <View style={styles.heading}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>See your profile</Text>
            </View>
          </View>
        ) : (
          <View style={styles.profile}>
            <Image source={{uri: img}} style={styles.img}></Image>
            <View style={styles.heading}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>See your profile</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
      <View style={styles.card}>
        <TwoTouchable
          icon1={faUserNurse}
          icon2={faHospitalUser}
          title1="My Caretaker"
          title2="My Patients"
          navigationTitle1="CareTaker"
          navigationTitle2="Patients"
          navigation={navigation}
        />
        <TwoTouchable
          icon1={faUserDoctor}
          icon2={faStopwatch}
          navigationTitle1="Prescriptions"
          navigationTitle2="AppointmentReminders"
          title1="Prescriptions"
          title2="Appointment Reminders"
          navigation={navigation}
        />
        <TwoTouchable
          icon1={faCameraRetro}
          icon2={faGear}
          title1="Send snap"
          title2="Settings"
          navigationTitle1="SendSnap"
          navigationTitle2="Settings"
          navigation={navigation}
        />
      </View>
      <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
      {isLoggedIn ? (
        <View style={styles.logout}>
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
                    imgstate('https://i.stack.imgur.com/l60Hf.png');
                    setName('Please Login First');
                    setIsLoggedIn(false);
                    dispatch(resetLogin());
                    dispatch(resetSignUp());
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
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default AccountTab;
