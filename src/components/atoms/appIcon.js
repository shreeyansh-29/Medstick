import {View} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import CustomImage from '../atoms/customImage';

const AppIcon = () => {
  return (
    <View style={styles.appIcon}>
      <View
        style={{
          borderRadius: 22,
          width: '66%',
          backgroundColor: 'white',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomImage
          resizeMode="contain"
          source={require('../../assets/images/appIcon.png')}
          styles={{width: 25, height: 25}}
        />
      </View>
    </View>
  );
};

export default AppIcon;
