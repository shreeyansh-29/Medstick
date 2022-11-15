import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles} from '../../styles/twoTouchableStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../atoms/colorPalette';
const TwoTouchable = ({icon, title, navigation, navigationTitle}) => {
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
          if (title === 'Send Snap') {
            navigation.navigate('HomeStack', {screen: navigationTitle});
          } else {
            navigation.navigate('AccountStack', {screen: navigationTitle});
          }
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
