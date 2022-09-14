import { Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { MedicinePanel } from '../../styles/medicinePanelStyles/medicinePanelStyles';

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
        <TouchableOpacity style={MedicinePanel.saveTouchable}>
            <LottieView
                style={MedicinePanel.saveButton}
                speed={0.9}
                progress={progress}
                source={require('../../assets/animation/saveLogos.json')}
            />
        </TouchableOpacity>
    )
}

export default SaveButton