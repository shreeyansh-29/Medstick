import {View, Image} from 'react-native';
import React from 'react';
import AddButton from '../../../components/atoms/addButton';
import {colorPalette} from '../../../components/atoms/colorPalette';

const MyPatients = ({navigation}) => {
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
          source={require('../../../assets/images/nopatients.png')}
        />
      </View>
      <View style={{position: 'absolute', bottom: 20, right: 16}}>
        <AddButton
          routeName={'SearchScreen'}
          navigation={navigation}
          styles={{height: 84, width: 84}}
        />
      </View>
    </View>
  );
};

export default MyPatients;
