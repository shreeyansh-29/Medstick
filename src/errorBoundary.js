import {View, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import SubHeader from './components/molecules/headers/subHeader';
import {colorPalette} from './components/atoms/colorPalette';

const ErrorBoundary = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
      <SubHeader navigation={navigation} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <LottieView
          resizeMode="contain"
          style={{width: 300, height: 300}}
          speed={0.8}
          source={require('./assets/animation/Loader.json')}
          progress={progress}
        />
      </View>
    </View>
  );
};

export default ErrorBoundary;
