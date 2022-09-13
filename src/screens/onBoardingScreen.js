/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import styles from '../styles/onBoardingStyles';

const OnboardingScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Bottom');
  }, 2000);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/medstick.png')}
        style={styles.img}
        resizeMode="contain"></Image>
    </View>
  );
};

export default OnboardingScreen;
