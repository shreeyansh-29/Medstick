import { Animated, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';

const AddMedicineButton = () => {

    const progress = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }, []);

  return (
    
      <LottieView
                style={Styles.savelogo}
                speed={0.8}
                progress={progress}
                source={require('../../assets/animation/saveButton.json')}
              />

  )
}

export default AddMedicineButton