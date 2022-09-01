/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import styles from '../assests/styles/onBoardingStyles';

const OnboardingScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Drawer');
  }, 2000);
  return (  
    <View
      style={styles.container}>
      <Image
        source={require('../assests/images/Medstick_1.png')}
        style={styles.img}
        resizeMode="contain"></Image>
    </View>
  );
};

export default OnboardingScreen;
