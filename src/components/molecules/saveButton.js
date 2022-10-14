import {Animated, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';

const SaveButton = () => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={Styles.saveTouchable}>
      <LottieView
        style={Styles.saveButton}
        speed={0.9}
        progress={progress}
        source={require('../../assets/animation/saveLogos.json')}
      />
    </View>
  );
};

export default SaveButton;
