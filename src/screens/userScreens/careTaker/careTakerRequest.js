import {Image, View} from 'react-native';
import React from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';

const CareTakerRequest = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: colorPalette.basicColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: 320, width: 240}}
          source={require('../../../assets/images/nocaretakers.jpg')}
        />
      </View>
    </View>
  );
};

export default CareTakerRequest;
