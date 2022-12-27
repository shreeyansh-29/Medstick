import React from 'react';
import {View} from 'react-native';
import CustomImage from '../../components/atoms/customImage';
import styles from '../../styles/otherScreensStyles/onBoardingStyles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <CustomImage
        source={require('../../assets/images/medstick.png')}
        styles={styles.img}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
