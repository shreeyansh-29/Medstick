/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import CustomImage from '../components/atoms/customImage';
import styles from '../styles/otherScreensStyles/onBoardingStyles';

const OnboardingScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Bottom');
  }, 2000);
  return (
    <View style={styles.container}>
      <CustomImage
        source={require('../assets/images/medstick.png')}
        styles={styles.img}
        resizeMode="contain"
      />
    </View>
  );
};

export default OnboardingScreen;
