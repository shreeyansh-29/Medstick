import {View, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {styles} from '../../styles/reportScreenStyles/reportScreenStyles';
import LottieView from 'lottie-react-native';

const CalenderIcon = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={styles.calenderIcon}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Calender');
        }}>
        <LottieView
          style={styles.lottie}
          speed={0.6}
          source={require('../../assets/animation/calender2.json')}
          progress={progress}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CalenderIcon;
