import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>homeScreen</Text>
      <TouchableOpacity onPress={()=> navigation?.navigate('medicinePanel')}>
      <Text>Press me</Text></TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
