import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {Styles} from '../../styles/twoTouchableStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../atoms/colorPalette';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TwoTouchable = ({icon, title, navigation, navigationTitle}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showAlert = () => {
    Alert.alert('Sign in first to use this feature', '', [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  };

  useFocusEffect(() => {
    async function checkforlog() {
      const checkforlogin = await AsyncStorage.getItem('user_id');

      if (checkforlogin !== null) {
        setIsLoggedIn(true);
      }
    }
    checkforlog();
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={Styles.box}
        onPress={() => {
          if (
            title === 'Prescriptions' ||
            title === 'Appointment Reminders' ||
            title === 'Settings'
          ) {
            navigation.navigate('AccountStack', {screen: navigationTitle});
          } else if (isLoggedIn) {
            if (title === 'Send Snap') {
              navigation.navigate('HomeStack', {screen: navigationTitle});
            } else {
              navigation.navigate('AccountStack', {screen: navigationTitle});
            }
          } else showAlert();
        }}>
        <View style={Styles.icon}>
          <FontAwesomeIcon
            icon={icon}
            size={21}
            color={colorPalette.mainColor}
          />
        </View>
        <View style={Styles.name}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginLeft: 6,
              fontWeight: '400',
            }}>{`${title}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default TwoTouchable;
