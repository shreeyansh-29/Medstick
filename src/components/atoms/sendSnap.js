/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {styles} from '../../styles/sendSnapStyles';
import SubHeader from '../molecules/headers/subHeader';
import ImagePicker from 'react-native-image-crop-picker';

const SendSnap = ({navigation}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  // useEffect(() => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     navigation.navigate('SendSnapToCaretaker', {
  //       image_uri: image.path,
  //     });
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <SubHeader title={'Camera'} navigation={navigation} />
      <View style={styles.innerView}>
        <RNCamera
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          style={styles.camera}></RNCamera>

        <TouchableOpacity
          onPress={async () => {
            const data = await takePicture();
            navigation.navigate('SendSnapToCaretaker', {
              image_uri: data.uri,
            });
          }}
          style={styles.image}>
          <LottieView
            style={styles.lottieAnimation}
            source={require('../../assets/animation/camera1.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendSnap;
