import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {Styles} from '../../styles/twoTouchableStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';
import {colorPallete} from '../atoms/colorPalette';

const TwoTouchable = ({icon, title, navigation, navigationTitle}) => {
  const load = useSelector(state => state.userInfo?.data);

  const showAlert = () => {
    Alert.alert('Sign in first to use this feature', '', [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  };

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
          } else if (load) {
            navigation.navigate('AccountStack', {screen: navigationTitle});
          } else showAlert();
        }}>
        <View style={Styles.icon}>
          <FontAwesomeIcon
            icon={icon}
            size={21}
            color={colorPallete.mainColor}
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
