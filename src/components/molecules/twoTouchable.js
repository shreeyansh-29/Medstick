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
        alignItems:'center',
        paddingVertical:5
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={Styles.box}
        onPress={() => {
          navigation.navigate(navigationTitle);
        }}>
        <View style={Styles.icon}>
          <FontAwesomeIcon
            icon={icon}
            size={20}
            color={colorPalette.mainColor}
          />
        </View>
        <View style={Styles.name}>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
              alignSelf:'flex-start'
            }}>{`${title}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default TwoTouchable;