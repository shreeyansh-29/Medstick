import {View, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {styles} from '../../styles/reportScreenStyles/calenderIconStyles';
import LottieView from 'lottie-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../atoms/colorPalette';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';

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
          style={{height: 44, width: 44}}
          speed={0.6}
          source={require('../../assets/animation/calenderIcon.json')}
          progress={progress}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CalenderIcon;
