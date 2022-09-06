import {View, Animated, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import LottieView from 'lottie-react-native';

const BellIcon = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ClickImage');
        }}>
        <LottieView
          style={{height: 40, width: 40}}
          speed={0.6}
          source={require('../../assets/animation/notificationBell.json')}
          progress={progress}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BellIcon;
