import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles} from '../../styles/twoTouchableStyles';
const TwoTouchable = ({
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
        marginLeft: 90,
        padding: 15,
        maxWidth: 200,
      }}>
      <TouchableOpacity
        style={Styles.box1}
        onPress={() => {
          navigation.navigate(navigationTitle1);
        }}>
        <Text style={{fontSize: 18, color: 'black'}}>{`${title1}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.box2}
        onPress={() => {
          navigation.navigate(navigationTitle2);
        }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'black',
          }}>{`${title2}`}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TwoTouchable;
