import {
  Text,
  KeyboardAvoidingView,
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {TextInput} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {horizontalScale, verticalScale} from '../atoms/constant';

const AddPrescriptionList = ({navigation}) => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const openCamera = async () => {
    return (
      <>
        {console.log('hy')}
        <RNCamera
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          style={Styles.camera}
        />
        <TouchableOpacity
          onPress={async () => {
            const data = await takePicture();

            navigation.navigate('SendSnapToCaretaker', {
              image_uri: data.uri,
            });
          }}
          style={Styles.image}>
          <LottieView
            style={Styles.lottieAnimation}
            source={require('../../assets/animation/camera1.json')}
            autoPlay
            loop></LottieView>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <KeyboardAvoidingView>
        <TextInput
          id="Doctor's Name"
          style={{
            marginHorizontal: horizontalScale(12),
            marginBottom: verticalScale(6),
          }}
          label="Doctor's Name"
          value={doctorName}
          mode="outlined"
          onChangeText={text => setDoctorName(text)}
          outlineColor="#02ABA6"
          activeOutlineColor="#02ABA6"
        />
        <TextInput
          id="Specialization"
          label="Specialization"
          style={{
            marginHorizontal: horizontalScale(12),
            marginBottom: verticalScale(6),
          }}
          value={specialization}
          mode="outlined"
          onChangeText={text => setSpecialization(text)}
          outlineColor="#02ABA6"
          activeOutlineColor="#02ABA6"
        />
        <TextInput
          id="Number"
          label="Contact"
          style={{
            marginHorizontal: horizontalScale(12),
            marginBottom: verticalScale(6),
          }}
          value={number}
          mode="outlined"
          onChangeText={text => setNumber(text)}
          keyboardType="numeric"
          outlineColor="#02ABA6"
          activeOutlineColor="#02ABA6"
        />
        <TextInput
          id="Number"
          style={{
            marginHorizontal: horizontalScale(12),
            marginBottom: verticalScale(6),
          }}
          label="Location"
          value={location}
          mode="outlined"
          onChangeText={text => setLocation(text)}
          outlineColor="#02ABA6"
          activeOutlineColor="#02ABA6"
        />
        <View style={Styles.addingPrescription}>
          <View style={Styles.textInput}>
            <Text style={Styles.text}>Add Existing Prescription</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log(image);
              });
            }}
            style={Styles.addingPrescriptionTouchable}>
            <LottieView
              style={Styles.addingPrescriptionIcon}
              speed={0.7}
              progress={progress}
              source={require('../../assets/animation/addPrescriptionButton.json')}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.addingPrescription}>
          <View style={Styles.textInput}>
            <Text style={Styles.text}>Add New Prescription</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log(image);
              });
            }}>
            <LottieView
              style={Styles.addingPrescriptionIcon}
              speed={0.7}
              progress={progress}
              source={require('../../assets/animation/addPrescriptionButton.json')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>Add Remainder</Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddPrescriptionList;
