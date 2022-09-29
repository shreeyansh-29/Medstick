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
import DatePicker from 'react-native-date-picker';
import {useCamera} from 'react-native-camera-hooks';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {TextInput} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {horizontalScale, verticalScale} from '../atoms/constant';
import SaveButton from './saveButton';
import {colorPalette} from '../atoms/colorPalette';
import {faCalendarDays, faClock, faD} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AddPrescriptionList = ({navigation}) => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  console.log(Date(), 'datekkkkkkkkk');
  console.log(date, "date")

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View>
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
              <Text style={{fontSize: 17}}>Add Existing Prescription</Text>
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
              <Text style={{fontSize: 17}}>Add New Prescription</Text>
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
          <View style={Styles.box}>
            <Text style={{fontSize: 17, marginTop: '2%'}}>
              Add Appointment Remainder
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 5,
                left: '-7%',
              }}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <View style={Styles.box1}>
                  <Text style={Styles.text}>DateTime</Text>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={28}
                    color={colorPalette.mainColor}
                  />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    value={date}
                    mode="datetime"
                    onConfirm={date => {
                      console.log(date, ' date');
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </TouchableOpacity>
              {date == Date() ? (
                <View style={Styles.box2} >
                  <Text>
                    -----------------------
                  </Text>
                </View>
              ) : (
                <View style={Styles.box2}>
                  <Text style={{fontSize: 18}}>
                    {date?.getDate() +
                      '/' +
                      (date.getMonth() + 1) +
                      '/' +
                      date.getFullYear() +
                      '  ' +
                      date.getHours() +
                      ':' +
                      date.getMinutes()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default AddPrescriptionList;
