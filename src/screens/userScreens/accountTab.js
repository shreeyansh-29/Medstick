import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import TwoTouchable from '../../components/molecules/twoTouchable';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  faUserNurse,
  faUserDoctor,
  faStopwatch,
  faCameraRetro,
  faGear,
  faHospitalUser,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles/otherScreensStyles/accountTabStyles';
import {colorPalette} from '../../components/atoms/colorPalette';
import {useDispatch} from 'react-redux';
import {resetLogin} from '../../redux/action/loginAction/loginAction';
import {resetSignUp} from '../../redux/action/signUpAction/signUpAction';
import {Divider} from 'react-native-paper';

const AccountTab = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('Please Login First');
  const [img, imgstate] = useState('https://i.stack.imgur.com/l60Hf.png');

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
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
    });
  });
  return (
    <View style={styles.container}>
      <MainHeader title={'Account'} />
      <ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
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
        <Divider style={{height: 1}} />
        <View style={{alignItems: 'center'}}>
          <TwoTouchable
            icon={faUserNurse}
            title="My Caretaker"
            navigationTitle="CareTaker"
            navigation={navigation}
          />
          <Divider
            style={{
              height: 1,
              width: '100%',
            }}
          />
          <TwoTouchable
            icon={faHospitalUser}
            title="My Patients"
            navigation={navigation}
            navigationTitle="Patients"
          />
          <Divider
            style={{
              height: 1,
              width: '100%',
            }}
          />
          <TwoTouchable
            icon={faUserDoctor}
            title="Prescriptions"
            navigationTitle="Prescriptions"
            navigation={navigation}
          />
          <Divider
            style={{
              height: 1,
              width: '100%',
            }}
          />

          <TwoTouchable
            icon={faStopwatch}
            title="Appointment Reminders"
            navigation={navigation}
            navigationTitle="AppointmentReminderList"
          />
          <Divider
            style={{
              height: 1,
              width: '100%',
            }}
          />

          <TwoTouchable
            icon={faGear}
            title="Settings"
            navigation={navigation}
            navigationTitle="Settings"
          />
          <Divider
            style={{
              height: 1,
              width: '100%',
            }}
          />

          {/* <TwoTouchable
            icon={faCameraRetro}
            title="Send Snap"
            navigation={navigation}
            navigationTitle="SendSnap"
          /> */}
        </View>

        {isLoggedIn ? (
          <View style={styles.logout}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                borderRadius: 8,
                padding: 12,
                backgroundColor: colorPalette.mainColor,
                width: '40%',
                alignItems: 'center',
                marginVertical: 40,
              }}
              onPress={async () => {
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
                // navigation.navigate('Logout');
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
      </ScrollView>
    </View>
  );
};

export default AccountTab;
