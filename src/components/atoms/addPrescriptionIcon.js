import {View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {Animated} from 'react-native';

const AddPrescriptionIcon = () => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View>
      <LottieView
        style={{width: '50%'}}
        speed={0.7}
        source={require('../../assets/animation/addPrescription.json')}
        progress={progress}
      />
    </View>
  );
};

export default AddPrescriptionIcon;
