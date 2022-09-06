import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
const TouchableButton = ({title}) => {
  return (
    <View>
      <TouchableOpacity style={{padding: 20, backgroundColor: 'white'}}>
        <Text style={{fontSize: 18, color: 'black'}}>{`${title}`}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TouchableButton;
