import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

const noData = () => {
  return (
    <View>
      <Image
        source={require('../../assets/images/noPrescription.png')}
        resizeMode="contain"
        style={{width: '10%'}}
      />
    </View>
  );
};

export default noData;
