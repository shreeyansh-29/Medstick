import {
  Text,
  KeyboardAvoidingView,
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {TextInput} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {horizontalScale, verticalScale} from '../atoms/constant';

const AddPrescriptionList = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [gallary, setGallary] = useState('');
  const [imagePre, setImagePre] = useState('');

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  //   const options={
  //     title:'Select Image',
  //     type:'libary',
  //     options: {
  //       maxHeight: 200,
  //       maxWidth: 200,
  //       selectionLimit: 1,
  //       mediaType: 'photo',
  //       includeBase64: true,
  //     },

  //   }

  //   const uploadPrescription=async()=>{
  // const gallery=await launchImageLibrary(options)
  // if(gallery.didCanel===true)
  // {
  //   alert("cancel")
  // }
  // else{
  //   setGallary(gallery.assets[0])
  //   setImagePre(gallery.assets[0].uri)
  //   console.log("success")
  // }
  //   }

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
          <TouchableOpacity style={Styles.addingPrescriptionTouchable}>
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
          <TouchableOpacity onPress={() => {}}>
            <LottieView
              style={Styles.addingPrescriptionIcon}
              speed={0.7}
              progress={progress}
              source={require('../../assets/animation/addPrescriptionButton.json')}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddPrescriptionList;
