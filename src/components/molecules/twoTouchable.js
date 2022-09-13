import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles} from '../../styles/twoTouchableStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../atoms/colorPalette';
const TwoTouchable = ({
  icon1,
  icon2,
  title1,
  title2,
  navigation,
  navigationTitle1,
  navigationTitle2,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
      }}>
      <TouchableOpacity
        style={Styles.box1}
        onPress={() => {
          navigation.navigate(navigationTitle1);
        }}>
        <FontAwesomeIcon
          icon={icon1}
          size={20}
          color={colorPalette.mainColor}
        />
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            marginTop: 8,
          }}>{`${title1}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.box2}
        onPress={() => {
          navigation.navigate(navigationTitle2);
        }}>
        <FontAwesomeIcon
          icon={icon2}
          size={20}
          color={colorPalette.mainColor}
        />
        <Text
          style={{
            marginTop: 8,
            fontSize: 18,
            color: 'black',
          }}>{`${title2}`}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TwoTouchable;
