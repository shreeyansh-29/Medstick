import {View, Image} from 'react-native';
import React from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';

const PatientRequest = () => {
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
          source={require('../../../assets/images/nopatientreq.png')}
        />
      </View>
    </View>
  );
};

export default PatientRequest;
