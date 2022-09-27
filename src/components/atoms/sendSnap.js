/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {styles} from '../../styles/sendSnapStyles';
import SubHeader from '../molecules/headers/subHeader';

const SendSnap = ({navigation}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  return (
    <View style={styles.container}>
      <SubHeader title={'Send Snap'} navigation={navigation} />
      <View style={styles.innerView}>
        <RNCamera
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          style={styles.camera}></RNCamera>

        <TouchableOpacity
          onPress={async () => {
            const data = await takePicture();
            console.log(data.uri);
            navigation.navigate('SendSnapToCaretaker', {
              image_uri: data.uri,
            });
          }}
          style={styles.image}>
          <LottieView
            style={styles.lottieAnimation}
            source={require('../../assets/animation/camera1.json')}
            autoPlay
            loop></LottieView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendSnap;
